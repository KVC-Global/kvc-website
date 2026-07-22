import "server-only"
import { headers } from "next/headers"
import vi from "@/messages/vi.json"
import en from "@/messages/en.json"

export const dictionaries = { vi, en } as const
export type Locale = "en" | "vi"

/**
 * Returns the current locale on the server side (read from the `x-locale` request header).
 * Note: Since headers() is dynamic, this makes the server component dynamic.
 */
export async function getLocale(): Promise<Locale> {
  const reqHeaders = await headers()
  const locale = reqHeaders.get("x-locale")
  return locale === "en" ? "en" : "vi"
}

/**
 * Returns the dictionary on the server side based on the current request locale.
 */
export async function getDictionaryServer() {
  const locale = await getLocale()
  return dictionaries[locale]
}
