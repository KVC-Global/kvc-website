"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { Check, GraduationCap, Clock, Globe, Star, Users, ArrowRight, Calendar, ListChecks, UserCheck, Building2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const HERO_BG = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80&auto=format&fit=crop"

const WHY_ITEMS = [
  { icon: Globe, title: "Bằng cấp chính quy", desc: "Bằng cấp được cấp trực tiếp bởi trường đại học Anh Quốc." },
  { icon: Star, title: "Công nhận quốc tế", desc: "Chương trình học được công nhận quốc tế." },
  { icon: Clock, title: "Học trực tuyến linh hoạt", desc: "Phù hợp người đi làm." },
  { icon: Users, title: "Giảng viên giàu kinh nghiệm", desc: "Đội ngũ giảng viên giàu kinh nghiệm." },
  { icon: Building2, title: "Ứng dụng thực tiễn", desc: "Chương trình tập trung vào ứng dụng thực tiễn." },
  { icon: Globe, title: "Cộng đồng quốc tế", desc: "Cộng đồng sinh viên đến từ hơn 130 quốc gia." },
]

const KVC_SUPPORT = [
  "Tư vấn lựa chọn chương trình phù hợp.",
  "Hỗ trợ hồ sơ nhập học.",
  "Hướng dẫn học tập trực tuyến.",
  "Theo dõi tiến độ học.",
  "Hỗ trợ thực hiện luận văn (Dissertation).",
  "Đồng hành cho đến khi nhận bằng.",
]

const LEARNING_FORMAT = [
  "100% Online",
  "Học mọi lúc, mọi nơi",
  "Tài liệu học tập điện tử",
  "Giảng viên hướng dẫn trực tuyến",
  "Đánh giá thông qua bài tập, dự án và luận văn theo từng chương trình",
]

const TARGET_AUDIENCE = [
  "Người đã tốt nghiệp đại học muốn nâng cao trình độ.",
  "Nhà quản lý và lãnh đạo doanh nghiệp.",
  "Người đi làm cần bằng cấp quốc tế để phát triển sự nghiệp.",
  "Học viên có kế hoạch làm việc hoặc học tập trong môi trường quốc tế.",
  "Những người cần chương trình học linh hoạt nhưng vẫn đảm bảo chất lượng giáo dục Anh Quốc.",
]

const BENEFITS = [
  "Bằng cấp được cấp trực tiếp bởi University of Wolverhampton.",
  "Chương trình đào tạo theo tiêu chuẩn giáo dục Vương quốc Anh.",
  "Linh hoạt về thời gian học.",
  "Phát triển năng lực quản lý, nghiên cứu và chuyên môn.",
  "Gia tăng cơ hội thăng tiến và làm việc trong môi trường quốc tế.",
  "Tiết kiệm đáng kể chi phí so với hình thức du học toàn thời gian.",
]

const STEPS = [
  "Đăng ký tư vấn với KVC Global.",
  "Đánh giá hồ sơ học thuật.",
  "Chuẩn bị hồ sơ nhập học.",
  "Nhận thư mời nhập học.",
  "Bắt đầu chương trình học trực tuyến.",
]

interface Program {
  name: string
  duration: string
  start: string
  subjects: string[]
  entry: string
}

const PROGRAMS: Program[] = [
  {
    name: "BA (Hons) Business Management",
    duration: "12 tháng",
    start: "Tháng 1, 5, 9",
    subjects: ["Organisational Behavior", "The Business Communicator", "The Professional Project", "The Strategic Business"],
    entry: "Có bằng Cao đẳng / Đại học hoặc Sau đại học được công nhận (hoặc văn bằng tương đương). Hoặc có trình độ cao hơn bằng Cử nhân danh dự (Honours) theo hệ thống giáo dục Vương quốc Anh.",
  },
  {
    name: "MBA – Master of Business Administration",
    duration: "6 tháng",
    start: "Tháng 1, 3, 5, 7, 9, 11",
    subjects: ["Proposal", "Dissertation", "Reflective Paper"],
    entry: "Có bằng Đại học hoặc Sau đại học được công nhận (hoặc văn bằng tương đương). Hoặc có trình độ cao hơn bằng Cử nhân danh dự (Honours) theo hệ thống giáo dục Vương quốc Anh.",
  },
  {
    name: "MSc Psychology - Master of Science in Psychology",
    duration: "6 tháng",
    start: "Tháng 3, 5, 10",
    subjects: ["Proposal", "Dissertation", "Reflective Paper"],
    entry: "Có bằng Đại học hoặc Sau đại học được công nhận (hoặc văn bằng tương đương). Hoặc có trình độ cao hơn bằng Cử nhân danh dự (Honours) theo hệ thống giáo dục Vương quốc Anh.",
  },
  {
    name: "MSc Project Management - Master of Science in Project Management",
    duration: "6 tháng",
    start: "Tháng 1, 9",
    subjects: ["Financial Management of Projects", "Dissertation"],
    entry: "Có bằng Đại học hoặc Sau đại học được công nhận (hoặc văn bằng tương đương). Hoặc có trình độ cao hơn bằng Cử nhân danh dự (Honours) theo hệ thống giáo dục Vương quốc Anh.",
  },
  {
    name: "MSc Accounting & Finance - Master of Science in Accounting and Finance",
    duration: "6 tháng",
    start: "Tháng 1, 5, 9",
    subjects: ["Proposal", "Dissertation"],
    entry: "Có bằng Đại học hoặc Sau đại học được công nhận (hoặc văn bằng tương đương). Hoặc có trình độ cao hơn bằng Cử nhân danh dự (Honours) theo hệ thống giáo dục Vương quốc Anh.",
  },
]

export function OnlineWolverhampton({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      {/* ── Hero ── */}
      <section className="relative w-full overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${HERO_BG})` }}>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-white from-55% to-transparent" />
        <Container className="relative flex min-h-[580px] flex-col justify-center pt-28 pb-20 md:min-h-[640px]">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6 flex flex-wrap items-center gap-1.5 font-body text-xs font-medium text-muted-foreground md:text-sm">
            <Link href="/" className="transition-colors duration-200 hover:text-foreground">Trang chủ</Link>
            <span className="select-none text-muted-foreground/60">&gt;</span>
            <Link href="/khoa-hoc-online" className="transition-colors duration-200 hover:text-foreground">Khóa Học Online</Link>
            <span className="select-none text-muted-foreground/60">&gt;</span>
            <span className="font-semibold text-foreground/80" aria-current="page">University of Wolverhampton</span>
          </motion.div>
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-3 inline-block font-heading text-xs font-bold tracking-wider text-brand-gold uppercase sm:text-sm">
              UNIVERSITY OF WOLVERHAMPTON
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl md:text-5xl">
              Học Đại học và Thạc sĩ Anh Quốc 100% Online cùng University of Wolverhampton
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-4 max-w-xl font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base md:text-[17px]">
              Nhận bằng cấp chính quy từ một trường đại học công lập Vương quốc Anh với hình thức học linh hoạt, phù hợp cho người đi làm và sinh viên quốc tế.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }} className="mt-3 max-w-xl font-body text-sm leading-relaxed text-brand-dark/75">
              Thông qua KVC Global, học viên có cơ hội theo học các chương trình Top-up Bachelor, MBA và MSc của University of Wolverhampton, hoàn toàn trực tuyến. Trường có hơn 190 năm lịch sử và đào tạo hơn 24.000 sinh viên tại Anh và quốc tế.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-8">
              <Link href="/lien-he" className="group inline-flex items-center gap-2 rounded-sm bg-brand-blue-mid px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue hover:shadow-lg">
                Đăng ký tư vấn miễn phí
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Giới thiệu ── */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <motion.div variants={fadeUpVariants} className="lg:col-span-5">
              <div className="relative aspect-4/3 overflow-hidden rounded-lg shadow-lg">
                <Image src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80&auto=format&fit=crop" alt="University of Wolverhampton" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
              </div>
            </motion.div>
            <motion.div variants={fadeUpVariants} className="lg:col-span-7">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Giới thiệu về University of Wolverhampton</h2>
              <p className="mt-5 font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base">
                University of Wolverhampton là trường đại học công lập tại Vương quốc Anh, nổi tiếng với định hướng đào tạo thực tiễn, chú trọng phát triển kỹ năng nghề nghiệp và cơ hội việc làm cho sinh viên. Trường cung cấp nhiều chương trình đại học, sau đại học và đào tạo trực tuyến dành cho sinh viên quốc tế.
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ── Vì sao chọn? ── */}
      <section className="bg-brand-light py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Vì sao chọn University of Wolverhampton?</h2>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {WHY_ITEMS.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div key={i} variants={fadeUpVariants} className="flex flex-col items-center rounded-lg border border-border bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue-mid">
                      <Icon className="h-7 w-7 text-brand-gold-light" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-heading text-[16px] font-bold text-brand-blue">{item.title}</h3>
                    <p className="mt-3 font-body text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Vì sao học qua KVC? ── */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Vì sao học qua KVC Global?</h2>
              <p className="mt-3 font-body text-sm text-brand-dark/75">Đồng hành từ khi đăng ký đến khi tốt nghiệp</p>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="mx-auto max-w-3xl">
              <ul className="space-y-4">
                {KVC_SUPPORT.map((item, i) => (
                  <motion.li key={i} variants={fadeUpVariants} className="flex items-start gap-4 rounded-lg border border-border bg-white p-5 shadow-sm">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gold/10">
                      <Check className="h-4 w-4 text-brand-gold" strokeWidth={3} />
                    </div>
                    <span className="font-body text-sm text-brand-dark/85 sm:text-base">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Hình thức học ── */}
      <section className="bg-brand-light py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Hình thức học</h2>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="mx-auto max-w-4xl">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {LEARNING_FORMAT.map((item, i) => (
                  <motion.div key={i} variants={fadeUpVariants} className="flex items-center gap-3 rounded-md border border-border bg-white p-4 shadow-sm">
                    <Check className="h-4 w-4 shrink-0 text-brand-gold" strokeWidth={3} />
                    <span className="font-body text-sm text-brand-dark/85">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Đối tượng phù hợp ── */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Đối tượng phù hợp</h2>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="mx-auto max-w-3xl">
              <ul className="space-y-4">
                {TARGET_AUDIENCE.map((item, i) => (
                  <motion.li key={i} variants={fadeUpVariants} className="flex items-start gap-4 rounded-lg border border-border bg-white p-5 shadow-sm">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gold/10">
                      <Check className="h-4 w-4 text-brand-gold" strokeWidth={3} />
                    </div>
                    <span className="font-body text-sm text-brand-dark/85 sm:text-base">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Lợi ích ── */}
      <section className="bg-brand-light py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Lợi ích khi học tại University of Wolverhampton</h2>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="mx-auto max-w-3xl">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {BENEFITS.map((item, i) => (
                  <motion.div key={i} variants={fadeUpVariants} className="flex items-start gap-3 rounded-lg border border-border bg-white p-4 shadow-sm">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gold/10">
                      <Check className="h-3 w-3 text-brand-gold" strokeWidth={3} />
                    </div>
                    <span className="font-body text-sm text-brand-dark/85">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Quy trình đăng ký ── */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Quy trình đăng ký</h2>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="mx-auto max-w-4xl">
              <div className="relative">
                <div aria-hidden="true" className="absolute top-8 left-8 right-8 h-0.5 bg-brand-blue-mid/20 hidden md:block" />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
                  {STEPS.map((step, i) => (
                    <motion.div key={i} variants={fadeUpVariants} className="relative flex flex-col items-center text-center">
                      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue-mid text-xl font-bold text-white shadow-md">
                        {i + 1}
                      </div>
                      <p className="mt-4 font-body text-sm leading-relaxed text-brand-dark/85">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Programs ── */}
      <section className="bg-brand-light py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Các chương trình đào tạo</h2>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {PROGRAMS.map((prog, i) => (
                <motion.div key={i} variants={fadeUpVariants} className="flex flex-col rounded-lg border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                  <h3 className="font-heading text-lg font-bold text-brand-blue">{prog.name}</h3>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-brand-dark/75">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-light px-3 py-1 font-medium">
                      <Clock className="h-3.5 w-3.5 text-brand-gold" />
                      {prog.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-light px-3 py-1 font-medium">
                      <Calendar className="h-3.5 w-3.5 text-brand-gold" />
                      {prog.start}
                    </span>
                  </div>
                  <div className="mt-5">
                    <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-brand-blue">
                      <ListChecks className="h-4 w-4 text-brand-gold" />
                      Môn học
                    </h4>
                    <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                      {prog.subjects.map((s, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-brand-dark/75">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-gold" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-5 rounded-md bg-brand-gold/5 border border-brand-gold/20 p-4">
                    <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-brand-blue">
                      <UserCheck className="h-4 w-4 text-brand-gold" />
                      Điều kiện đầu vào
                    </h4>
                    <p className="mt-1.5 text-sm text-brand-dark/75">{prog.entry}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── CTA / Liên hệ ── */}
      <section className="bg-brand-blue-mid py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center">
            <motion.h2 variants={fadeUpVariants} className="font-heading text-2xl font-extrabold text-white sm:text-3xl">Liên hệ KVC Global</motion.h2>
            <motion.p variants={fadeUpVariants} className="mt-4 mx-auto max-w-2xl font-body text-sm leading-relaxed text-white/80 sm:text-base">
              KVC Global hỗ trợ học viên lựa chọn chương trình phù hợp với mục tiêu nghề nghiệp, đồng thời đồng hành trong suốt quá trình học tập để giúp học viên đạt được bằng cấp quốc tế một cách thuận lợi và hiệu quả.
            </motion.p>
            <motion.div variants={fadeUpVariants} className="mt-8">
              <Link href="/lien-he" className="group inline-flex items-center gap-2 rounded-sm bg-brand-gold px-8 py-4 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-gold/90 hover:shadow-lg">
                Đăng ký tư vấn miễn phí ngay hôm nay
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  )
}
