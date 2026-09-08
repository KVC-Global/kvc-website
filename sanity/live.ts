import { defineLive } from "next-sanity/live"
import { client } from "./client"

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: "2026-07-18",
  }),
  serverToken: process.env.SANITY_API_READ_TOKEN,
  // Published live updates do not need a browser token. Keep draft access server-only.
  browserToken: false,
})
