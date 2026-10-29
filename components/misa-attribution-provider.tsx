"use client"

import * as React from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { resolveStaffCode, type MisaStaffCode } from "@/lib/misa-attribution"

const STORAGE_KEY = "kvc.misa-staff-code"

const MisaAttributionContext = React.createContext<MisaStaffCode | null>(null)

function readStoredCode(): string | null {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function storeCode(code: MisaStaffCode) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, code)
  } catch {
    // Storage blocked/full: in-memory attribution still works for this page.
  }
}

function AttributionCapture({
  onCapture,
}: {
  onCapture: (code: MisaStaffCode) => void
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const utmSource = searchParams.get("utm_source")
  const current = React.useRef<MisaStaffCode | null>(null)

  // Runs after mount/hydration, so server HTML always renders the null value.
  React.useEffect(() => {
    const previous = current.current ?? readStoredCode()
    const code = resolveStaffCode(previous, utmSource)
    current.current = code
    storeCode(code)
    onCapture(code)
  }, [pathname, utmSource, onCapture])

  return null
}

export function MisaAttributionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [staffCode, setStaffCode] = React.useState<MisaStaffCode | null>(null)

  return (
    <MisaAttributionContext.Provider value={staffCode}>
      {children}
      <React.Suspense fallback={null}>
        <AttributionCapture onCapture={setStaffCode} />
      </React.Suspense>
    </MisaAttributionContext.Provider>
  )
}

export function useMisaStaffCode(): MisaStaffCode | null {
  return React.useContext(MisaAttributionContext)
}
