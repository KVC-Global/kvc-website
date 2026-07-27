"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Check, Clock, GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { OnlineProgramPageData } from "@/sanity/service-pages";

const HERO_BG = "/images/study-abroad-hero.jpg";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

interface Props {
  data?: OnlineProgramPageData;
  defaultBreadcrumb?: string;
}

export function OnlineProgramPage({ data, defaultBreadcrumb }: Props) {
  const hero = data?.heroSection;
  const intro = data?.introSection;
  const why = data?.whySection;
  const format = data?.formatSection;
  const audience = data?.audienceSection;
  const benefits = data?.benefitsSection;
  const process = data?.processSection;
  const cta = data?.ctaSection;
  const programs = data?.programsSection;

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative w-full overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${HERO_BG})` }}>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-white from-50% to-transparent to-100%" />
        <Container className="relative flex min-h-[520px] flex-col justify-center pt-28 pb-16 sm:pt-32 sm:pb-20 md:min-h-[560px]">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 font-body text-xs font-medium text-muted-foreground md:text-sm">
            <Link href="/" className="transition-colors duration-200 hover:text-foreground">Trang chủ</Link>
            <span className="select-none text-muted-foreground/60">&gt;</span>
            <span className="font-semibold text-foreground/80" aria-current="page">
              {hero?.breadcrumb ?? defaultBreadcrumb ?? "Khóa Học Online"}
            </span>
          </nav>
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
            <motion.span variants={fadeUp} className="mb-3 inline-block font-heading text-xs font-bold tracking-wider text-brand-gold uppercase sm:text-sm">
              {hero?.tagline ?? ""}
            </motion.span>
            <motion.h1 variants={fadeUp} className="font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl md:text-5xl">
              {hero?.title ?? ""}
            </motion.h1>
            {hero?.subtitle && (
              <motion.p variants={fadeUp} className="mt-4 max-w-xl font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base">
                {hero.subtitle}
              </motion.p>
            )}
            <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link href={hero?.primaryButtonHref ?? "#"} className="group inline-flex items-center justify-center gap-2 rounded-sm bg-brand-blue-mid px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue hover:shadow-lg">
                {hero?.primaryButtonLabel ?? "Đăng ký tư vấn"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ===== INTRO ===== */}
      {intro && (
        <section className="w-full bg-white py-20 sm:py-24">
          <Container>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
              <motion.h2 variants={fadeUp} className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">{intro.title}</motion.h2>
              <span aria-hidden="true" className="mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
              {intro.paragraphs?.map((p, i) => (
                <motion.p key={i} variants={fadeUp} className="mt-4 max-w-3xl text-sm leading-relaxed text-brand-dark/80 sm:text-base">{p}</motion.p>
              ))}
              {intro.highlights?.length ? (
                <motion.ul variants={fadeUp} className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {intro.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" strokeWidth={2.5} /><span className="text-sm text-brand-dark/80 sm:text-base">{h}</span></li>
                  ))}
                </motion.ul>
              ) : null}
            </motion.div>
          </Container>
        </section>
      )}

      {/* ===== WHY ===== */}
      {why?.items?.length ? (
        <section className="w-full bg-muted py-20 sm:py-24">
          <Container>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="text-center">
              <motion.h2 variants={fadeUp} className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">{why.title}</motion.h2>
              <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {why.items.map((item) => (
                <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="rounded-lg border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/30 hover:shadow-md">
                  <h3 className="font-heading text-lg font-bold text-brand-blue">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-dark/80">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* ===== FORMAT ===== */}
      {format?.items?.length ? (
        <section className="w-full bg-white py-20 sm:py-24">
          <Container>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
              <motion.h2 variants={fadeUp} className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">{format.title}</motion.h2>
              <span aria-hidden="true" className="mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
              <motion.ul variants={stagger} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {format.items.map((item, i) => (
                  <motion.li key={i} variants={fadeUp} className="flex items-center gap-3 rounded-lg border border-border/60 p-4">
                    <Check className="h-5 w-5 shrink-0 text-brand-gold" strokeWidth={2.5} />
                    <span className="text-sm text-brand-dark/80">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </Container>
        </section>
      ) : null}

      {/* ===== AUDIENCE ===== */}
      {audience?.items?.length ? (
        <section className="w-full bg-muted py-20 sm:py-24">
          <Container>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
              <motion.h2 variants={fadeUp} className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">{audience.title}</motion.h2>
              <span aria-hidden="true" className="mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
              <motion.div variants={stagger} className="mt-8 flex flex-wrap gap-3">
                {audience.items.map((item, i) => (
                  <motion.span key={i} variants={fadeUp} className="inline-block rounded-full bg-brand-blue-mid/10 px-5 py-2.5 text-sm font-semibold text-brand-blue-mid">{item}</motion.span>
                ))}
              </motion.div>
            </motion.div>
          </Container>
        </section>
      ) : null}

      {/* ===== PROGRAMS ===== */}
      {programs?.items?.length ? (
        <section className="w-full bg-white py-20 sm:py-24">
          <Container>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="text-center">
              <motion.h2 variants={fadeUp} className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">{programs.title}</motion.h2>
              <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {programs.items.map((prog) => (
                <motion.div key={prog.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col rounded-lg border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                  <h3 className="font-heading text-lg font-bold text-brand-blue">{prog.name}</h3>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {prog.duration && <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-brand-gold" />{prog.duration}</span>}
                    {prog.startDates && <span className="flex items-center gap-1"><GraduationCap className="h-4 w-4 text-brand-gold" />{prog.startDates}</span>}
                  </div>
                  {prog.subjects?.length ? (
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">Môn học</p>
                      <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                        {prog.subjects.map((s) => (
                          <li key={s} className="flex items-start gap-2 text-sm text-brand-dark/80"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" strokeWidth={2} />{s}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {prog.entryRequirements && <p className="mt-4 text-xs text-muted-foreground"><strong>Điều kiện:</strong> {prog.entryRequirements}</p>}
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* ===== BENEFITS ===== */}
      {benefits?.items?.length ? (
        <section className="w-full bg-muted py-20 sm:py-24">
          <Container>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
              <motion.h2 variants={fadeUp} className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">{benefits.title}</motion.h2>
              <span aria-hidden="true" className="mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
              <motion.ul variants={stagger} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {benefits.items.map((item, i) => (
                  <motion.li key={i} variants={fadeUp} className="flex items-center gap-3 rounded-lg border border-border/60 bg-white p-4">
                    <Check className="h-5 w-5 shrink-0 text-brand-gold" strokeWidth={2.5} />
                    <span className="text-sm text-brand-dark/80">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </Container>
        </section>
      ) : null}

      {/* ===== PROCESS ===== */}
      {process?.steps?.length ? (
        <section className="w-full bg-white py-20 sm:py-24">
          <Container>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="text-center">
              <motion.h2 variants={fadeUp} className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">{process.title}</motion.h2>
              <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="relative mt-12">
              <div aria-hidden="true" className="pointer-events-none absolute left-8 top-0 hidden h-full w-0.5 bg-gradient-to-b from-brand-gold/40 via-brand-gold/20 to-transparent md:block" />
              <div className="flex flex-col gap-8 md:gap-10">
                {process.steps.map((s, idx) => (
                  <motion.div key={s.step ?? idx} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="relative flex items-center gap-4 md:gap-8 md:pl-20">
                    <div className="absolute left-0 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-brand-blue text-white shadow-lg md:flex">
                      <span className="font-heading text-base font-bold">{idx + 1}</span>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white md:hidden">
                      <span className="font-heading text-sm font-bold">{idx + 1}</span>
                    </div>
                    <span className="text-sm text-brand-dark/80 sm:text-base">{s.step}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* ===== CTA ===== */}
      {cta && (
        <section className="relative isolate w-full overflow-hidden">
          <div className="relative min-h-[320px] w-full sm:min-h-[380px]">
            <Image src={HERO_BG} alt="" fill sizes="100vw" className="object-cover object-center" />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-[#0A2540]/92 via-[#0A2540]/82 to-[#0A2540]/65" />
            <div className="relative mx-auto flex h-full min-h-[320px] w-full max-w-[1280px] flex-col justify-center px-6 py-16 sm:min-h-[380px]">
              <div className="max-w-2xl">
                <h2 className="font-display text-3xl font-bold leading-[1.1] text-white sm:text-4xl">{cta.title}</h2>
                {cta.body && <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{cta.body}</p>}
                <div className="mt-8">
                  <Link href={cta.buttonHref ?? "/lien-he"} className="group inline-flex items-center justify-center gap-2 rounded-sm bg-[#C8913C] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#b67f30] hover:shadow-lg">
                    {cta.buttonLabel ?? "Đăng ký tư vấn"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
