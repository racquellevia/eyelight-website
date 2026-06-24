import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

/**
 * Contact API — logs inquiries server-side.
 *
 * To wire email delivery, integrate Resend, SendGrid, or similar here
 * using environment variables (see README).
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      organization?: string;
      projectType?: string;
      message?: string;
    };

    const { name, email, projectType, message } = body;
    if (!name?.trim() || !email?.trim() || !projectType?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const inquiry = {
      receivedAt: new Date().toISOString(),
      to: siteConfig.email,
      ...body,
    };

    // Development: log to server console. Replace with email provider in production.
    console.info("[Eyelight Labs contact inquiry]", inquiry);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to process your request." },
      { status: 500 }
    );
  }
}
