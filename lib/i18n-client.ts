"use client"

import { usePathname } from "next/navigation"
import vi from "@/messages/vi.json"
import en from "@/messages/en.json"

export const dictionaries = { vi, en } as const
export type Locale = "en" | "vi"

/**
 * Hook to retrieve the current locale in Client Components.
 * Inspects the pathname to determine if it starts with '/en'.
 */
export function useLocale(): Locale {
  const pathname = usePathname()
  return pathname?.startsWith("/en") ? "en" : "vi"
}

/**
 * Hook to retrieve the active dictionary in Client Components.
 */
export function useDictionary() {
  const locale = useLocale()
  return dictionaries[locale]
}
