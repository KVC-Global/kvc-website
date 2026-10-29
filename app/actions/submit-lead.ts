"use server"
import { headers } from "next/headers"
import { submitMisaWebform } from "@/lib/misa-webforms"
import { resolveMisaAttribution } from "@/lib/misa-attribution"

const SERVICES = [
  { value: "du-hoc", misaValue: "2" },
  {
    value: "khoa-hoc-online",
    misaValue: "3",
  },
  {
    value: "work-pass",
    misaValue: "7",
  },
  {
    value: "dinh-cu",
    misaValue: "6",
  },
  { value: "khac", misaValue: "5" },
] as const

import type { LeadFormState } from "@/lib/lead-form-state"

// Simple per-IP rate limit: max 5 submissions / hour. In-memory, best-effort.
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const submissions = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (submissions.get(ip) ?? []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  )
  if (recent.length >= RATE_LIMIT_MAX) {
    submissions.set(ip, recent)
    return true
  }
  recent.push(now)
  submissions.set(ip, recent)
  if (submissions.size > 1000) {
    // prune stale entries to bound memory
    for (const [key, times] of submissions) {
      if (times.every((ts) => now - ts >= RATE_LIMIT_WINDOW_MS)) {
        submissions.delete(key)
      }
    }
  }
  return false
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidVietnamPhone(phone: string): boolean {
  // Vietnamese or international format: +84..., 0xxxxxxxxx (9-11 digits)
  const digits = phone.replace(/[\s.-]/g, "")
  return /^\+?\d{9,15}$/.test(digits)
}

function isSpamText(text: string): boolean {
  const lowered = text.toLowerCase()
  return SPAM_PATTERNS.some((p) => lowered.includes(p))
}

const SPAM_PATTERNS = [
  "http://",
  "https://",
  "www.",
  "[url=",
  "seo service",
  "casino",
  "viagra",
  "crypto",
  "bitcoin",
]

export async function submitLead(
  _prev: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const get = (key: string) => String(formData.get(key) ?? "").trim()

  // Honeypot: real users never see this field. Pretend success for bots.
  if (get("website")) {
    return { status: "submitted" }
  }
  // Rate limit by IP (x-forwarded-for, e.g. set by Vercel).
  const forwardedFor = (await headers())
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim()
  if (isRateLimited(forwardedFor || "unknown")) {
    return {
      status: "error",
      formError: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau.",
    }
  }

  const name = get("name")
  const email = get("email")
  const phone = get("phone")
  const service = get("service")
  const message = get("message")
  const consent = formData.get("consent") === "on"

  // Server-side validation — client validation is UX only.
  const fieldErrors: LeadFormState["fieldErrors"] = {}
  if (!name) {
    fieldErrors.name = "Vui lòng nhập họ và tên."
  } else if (name.length < 2) {
    fieldErrors.name = "Họ và tên phải có ít nhất 2 ký tự."
  } else if (name.length > 100) {
    fieldErrors.name = "Họ và tên không được vượt quá 100 ký tự."
  }
  if (!email) {
    fieldErrors.email = "Vui lòng nhập email."
  } else if (!isValidEmail(email)) {
    fieldErrors.email = "Email không hợp lệ."
  } else if (email.length > 254) {
    fieldErrors.email = "Email không được vượt quá 254 ký tự."
  }
  if (!phone) {
    fieldErrors.phone = "Vui lòng nhập số điện thoại."
  } else if (!isValidVietnamPhone(phone)) {
    fieldErrors.phone = "Số điện thoại không hợp lệ."
  }
  const selectedService = SERVICES.find((s) => s.value === service)
  if (!selectedService) {
    fieldErrors.service = "Vui lòng chọn dịch vụ bạn quan tâm."
  }
  if (message && message.length > 2000) {
    fieldErrors.message = "Tin nhắn không được vượt quá 2000 ký tự."
  }
  if (!consent) {
    fieldErrors.consent = "Vui lòng đồng ý với chính sách bảo mật."
  }

  if (Object.keys(fieldErrors).length > 0 || !selectedService) {
    return { status: "error", fieldErrors }
  }

  if (isSpamText(message) || isSpamText(name)) {
    // Silently discard spam-looking submissions.
    return { status: "submitted" }
  }

  // The client sends its retained pair; the server revalidates both and derives
  // the CRM source ID from the allowlisted channel. No client numeric ID is trusted.
  const attribution = resolveMisaAttribution(
    { staffCode: get("staff_code") },
    get("utm_source")
  )
  const staffCode = attribution.staffCode

  try {
    await submitMisaWebform(staffCode, {
      name,
      email,
      phone,
      service: selectedService.misaValue,
      description: message,
      sourceId: attribution.sourceId,
    })
    return { status: "submitted" }
  } catch (error) {
    console.error("[submitLead] MISA Webform forwarding failed:", error)
    return {
      status: "error",
      formError:
        "Không thể gửi yêu cầu lúc này. Vui lòng thử lại hoặc liên hệ trực tiếp qua hotline.",
    }
  }
}
