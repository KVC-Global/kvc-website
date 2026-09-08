"use client"

import * as React from "react"
import {CheckCircle2, Loader2, Send} from "lucide-react"
import {sendGAEvent} from "@next/third-parties/google"
import {submitLead} from "@/app/actions/submit-lead"
import {initialLeadFormState} from "@/lib/lead-form-state"
import type {ContactPageData} from "@/sanity/content-pages"

const SERVICES = [
  {value: "", label: "Chọn dịch vụ bạn quan tâm *"},
  {value: "du-hoc", label: "Du học Singapore"},
  {value: "khoa-hoc-online", label: "Khóa học Online Quốc tế"},
  {value: "work-pass", label: "Training Employment Pass (TEP)"},
  {value: "dinh-cu", label: "Định cư & Doanh nghiệp Singapore"},
  {value: "khac", label: "Khác"},
] as const

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
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
      {error && (
        <p id={`${id}-error`} className="font-body text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

const inputBase =
  "w-full rounded-sm border border-input bg-white px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 aria-[invalid=true]:border-destructive"

function SubmitButton({pending}: {pending: boolean}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex w-full items-center justify-center gap-2 rounded-sm bg-brand-blue-mid px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue-mid/90 hover:shadow-lg focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue-mid disabled:pointer-events-none disabled:opacity-60"
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
      ) : (
        <Send className="h-4 w-4" strokeWidth={2} />
      )}
      {pending ? "Đang gửi..." : "Gửi yêu cầu tư vấn"}
    </button>
  )
}

export function ContactForm({
  content,
}: {
  content?: ContactPageData["form"]
}) {
  const services = content?.serviceOptions?.length ? content.serviceOptions : SERVICES
  const [state, formAction, pending] = React.useActionState(
    submitLead,
    initialLeadFormState,
  )

  // Lead source captured at submit time (client-only data, no state needed).
  const handleAction = (formData: FormData) => {
    const utmParams = new URLSearchParams(window.location.search)
    formData.set("utm_source", utmParams.get("utm_source") ?? "")
    formData.set("utm_medium", utmParams.get("utm_medium") ?? "")
    formData.set("utm_campaign", utmParams.get("utm_campaign") ?? "")
    formData.set(
      "referrer",
      document.referrer ? new URL(document.referrer).hostname : "",
    )
    return formAction(formData)
  }
  React.useEffect(() => {
    if (state.status === "success") {
      sendGAEvent("event", "generate_lead", {
        form: "lien-he",
        page_path: window.location.pathname,
      })
    }
  }, [state.status])

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center justify-center rounded-sm border border-border bg-white px-6 py-14 text-center shadow-sm"
      >
        <CheckCircle2 className="h-12 w-12 text-brand-gold" strokeWidth={1.5} />
        <h3 className="mt-4 font-heading text-xl font-bold text-brand-blue">
          Yêu cầu đã được gửi!
        </h3>
        <p className="mt-2 max-w-sm font-body text-sm text-brand-dark/70">
          Cảm ơn bạn đã liên hệ KVC Global. Chúng tôi sẽ phản hồi trong vòng 24
          giờ làm việc.
        </p>
        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") window.location.reload()
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-sm bg-brand-blue-mid px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue-mid/90 hover:shadow-lg"
        >
          Gửi yêu cầu khác
        </button>
      </div>
    )
  }

  const errors = state.status === "error" ? state.fieldErrors : undefined

  return (
    <form action={handleAction} className="space-y-5" noValidate>
      {/* Honeypot — hidden from users, filled by bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Field
        id="contact-name"
        label={content?.nameLabel || "Họ và tên"}
        required
        error={errors?.name}
      >
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={100}
          autoComplete="name"
          placeholder="Nguyễn Văn A"
          aria-invalid={errors?.name ? true : undefined}
          aria-describedby={errors?.name ? "contact-name-error" : undefined}
          className={inputBase}
        />
      </Field>

      <Field
        id="contact-email"
        label={content?.emailLabel || "Email"}
        required
        error={errors?.email}
      >
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder="email@example.com"
          aria-invalid={errors?.email ? true : undefined}
          aria-describedby={errors?.email ? "contact-email-error" : undefined}
          className={inputBase}
        />
      </Field>

      <Field
        id="contact-phone"
        label={content?.phoneLabel || "Số điện thoại"}
        required
        error={errors?.phone}
      >
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          required
          minLength={9}
          maxLength={15}
          autoComplete="tel"
          placeholder="+84 123 456 789"
          aria-invalid={errors?.phone ? true : undefined}
          aria-describedby={errors?.phone ? "contact-phone-error" : undefined}
          className={inputBase}
        />
      </Field>

      <Field
        id="contact-service"
        label={content?.serviceLabel || "Dịch vụ quan tâm"}
        required
        error={errors?.service}
      >
        <select
          id="contact-service"
          name="service"
          required
          defaultValue=""
          aria-invalid={errors?.service ? true : undefined}
          aria-describedby={errors?.service ? "contact-service-error" : undefined}
          className={inputBase + " appearance-none"}
        >
          {services.map((svc) => (
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

      <Field
        id="contact-message"
        label={content?.messageLabel || "Tin nhắn"}
        error={errors?.message}
      >
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="Nội dung bạn muốn tư vấn..."
          aria-invalid={errors?.message ? true : undefined}
          aria-describedby={errors?.message ? "contact-message-error" : undefined}
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
          aria-invalid={errors?.consent ? true : undefined}
          aria-describedby={errors?.consent ? "contact-consent-error" : undefined}
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
      {errors?.consent && (
        <p id="contact-consent-error" className="font-body text-xs text-destructive">
          {errors.consent}
        </p>
      )}

      {state.status === "error" && state.formError && (
        <p role="alert" className="font-body text-sm text-destructive">
          {state.formError}
        </p>
      )}

      <SubmitButton pending={pending} />

      <p className="text-center font-body text-xs text-muted-foreground">
        Sau khi bạn gửi, chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.
      </p>
    </form>
  )
}
