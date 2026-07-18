import { createClient } from "next-sanity"

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "eh8b0fvx",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-07-18",
  useCdn: true, // Use CDN for client-side fetches; defineLive will configure server-side fetches.
})
