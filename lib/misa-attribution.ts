/**
 * Link-attributed MISA staff assignment.
 *
 * Only active CRM staff codes are accepted; anything else (missing, unknown,
 * disabled, MISA SUPPORT, tampered storage) resolves to the default owner.
 * A channel and its owner are resolved as one pair, so a malformed referral can
 * never combine one staff member with another's stored channel.
 */

export const MISA_STAFF_CODES = [
  "NV00001",
  "NV00002",
  "NV00004",
  "NV00005",
  "NV00007",
  "NV00008",
  "NV00010",
  "NV00012",
  "NV00013",
] as const

export type MisaStaffCode = (typeof MISA_STAFF_CODES)[number]

export const DEFAULT_MISA_STAFF_CODE: MisaStaffCode = "NV00005"

export type MisaAttribution = {
  staffCode: MisaStaffCode
  utmSource: string
  sourceId: string | null
}

// Verified CRM LeadSourceID per channel, keyed by lowercase channel.
const SOURCE_IDS: Record<string, string> = {
  zalo: "8",
  facebook: "9",
  instagram: "10",
  telegram: "11",
  x: "12",
  tiktok: "13",
}

function toActiveCode(value: string | null | undefined): MisaStaffCode | null {
  if (!value) return null
  return MISA_STAFF_CODES.find((code) => code === value) ?? null
}

// Convention: utm_source="<nonempty channel>/<active staff code>".
function parseReferral(
  value: string | null | undefined
): MisaAttribution | null {
  if (!value) return null
  const parts = value.split("/")
  if (parts.length !== 2) return null
  const channel = parts[0].trim()
  if (!channel) return null
  const staffCode = toActiveCode(parts[1])
  if (!staffCode) return null
  const key = channel.toLowerCase()
  return {
    staffCode,
    utmSource: value,
    sourceId: Object.hasOwn(SOURCE_IDS, key) ? SOURCE_IDS[key] : null,
  }
}

/**
 * Latest valid referral replaces both the owner and the raw channel. A missing
 * or invalid referral keeps a coherent previous pair; an incoherent stored
 * pair keeps the revalidated owner but drops the channel. Falls back to the
 * default owner without inventing a channel.
 */
export function resolveMisaAttribution(
  previous:
    { staffCode?: string | null; utmSource?: string | null } | null | undefined,
  utmSource: string | null | undefined
): MisaAttribution {
  const current = parseReferral(utmSource)
  if (current) return current

  const previousStaffCode = toActiveCode(previous?.staffCode)
  const stored = parseReferral(previous?.utmSource)
  if (previousStaffCode && stored && stored.staffCode === previousStaffCode) {
    return stored
  }

  return {
    staffCode: previousStaffCode ?? DEFAULT_MISA_STAFF_CODE,
    utmSource: "",
    sourceId: null,
  }
}
