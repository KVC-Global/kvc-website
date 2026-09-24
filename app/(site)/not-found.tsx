import Link from "next/link"

import { getDictionaryServer, getLocale } from "@/lib/i18n-server"
import { localizedHref } from "@/lib/site-settings"
import { Container } from "@/components/ui/container"

export default async function NotFound() {
  const t = await getDictionaryServer()
  const locale = await getLocale()

  return (
    <section className="w-full bg-white pb-24 pt-28 sm:pb-32 sm:pt-32 md:pt-36">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <span className="font-heading text-sm font-bold tracking-wider text-brand-gold uppercase">
            404
          </span>
          <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl">
            {t.notFound.title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-brand-dark/80 sm:text-base">
            {t.notFound.description}
          </p>
          <Link
            href={localizedHref("/", locale)}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-sm bg-brand-blue-mid px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue hover:shadow-lg"
          >
            {t.notFound.cta}
          </Link>
        </div>
      </Container>
    </section>
  )
}
