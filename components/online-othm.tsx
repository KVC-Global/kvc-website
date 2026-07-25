"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { Check, GraduationCap, Globe, Star, Users, BookOpen, ArrowRight, Monitor, FileText, Briefcase, Building2, Clock, Calendar, ListChecks, UserCheck, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import type { TimelineProgram } from "@/components/online-timeline"

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

const LEARNING_FORMATS = [
  { icon: Globe, title: "100% Online", desc: "Học mọi lúc, mọi nơi, chủ động thời gian, phù hợp người đi làm, không cần đến lớp." },
  { icon: Monitor, title: "Nền tảng LMS hiện đại", desc: "Hệ thống quản lý học tập tiên tiến, giao diện thân thiện, dễ sử dụng trên mọi thiết bị." },
  { icon: FileText, title: "Tài liệu điện tử đầy đủ", desc: "Toàn bộ giáo trình, bài giảng và tài nguyên học tập được cung cấp dưới dạng số." },
  { icon: Star, title: "Đánh giá theo chuẩn Anh Quốc", desc: "Bài tập được thiết kế và đánh giá theo tiêu chuẩn của khung trình độ Anh Quốc (RQF)." },
  { icon: Users, title: "Giảng viên hỗ trợ xuyên suốt", desc: "Đội ngũ giảng viên và cố vấn học tập đồng hành, giải đáp và theo dõi tiến độ liên tục." },
]

const LEARNING_FORMAT = [
  "100% Online",
  "Học trên nền tảng LMS hiện đại",
  "Tài liệu điện tử đầy đủ",
  "Đánh giá bằng Assignment theo tiêu chuẩn Anh Quốc",
  "Có giảng viên và cố vấn học tập hỗ trợ xuyên suốt",
]

const TARGET_AUDIENCE = [
  { icon: GraduationCap, title: "Sinh viên", desc: "Mong muốn sở hữu bằng cấp quốc tế để tăng lợi thế cạnh tranh trên thị trường lao động." },
  { icon: Briefcase, title: "Người đi làm", desc: "Cần nâng cao năng lực quản lý và chuyên môn mà không gián đoạn công việc hiện tại." },
  { icon: Building2, title: "Nhà quản lý & Chủ doanh nghiệp", desc: "Phát triển tư duy chiến lược và kỹ năng lãnh đạo theo chuẩn quốc tế." },
  { icon: Globe, title: "Người có kế hoạch du học", desc: "Chuẩn bị lộ trình chuyển tiếp lên đại học hoặc thạc sĩ tại Anh và các quốc gia khác." },
  { icon: Clock, title: "Người cần linh hoạt", desc: "Học tập theo tiêu chuẩn Anh Quốc với thời gian và địa điểm hoàn toàn chủ động." },
]

const BENEFITS = [
  {
    title: "Chứng chỉ chuẩn Anh Quốc",
    desc: "Văn bằng được Ofqual công nhận, có giá trị quốc tế, mở ra cơ hội học tập và làm việc toàn cầu.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Học trực tuyến linh hoạt",
    desc: "Chủ động thời gian, học mọi lúc mọi nơi, phù hợp với người đi làm và sinh viên bận rộn.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Nâng cao kỹ năng chuyên môn",
    desc: "Phát triển năng lực quản lý và kỹ năng thực tiễn, đáp ứng yêu cầu của thị trường lao động quốc tế.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Tiết kiệm chi phí",
    desc: "Chi phí tối ưu hơn nhiều so với du học truyền thống nhưng vẫn đạt bằng cấp theo tiêu chuẩn Anh Quốc.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Cơ hội nghề nghiệp quốc tế",
    desc: "Mở rộng cánh cửa làm việc trong môi trường đa quốc gia với bằng cấp được công nhận rộng rãi.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Lộ trình chuyển tiếp rõ ràng",
    desc: "Chuyển tiếp lên Đại học và Thạc sĩ tại nhiều trường đối tác Anh Quốc và quốc tế.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90109c73f?w=600&q=80&auto=format&fit=crop",
  },
]

const STEPS = [
  { title: "Đăng ký tư vấn", desc: "Liên hệ với KVC Global để được tư vấn chi tiết về chương trình OTHM và lộ trình phù hợp." },
  { title: "Đánh giá hồ sơ", desc: "Đội ngũ chuyên gia đánh giá hồ sơ đầu vào, kinh nghiệm và mục tiêu học tập của bạn." },
  { title: "Chọn chương trình", desc: "Tư vấn lựa chọn chương trình OTHM phù hợp với trình độ và định hướng nghề nghiệp." },
  { title: "Hoàn tất nhập học", desc: "Hoàn thiện thủ tục, kích hoạt tài khoản và sẵn sàng bắt đầu hành trình học tập." },
  { title: "Học tập cùng KVC", desc: "Bắt đầu chương trình học trực tuyến với sự đồng hành và hỗ trợ xuyên suốt từ KVC Global." },
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
  const [activeProgramId, setActiveProgramId] = React.useState(0)
  const activeProgram = PROGRAMS[activeProgramId] || PROGRAMS[0]

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
      <section className="py-16 md:py-24">
        <Container className="max-w-none px-4 sm:px-5 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
          <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
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
          </div>
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
            <div className="mx-auto max-w-5xl">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
                {LEARNING_FORMATS.map((item, i) => {
                  const Icon = item.icon
                  const isWide = i < 2
                  return (
                    <motion.div
                      key={i}
                      variants={fadeUpVariants}
                      className={cn(
                        "group relative overflow-hidden rounded-xl border border-border/60 bg-white p-6 shadow-sm transition-all duration-500 ease-out",
                        "hover:-translate-y-1 hover:border-brand-blue/25 hover:shadow-lg",
                        isWide ? "lg:col-span-3" : "lg:col-span-2",
                      )}
                    >
                      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-gold/[0.06] transition-all duration-500 group-hover:scale-150 group-hover:bg-brand-gold/[0.12]" />
                      <div className="relative z-10">
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-brand-gold/20 bg-brand-gold/[0.06] transition-all duration-500 group-hover:border-brand-gold/40 group-hover:bg-brand-gold/[0.14]">
                          <Icon className="h-5 w-5 text-brand-gold transition-transform duration-500 group-hover:scale-110" strokeWidth={1.75} />
                        </div>
                        <h3 className="font-heading text-[15px] font-bold text-brand-blue transition-colors duration-500 group-hover:text-brand-blue-mid">
                          {item.title}
                        </h3>
                        <p className="mt-2 font-body text-xs leading-relaxed text-brand-dark/70 sm:text-sm">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Đối tượng phù hợp ── */}
      <section className="py-16 md:py-24">
        <Container className="max-w-none px-4 sm:px-5 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
          <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
              <motion.div variants={fadeUpVariants} className="mb-12 text-center">
                <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Đối tượng phù hợp</h2>
                <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
              </motion.div>
              <div className="mx-auto max-w-5xl">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {TARGET_AUDIENCE.map((item, i) => {
                    const isHero = i === 0
                    return (
                      <motion.div
                        key={i}
                        variants={fadeUpVariants}
                        className={cn(
                          "group relative flex gap-5 rounded-xl border border-l-2 border-border/60 bg-white p-6 shadow-sm transition-all duration-500 ease-out",
                          "hover:-translate-y-1 hover:border-brand-blue/25 hover:shadow-lg hover:border-l-brand-gold",
                          isHero && "sm:col-span-2",
                        )}
                      >
                        {/* Left accent bar */}
                        {/* Number + Icon */}
                        <div className="flex items-start gap-4">
                          <span className="font-heading text-3xl font-extrabold text-brand-gold/15 leading-none select-none sm:text-4xl">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        {/* Text */}
                        <div className="flex-1">
                          <h3 className="font-heading text-[15px] font-bold text-brand-blue transition-colors duration-500 group-hover:text-brand-blue-mid">
                            {item.title}
                          </h3>
                          <p className="mt-1.5 font-body text-xs leading-relaxed text-brand-dark/70 sm:text-sm">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Lợi ích ── */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-10 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Lợi ích khi học OTHM tại KVC Global</h2>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="flex gap-6 overflow-x-auto pb-4 -mx-2 px-2 snap-x snap-mandatory scrollbar-hide">
              {BENEFITS.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUpVariants}
                  className="group w-[280px] shrink-0 snap-start overflow-hidden rounded-lg border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:w-[300px]"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="300px"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-base font-bold text-brand-blue">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-brand-dark/75">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Quy trình đăng ký ── */}
      <section className="py-16 md:py-24">
        <Container className="max-w-none px-4 sm:px-5 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
          <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
              <motion.div variants={fadeUpVariants} className="mb-14 text-center">
                <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Quy trình đăng ký</h2>
                <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
              </motion.div>
              <div className="mx-auto max-w-2xl">
                <div className="relative">
                  <div aria-hidden="true" className="absolute top-0 bottom-0 left-8 w-px bg-brand-blue-mid/[0.12] sm:left-10" />
                  <div className="flex flex-col gap-0">
                    {STEPS.map((step, i) => {
                      const isLast = i === STEPS.length - 1
                      return (
                        <motion.div key={i} variants={fadeUpVariants} className="group relative flex gap-6 pb-10 last:pb-0 sm:gap-8">
                          <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_4px_20px_rgba(2,14,80,0.08)] ring-1 ring-brand-blue-mid/10 transition-all duration-500 group-hover:shadow-[0_8px_30px_rgba(2,14,80,0.14)] group-hover:ring-brand-gold/40 sm:h-20 sm:w-20">
                            <span className="font-heading text-2xl font-extrabold text-brand-blue-mid transition-colors duration-500 group-hover:text-brand-blue sm:text-3xl">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <div className="flex-1 pt-1 sm:pt-2">
                            <h3 className="font-heading text-lg font-bold text-brand-blue">{step.title}</h3>
                            <p className="mt-1.5 font-body text-sm leading-relaxed text-brand-dark/70">{step.desc}</p>
                          </div>
                          {!isLast && (
                            <div aria-hidden="true" className="absolute left-[26.5px] top-[78px] z-10 h-3 w-3 rounded-full border-2 border-brand-blue-mid/20 bg-white sm:left-[34.5px] sm:top-[94px]" />
                          )}
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Các chương trình OTHM ── */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-10 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Các chương trình OTHM</h2>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>

            {/* Desktop: Tabs + Detail */}
            <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
              <div className="col-span-4 flex flex-col gap-2">
                {PROGRAMS.map((program, i) => {
                  const isActive = i === activeProgramId
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveProgramId(i)}
                      className={cn(
                        "flex items-center justify-between rounded-lg border p-4 text-left font-heading text-[15px] font-bold transition-all duration-300",
                        isActive
                          ? "border-brand-blue bg-brand-blue text-white shadow-md"
                          : "border-border bg-white text-brand-blue hover:bg-brand-light",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <BookOpen className={cn("h-5 w-5 shrink-0", isActive ? "text-brand-gold-light" : "text-brand-gold")} />
                        {program.name}
                      </span>
                      <ChevronRight className={cn("h-4 w-4 transition-transform", isActive && "translate-x-1")} />
                    </button>
                  )
                })}
              </div>
              <div className="col-span-8 rounded-lg border border-border/60 bg-white p-6 shadow-sm">
                <h3 className="font-heading text-xl font-bold text-brand-blue mb-3">{activeProgram.name}</h3>
                <div className="flex flex-wrap gap-3 mb-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue-mid/10 px-3 py-1.5 font-body text-sm font-medium text-brand-blue-mid">
                    <Clock className="h-3.5 w-3.5 text-brand-gold" />{activeProgram.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue-mid/10 px-3 py-1.5 font-body text-sm font-medium text-brand-blue-mid">
                    <Calendar className="h-3.5 w-3.5 text-brand-gold" />{activeProgram.start}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-5">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg sm:col-span-2">
                    <Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80&auto=format&fit=crop" alt={activeProgram.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 200px" />
                  </div>
                  <div className="sm:col-span-3">
                    <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-brand-blue mb-2">
                      <ListChecks className="h-4 w-4 text-brand-gold" strokeWidth={1.75} />Môn học
                    </h4>
                    <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 mb-4">
                      {activeProgram.subjects.map((s, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-brand-dark/70">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-gold" />{s}
                        </li>
                      ))}
                    </ul>
                    <div className="rounded-lg border border-brand-gold/20 bg-brand-gold/[0.04] p-4">
                      <h4 className="flex items-center gap-2 font-heading text-sm font-semibold text-brand-blue mb-1.5">
                        <UserCheck className="h-4 w-4 text-brand-gold" strokeWidth={1.75} />Điều kiện đầu vào
                      </h4>
                      <p className="text-sm leading-relaxed text-brand-dark/75">{activeProgram.entry}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: Accordion */}
            <div className="lg:hidden flex flex-col gap-4">
              {PROGRAMS.map((program, i) => {
                const isOpen = i === activeProgramId
                return (
                  <div key={i} className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
                    <button
                      type="button"
                      onClick={() => setActiveProgramId(isOpen ? -1 : i)}
                      className={cn(
                        "flex w-full items-center justify-between p-4 text-left font-heading text-sm font-bold transition-colors",
                        isOpen ? "bg-brand-blue text-white" : "text-brand-blue",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <BookOpen className={cn("h-5 w-5", isOpen ? "text-brand-gold-light" : "text-brand-gold")} />
                        {program.name}
                      </span>
                      <ChevronRight className={cn("h-4 w-4 transition-transform", isOpen ? "rotate-90" : "")} />
                    </button>
                    <div className={cn("grid transition-all duration-300", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                      <div className="overflow-hidden">
                        <div className="border-t border-border/60 p-4">
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue-mid/10 px-3 py-1.5 text-xs font-medium text-brand-blue-mid">
                              <Clock className="h-3 w-3 text-brand-gold" />{program.duration}
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue-mid/10 px-3 py-1.5 text-xs font-medium text-brand-blue-mid">
                              <Calendar className="h-3 w-3 text-brand-gold" />{program.start}
                            </span>
                          </div>
                          <h4 className="flex items-center gap-2 font-heading text-xs font-semibold text-brand-blue mb-2">
                            <ListChecks className="h-3.5 w-3.5 text-brand-gold" strokeWidth={1.75} />Môn học
                          </h4>
                          <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 mb-4 text-xs">
                            {program.subjects.map((s, j) => (
                              <li key={j} className="flex items-start gap-2 text-brand-dark/70">
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-gold" />{s}
                              </li>
                            ))}
                          </ul>
                          <div className="rounded-lg border border-brand-gold/20 bg-brand-gold/[0.04] p-3">
                            <h4 className="flex items-center gap-2 font-heading text-xs font-semibold text-brand-blue mb-1">
                              <UserCheck className="h-3.5 w-3.5 text-brand-gold" strokeWidth={1.75} />Điều kiện đầu vào
                            </h4>
                            <p className="text-xs leading-relaxed text-brand-dark/75">{program.entry}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </Container>
      </section>

    </div>
  )
}
