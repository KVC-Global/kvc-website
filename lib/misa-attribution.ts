/**
 * Link-attributed MISA staff assignment.
 *
 * Only active CRM staff codes are accepted; anything else (missing, unknown,
 * disabled, MISA SUPPORT, tampered storage) resolves to the default owner.
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

function toActiveCode(value: string | null | undefined): MisaStaffCode | null {
  if (!value) return null
  return MISA_STAFF_CODES.find((code) => code === value) ?? null
}

// Convention: utm_source="<non-empty channel>/<active staff code>".
function fromUtmSource(value: string | null | undefined): MisaStaffCode | null {
  if (!value) return null
  const parts = value.split("/")
  if (parts.length !== 2 || !parts[0].trim()) return null
  return toActiveCode(parts[1])
}

/**
 * Latest valid link code wins; a missing or invalid code never overwrites a
 * previously valid one. Falls back to the default owner.
 */
export function resolveStaffCode(
  previous: string | null | undefined,
  utmSource: string | null | undefined
): MisaStaffCode {
  return (
    fromUtmSource(utmSource) ??
    toActiveCode(previous) ??
    DEFAULT_MISA_STAFF_CODE
  )
}
