"use client"

import * as React from "react"
import { ChevronDown, Globe } from "lucide-react"

import { cn } from "@/lib/utils"

const LANGUAGES = [
  { code: "VI", label: "Tiếng Việt", flag: "vn" },
  { code: "EN", label: "English", flag: "gb" },
] as const

function FlagIcon({ code }: { code: (typeof LANGUAGES)[number]["flag"] }) {
  if (code === "vn") {
    return (
      <svg
        viewBox="0 0 24 16"
        aria-hidden="true"
        className="h-3.5 w-5 overflow-hidden rounded-[1px]"
      >
        <rect width="24" height="16" fill="#DA251D" />
        <path
          d="M12 3.2 13.42 7.04 17.5 7.04 14.18 9.36 15.5 13.2 12 10.88 8.5 13.2 9.82 9.36 6.5 7.04 10.58 7.04 Z"
          fill="#FFFF00"
        />
      </svg>
    )
  }
  return (
    <svg
      viewBox="0 0 24 16"
      aria-hidden="true"
      className="h-3.5 w-5 overflow-hidden rounded-[1px]"
    >
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#fff" strokeWidth="2.4" />
      <path
        d="M0 0 L24 16 M24 0 L0 16"
        stroke="#C8102E"
        strokeWidth="1.2"
        strokeDasharray="0 12 12 0"
      />
      <path d="M12 0 V16 M0 8 H24" stroke="#fff" strokeWidth="3.6" />
      <path d="M12 0 V16 M0 8 H24" stroke="#C8102E" strokeWidth="2" />
    </svg>
  )
}

export function SiteHeaderActions() {
  const [open, setOpen] = React.useState(false)
  const [current, setCurrent] = React.useState<(typeof LANGUAGES)[number]>(
    LANGUAGES[0]
  )
  const ref = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!open) {
      return
    }
    const onClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div className="flex items-center gap-7">
      <div ref={ref} className="relative hidden md:block">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <FlagIcon code={current.flag} />
          <span className="font-semibold">{current.code}</span>
          <ChevronDown
            className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          />
        </button>

        {open ? (
          <ul
            role="listbox"
            className="absolute top-full right-0 z-50 mt-2 w-44 overflow-hidden rounded-md border border-border bg-white py-1 shadow-lg"
          >
            {LANGUAGES.map((lang) => {
              const selected = lang.code === current.code
              return (
                <li key={lang.code} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrent(lang)
                      setOpen(false)
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-muted",
                      selected && "font-semibold text-foreground"
                    )}
                  >
                    <FlagIcon code={lang.flag} />
                    <span>{lang.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        ) : null}
      </div>

      <a
        href="#tu-van"
        className="hidden items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-body text-[15px] font-semibold whitespace-nowrap text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:inline-flex"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        Tư vấn miễn phí
      </a>

      <button
        type="button"
        aria-label="Chọn ngôn ngữ"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-muted md:hidden"
        onClick={() => setOpen((value) => !value)}
      >
        <Globe className="h-5 w-5" />
      </button>
    </div>
  )
}
