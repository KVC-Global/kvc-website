import "server-only"
import type { MisaStaffCode } from "@/lib/misa-attribution"

// Public Webform identifiers exported by MISA, not OpenAPI credentials.
const FORMS: Record<
  MisaStaffCode,
  { id: string; key: string; redirectUrl: string }
> = {
  NV00001: {
    id: "16ae5bf1-7c41-2cbe-b736-51ce30505c13",
    key: "OHTIhOcyahq/15/8+LOemjp2tO1Ep7jIkJOZVs7/vXk=",
    redirectUrl: "https://www.kvcglobal.vn/vi/lien-he?submitted=1",
  },
  NV00002: {
    id: "80f2d788-ce0d-e707-1c04-c6db235a1474",
    key: "DCgYyuwwk5jRdOWKc9WkC90glihMf2K4WgX1ywEB1zo=",
    redirectUrl: "https://www.kvcglobal.vn/vi/lien-he?submitted=1",
  },
  NV00004: {
    id: "44d478ed-6ba9-bfde-3442-4de2636993b1",
    key: "EV6gTr+nauO/hNMmA0l0fTKFsH7p2FY9qREfrFbwatc=",
    redirectUrl: "https://www.kvcglobal.vn/vi/lien-he?submitted=1",
  },
  NV00005: {
    id: "e78d1ea7-69f6-6e0a-c9e9-08daa4bf0e39",
    key: "nYjtPoRBDDTv89TxsWxvbkOy9GucWA4k6MCVkgt1VnQ=",
    redirectUrl: "https://kvcglobal.vn/vi/lien-he?submitted=1",
  },
  NV00007: {
    id: "02e46edf-ab2e-dac3-dedd-ba38b6dbc4f8",
    key: "cjG0DyrpZJqgMwsh+GryjesG3uwLxe43SAQUuEHLyII=",
    redirectUrl: "https://www.kvcglobal.vn/vi/lien-he?submitted=1",
  },
  NV00008: {
    id: "c10b9ddb-43d0-61a2-fe33-c1e05e464103",
    key: "HcZtYixqQhQF3X626EbZTvD31s9BB7PgxpFN3AI23rQ=",
    redirectUrl: "https://www.kvcglobal.vn/vi/lien-he?submitted=1",
  },
  NV00010: {
    id: "574a2b4c-2185-5dbe-acd3-3a10ce8751f4",
    key: "yNjThtC0zM9PI3TnTVupADNdlOPlIs+B2+0mjWn2c2k=",
    redirectUrl: "https://www.kvcglobal.vn/vi/lien-he?submitted=1",
  },
  NV00012: {
    id: "ea27228a-f600-9dee-aeb9-c6d9aa247740",
    key: "kjW3ExXGvQQa64zcPTjEdRvjBW540kW/CtaLn4nnfBg=",
    redirectUrl: "https://kvcglobal.vn/vi/lien-he?submitted=1",
  },
  NV00013: {
    id: "8a89adc1-9c28-6f0a-bafc-12231c00f134",
    key: "B/rixFhEdc0nl+QjVd1RC/xcf5v4WKFlHLo/XQE/I+8=",
    redirectUrl: "https://www.kvcglobal.vn/vi/lien-he?submitted=1",
  },
}

const SITE_ORIGIN = "https://www.kvcglobal.vn"
const COMPANY_CODE = "gli5ebv7jz6w"
const FORM_ENDPOINT =
  "https://amisapp.misa.vn/crm/gc/api/open/WebForm/savecollection"

export async function submitMisaWebform(
  staffCode: MisaStaffCode,
  lead: {
    name: string
    email: string
    phone: string
    service: string
    description: string
  }
): Promise<void> {
  const form = FORMS[staffCode]
  const response = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { Origin: SITE_ORIGIN, Referer: SITE_ORIGIN + "/" },
    body: new URLSearchParams({
      ID: form.id,
      Companycode: COMPANY_CODE,
      AllowURL: SITE_ORIGIN,
      FormKey: form.key,
      RedirectURL: form.redirectUrl,
      LastName: lead.name,
      Email: lead.email,
      Mobile: lead.phone,
      CustomField13: lead.service,
      Description: lead.description,
      privacyTool: "on",
    }),
    redirect: "manual",
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  })
  if (
    response.status !== 302 ||
    response.headers.get("location") !== form.redirectUrl
  ) {
    throw new Error("MISA Webform forwarding failed: HTTP " + response.status)
  }
  // MISA also redirects rejected submissions: this is forwarding, not a delivery receipt.
}
