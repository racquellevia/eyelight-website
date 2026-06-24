import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TerminalPanel } from "@/components/ui/TerminalPanel";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.legalName} for data visualization quotes and collaborations.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-14">
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionHeading
            label="Contact"
            title="Let's build something worth staring at"
            description="Share your dataset, audience, and timeline. We'll follow up with questions, not a generic deck."
          />
          <div className="mt-6 space-y-4 text-sm text-ink/70">
            <p>
              <span className="text-xs font-medium uppercase tracking-wider text-ink/45">
                Email
              </span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-1 inline-block font-medium text-ink underline decoration-amber decoration-2 underline-offset-4 hover:text-rust"
              >
                {siteConfig.email}
              </a>
            </p>
            <p>
              Typical engagements: exploratory dashboards, public-facing civic
              graphics, museum interactives, and recurring report design systems.
            </p>
          </div>
        </div>

        <TerminalPanel title="Send a message" className="lg:col-span-3">
          <ContactForm />
        </TerminalPanel>
      </div>
    </div>
  );
}
