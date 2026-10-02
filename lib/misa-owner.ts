/**
 * Maps a staff code from a UTM link to the exact owner_name string MISA expects
 * (e.g. "NV01" → "Nguyễn Văn A (NV000001)").
 *
 * Configured via env because the Sanity studio schema lives outside this repo.
 * Update the Vercel/env config when staff join/leave — no redeploy needed.
 *
 * Format (JSON array), in MISA_STAFF_MAP:
 *   [{"code":"NV01","owner":"Nguyễn Văn A (NV000001)"},{"code":"NV02","owner":"Trần Thị B (NV000002)"}]
 *
 * MISA_DEFAULT_OWNER: fallback owner_name when the staff code is missing or
 * unknown (direct visit, staff left, typo). Optional — when unset the contact
 * is created without an owner.
 */

type StaffEntry = {code: string; owner: string}

let staffMap: Map<string, string> | null = null

function loadStaffMap(): Map<string, string> {
  if (staffMap) return staffMap
  staffMap = new Map()
  const raw = process.env.MISA_STAFF_MAP
  if (!raw) return staffMap
  try {
    const entries = JSON.parse(raw) as StaffEntry[]
    for (const entry of entries) {
      if (entry.code && entry.owner) staffMap.set(entry.code, entry.owner)
    }
  } catch (error) {
    console.error("[misa-owner] MISA_STAFF_MAP is not valid JSON:", error)
  }
  return staffMap
}

/**
 * Resolve the MISA owner_name for a staff code.
 * Unknown/missing code → MISA_DEFAULT_OWNER (may be undefined → no owner).
 */
export function resolveMisaOwner(staffCode: string): string | undefined {
  if (!staffCode) return process.env.MISA_DEFAULT_OWNER || undefined
  const owner = loadStaffMap().get(staffCode)
  if (!owner) {
    console.warn(`[misa-owner] unknown staff code "${staffCode}", falling back to default owner`)
    return process.env.MISA_DEFAULT_OWNER || undefined
  }
  return owner
}
