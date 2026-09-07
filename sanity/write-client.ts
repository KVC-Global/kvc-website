import {createClient} from "@sanity/client"

/**
 * Server-only Sanity client with a write token.
 * Used by Server Actions to persist leads. Never import from client components.
 */
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "eh8b0fvx",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false, // writes must never go through the CDN
})
