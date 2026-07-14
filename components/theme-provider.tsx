"use client"

import * as React from "react"
import { useServerInsertedHTML } from "next/navigation"

type Theme = "light" | "dark" | "system"
type ResolvedTheme = "light" | "dark"

interface ThemeContextValue {
  theme: Theme
  resolvedTheme: ResolvedTheme
  systemTheme: ResolvedTheme
  setTheme: (theme: Theme | ((prev: Theme) => Theme)) => void
}

const DEFAULT_STORAGE_KEY = "theme"
const MEDIA_QUERY = "(prefers-color-scheme: dark)"

// IIFE injected into SSR stream. Runs before hydration, sets class on <html>.
// Mirrors next-themes' applyTheme so attribute="class" + dark/light swap works.
const THEME_INIT_SCRIPT = `(function(){try{var k=${JSON.stringify(DEFAULT_STORAGE_KEY)};var t=localStorage.getItem(k)||"system";var r=t==="system"?(window.matchMedia(${JSON.stringify(MEDIA_QUERY)}).matches?"dark":"light"):t;var d=document.documentElement;d.classList.remove("light","dark");d.classList.add(r);d.style.colorScheme=r;}catch(e){}})();`

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light"
  return window.matchMedia(MEDIA_QUERY).matches ? "dark" : "light"
}

function applyTheme(resolved: ResolvedTheme, disableTransition: boolean) {
  if (typeof document === "undefined") return
  const root = document.documentElement

  if (disableTransition) {
    const style = document.createElement("style")
    style.appendChild(
      document.createTextNode(
        "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}"
      )
    )
    document.head.appendChild(style)
    // force reflow so the no-transition rule takes effect
    window.getComputedStyle(document.body)
    setTimeout(() => document.head.removeChild(style), 1)
  }

  root.classList.remove("light", "dark")
  root.classList.add(resolved)
  root.style.colorScheme = resolved
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
)

function useTheme() {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return ctx
}

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  enableSystem?: boolean
  storageKey?: string
  attribute?: "class" | string
  disableTransitionOnChange?: boolean
}

function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem: _enableSystem = true,
  storageKey = DEFAULT_STORAGE_KEY,
  attribute: _attribute = "class",
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  // Inject FOUC-prevention script into SSR stream. Lives outside React's tree
  // (Next.js writes it into the HTML response), so React 19 never sees a
  // <script> element and skips the "Encountered a script tag" warning.
  useServerInsertedHTML(() => (
    <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
  ))

  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)
  const [systemTheme, setSystemTheme] = React.useState<ResolvedTheme>("light")
  const [resolvedTheme, setResolvedTheme] =
    React.useState<ResolvedTheme>("light")

  // Mount-time init: read storage, apply theme, wire system + cross-tab listeners.
  React.useEffect(() => {
    let stored: Theme
    try {
      const raw = localStorage.getItem(storageKey)
      stored = (raw as Theme | null) ?? defaultTheme
    } catch {
      stored = defaultTheme
    }

    const sys = getSystemTheme()
    const resolved: ResolvedTheme =
      stored === "system" ? sys : (stored as ResolvedTheme)

    setThemeState(stored)
    setSystemTheme(sys)
    setResolvedTheme(resolved)
    applyTheme(resolved, disableTransitionOnChange)

    const mq = window.matchMedia(MEDIA_QUERY)
    const onMqChange = (event: MediaQueryListEvent) => {
      const next: ResolvedTheme = event.matches ? "dark" : "light"
      setSystemTheme(next)
      setThemeState((current) => {
        if (current === "system") {
          setResolvedTheme(next)
          applyTheme(next, disableTransitionOnChange)
        }
        return current
      })
    }
    mq.addEventListener("change", onMqChange)

    const onStorage = (event: StorageEvent) => {
      if (event.key !== storageKey || !event.newValue) return
      const next = event.newValue as Theme
      const nextResolved: ResolvedTheme =
        next === "system" ? sys : (next as ResolvedTheme)
      setThemeState(next)
      setResolvedTheme(nextResolved)
      applyTheme(nextResolved, disableTransitionOnChange)
    }
    window.addEventListener("storage", onStorage)

    return () => {
      mq.removeEventListener("change", onMqChange)
      window.removeEventListener("storage", onStorage)
    }
  }, [storageKey, defaultTheme, disableTransitionOnChange])

  const setTheme = React.useCallback<ThemeContextValue["setTheme"]>(
    (next) => {
      setThemeState((prev) => {
        const resolved = typeof next === "function" ? next(prev) : next
        const sys = getSystemTheme()
        const nextResolved: ResolvedTheme =
          resolved === "system" ? sys : (resolved as ResolvedTheme)
        setResolvedTheme(nextResolved)
        try {
          localStorage.setItem(storageKey, resolved)
        } catch {
          // storage unavailable (private mode, quota); fail silently
        }
        applyTheme(nextResolved, disableTransitionOnChange)
        return resolved
      })
    },
    [storageKey, disableTransitionOnChange]
  )

  const value = React.useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, systemTheme, setTheme }),
    [theme, resolvedTheme, systemTheme, setTheme]
  )

  return (
    <ThemeContext.Provider value={value}>
      <ThemeHotkey />
      {children}
    </ThemeContext.Provider>
  )
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function ThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (event.key.toLowerCase() !== "d") {
        return
      }

      if (isTypingTarget(event.target)) {
        return
      }

      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [resolvedTheme, setTheme])

  return null
}

export { ThemeProvider, useTheme }
