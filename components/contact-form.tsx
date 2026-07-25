"use client"

import * as React from "react"
import { CheckCircle2, Send } from "lucide-react"

const SERVICES = [
  { value: "", label: "Chọn dịch vụ bạn quan tâm *" },
  { value: "du-hoc", label: "Du học Singapore" },
  { value: "khoa-hoc-online", label: "Khóa học Online Quốc tế" },
  { value: "work-pass", label: "Training Employment Pass (TEP)" },
  { value: "dinh-cu", label: "Định cư & Doanh nghiệp Singapore" },
  { value: "khac", label: "Khác" },
] as const

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-body text-sm font-medium text-brand-dark"
      >
        {label}
        {required && (
          <span className="ml-0.5 text-destructive" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
    </div>
  )
}

const inputBase =
  "w-full rounded-sm border border-input bg-white px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"

export function ContactForm() {
  const [state, setState] = React.useState<"idle" | "submitted">("idle")
  const formRef = React.useRef<HTMLFormElement>(null)

  function buildMailto(form: HTMLFormElement): string {
    const data = new FormData(form)
    const name = (data.get("name") as string).trim()
    const email = (data.get("email") as string).trim()
    const phone = (data.get("phone") as string).trim()
    const serviceValue = (data.get("service") as string) || "khac"
    const service =
      SERVICES.find((item) => item.value === serviceValue)?.label ?? "Khác"
    const message = (data.get("message") as string).trim()

    const subject = encodeURIComponent(
      `[Liên hệ KVC Global] ${name} - ${service}`
    )
    const body = encodeURIComponent(
      [
        `Họ và tên: ${name}`,
        `Email: ${email}`,
        `Số điện thoại: ${phone}`,
        `Dịch vụ quan tâm: ${service}`,
        ``,
        `Tin nhắn:`,
        `${message}`,
      ].join("\n")
    )

    return `mailto:info@kvcglobal.vn?subject=${subject}&body=${body}`
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const mailtoHref = buildMailto(form)
    window.location.href = mailtoHref
    setState("submitted")
  }

  if (state === "submitted") {
    return (
      <div className="flex flex-col items-center justify-center rounded-sm border border-border bg-white px-6 py-14 text-center shadow-sm">
        <CheckCircle2 className="h-12 w-12 text-brand-gold" strokeWidth={1.5} />
        <h3 className="mt-4 font-heading text-xl font-bold text-brand-blue">
          Mở ứng dụng email...
        </h3>
        <p className="mt-2 max-w-sm font-body text-sm text-brand-dark/70">
          Trình khách email mặc định sẽ mở ra với thông tin đã điền sẵn. Vui
          lòng kiểm tra và gửi tin nhắn cho chúng tôi.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-6 inline-flex items-center gap-2 rounded-sm bg-brand-blue-mid px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue-mid/90 hover:shadow-lg"
        >
          Gửi lại
        </button>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
    >
      <Field id="contact-name" label="Họ và tên" required>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          placeholder="Nguyễn Văn A"
          className={inputBase}
        />
      </Field>

      <Field id="contact-email" label="Email" required>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          placeholder="email@example.com"
          className={inputBase}
        />
      </Field>

      <Field id="contact-phone" label="Số điện thoại" required>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          required
          placeholder="+84 123 456 789"
          className={inputBase}
        />
      </Field>

      <Field id="contact-service" label="Dịch vụ quan tâm" required>
        <select
          id="contact-service"
          name="service"
          required
          defaultValue=""
          className={inputBase + " appearance-none"}
        >
          {SERVICES.map((svc) => (
            <option
              key={svc.value}
              value={svc.value}
              disabled={svc.value === ""}
            >
              {svc.label}
            </option>
          ))}
        </select>
      </Field>

      <Field id="contact-message" label="Tin nhắn">
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Nội dung bạn muốn tư vấn..."
          className={inputBase + " resize-y"}
        />
      </Field>

      {/* Consent */}
      <div className="flex items-start gap-3 pt-1">
        <input
          id="contact-consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 rounded-sm border-border text-brand-blue focus:ring-brand-blue/30"
        />
        <label
          htmlFor="contact-consent"
          className="font-body text-xs leading-relaxed text-muted-foreground"
        >
          Tôi đồng ý với{" "}
          <a
            href="/chinh-sach-bao-mat"
            className="text-brand-blue underline underline-offset-2 transition-colors hover:text-brand-gold"
          >
            Chính sách bảo mật
          </a>{" "}
          và cho phép KVC Global liên hệ lại qua thông tin đã cung cấp.{" "}
          <span className="text-destructive">*</span>
        </label>
      </div>

      <button
        type="submit"
        className="group inline-flex w-full items-center justify-center gap-2 rounded-sm bg-brand-blue-mid px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue-mid/90 hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-mid"
      >
        <Send className="h-4 w-4" strokeWidth={2} />
        Gửi yêu cầu tư vấn
      </button>

      <p className="text-center font-body text-xs text-muted-foreground">
        Biểu mẫu sẽ mở ứng dụng email với nội dung đã điền sẵn. Sau khi bạn gửi,
        chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.
      </p>
    </form>
  )
}
