"use client"
import type { OnlineProgramPageData, OnlineWolverhamptonPageData } from "@/sanity/service-pages"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { Check, GraduationCap, Clock, Globe, Star, Users, ArrowRight, Building2, FileText, Briefcase, BookOpen, Calendar, ListChecks, UserCheck, ChevronRight, ChevronLeft } from "lucide-react"

import { getIcon } from "@/lib/icons"
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

const LEARNING_FORMATS = [
  { icon: Globe, title: "100% Online", desc: "Học hoàn toàn trực tuyến, không cần đến lớp, chủ động thời gian và địa điểm học tập." },
  { icon: Clock, title: "Học mọi lúc, mọi nơi", desc: "Linh hoạt sắp xếp lịch học theo thời gian biểu cá nhân, phù hợp với người đi làm." },
  { icon: FileText, title: "Tài liệu học tập điện tử", desc: "Toàn bộ giáo trình, bài giảng và tài nguyên được cung cấp qua nền tảng trực tuyến." },
  { icon: Users, title: "Giảng viên hướng dẫn", desc: "Đội ngũ giảng viên giàu kinh nghiệm hướng dẫn và hỗ trợ trực tuyến trong suốt khóa học." },
  { icon: Star, title: "Đánh giá đa dạng", desc: "Kết hợp bài tập, dự án và luận văn theo từng chương trình để đánh giá toàn diện năng lực." },
]

const TARGET_AUDIENCE = [
  { icon: GraduationCap, title: "Người đã tốt nghiệp đại học", desc: "Mong muốn nâng cao trình độ với bằng cấp chính quy từ trường đại học công lập Anh Quốc." },
  { icon: Building2, title: "Nhà quản lý & Lãnh đạo", desc: "Phát triển năng lực quản trị và tư duy chiến lược để dẫn dắt tổ chức trong môi trường toàn cầu." },
  { icon: Briefcase, title: "Người đi làm", desc: "Cần bằng cấp quốc tế để thăng tiến sự nghiệp mà không phải tạm dừng công việc hiện tại." },
  { icon: Globe, title: "Học viên hướng quốc tế", desc: "Có kế hoạch làm việc hoặc học tập trong môi trường đa quốc gia, cần bằng cấp được công nhận rộng rãi." },
  { icon: Clock, title: "Người cần linh hoạt", desc: "Chương trình học trực tuyến đảm bảo chất lượng giáo dục Anh Quốc với lịch trình cá nhân hóa." },
]

const BENEFITS = [
  {
    title: "Bằng cấp chính quy trực tiếp",
    desc: "Bằng được cấp trực tiếp bởi University of Wolverhampton, trường đại học công lập với hơn 190 năm lịch sử.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Chuẩn giáo dục Anh Quốc",
    desc: "Chương trình đào tạo bám sát khung tiêu chuẩn giáo dục Vương quốc Anh, được công nhận toàn cầu.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Học tập linh hoạt",
    desc: "100% trực tuyến, chủ động thời gian, không gián đoạn công việc hiện tại.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Phát triển năng lực toàn diện",
    desc: "Nâng cao kỹ năng quản lý, nghiên cứu và chuyên môn thông qua chương trình học ứng dụng thực tiễn.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Cơ hội thăng tiến quốc tế",
    desc: "Gia tăng lợi thế cạnh tranh, mở rộng cơ hội làm việc trong môi trường đa quốc gia.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Tiết kiệm chi phí tối đa",
    desc: "Tiết kiệm đáng kể so với du học toàn thời gian, không mất chi phí sinh hoạt tại nước ngoài.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80&auto=format&fit=crop",
  },
]

const STEPS = [
  { title: "Đăng ký tư vấn", desc: "Liên hệ với KVC Global để được tư vấn chi tiết về chương trình của University of Wolverhampton." },
  { title: "Đánh giá hồ sơ", desc: "Đội ngũ chuyên gia đánh giá hồ sơ học thuật, bằng cấp và kinh nghiệm làm việc của bạn." },
  { title: "Chuẩn bị hồ sơ", desc: "Hỗ trợ chuẩn bị và hoàn thiện hồ sơ nhập học theo yêu cầu của University of Wolverhampton." },
  { title: "Nhận thư mời", desc: "Nhận thư mời nhập học chính thức từ trường và hoàn tất các thủ tục cần thiết." },
  { title: "Bắt đầu học tập", desc: "Khởi đầu chương trình học trực tuyến, nhận bằng cấp chính quy từ trường đại học công lập Anh Quốc." },
]

const PROGRAMS: TimelineProgram[] = [
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

export function OnlineWolverhampton({ className, data }: { className?: string; data?: OnlineProgramPageData }) {
  const [activeProgramId, setActiveProgramId] = React.useState(0)

  // ── CMS data with hardcoded fallback ──
  const hero = data?.heroSection
  const heroBg = hero?.backgroundImage ?? HERO_BG
  const parentCrumb = hero?.parentBreadcrumb ?? "Khóa Học Online"
  const crumb = hero?.breadcrumb ?? "University of Wolverhampton"
  const tagline = hero?.tagline ?? "UNIVERSITY OF WOLVERHAMPTON"
  const heroTitle = hero?.title ?? "Học Đại học và Thạc sĩ Anh Quốc 100% Online cùng University of Wolverhampton"
  const heroSubtitle = hero?.subtitle ?? "Nhận bằng cấp chính quy từ một trường đại học công lập Vương quốc Anh với hình thức học linh hoạt, phù hợp cho người đi làm và sinh viên quốc tế."
  const heroDescription = hero?.description ?? "Thông qua KVC Global, học viên có cơ hội theo học các chương trình Top-up Bachelor, MBA và MSc của University of Wolverhampton, hoàn toàn trực tuyến. Trường có hơn 190 năm lịch sử và đào tạo hơn 24.000 sinh viên tại Anh và quốc tế."
  const heroBtnLabel = hero?.primaryButtonLabel ?? "Đăng ký tư vấn miễn phí"
  const heroBtnHref = hero?.primaryButtonHref ?? "/lien-he"

  const intro = data?.introSection
  const introTitle = intro?.title ?? "Giới thiệu về University of Wolverhampton"
  const introImage = intro?.image ?? "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80&auto=format&fit=crop"
  const introImageAlt = intro?.imageAlt ?? "University of Wolverhampton"
  const introParagraphs = intro?.paragraphs?.length
    ? intro.paragraphs
    : [
        "University of Wolverhampton là trường đại học công lập tại Vương quốc Anh, nổi tiếng với định hướng đào tạo thực tiễn, chú trọng phát triển kỹ năng nghề nghiệp và cơ hội việc làm cho sinh viên. Trường cung cấp nhiều chương trình đại học, sau đại học và đào tạo trực tuyến dành cho sinh viên quốc tế.",
      ]

  const whyTitle = data?.whySection?.title ?? "Vì sao chọn University of Wolverhampton?"
  const whyItems = data?.whySection?.items?.length
    ? data!.whySection!.items!.map((c, idx: number) => ({
        icon: getIcon(c.icon, WHY_ITEMS[idx]?.icon || Globe),
        title: c.title ?? "",
        desc: c.description ?? "",
      }))
    : WHY_ITEMS

  const wolverhamptonData = data as OnlineWolverhamptonPageData | undefined

  const supportTitle = wolverhamptonData?.kvcSupportSection?.title || data?.supportSection?.title || "Vì sao học qua KVC Global?"
  const supportItems = wolverhamptonData?.kvcSupportSection?.items?.length
    ? wolverhamptonData.kvcSupportSection.items
    : data?.supportSection?.items?.length
    ? data.supportSection.items
    : KVC_SUPPORT

  const formatSection = (data as OnlineWolverhamptonPageData)?.learningFormatsSection || (data as OnlineProgramPageData)?.formatSection
  const formatTitle = formatSection?.title ?? "Hình thức học"
  const formatItems = formatSection?.items?.length
    ? formatSection.items.map((c, idx: number) => ({
        icon: getIcon(c.icon, LEARNING_FORMATS[idx]?.icon || Globe),
        title: c.title ?? "",
        desc: c.description ?? "",
      }))
    : LEARNING_FORMATS

  const audienceSection = (data as OnlineWolverhamptonPageData)?.targetAudienceSection || (data as OnlineProgramPageData)?.audienceSection
  const audienceTitle = audienceSection?.title ?? "Đối tượng phù hợp"
  const audienceItems = audienceSection?.items?.length
    ? audienceSection.items.map((c) => ({
        title: c.title ?? "",
        desc: c.description ?? "",
      }))
    : TARGET_AUDIENCE

  const benefitsTitle = data?.benefitsSection?.title ?? "Lợi ích khi học tại University of Wolverhampton"
  const benefitsItems = data?.benefitsSection?.items?.length
    ? data!.benefitsSection!.items!.map((b, idx: number) => ({
        title: b.title ?? "",
        desc: b.description ?? "",
        image: (b.image && b.image.trim()) ? b.image : (BENEFITS[idx]?.image ?? BENEFITS[0]?.image),
      }))
    : BENEFITS

  const processTitle = data?.processSection?.title ?? "Quy trình đăng ký"
  const processSteps = data?.processSection?.steps?.length
    ? data!.processSection!.steps!.map((s) => ({ title: s.title ?? "", desc: s.description ?? "" }))
    : STEPS

  const programsItems = data?.programsSection?.items?.length
    ? data!.programsSection!.items!.map<TimelineProgram>((p) => ({
        name: p.name ?? "",
        duration: p.duration ?? "",
        start: p.startDates ?? "",
        subjects: p.subjects ?? [],
        entry: p.entryRequirements ?? "",
      }))
    : PROGRAMS
  const programsTitle = data?.programsSection?.title ?? "Các chương trình đào tạo"

  const activeProgram = programsItems[activeProgramId] || programsItems[0]
  const benefitsRef = React.useRef<HTMLDivElement>(null)
  const scrollBenefits = (dir: "left" | "right") => {
    const el = benefitsRef.current; if (!el) return
    if (dir === "left") {
      el.scrollTo({ left: Math.max(0, el.scrollLeft - el.clientWidth + 40), behavior: "smooth" })
    } else {
      el.scrollBy({ left: el.clientWidth - 40, behavior: "smooth" })
    }
  }

  return (
    <div className={cn("w-full", className)}>
      {/* ── Hero ── */}
      <section className="relative w-full overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }}>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-white from-30% to-transparent to-70%" />
        <Container className="relative flex min-h-[580px] flex-col justify-center pt-28 pb-20 md:min-h-[640px]">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6 flex flex-wrap items-center gap-1.5 font-body text-xs font-medium text-muted-foreground md:text-sm">
            <Link href="/" className="transition-colors duration-200 hover:text-foreground">Trang chủ</Link>
            <span className="select-none text-muted-foreground/60">&gt;</span>
            <Link href="/khoa-hoc-online" className="transition-colors duration-200 hover:text-foreground">{parentCrumb}</Link>
            <span className="select-none text-muted-foreground/60">&gt;</span>
            <span className="font-semibold text-foreground/80" aria-current="page">{crumb}</span>
          </motion.div>
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-3 inline-block font-heading text-xs font-bold tracking-wider text-brand-gold uppercase sm:text-sm">
              {tagline}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl md:text-5xl">
              {heroTitle}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-4 max-w-xl font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base md:text-[17px]">
              {heroSubtitle}
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }} className="mt-3 max-w-xl font-body text-sm leading-relaxed text-brand-dark/75">
              {heroDescription}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-8">
              <Link href={heroBtnHref} className="group inline-flex items-center gap-2 rounded-sm bg-brand-blue-mid px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue hover:shadow-lg">
                {heroBtnLabel}
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
                <Image src={introImage} alt={introImageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
              </div>
            </motion.div>
            <motion.div variants={fadeUpVariants} className="lg:col-span-7">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">{introTitle}</h2>
              {introParagraphs.map((paragraph, i) => (
                <p key={i} className={cn("font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base", i === 0 ? "mt-5" : "mt-4")}>
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ── Vì sao chọn? ── */}
      <section className="py-16 md:py-24">
        <Container className="max-w-none px-4 sm:px-5 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
          <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">{whyTitle}</h2>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {whyItems.map((item, i) => {
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

      {/* ── Vì sao học qua KVC? ── */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">{supportTitle}</h2>
              <p className="mt-3 font-body text-sm text-brand-dark/75">Đồng hành từ khi đăng ký đến khi tốt nghiệp</p>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="mx-auto max-w-3xl">
              <ul className="space-y-4">
                {supportItems.map((item, i) => (
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
      <section className="py-16 md:py-24">
        <Container className="max-w-none px-4 sm:px-5 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
          <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
              <motion.div variants={fadeUpVariants} className="mb-12 text-center">
                <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">{formatTitle}</h2>
                <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
              </motion.div>
              <div className="mx-auto max-w-5xl">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
                  {formatItems.map((item, i) => {
                    const Icon = item.icon
                    const total = formatItems.length
                    const colSpan =
                      total === 2
                        ? "lg:col-span-3"
                        : total === 3
                        ? "lg:col-span-2"
                        : total === 4
                        ? "lg:col-span-3"
                        : total === 5
                        ? i < 2
                          ? "lg:col-span-3"
                          : "lg:col-span-2"
                        : "lg:col-span-2"
                    return (
                      <motion.div
                        key={i}
                        variants={fadeUpVariants}
                        className={cn(
                          "group relative overflow-hidden rounded-xl border border-border/60 bg-white p-6 shadow-sm transition-all duration-500 ease-out",
                          "hover:-translate-y-1 hover:border-brand-blue/25 hover:shadow-lg",
                          colSpan,
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
                          {item.desc && (
                            <p className="mt-2 font-body text-xs leading-relaxed text-brand-dark/70 sm:text-sm">
                              {item.desc}
                            </p>
                          )}
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

      {/* ── Đối tượng phù hợp ── */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">{audienceTitle}</h2>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="mx-auto max-w-5xl">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {audienceItems.map((item, i) => {
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
                        {/* Number badge */}
                        <div className="flex items-start gap-4">
                          <span className="font-heading text-3xl font-extrabold text-brand-gold/15 leading-none select-none sm:text-4xl">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading text-[15px] font-bold text-brand-blue transition-colors duration-500 group-hover:text-brand-blue-mid">
                            {item.title}
                          </h3>
                          {item.desc ? (
                            <p className="mt-1.5 font-body text-xs leading-relaxed text-brand-dark/70 sm:text-sm">
                              {item.desc}
                            </p>
                          ) : null}
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
                <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">{benefitsTitle}</h2>
                <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
              </motion.div>
              <div className="relative group/scroll">
                <button type="button" onClick={() => scrollBenefits("left")} className="absolute -left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-white text-brand-blue shadow-md opacity-0 transition-all duration-300 hover:shadow-lg group-hover/scroll:opacity-100" aria-label="Previous">
                  <ChevronLeft className="h-5 w-5" strokeWidth={2} />
                </button>
                <button type="button" onClick={() => scrollBenefits("right")} className="absolute -right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-white text-brand-blue shadow-md opacity-0 transition-all duration-300 hover:shadow-lg group-hover/scroll:opacity-100" aria-label="Next">
                  <ChevronRight className="h-5 w-5" strokeWidth={2} />
                </button>
                <div ref={benefitsRef} className="overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"><div className="flex gap-6 w-max mx-auto px-2">
                  {benefitsItems.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUpVariants}
                    className="group w-[280px] shrink-0 snap-start overflow-hidden rounded-lg border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:w-[300px] xl:w-[350px]"
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
                </div>
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
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">{processTitle}</h2>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <div aria-hidden="true" className="absolute top-0 bottom-0 left-8 w-px bg-brand-blue-mid/[0.12] sm:left-10" />
                <div className="flex flex-col gap-0">
                  {processSteps.map((step, i) => {
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

      {/* ── Các chương trình đào tạo ── */}
      <section className="py-16 md:py-24">
        <Container className="max-w-none px-4 sm:px-5 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
          <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
              <motion.div variants={fadeUpVariants} className="mb-10 text-center">
                <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">{programsTitle}</h2>
                <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
              </motion.div>

              {/* Desktop: Tabs + Detail */}
              <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
                <div className="col-span-4 flex flex-col gap-2">
                  {programsItems.map((program, i) => {
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
                      <Image src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80&auto=format&fit=crop" alt={activeProgram.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 200px" />
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
                {programsItems.map((program, i) => {
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
          </div>
        </Container>
      </section>

    </div>
  )
}
