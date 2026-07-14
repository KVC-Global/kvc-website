import Image from "next/image"
import Link from "next/link"

const ACCENT = "#f1d1a3"

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill={ACCENT} aria-hidden {...props}>
      <path d="M 27.425781 27.355469 L 22.742188 27.355469 L 22.742188 20.023438 C 22.742188 18.277344 22.710938 16.027344 20.308594 16.027344 C 17.90625 16.027344 17.496094 17.929688 17.496094 19.898438 L 17.496094 27.355469 L 12.816406 27.355469 L 12.816406 12.28125 L 17.308594 12.28125 L 17.308594 14.339844 L 17.371094 14.339844 C 18.289062 12.773438 19.992188 11.835938 21.808594 11.90625 C 26.550781 11.90625 27.425781 15.027344 27.425781 19.085938 Z M 7.535156 10.21875 C 6.035156 10.21875 4.820312 9.003906 4.816406 7.503906 C 4.816406 6 6.035156 4.785156 7.535156 4.785156 C 9.035156 4.785156 10.25 6 10.25 7.5 C 10.253906 9.003906 9.035156 10.21875 7.535156 10.21875 M 9.875 27.355469 L 5.191406 27.355469 L 5.191406 12.28125 L 9.875 12.28125 Z M 29.757812 0.4375 L 2.839844 0.4375 C 1.566406 0.425781 0.523438 1.445312 0.507812 2.71875 L 0.507812 29.75 C 0.523438 31.023438 1.566406 32.042969 2.839844 32.027344 L 29.761719 32.027344 C 31.035156 32.046875 32.082031 31.027344 32.101562 29.75 L 32.101562 2.714844 C 32.082031 1.4375 31.035156 0.421875 29.757812 0.4375" />
    </svg>
  )
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="52 0 33 32" fill={ACCENT} aria-hidden {...props}>
      <path d="M 84.785156 16.203125 C 84.785156 7.253906 77.535156 0 68.585938 0 C 59.640625 0 52.386719 7.253906 52.386719 16.203125 C 52.386719 23.796875 57.617188 30.175781 64.671875 31.925781 L 64.671875 21.152344 L 61.332031 21.152344 L 61.332031 16.203125 L 64.671875 16.203125 L 64.671875 14.066406 C 64.671875 8.554688 67.167969 6 72.582031 6 C 73.609375 6 75.378906 6.199219 76.101562 6.402344 L 76.101562 10.886719 C 75.71875 10.847656 75.054688 10.828125 74.230469 10.828125 C 71.574219 10.828125 70.546875 11.832031 70.546875 14.449219 L 70.546875 16.199219 L 75.839844 16.199219 L 74.929688 21.152344 L 70.546875 21.152344 L 70.546875 32.28125 C 78.570312 31.3125 84.785156 24.480469 84.785156 16.199219 Z M 84.785156 16.203125" />
    </svg>
  )
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="104 0 33 33" fill={ACCENT} aria-hidden {...props}>
      <path d="M 121.023438 0.515625 C 112.132812 0.515625 104.882812 7.765625 104.882812 16.65625 C 104.882812 25.542969 112.132812 32.792969 121.023438 32.792969 C 129.910156 32.792969 137.164062 25.542969 137.164062 16.65625 C 137.164062 7.765625 129.910156 0.515625 121.023438 0.515625 Z M 112.78125 10.363281 L 129.265625 10.363281 C 129.398438 10.363281 129.527344 10.378906 129.652344 10.410156 L 121.300781 17.34375 C 121.21875 17.410156 121.121094 17.445312 121.023438 17.445312 C 120.921875 17.445312 120.824219 17.410156 120.742188 17.34375 L 112.394531 10.410156 C 112.515625 10.378906 112.644531 10.363281 112.78125 10.363281 Z M 111.261719 21.429688 L 111.261719 11.878906 C 111.261719 11.660156 111.308594 11.453125 111.390625 11.265625 L 117.757812 16.550781 L 111.371094 22 C 111.300781 21.824219 111.261719 21.628906 111.261719 21.429688 Z M 129.265625 22.949219 L 112.78125 22.949219 C 112.625 22.949219 112.476562 22.925781 112.339844 22.882812 L 118.773438 17.390625 L 119.914062 18.339844 C 120.242188 18.609375 120.632812 18.746094 121.023438 18.746094 C 121.414062 18.746094 121.804688 18.609375 122.128906 18.339844 L 123.273438 17.390625 L 129.707031 22.882812 C 129.566406 22.925781 129.417969 22.949219 129.265625 22.949219 Z M 130.785156 21.429688 C 130.785156 21.628906 130.742188 21.824219 130.671875 22 L 124.285156 16.550781 L 130.652344 11.265625 C 130.738281 11.453125 130.785156 11.660156 130.785156 11.878906 Z M 130.785156 21.429688" />
    </svg>
  )
}

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/company/kvcglobal/",
    label: "LinkedIn",
    Icon: LinkedinIcon,
  },
  {
    href: "https://www.facebook.com/kvcglobal.vn/",
    label: "Facebook",
    Icon: FacebookIcon,
  },
  {
    href: "mailto:info@kvcglobal.vn",
    label: "Email",
    Icon: MailIcon,
  },
] as const

export default function ComingSoonPage() {
  return (
    <main className="relative isolate min-h-svh w-full overflow-x-hidden bg-black md:h-svh md:overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/coming-soon-bg.png"
        alt=""
        role="presentation"
        fill
        priority
        sizes="100vw"
        className="scale-x-[-1] bg-[left_-20px_center] bg-no-repeat object-cover object-[position:15%_center] opacity-80"
      />
      {/* Dark overlay improves text contrast over the background image */}
      <div aria-hidden className="absolute inset-0 z-0 bg-black/55" />

      {/* Chroma-key filter — drops the green background of the 3D gif. */}
      <svg
        aria-hidden
        focusable="false"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden"
      >
        <defs>
          <filter id="chroma-key-green" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      1 0 1 0 0"
            />
          </filter>
        </defs>
      </svg>

      <div className="relative z-10 mx-auto grid min-h-svh w-full grid-cols-1 gap-y-8 px-6 py-6 sm:px-10 sm:py-8 md:h-svh md:grid-cols-2 md:items-stretch md:gap-x-8 md:px-12 md:py-15 md:pl-25 lg:gap-x-12 lg:py-10 lg:pl-28 xl:px-16 xl:pl-30 2xl:px-20 2xl:pl-35">
        {/* LEFT COLUMN — Logo, Title, Contact Us, Get Social */}
        <div className="contents md:flex md:flex-col">
          {/* Logo: icon + wordmark, aligned together */}
          <div className="order-1 mt-10 flex items-center gap-3 sm:gap-4 2xl:mt-14">
            <Image
              src="/images/new-log.svg"
              alt="KVC Global"
              width={240}
              height={80}
              priority
              className="h-10 w-auto shrink-0 object-contain sm:h-12 md:h-12 lg:h-14"
            />
          </div>

          {/* Title — left-padded to align with "KVC Global" wordmark */}
          <h1 className="order-2 mt-5 font-display text-[2.5rem] leading-[0.95] font-bold tracking-tight text-white uppercase sm:text-5xl md:mt-6 md:text-[2.75rem] md:leading-[0.95] lg:mt-18 lg:text-[3.25rem] xl:text-[4rem] 2xl:text-[6rem]">
            <span className="whitespace-nowrap">We&apos;re Building</span>
            <br />
            Something
            <br />
            <span style={{ color: ACCENT }}>Greater.</span>
          </h1>

          {/* Bottom of left col: Contact Us + Get Social, aligned with right col */}
          <div className="order-7 mt-auto flex min-h-[12rem] flex-col justify-between gap-6 pt-4 pb-4 md:min-h-[18rem] md:gap-10 md:pt-6 md:pb-10">
            <Link
              href="mailto:info@kvcglobal.vn"
              className="inline-flex w-fit items-center justify-center border-2 px-10 py-3 text-sm font-bold tracking-wider text-white uppercase transition-opacity hover:opacity-80 sm:text-base"
              style={{ borderColor: ACCENT }}
            >
              Contact Us
            </Link>

            <div className="flex w-full max-w-xl items-center gap-2 whitespace-nowrap sm:gap-4">
              <h2 className="shrink-0 text-xl font-bold tracking-wider text-white uppercase md:text-3xl">
                Get Social
              </h2>
              <span
                className="h-px w-4 shrink sm:w-20"
                style={{ backgroundColor: "white" }}
                aria-hidden
              />
              <ul className="flex shrink-0 items-center gap-1.5 sm:gap-3">
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      aria-label={label}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="inline-flex h-8 w-8 items-center justify-center transition-opacity hover:opacity-80 sm:h-12 sm:w-12"
                    >
                      <Icon className="h-6 w-6 sm:h-9 sm:w-9" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — 3D GIF, Description, Stay tuned */}
        <div className="contents md:flex md:flex-col">
          <div className="order-3 flex w-full items-center justify-end pl-8">
            <Image
              src="/coming-soon-3d.gif"
              alt="Coming soon"
              width={1920}
              height={1080}
              unoptimized
              style={{ filter: "url(#chroma-key-green)" }}
              className="h-56 w-auto max-w-full shrink-0 object-contain sm:h-64 md:h-72 lg:h-80 xl:h-[24rem] 2xl:h-[30rem]"
            />
          </div>

          {/* Bottom of right col: Description + Stay tuned, aligned with left col */}
          <div className="order-4 mt-auto flex min-h-[12rem] flex-col items-start justify-between gap-6 pt-4 pb-4 text-left md:min-h-[18rem] md:gap-10 md:pt-6 md:pb-10 lg:ml-12 2xl:ml-30">
            <p className="max-w-[500px] font-body text-lg leading-relaxed break-words text-white sm:text-xl lg:text-xl xl:text-2xl">
              Our website is coming soon.{" "}
              <span className="whitespace-nowrap">KVC Global,</span>
              <br />
              continues to guide your journey to study, work and grow in
              Singapore.
            </p>

            <p className="font-body text-2xl font-medium text-white sm:text-3xl">
              Stay tuned.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
