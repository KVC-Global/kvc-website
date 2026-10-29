"use client"

import * as React from "react"
import { usePathname, useSearchParams } from "next/navigation"
import {
  resolveMisaAttribution,
  type MisaAttribution,
} from "@/lib/misa-attribution"

const STAFF_CODE_KEY = "kvc.misa-staff-code"
const UTM_SOURCE_KEY = "kvc.misa-utm-source"

const MisaAttributionContext = React.createContext<MisaAttribution | null>(null)

// Older sessions only stored the owner; a missing channel is a valid code-only
// representation, not a reason to drop the owner.
function readStoredAttribution() {
  try {
    return {
      staffCode: window.sessionStorage.getItem(STAFF_CODE_KEY),
      utmSource: window.sessionStorage.getItem(UTM_SOURCE_KEY),
    }
  } catch {
    return null
  }
}

function storeAttribution(attribution: MisaAttribution) {
  try {
    window.sessionStorage.setItem(STAFF_CODE_KEY, attribution.staffCode)
    window.sessionStorage.setItem(UTM_SOURCE_KEY, attribution.utmSource)
  } catch {
    // Storage blocked/full: in-memory attribution still works for this page.
  }
}

function AttributionCapture({
  onCapture,
}: {
  onCapture: (attribution: MisaAttribution) => void
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const utmSource = searchParams.get("utm_source")
  const current = React.useRef<MisaAttribution | null>(null)

  // Runs after mount/hydration, so server HTML always renders the null value.
  React.useEffect(() => {
    const previous = current.current ?? readStoredAttribution()
    const attribution = resolveMisaAttribution(previous, utmSource)
    current.current = attribution
    storeAttribution(attribution)
    onCapture(attribution)
  }, [pathname, utmSource, onCapture])

  return null
}

export function MisaAttributionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [attribution, setAttribution] = React.useState<MisaAttribution | null>(
    null
  )

  return (
    <MisaAttributionContext.Provider value={attribution}>
      {children}
      <React.Suspense fallback={null}>
        <AttributionCapture onCapture={setAttribution} />
      </React.Suspense>
    </MisaAttributionContext.Provider>
  )
}

export function useMisaAttribution(): MisaAttribution | null {
  return React.useContext(MisaAttributionContext)
}
