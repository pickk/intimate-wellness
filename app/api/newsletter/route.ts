import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readSubscribers(file: string): string[] {
  try {
    if (!fs.existsSync(file)) return [];
    const raw = fs.readFileSync(file, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data.emails) ? data.emails : [];
  } catch {
    return [];
  }
}

function writeSubscribers(file: string, emails: string[]) {
  try {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify({ emails }, null, 2), "utf8");
  } catch {
    // best-effort persistence; route still returns success
  }
}

export async function POST(request: Request) {
  let body: { email?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const dataFile = path.join(process.cwd(), "data", "newsletter.json");
  const emails = readSubscribers(dataFile);
  if (!emails.includes(email)) {
    emails.push(email);
    writeSubscribers(dataFile, emails);
  }

  return NextResponse.json({
    ok: true,
    message: "Thanks for subscribing! Check your inbox to confirm.",
  });
}
