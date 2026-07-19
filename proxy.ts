import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  // Exclude static assets, API, and Next.js internal files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // Check prefix
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/")
  const isVietnamese = pathname === "/vi" || pathname.startsWith("/vi/")

  const requestHeaders = new Headers(request.headers)

  if (isEnglish || isVietnamese) {
    const locale = isEnglish ? "en" : "vi"
    // Target pathname is the path without prefix (e.g., /en/du-hoc -> /du-hoc)
    const targetPath = pathname === `/${locale}` ? "/" : pathname.slice(3)
    
    const url = request.nextUrl.clone()
    url.pathname = targetPath
    url.searchParams.set("lang", locale)

    requestHeaders.set("x-locale", locale)

    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    })
  }

  // Redirect un-prefixed URLs to the default /vi prefix
  const redirectUrl = new URL(`/vi${pathname}${search}`, request.url)
  return NextResponse.redirect(redirectUrl)
}

export const config = {
  matcher: [
    // Run proxy on all paths except internal and api routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
