"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { Check, GraduationCap, Clock, Globe, Star, Users, ArrowRight, Calendar, ListChecks, UserCheck, TrendingUp } from "lucide-react"

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

const HERO_BG = "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920&q=80&auto=format&fit=crop"

const WHY_ITEMS = [
  { icon: Globe, title: "Đối tác đào tạo chuyên nghiệp", desc: "KVC Global đồng hành cùng học viên trong suốt quá trình học tập với đội ngũ tư vấn giàu kinh nghiệm." },
  { icon: Star, title: "Học Online 100%", desc: "Học mọi lúc, mọi nơi. Không cần đến lớp. Chủ động thời gian. Phù hợp người đi làm." },
  { icon: Users, title: "Giảng viên hỗ trợ", desc: "Hướng dẫn làm Assignment. Theo sát tiến độ học tập. Giải đáp nhanh chóng." },
  { icon: TrendingUp, title: "Chi phí hợp lý", desc: "Tiết kiệm đáng kể so với du học trực tiếp nhưng vẫn sở hữu bằng cấp theo tiêu chuẩn Anh Quốc." },
]

const LEARNING_FORMAT = [
  "100% Online",
  "Tài liệu điện tử",
  "Học qua hệ thống LMS",
  "Làm Assignment thay cho thi viết (tùy chương trình)",
  "Hỗ trợ trực tuyến từ giảng viên và cố vấn học tập",
]

const TARGET_AUDIENCE = [
  "Sinh viên muốn sở hữu bằng cấp quốc tế.",
  "Người đi làm cần nâng cao trình độ.",
  "Chủ doanh nghiệp muốn phát triển năng lực quản lý.",
  "Người có kế hoạch học chuyển tiếp tại Anh hoặc quốc tế.",
  "Người muốn học linh hoạt mà vẫn đạt chuẩn giáo dục Anh Quốc.",
]

const BENEFITS = [
  "Chứng chỉ theo tiêu chuẩn Anh Quốc",
  "Linh hoạt thời gian học",
  "Phù hợp người đi làm",
  "Tiết kiệm chi phí",
  "Mở rộng cơ hội nghề nghiệp",
  "Có lộ trình chuyển tiếp lên Đại học và Thạc sĩ quốc tế",
]

const STEPS = [
  "Đăng ký tư vấn",
  "Đánh giá hồ sơ",
  "Chọn chương trình phù hợp",
  "Hoàn tất thủ tục nhập học",
  "Bắt đầu học trực tuyến",
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
    name: "Level 3 Diploma in Accounting & Finance",
    duration: "6 tháng",
    start: "Tháng 1, 3, 5, 7, 9, 11",
    subjects: ["Financial Transactions Record-keeping", "Cost and Management Information", "Financial Records Maintenance"],
    entry: "Từ 18 tuổi trở lên.",
  },
  {
    name: "Level 4 Diploma in Accounting & Finance",
    duration: "12 tháng",
    start: "Tháng 1, 3, 5, 7, 9, 11",
    subjects: ["Accounting in a Business Context", "Economics for Business", "Mathematical Accounting Methods", "Financial Accounting", "Management Accounting", "Leadership and Management in Accounting"],
    entry: "Từ 19 tuổi trở lên.",
  },
  {
    name: "Level 5 Diploma in Accounting & Finance",
    duration: "12 tháng",
    start: "Tháng 1, 3, 5, 7, 9, 11",
    subjects: ["Financial Management", "Financial Planning and Control", "Financial Reporting", "Principles and Practices of Taxation", "Management of People", "Ethics and Corporate Responsibility in Business"],
    entry: "Từ 20 tuổi trở lên.",
  },
  {
    name: "Level 5 Extended Diploma in Accounting & Finance",
    duration: "12 tháng",
    start: "Tháng 1, 3, 5, 7, 9, 11",
    subjects: ["Accounting in a Business Context", "Economics for Business", "Mathematical Accounting Methods", "Financial Accounting", "Management Accounting", "Leadership and Management in Accounting", "Financial Management", "Financial Planning and Control", "Financial Reporting", "Principles and Practices of Taxation", "Management of People", "Ethics and Corporate Responsibility in Business"],
    entry: "Từ 20 tuổi trở lên.",
  },
  {
    name: "Level 7 Diploma in Accounting & Finance",
    duration: "9 tháng",
    start: "Tháng 2, 4, 6, 8, 10, 12",
    subjects: ["Strategy and Global Finance", "Strategic Financial Management", "Strategic Auditing", "Ethical Behaviour and Corporate Governance", "Corporate Reporting", "Financial Analyst"],
    entry: "Từ 21 tuổi trở lên.",
  },
  {
    name: "Level 7 Diploma in Strategic Management & Leadership",
    duration: "3–9 tháng",
    start: "Tháng 2, 4, 6, 8, 10, 12",
    subjects: ["Information Management and Strategic Decision Taking", "Manage Team Performance to Support Strategy", "Strategic Direction", "Leading a Strategic Management Project", "Strategic Planning", "Development as a Strategic Manager", "Finance for Managers", "Strategic Marketing"],
    entry: "Từ 21 tuổi trở lên.",
  },
]

export function OnlineQualifi({ className }: { className?: string }) {
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
            <span className="font-semibold text-foreground/80" aria-current="page">Qualifi</span>
          </motion.div>
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-3 inline-block font-heading text-xs font-bold tracking-wider text-brand-gold uppercase sm:text-sm">
              QUALIFI ANH QUỐC
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl md:text-5xl">
              Học Chứng chỉ QUALIFI Anh Quốc trực tuyến cùng KVC Global
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-4 max-w-xl font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base md:text-[17px]">
              Nâng tầm sự nghiệp với bằng cấp quốc tế được công nhận toàn cầu.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }} className="mt-3 max-w-xl font-body text-sm leading-relaxed text-brand-dark/75">
              KVC Global mang đến các chương trình đào tạo QUALIFI theo hình thức 100% Online, giúp học viên học tập linh hoạt, tiết kiệm chi phí và mở rộng cơ hội chuyển tiếp đại học, thạc sĩ tại Anh Quốc và nhiều quốc gia khác.
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

      {/* ── QUALIFI là gì? ── */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <motion.div variants={fadeUpVariants} className="lg:col-span-5">
              <div className="relative aspect-4/3 overflow-hidden rounded-lg shadow-lg">
                <Image src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop" alt="Qualifi program" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
              </div>
            </motion.div>
            <motion.div variants={fadeUpVariants} className="lg:col-span-7">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">QUALIFI là gì?</h2>
              <p className="mt-5 font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base">
                QUALIFI là tổ chức cấp bằng (Awarding Organisation) được quản lý bởi Ofqual tại Vương quốc Anh. Các văn bằng QUALIFI được công nhận rộng rãi bởi doanh nghiệp, các tổ chức giáo dục và nhiều trường đại học trên thế giới.
              </p>
              <p className="mt-4 font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base">
                Thông qua chương trình của QUALIFI, người học có thể:
              </p>
              <ul className="mt-4 space-y-2.5">
                {["Nhận bằng cấp theo tiêu chuẩn Anh Quốc.", "Học hoàn toàn trực tuyến.", "Chuyển tiếp lên chương trình Cử nhân hoặc Thạc sĩ tại nhiều trường đại học đối tác.", "Phát triển năng lực nghề nghiệp theo chuẩn quốc tế."].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-gold bg-brand-gold/10">
                      <Check className="h-3 w-3 text-brand-gold" strokeWidth={3} />
                    </div>
                    <span className="font-body text-sm text-brand-dark/85">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ── Vì sao chọn KVC Global? ── */}
      <section className="bg-brand-light py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Vì sao chọn KVC Global?</h2>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* ── Cơ hội học tiếp ── */}
      <section className="bg-white py-10">
        <Container>
          <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto max-w-3xl rounded-lg border border-brand-gold/20 bg-brand-gold/5 p-6 text-center">
            <GraduationCap className="mx-auto h-8 w-8 text-brand-gold" strokeWidth={1.75} />
            <h3 className="mt-3 font-heading text-lg font-bold text-brand-blue">Cơ hội học tiếp</h3>
            <p className="mt-2 font-body text-sm text-brand-dark/75">
              Sau khi hoàn thành các chương trình QUALIFI từ Level 4 trở lên, học viên có thể đủ điều kiện chuyển tiếp lên các chương trình đại học hoặc sau đại học tại nhiều trường đối tác theo quy định của từng trường.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ── Đối tượng phù hợp ── */}
      <section className="bg-brand-light py-16 md:py-24">
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

      {/* ── Hình thức học ── */}
      <section className="bg-white py-16 md:py-24">
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

      {/* ── Lợi ích ── */}
      <section className="bg-brand-light py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Lợi ích khi học QUALIFI</h2>
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

      {/* ── Level Programs ── */}
      <section className="bg-brand-light py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Các chương trình QUALIFI</h2>
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
              Tư vấn lộ trình học tập cá nhân, Hỗ trợ đăng ký nhanh chóng, Đồng hành trong suốt quá trình học, Hỗ trợ chuyển tiếp đại học quốc tế.
            </motion.p>
            <motion.div variants={fadeUpVariants} className="mt-8">
              <Link href="/lien-he" className="group inline-flex items-center gap-2 rounded-sm bg-brand-gold px-8 py-4 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-gold/90 hover:shadow-lg">
                Đăng ký tư vấn ngay hôm nay
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  )
}
