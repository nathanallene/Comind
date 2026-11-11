import { appendFile, mkdir } from "fs/promises"
import path from "path"
import { NextResponse } from "next/server"
import { validateInquiry, type InquiryInput } from "@/lib/inquiry"

const hits = new Map<string, number[]>()

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0]?.trim() || "local"
  return "local"
}

function limited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((stamp) => now - stamp < 10 * 60 * 1000)
  if (recent.length >= 5) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  return false
}

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return ""
  return value.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, max)
}

function reference(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  const bytes = crypto.getRandomValues(new Uint8Array(6))
  return `CN-${Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("")}`
}

export async function POST(request: Request) {
  const ip = clientIp(request)
  if (limited(ip)) {
    return NextResponse.json(
      { error: "Too many inquiries from this network. Wait a few minutes and try again." },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "The inquiry was not valid JSON." }, { status: 400 })
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "The inquiry was empty." }, { status: 400 })
  }

  const raw = body as Record<string, unknown>
  const input: InquiryInput = {
    name: clean(raw.name, 80),
    email: clean(raw.email, 160),
    description: clean(raw.description, 4000),
    companyWebsite: clean(raw.companyWebsite, 200),
  }

  if (input.companyWebsite) {
    return NextResponse.json({ reference: reference() })
  }

  const errors = validateInquiry(input)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "Check the form. Name, email, and a message are required." },
      { status: 400 },
    )
  }

  const code = reference()
  const record = {
    reference: code,
    receivedAt: new Date().toISOString(),
    name: input.name,
    email: input.email,
    description: input.description,
  }

  const directory = path.join(process.cwd(), "data")
  await mkdir(directory, { recursive: true })
  await appendFile(path.join(directory, "inquiries.jsonl"), `${JSON.stringify(record)}\n`, "utf8")

  return NextResponse.json({ reference: code })
}
