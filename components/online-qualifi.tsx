"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { Check, GraduationCap, Globe, Star, Users, ArrowRight, TrendingUp, Monitor, FileText, Briefcase, Building2, Clock } from "lucide-react"

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

const HERO_BG = "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920&q=80&auto=format&fit=crop"

const WHY_ITEMS = [
  { icon: Globe, title: "Đối tác đào tạo chuyên nghiệp", desc: "KVC Global đồng hành cùng học viên trong suốt quá trình học tập với đội ngũ tư vấn giàu kinh nghiệm." },
  { icon: Star, title: "Học Online 100%", desc: "Học mọi lúc, mọi nơi. Không cần đến lớp. Chủ động thời gian. Phù hợp người đi làm." },
  { icon: Users, title: "Giảng viên hỗ trợ", desc: "Hướng dẫn làm Assignment. Theo sát tiến độ học tập. Giải đáp nhanh chóng." },
  { icon: TrendingUp, title: "Chi phí hợp lý", desc: "Tiết kiệm đáng kể so với du học trực tiếp nhưng vẫn sở hữu bằng cấp theo tiêu chuẩn Anh Quốc." },
]

const LEARNING_FORMATS = [
  { icon: Globe, title: "100% Online", desc: "Học mọi lúc, mọi nơi, chủ động thời gian, phù hợp người đi làm, không cần đến lớp." },
  { icon: FileText, title: "Tài liệu điện tử", desc: "Toàn bộ giáo trình, bài giảng và tài nguyên học tập được cung cấp dưới dạng số, truy cập dễ dàng." },
  { icon: Monitor, title: "Hệ thống LMS", desc: "Nền tảng quản lý học tập hiện đại, giao diện thân thiện, hỗ trợ học tập trên mọi thiết bị." },
  { icon: Star, title: "Đánh giá qua Assignment", desc: "Hình thức đánh giá linh hoạt thông qua bài tập thay vì thi viết truyền thống (tùy chương trình)." },
  { icon: Users, title: "Hỗ trợ trực tuyến", desc: "Đội ngũ giảng viên và cố vấn học tập luôn sẵn sàng hỗ trợ, giải đáp thắc mắc kịp thời." },
]

const LEARNING_FORMAT = [
  "100% Online",
  "Tài liệu điện tử",
  "Học qua hệ thống LMS",
  "Làm Assignment thay cho thi viết (tùy chương trình)",
  "Hỗ trợ trực tuyến từ giảng viên và cố vấn học tập",
]

const TARGET_AUDIENCE = [
  { icon: GraduationCap, title: "Sinh viên", desc: "Mong muốn sở hữu bằng cấp quốc tế được công nhận rộng rãi để khởi đầu sự nghiệp thuận lợi." },
  { icon: Briefcase, title: "Người đi làm", desc: "Cần nâng cao trình độ chuyên môn và kỹ năng thực tiễn mà không phải tạm dừng công việc." },
  { icon: Building2, title: "Chủ doanh nghiệp", desc: "Phát triển năng lực quản lý và tư duy chiến lược để dẫn dắt doanh nghiệp vươn xa." },
  { icon: Globe, title: "Người có kế hoạch du học", desc: "Chuẩn bị nền tảng vững chắc để chuyển tiếp lên các chương trình tại Anh và quốc tế." },
  { icon: Clock, title: "Người cần linh hoạt", desc: "Học tập đạt chuẩn giáo dục Anh Quốc với lịch trình hoàn toàn chủ động và cá nhân hóa." },
]

const BENEFITS = [
  {
    title: "Chứng chỉ chuẩn Anh Quốc",
    desc: "Văn bằng được Ofqual công nhận và quản lý, đảm bảo chất lượng theo khung trình độ Anh Quốc (RQF).",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Học tập linh hoạt",
    desc: "Chủ động sắp xếp thời gian học, phù hợp với lịch trình cá nhân và công việc bận rộn.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Phù hợp người đi làm",
    desc: "Thiết kế dành riêng cho người vừa học vừa làm, không cần đến lớp, không gián đoạn công việc.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Tiết kiệm chi phí",
    desc: "Chi phí hợp lý, tiết kiệm đáng kể so với du học trực tiếp nhưng vẫn sở hữu bằng cấp quốc tế.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Cơ hội nghề nghiệp rộng mở",
    desc: "Nâng cao năng lực cạnh tranh, mở rộng cơ hội thăng tiến trong môi trường làm việc quốc tế.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Lộ trình chuyển tiếp đại học",
    desc: "Đủ điều kiện chuyển tiếp lên các chương trình Cử nhân và Thạc sĩ tại nhiều trường đối tác.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90109c73f?w=600&q=80&auto=format&fit=crop",
  },
]

const STEPS = [
  { title: "Đăng ký tư vấn", desc: "Liên hệ với KVC Global để được tư vấn chi tiết về chương trình QUALIFI và định hướng học tập." },
  { title: "Đánh giá hồ sơ", desc: "Đội ngũ chuyên gia đánh giá trình độ, kinh nghiệm và mục tiêu để đưa ra lời khuyên phù hợp." },
  { title: "Chọn chương trình", desc: "Lựa chọn chương trình QUALIFI phù hợp với năng lực và kế hoạch phát triển sự nghiệp." },
  { title: "Hoàn tất nhập học", desc: "Hoàn thiện thủ tục đăng ký, kích hoạt tài khoản học tập trên nền tảng trực tuyến." },
  { title: "Bắt đầu học tập", desc: "Khởi đầu hành trình học trực tuyến với sự hỗ trợ liên tục từ giảng viên và cố vấn học tập." },
]

const PROGRAMS: TimelineProgram[] = [
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

      {/* ── Cơ hội học tiếp ── */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Cơ hội học tiếp</h2>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="mx-auto max-w-5xl">
              <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
                {/* Image */}
                <motion.div variants={fadeUpVariants} className="lg:col-span-7">
                  <div className="relative aspect-4/3 overflow-hidden rounded-xl shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80&auto=format&fit=crop"
                      alt="Học viên tốt nghiệp và cơ hội chuyển tiếp"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                  </div>
                </motion.div>
                {/* Content */}
                <motion.div variants={fadeUpVariants} className="lg:col-span-5">
                  <p className="font-body text-sm leading-relaxed text-brand-dark/80 sm:text-base">
                    Sau khi hoàn thành các chương trình QUALIFI từ Level 4 trở lên, học viên có thể đủ điều kiện chuyển tiếp lên các chương trình đại học hoặc sau đại học tại nhiều trường đối tác theo quy định của từng trường.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {["Đại học", "Thạc sĩ", "MBA", "Tiến sĩ"].map((level) => (
                      <span key={level} className="inline-flex items-center rounded-full border border-brand-gold/20 bg-brand-gold/[0.04] px-4 py-1.5 font-body text-sm font-medium text-brand-blue-mid">
                        {level}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex items-center gap-4 rounded-lg border border-brand-gold/15 bg-brand-gold/[0.03] p-5">
                    <GraduationCap className="h-8 w-8 shrink-0 text-brand-gold" strokeWidth={1.5} />
                    <div>
                      <p className="font-heading text-sm font-semibold text-brand-blue">
                        Bằng cấp được công nhận quốc tế
                      </p>
                      <p className="mt-1 font-body text-xs text-brand-dark/70">
                        Liên kết với hơn 100 trường đại học đối tác trên toàn cầu
                      </p>
                    </div>
                  </div>
                </motion.div>
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
                        <div className="flex items-start gap-4">
                          <span className="font-heading text-3xl font-extrabold text-brand-gold/15 leading-none select-none sm:text-4xl">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
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

      {/* ── Lợi ích ── */}
      <section className="py-16 md:py-24">
        <Container className="max-w-none px-4 sm:px-5 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
          <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
              <motion.div variants={fadeUpVariants} className="mb-10 text-center">
                <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Lợi ích khi học QUALIFI</h2>
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
          </div>
        </Container>
      </section>

      {/* ── Quy trình đăng ký ── */}
      <section className="bg-white py-16 md:py-24">
        <Container>
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
        </Container>
      </section>

      {/* ── Level Programs ── */}
      <section className="py-16 md:py-24">
        <Container className="max-w-none px-4 sm:px-5 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
          <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-4 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">Các chương trình QUALIFI</h2>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <ExpandableTimeline programs={PROGRAMS} />
          </motion.div>
          </div>
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
