const MISA_API_BASE = "https://crmconnect.misa.vn/api/v2"

/**
 * Server-only MISA AMIS CRM Open API v2 client.
 * Used by app/actions/submit-lead.ts. Never import from client components.
 *
 * Flow (per docs: crmconnect.misa.vn/docs-v2):
 *   1. POST /Account with client_id + client_secret → JWT (~24h), cached below.
 *   2. POST /Contacts with Authorization: Bearer + Clientid headers.
 */

type MisaToken = {value: string; expiresAt: number}

let cachedToken: MisaToken | null = null
// JWT from their sample has `exp` ~24h out; refresh 1h early to be safe.
const TOKEN_REFRESH_MARGIN_MS = 60 * 60 * 1000

async function fetchToken(): Promise<string> {
  const clientId = process.env.MISA_CLIENT_ID
  const clientSecret = process.env.MISA_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    throw new Error("MISA_CLIENT_ID/MISA_CLIENT_SECRET not configured")
  }

  const res = await fetch(`${MISA_API_BASE}/Account`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({client_id: clientId, client_secret: clientSecret}),
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error(`MISA auth failed: HTTP ${res.status}`)
  }
  const body = (await res.json()) as {success?: boolean; data?: string}
  if (!body.success || !body.data) {
    throw new Error("MISA auth failed: no token in response")
  }

  // Decode JWT exp claim to know when to refresh.
  let expiresAt = Date.now() + 12 * 60 * 60 * 1000 // fallback: 12h
  try {
    const payload = JSON.parse(
      Buffer.from(body.data.split(".")[1], "base64").toString("utf8"),
    ) as {exp?: number}
    if (payload.exp) expiresAt = payload.exp * 1000
  } catch {
    // keep fallback
  }

  cachedToken = {value: body.data, expiresAt}
  return body.data
}

async function getToken(forceRefresh = false): Promise<string> {
  if (!forceRefresh && cachedToken && cachedToken.expiresAt > Date.now() + TOKEN_REFRESH_MARGIN_MS) {
    return cachedToken.value
  }
  return fetchToken()
}

export type MisaContactPayload = {
  contact_name: string
  email?: string
  mobile?: string
  description?: string
  lead_source?: string
  owner_name?: string
  contact_code?: string
}

type MisaResponse = {
  success?: boolean
  code?: number
  results?: Array<{
    success?: boolean
    data?: unknown
    validate_infos?: Array<{error_message?: string; field_name?: string}>
  }>
}

async function postContacts(
  token: string,
  contact: MisaContactPayload,
): Promise<MisaResponse> {
  const res = await fetch(`${MISA_API_BASE}/Contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Clientid: process.env.MISA_CLIENT_ID ?? "",
    },
    body: JSON.stringify([contact]), // API accepts a list
    cache: "no-store",
  })
  if (res.status === 401) return {code: 401}
  if (!res.ok) {
    throw new Error(`MISA Contacts failed: HTTP ${res.status}`)
  }
  return (await res.json()) as MisaResponse
}

/**
 * Create a contact in MISA CRM. Returns the created record's ID on success.
 * Throws on auth/config/network failure; caller decides how to log.
 */
export async function createMisaContact(
  contact: MisaContactPayload,
): Promise<unknown> {
  let token = await getToken()
  let response = await postContacts(token, contact)

  // Token expired mid-flight → refresh once and retry.
  if (response.code === 401) {
    token = await getToken(true)
    response = await postContacts(token, contact)
  }

  const result = response.results?.[0]
  if (!result?.success) {
    const details = result?.validate_infos
      ?.map((v) => `${v.field_name ?? "field"}: ${v.error_message ?? "unknown"}`)
      .join("; ")
    throw new Error(`MISA rejected contact: ${details ?? "no details"}`)
  }
  return result.data
}

export function isMisaConfigured(): boolean {
  return Boolean(process.env.MISA_CLIENT_ID && process.env.MISA_CLIENT_SECRET)
}
