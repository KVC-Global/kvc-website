"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { Check, GraduationCap, Globe, Star, Users, BookOpen, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { ExpandableTimeline, type TimelineProgram } from "@/components/online-timeline"

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const HERO_BG = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80&auto=format&fit=crop"

const WHY_ITEMS = [
  { icon: Globe, title: "Đào tạo chính hãng", desc: "KVC Global đồng hành cùng học viên trong suốt quá trình học tập với chương trình đạt chuẩn quốc tế." },
  { icon: Star, title: "Học Online 100%", desc: "Học mọi lúc, mọi nơi, Chủ động thời gian, Phù hợp người đi làm, Không cần đến lớp." },
  { icon: Users, title: "Hỗ trợ học tập", desc: "Giảng viên hướng dẫn, Hỗ trợ làm Assignment, Theo dõi tiến độ học, Tư vấn lộ trình chuyển tiếp." },
  { icon: BookOpen, title: "Chi phí tối ưu", desc: "Tiết kiệm hơn nhiều so với du học trực tiếp nhưng vẫn đạt bằng cấp theo tiêu chuẩn Anh Quốc." },
]

const LEARNING_FORMAT = [
  "100% Online",
  "Học trên nền tảng LMS hiện đại",
  "Tài liệu điện tử đầy đủ",
  "Đánh giá bằng Assignment theo tiêu chuẩn Anh Quốc",
  "Có giảng viên và cố vấn học tập hỗ trợ xuyên suốt",
]

const TARGET_AUDIENCE = [
  "Sinh viên mong muốn sở hữu bằng cấp quốc tế.",
  "Người đi làm cần nâng cao năng lực quản lý.",
  "Nhà quản lý, trưởng nhóm, chủ doanh nghiệp.",
  "Người có kế hoạch học chuyển tiếp đại học hoặc thạc sĩ tại Anh và các quốc gia khác.",
  "Người muốn học linh hoạt nhưng vẫn đạt chuẩn giáo dục Anh Quốc.",
]

const BENEFITS = [
  "Chứng chỉ được công nhận theo tiêu chuẩn Anh Quốc.",
  "Linh hoạt học trực tuyến mọi lúc, mọi nơi.",
  "Nâng cao kỹ năng quản lý và chuyên môn.",
  "Tiết kiệm chi phí so với du học truyền thống.",
  "Mở rộng cơ hội nghề nghiệp trong môi trường quốc tế.",
  "Có lộ trình chuyển tiếp lên Đại học và Thạc sĩ tại nhiều trường đối tác.",
]

const STEPS = [
  "Đăng ký tư vấn",
  "Đánh giá hồ sơ đầu vào",
  "Lựa chọn chương trình phù hợp",
  "Hoàn tất thủ tục nhập học",
  "Bắt đầu học trực tuyến cùng KVC Global",
]

const PROGRAMS: TimelineProgram[] = [
  {
    name: "Level 3 Diploma in Business Management",
    duration: "6 tháng",
    start: "Tháng 1, 3, 5, 7, 9, 11",
    subjects: ["Communication for Business", "The Business Environment", "People Management", "Customer Service", "Finance in Business", "Marketing"],
    entry: "Từ 18 tuổi trở lên.",
  },
  {
    name: "Level 4 Diploma in Business Management",
    duration: "12 tháng",
    start: "Tháng 1, 3, 5, 7, 9, 11",
    subjects: ["Academic Writing and Research Skills", "Business Operations", "Communication in Business", "Finance and Accounting", "Leading and Managing Teams", "Operating in a Global Context"],
    entry: "Từ 19 tuổi. Có bằng Level 3 hoặc tương đương. Người trên 21 tuổi có kinh nghiệm quản lý có thể được xem xét.",
  },
  {
    name: "Level 5 Diploma in Business Management",
    duration: "12 tháng",
    start: "Tháng 1, 3, 5, 7, 9, 11",
    subjects: ["Principles and Concepts of Strategy", "The Management of Human Resources", "Marketing for Managers", "Business Law for Managers", "Management Accounting and Decision Making", "Business Start-up: Conception to Market"],
    entry: "Có bằng Level 4 hoặc tương đương. Người trên 21 tuổi có kinh nghiệm quản lý.",
  },
  {
    name: "Level 5 Extended Diploma in Business Management",
    duration: "6 tháng",
    start: "Tháng 1, 4, 7, 10",
    subjects: ["Academic Writing and Research Skills", "Business Operations", "Communication in Business", "Finance and Accounting", "Leading and Managing Teams", "Operating in a Global Context", "Principles and Concepts of Strategy", "Human Resource Management", "Marketing for Managers", "Business Law for Managers", "Management Accounting and Decision Making", "Business Start-up: Conception to Market"],
    entry: "Có bằng Level 4 hoặc tương đương. Người trên 21 tuổi có kinh nghiệm quản lý.",
  },
  {
    name: "Level 5 Extended Diploma Logistics, Supply Chain & Management",
    duration: "9 tháng",
    start: "Tháng 1, 3, 5, 7, 9, 11",
    subjects: ["Academic Writing and Research Skills", "Logistics and the Business Environment", "Operations and Logistics Management", "Finance and Accounting", "Communication in Business", "Leading and Managing Teams", "Principles and Concepts of Strategy", "Procurement and Inventory Management", "Contract and Financial Management", "Global Context of Supply Chains", "Principles and Concepts of Supply Chain Management", "Contemporary Issues in Supply Chain Management"],
    entry: "Có bằng Level 4 hoặc tương đương. Người trên 21 tuổi có kinh nghiệm quản lý.",
  },
  {
    name: "Level 7 Diploma Strategic Management & Leadership",
    duration: "3–9 tháng",
    start: "Tháng 1, 3, 5, 7, 9, 11",
    subjects: ["Strategic Management", "Strategic Leadership", "Strategic Human Resource Management", "Advanced Business Research Methods", "Entrepreneurship and Innovation", "Strategic Marketing"],
    entry: "Từ 21 tuổi. Có bằng đại học hoặc Level 6 tương đương. Người có kinh nghiệm quản lý cũng có thể được xem xét.",
  },
  {
    name: "Level 7 Diploma Logistics, Supply Chain & Management",
    duration: "9 tháng",
    start: "Tháng 1, 3, 5, 7, 9, 11",
    subjects: ["Logistics Management", "Supply Chain Planning, Modelling and Analytics", "Procurement and Supply Management", "Supply Chain and Operations Strategy", "Sustainable Operations Management", "Business Research Methods"],
    entry: "Từ 21 tuổi. Có bằng đại học hoặc Level 6 tương đương. Người có kinh nghiệm quản lý cũng có thể được xem xét.",
  },
  {
    name: "Level 7 Diploma Accounting & Finance",
    duration: "9 tháng",
    start: "Tháng 1, 3, 5, 7, 9, 11",
    subjects: ["Investment Analysis", "Corporate Reporting", "Global Finance and Strategy", "Strategic Financial Management", "Strategic Audit", "Business Research Methods"],
    entry: "Từ 21 tuổi. Có bằng đại học hoặc Level 6 tương đương. Người có kinh nghiệm quản lý cũng có thể được xem xét.",
  },
]

export function OnlineOthm({ className }: { className?: string }) {
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
            <span className="font-semibold text-foreground/80" aria-current="page">OTHM</span>
          </motion.div>
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-3 inline-block font-heading text-xs font-bold tracking-wider text-brand-gold uppercase sm:text-sm">
              OTHM ANH QUỐC
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl md:text-5xl">
              Học Chứng chỉ OTHM Anh Quốc trực tuyến cùng KVC Global
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-4 max-w-xl font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base md:text-[17px]">
              Mở rộng cơ hội nghề nghiệp và học tập quốc tế với bằng cấp được công nhận toàn cầu.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }} className="mt-3 max-w-xl font-body text-sm leading-relaxed text-brand-dark/75">
              KVC Global cung cấp các chương trình OTHM Qualifications theo hình thức 100% Online, phù hợp với sinh viên, người đi làm và các nhà quản lý mong muốn nâng cao trình độ chuyên môn theo tiêu chuẩn giáo dục Vương quốc Anh.
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

      {/* ── OTHM là gì? ── */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <motion.div variants={fadeUpVariants} className="lg:col-span-5">
              <div className="relative aspect-4/3 overflow-hidden rounded-lg shadow-lg">
                <Image src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80&auto=format&fit=crop" alt="OTHM program" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
              </div>
            </motion.div>
            <motion.div variants={fadeUpVariants} className="lg:col-span-7">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">OTHM là gì?</h2>
              <p className="mt-5 font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base">
                OTHM (Organization for Tourism and Hospitality Management) là tổ chức cấp bằng của Vương quốc Anh, được Ofqual (Office of Qualifications and Examinations Regulation) quản lý và công nhận.
              </p>
              <p className="mt-4 font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base">
                Các chương trình OTHM được thiết kế theo Khung trình độ quốc gia Anh (Regulated Qualifications Framework - RQF), giúp người học:
              </p>
              <ul className="mt-4 space-y-2.5">
                {["Sở hữu văn bằng theo tiêu chuẩn Anh Quốc.", "Học trực tuyến linh hoạt.", "Phát triển kỹ năng quản lý và chuyên môn.", "Chuyển tiếp lên chương trình Cử nhân hoặc Thạc sĩ tại nhiều trường đại học đối tác trên thế giới.", "Gia tăng lợi thế cạnh tranh trong môi trường làm việc quốc tế."].map((item, i) => (
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

      {/* ── Lợi ích ── */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Lợi ích khi học OTHM tại KVC Global</h2>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="mx-auto max-w-3xl">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {BENEFITS.map((item, i) => (
                  <motion.div key={i} variants={fadeUpVariants} className="flex items-center gap-3 rounded-lg border border-border bg-white p-4 shadow-sm">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gold/10">
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
      <section className="bg-brand-light py-16 md:py-24">
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
      <section className="bg-white py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-4 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Các chương trình OTHM</h2>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <ExpandableTimeline programs={PROGRAMS} />
          </motion.div>
        </Container>
      </section>

      {/* ── CTA / Liên hệ ── */}
      <section className="bg-brand-blue-mid py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center">
            <motion.h2 variants={fadeUpVariants} className="font-heading text-2xl font-extrabold text-white sm:text-3xl">Liên hệ KVC Global</motion.h2>
            <motion.p variants={fadeUpVariants} className="mt-4 mx-auto max-w-2xl font-body text-sm leading-relaxed text-white/80 sm:text-base">
              KVC Global cam kết mang đến cho học viên chương trình đào tạo chất lượng quốc tế, lộ trình học tập rõ ràng và dịch vụ hỗ trợ chuyên nghiệp từ khi đăng ký đến khi hoàn thành chương trình.
            </motion.p>
            <motion.div variants={fadeUpVariants} className="mt-8">
              <Link href="/lien-he" className="group inline-flex items-center gap-2 rounded-sm bg-brand-gold px-8 py-4 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-gold/90 hover:shadow-lg">
                Liên hệ ngay để được tư vấn miễn phí
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  )
}
