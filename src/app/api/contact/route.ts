import { NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/contact/schemas";

const MAX_BODY_BYTES = 10_000;

const sanitize = (s: string) => s.replace(/<[^>]*>/g, "").trim();
// Names are interpolated into the email subject; strip line breaks so
// user input can never add headers or extra subject lines.
const singleLine = (s: string) => s.replace(/[\r\n]+/g, " ");

let resend: Resend | null = null;

function getResend() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "anonymous";

  const allowed = await checkRateLimit("contact", ip, 5, "1 h");
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": "3600" } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { name, email, subject, message, company } = parsed.data;

  // Honeypot: real users never fill this hidden field. Report success so
  // bots can't detect the trap, but send nothing.
  if (company) {
    return NextResponse.json({ success: true });
  }

  const cleanName = singleLine(sanitize(name));
  const cleanMessage = sanitize(message);

  try {
    await getResend().emails.send({
      from:
        process.env.CONTACT_FROM ??
        "Ilm Learning Center <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      subject: `New inquiry [${subject}] from ${cleanName}`,
      text: [
        `Name: ${cleanName}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        ``,
        `Message:`,
        cleanMessage,
      ].join("\n"),
    });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
