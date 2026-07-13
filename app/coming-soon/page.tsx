import Link from "next/link"

const ACCENT = "#f1d1a3"

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  )
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
      <path d="M2.5 7.25L12 13.5L21.5 7.25" />
    </svg>
  )
}

export default function ComingSoonPage() {
  return (
    <main className="relative isolate min-h-svh w-full overflow-hidden bg-black">
      <video
        src="/Our New Website is Coming Soon (1).mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 z-10 flex flex-col p-6 sm:p-10">
        <div className="flex-[4_1_0]" aria-hidden />

        <div>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center border-2 px-6 py-2.5 text-sm font-bold tracking-wider text-white uppercase transition-opacity hover:opacity-80 sm:text-base"
            style={{ borderColor: ACCENT }}
          >
            Contact Us
          </Link>
        </div>

        <div className="flex-1" aria-hidden />

        <div className="flex w-full max-w-2xl items-center gap-4">
          <h2
            className="text-2xl font-bold tracking-wider uppercase sm:text-3xl"
            style={{ color: "white" }}
          >
            Get Social
          </h2>
          <span
            className="h-px flex-1"
            style={{ backgroundColor: "white" }}
            aria-hidden
          />
          <ul className="flex items-center gap-3">
            {[
              { href: "#linkedin", label: "LinkedIn", Icon: LinkedinIcon },
              { href: "#facebook", label: "Facebook", Icon: FacebookIcon },
              {
                href: "mailto:hello@example.com",
                label: "Email",
                Icon: MailIcon,
              },
            ].map(({ href, label, Icon }) => (
              <li key={label}>
                {label === "Email" ? (
                  <a
                    href={href}
                    aria-label={label}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: ACCENT, color: "#000" }}
                  >
                    <Icon className="h-8 w-8" aria-hidden />
                  </a>
                ) : (
                  <Icon className="h-12 w-12" aria-hidden fill="#f1d1a3" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
