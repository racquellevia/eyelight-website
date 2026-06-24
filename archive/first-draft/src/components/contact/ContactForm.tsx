"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      organization: String(data.get("organization") ?? ""),
      projectType: String(data.get("projectType") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        throw new Error(body.error ?? "Something went wrong.");
      }
      setState("success");
      form.reset();
    } catch (err) {
      setState("error");
      setErrorMessage(err instanceof Error ? err.message : "Request failed.");
    }
  }

  const inputClass =
    "mt-2 w-full rounded-sm border border-ink/15 bg-cream px-3 py-2.5 text-sm focus:border-ink/30 focus:outline-none focus:ring-2 focus:ring-amber/40";

  if (state === "success") {
    return (
      <div className="rounded-sm border border-amber/40 bg-amber/15 p-8 text-center">
        <p className="font-semibold">Message received</p>
        <p className="mt-2 text-sm text-ink/70">
          Thank you for reaching out. We typically respond within two business
          days.
        </p>
        <button
          type="button"
          className="btn-secondary mt-6"
          onClick={() => setState("idle")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="section-label">Name *</span>
          <input name="name" required className={inputClass} />
        </label>
        <label className="block">
          <span className="section-label">Email *</span>
          <input name="email" type="email" required className={inputClass} />
        </label>
      </div>

      <label className="block">
        <span className="section-label">Organization</span>
        <input name="organization" className={inputClass} />
      </label>

      <label className="block">
        <span className="section-label">Project type *</span>
        <select name="projectType" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Select one
          </option>
          <option value="quote">New visualization / quote</option>
          <option value="collaboration">Research or editorial collaboration</option>
          <option value="workshop">Team workshop</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label className="block">
        <span className="section-label">Tell us about your data and goals *</span>
        <textarea
          name="message"
          required
          rows={5}
          className={inputClass}
          placeholder="Audience, timeline, data sources, and what success looks like..."
        />
      </label>

      {state === "error" && (
        <p className="text-sm text-rust" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="btn-primary disabled:opacity-50"
      >
        {state === "submitting" ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}
