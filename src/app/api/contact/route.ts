import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact/schemas";

const sanitize = (s: string) => s.replace(/<[^>]*>/g, "").trim();

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 h"),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "anonymous";

  const { success } = await ratelimit.limit(ip);
  if (!success) {
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

  const { name, email, subject, message } = parsed.data;
  const cleanName = sanitize(name);
  const cleanMessage = sanitize(message);

  try {
    await resend.emails.send({
      from: "Ilm Learning Center <onboarding@resend.dev>",
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
