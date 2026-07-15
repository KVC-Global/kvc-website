"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import {
  Clock,
  Wallet,
  FileText,
  Briefcase,
  TrendingUp,
  Check,
  Hotel,
  Utensils,
  Truck,
  Laptop,
  Brain,
  Bot,
  ShieldCheck,
  PlusCircle,
  Lightbulb,
  Compass,
  ClipboardList,
  FileSignature,
  UserCheck,
  Handshake,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  GraduationCap,
  IdCard,
  Building2,
} from "lucide-react"
import { motion, useInView, Variants } from "framer-motion"

import { cn } from "@/lib/utils"

const ENIcon = (props: any) => (
  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-blue font-heading text-[11px] font-extrabold text-brand-blue tracking-tight select-none">
    EN
  </div>
)

const BENEFITS = [
  {
    icon: Clock,
    title: "Tiết kiệm thời gian",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    icon: Wallet,
    title: "Vừa học vừa làm",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    icon: FileText,
    title: "Chi phí linh hoạt",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    icon: ENIcon,
    title: "Hỗ trợ Tiếng Anh",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    icon: Briefcase,
    title: "Ứng dụng thực tế",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    icon: TrendingUp,
    title: "Cơ hội phát triển",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
] as const

const MAJORS = [
  { name: "Business Management", icon: Building2 },
  { name: "Information Technology", icon: Laptop },
  { name: "Data Science", icon: Brain },
  { name: "Digital Marketing", icon: TrendingUp },
  { name: "Cybersecurity", icon: ShieldCheck },
  { name: "Logistics", icon: Truck },
  { name: "Hospitality", icon: Hotel },
  { name: "Và nhiều ngành khác", icon: PlusCircle },
] as const

const REQUIREMENTS = [
  "Lorem ipsum dolor sit amet",
  "Consectetur adipiscing elit",
  "Sed do eiusmod tempor incididunt",
  "Ut labore et dolore magna aliqua",
] as const

const GRADUATION_OPPORTUNITIES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  "Nisi ut aliquip ex ea commodo consequat.",
] as const

const SUPPORT_STEPS = [
  { icon: Compass, text: "Lorem ipsum dolor sit amet" },
  { icon: ClipboardList, text: "Consectetur adipiscing elit" },
  { icon: FileSignature, text: "Sed do eiusmod tempor" },
  { icon: UserCheck, text: "Incididunt ut labore et" },
  { icon: Handshake, text: "Dolore magna aliqua ut enim" },
] as const

const TESTIMONIALS = [
  {
    name: "Lorem Ipsum",
    role: "Học viên Online",
    avatar: "/images/student-avatar-1.jpg",
    rating: 5,
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "Dolor Sit Amet",
    role: "Học viên Online",
    avatar: "/images/student-avatar-2.jpg",
    rating: 5,
    quote: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    name: "Consectetur Elit",
    role: "Học viên Online",
    avatar: "/images/student-avatar-3.jpg",
    rating: 5,
    quote: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
] as const

const FAQS = [
  {
    question: "Lorem ipsum dolor sit amet?",
    answer: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    question: "Quis nostrud exercitation ullamco?",
    answer: "Laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.",
  },
  {
    question: "Velit esse cillum dolore eu fugiat?",
    answer: "Nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.",
  },
  {
    question: "Anim id est laborum?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
] as const

const RELATED_SERVICES = [
  { title: "Khóa học ngắn hạn", ctaText: "Tìm hiểu", icon: GraduationCap, href: "#" },
  { title: "Tư vấn hướng nghiệp", ctaText: "Khám phá", icon: Briefcase, href: "#" },
  { title: "Chứng chỉ quốc tế", ctaText: "Tìm hiểu", icon: IdCard, href: "#" },
  { title: "Hỗ trợ doanh nghiệp", ctaText: "Tìm hiểu", icon: Building2, href: "#" },
] as const

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export function OnlineDetails({ className }: { className?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const handleScroll = (dir: "left" | "right") => {
    const container = scrollRef.current
    if (container) {
      const cardWidth = container.firstElementChild
        ? (container.firstElementChild as HTMLElement).offsetWidth + 24
        : 300
      const scrollAmount = dir === "left" ? -cardWidth : cardWidth
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const updateActiveDot = () => {
    const container = scrollRef.current
    if (container) {
      const scrollLeft = container.scrollLeft
      const cardWidth = container.firstElementChild
        ? (container.firstElementChild as HTMLElement).offsetWidth + 24
        : 300
      const index = Math.round(scrollLeft / cardWidth)
      setActiveIdx(index)
    }
  }

  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({})
  const toggleFaq = (idx: number) => {
    setOpenFaqs((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  return (
    <div className={cn("w-full bg-brand-light py-16 md:py-24", className)}>
      <div className="mx-auto w-full max-w-[1280px] px-6">
        {/* Section 1: Introduction */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          aria-labelledby="intro-heading"
          className="grid grid-cols-1 items-center gap-10 md:gap-16 lg:grid-cols-12"
        >
          <motion.div variants={fadeUpVariants} className="relative aspect-16/10 w-full overflow-hidden rounded-lg shadow-lg lg:col-span-5">
            <Image
              src="/images/singapore-merlion-sunset.jpg"
              alt="Học trực tuyến hiệu quả"
              fill
              sizes="(max-w-1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
          </motion.div>

          <motion.div variants={fadeUpVariants} className="flex flex-col lg:col-span-7">
            <h2
              id="intro-heading"
              className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
            >
              Chương trình Học Online là gì?
            </h2>

            <div className="mt-6 font-body text-sm leading-relaxed text-brand-dark/90 sm:text-base">
              <p>
                <strong className="font-semibold text-brand-blue">Học Online</strong> mang lại sự linh hoạt tối đa:
              </p>

              <ul className="mt-4 space-y-3.5" aria-label="Đặc điểm chương trình">
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-gold bg-brand-gold/10">
                    <Check className="h-3 w-3 text-brand-gold" strokeWidth={3} />
                  </div>
                  <span>
                    <strong className="font-semibold text-brand-blue">Học mọi lúc mọi nơi</strong> không giới hạn địa lý
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-gold bg-brand-gold/10">
                    <Check className="h-3 w-3 text-brand-gold" strokeWidth={3} />
                  </div>
                  <span>
                    <strong className="font-semibold text-brand-blue">Chất lượng quốc tế</strong> bằng cấp được công nhận
                  </span>
                </li>
              </ul>

              <p className="mt-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Section 2: Benefits */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          aria-labelledby="benefits-heading"
          className="mt-20 md:mt-28"
        >
          <motion.h2
            variants={fadeUpVariants}
            id="benefits-heading"
            className="text-center font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
          >
            Vì sao nên chọn Học Online?
          </motion.h2>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {BENEFITS.map((benefit, index) => (
              <motion.div
                variants={fadeUpVariants}
                key={index}
                className="flex flex-col items-center rounded-lg border border-border bg-white p-8 text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(10,37,64,0.1)]"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-light">
                  <benefit.icon className="h-7 w-7 text-brand-blue" strokeWidth={1.75} />
                </div>
                <h3 className="font-heading text-[16px] font-bold text-brand-blue sm:text-[17px]">
                  {benefit.title}
                </h3>
                <p className="mt-3 font-body text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 3: Majors & Requirements */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-8 md:mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12"
        >
          <motion.section
            variants={fadeUpVariants}
            aria-labelledby="majors-heading"
            className="bg-white border border-border rounded-lg p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] flex flex-col lg:col-span-6"
          >
            <div className="text-center mb-8">
              <h2
                id="majors-heading"
                className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
              >
                Ngành học phổ biến
              </h2>
              <div className="mx-auto mt-2 h-0.5 w-12 bg-brand-gold rounded-full" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {MAJORS.map((major, idx) => {
                const Icon = major.icon
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center border border-border/60 bg-white hover:bg-brand-light/40 rounded-md p-4 text-center transition-all duration-300 hover:shadow-xs group min-h-[140px]"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-light group-hover:bg-white transition-colors">
                      <Icon className="h-5 w-5 text-brand-blue" strokeWidth={1.75} />
                    </div>
                    <span className="font-heading text-[12px] md:text-[13px] font-bold text-brand-blue leading-tight">
                      {major.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </motion.section>

          <motion.section
            variants={fadeUpVariants}
            aria-labelledby="reqs-heading"
            className="bg-white border border-border rounded-lg p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] flex flex-col justify-between overflow-hidden relative lg:col-span-6"
          >
            <div className="flex flex-col md:flex-row gap-6 h-full">
              <div className="flex-1 z-10 flex flex-col justify-between gap-6 lg:max-w-[62%]">
                <div>
                  <div className="text-center md:text-left mb-8">
                    <h2
                      id="reqs-heading"
                      className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
                    >
                      Điều kiện tham gia
                    </h2>
                    <div className="mt-2 h-0.5 w-12 bg-brand-gold rounded-full mx-auto md:mx-0" />
                  </div>

                  <ul className="space-y-4" aria-label="Điều kiện tham gia">
                    {REQUIREMENTS.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-500 bg-emerald-50 text-emerald-600">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </div>
                        <span className="font-body text-[14px] md:text-[15px] leading-relaxed text-brand-dark/90">
                          {req}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#FFF8EE] border border-[#FFE7C4] rounded-md p-4 flex gap-3 items-start mt-6">
                  <Lightbulb className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" strokeWidth={2} />
                  <p className="font-body text-xs md:text-sm text-brand-blue/90 leading-normal">
                    KVC Global sẽ tư vấn chi tiết điều kiện đầu vào phù hợp với từng trường và ngành học học viên quan tâm.
                  </p>
                </div>
              </div>

              <div className="relative h-[250px] w-full shrink-0 flex items-end justify-center overflow-hidden rounded-md md:hidden">
                <Image
                  src="/images/student-portrait.jpg"
                  alt="Học viên"
                  fill
                  sizes="100vw"
                  className="object-cover object-bottom"
                />
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 hidden md:block md:w-[38%] lg:w-[35%] overflow-hidden z-0 pointer-events-none">
              <Image
                src="/images/student-portrait.jpg"
                alt="Học viên"
                fill
                sizes="25vw"
                className="object-cover object-bottom"
              />
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white via-white/40 to-transparent lg:w-28"
              />
            </div>
          </motion.section>
        </motion.div>

        {/* Section 4: Prospects & Support Journey */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-8 md:mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12"
        >
          <motion.section
            variants={fadeUpVariants}
            aria-labelledby="prospects-heading"
            className="bg-white border border-border rounded-lg p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] flex flex-col justify-between overflow-hidden relative lg:col-span-5 min-h-[380px]"
          >
            <div className="relative z-10 flex flex-col justify-between h-full max-w-[72%] sm:max-w-[75%]">
              <div>
                <h2
                  id="prospects-heading"
                  className="font-heading text-xl font-bold text-brand-blue sm:text-2xl text-left"
                >
                  Cơ hội sau khi tốt nghiệp
                </h2>
                <div className="mt-2 h-0.5 w-12 bg-brand-gold rounded-full" />

                <ul className="mt-8 space-y-4" aria-label="Cơ hội sau tốt nghiệp">
                  {GRADUATION_OPPORTUNITIES.map((opp, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-gold bg-brand-gold/10">
                        <Check className="h-3 w-3 text-brand-gold" strokeWidth={3} />
                      </div>
                      <span className="font-body text-[14px] md:text-[15px] leading-relaxed text-brand-dark/90">
                        {opp}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="absolute bottom-0 right-0 h-[150px] w-[150px] sm:h-[180px] sm:w-[180px] lg:h-[205px] lg:w-[205px] pointer-events-none z-0 opacity-40">
              <Image
                src="/images/graduation-cap-transparent.png"
                alt="Bằng tốt nghiệp"
                fill
                sizes="(max-w-768px) 150px, 205px"
                className="object-contain object-bottom object-right"
              />
            </div>
          </motion.section>

          <motion.section
            variants={fadeUpVariants}
            aria-labelledby="journey-heading"
            className="bg-white border border-border rounded-lg p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] flex flex-col lg:col-span-7"
          >
            <div className="text-center mb-8">
              <h2
                id="journey-heading"
                className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
              >
                KVC Global đồng hành cùng bạn
              </h2>
              <div className="mx-auto mt-2 h-0.5 w-12 bg-brand-gold rounded-full" />
            </div>

            <div className="flex flex-col lg:flex-row items-stretch justify-between gap-2 mt-4">
              {SUPPORT_STEPS.map((step, idx) => {
                const Icon = step.icon
                const isLast = idx === SUPPORT_STEPS.length - 1
                return (
                  <div key={idx} className="flex flex-col lg:flex-row items-center w-full lg:w-auto flex-1">
                    <div className="flex flex-col items-center border border-border/60 bg-white hover:bg-brand-light/40 rounded-md p-4 text-center transition-all duration-300 hover:shadow-xs group min-h-[160px] w-full flex-1 justify-center">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-light group-hover:bg-white transition-colors shrink-0">
                        <Icon className="h-5 w-5 text-brand-blue" strokeWidth={1.75} />
                      </div>
                      <span className="font-body text-[12px] md:text-[13px] font-bold text-brand-blue leading-normal">
                        {step.text}
                      </span>
                    </div>

                    {!isLast && (
                      <div className="my-2 lg:my-0 lg:mx-2 shrink-0 self-center">
                        <svg
                          className="h-5 w-5 text-muted-foreground/60 block lg:hidden animate-pulse"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        <svg
                          className="h-5 w-5 text-muted-foreground/60 hidden lg:block"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.section>
        </motion.div>

        {/* Section 5: Student Testimonials Slider */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          aria-labelledby="testimonials-heading"
          className="mt-20 md:mt-28"
        >
          <motion.div variants={fadeUpVariants} className="text-center mb-10">
            <h2
              id="testimonials-heading"
              className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
            >
              Học viên nói gì về Khóa Học Online?
            </h2>
            <div className="mx-auto mt-2.5 h-0.5 w-12 bg-brand-gold rounded-full" />
          </motion.div>

          <motion.div variants={fadeUpVariants} className="relative group/nav px-0 md:px-8">
            <button
              onClick={() => handleScroll("left")}
              aria-label="Previous testimonial"
              className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-brand-blue shadow-sm hover:bg-brand-light transition-all hover:scale-105 z-10 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
            </button>

            <div
              ref={scrollRef}
              onScroll={updateActiveDot}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none gap-6 py-2 px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {TESTIMONIALS.map((testi, idx) => (
                <div
                  key={idx}
                  className="snap-start shrink-0 w-[90%] sm:w-[46%] lg:w-[31.5%] border border-border bg-white rounded-lg p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-10px_rgba(10,37,64,0.08)] transition-all duration-300 relative flex flex-col justify-between overflow-hidden min-h-[220px]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-2 right-4 font-serif text-[110px] leading-none text-brand-blue/5 select-none pointer-events-none"
                  >
                    “
                  </span>

                  <div className="flex gap-4 relative z-10">
                    <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-full border border-border/80 shadow-xs bg-brand-light">
                      <Image
                        src={testi.avatar}
                        alt={testi.name}
                        fill
                        sizes="(max-w-768px) 56px, 64px"
                        className="object-cover object-center"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex gap-0.5 mb-2.5" aria-label={`Đánh giá ${testi.rating} sao`}>
                          {Array.from({ length: testi.rating }).map((_, i) => (
                            <span key={i} className="text-amber-400 text-[14px]">★</span>
                          ))}
                        </div>

                        <blockquote className="font-body text-[13px] sm:text-[14px] leading-relaxed text-brand-dark/85 mb-4 italic">
                          "{testi.quote}"
                        </blockquote>
                      </div>

                      <div>
                        <cite className="font-heading text-sm font-bold text-brand-blue not-italic block">
                          {testi.name}
                        </cite>
                        <span className="font-body text-[11px] md:text-[12px] text-muted-foreground block mt-0.5">
                          {testi.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleScroll("right")}
              aria-label="Next testimonial"
              className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-brand-blue shadow-sm hover:bg-brand-light transition-all hover:scale-105 z-10 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
            </button>
          </motion.div>

          <motion.div variants={fadeUpVariants} className="flex justify-center gap-2 mt-8" aria-hidden="true">
            {TESTIMONIALS.map((_, idx) => {
              const isActive = activeIdx === idx
              return (
                <button
                  key={idx}
                  onClick={() => {
                    const container = scrollRef.current
                    if (container) {
                      const cardWidth = container.firstElementChild
                        ? (container.firstElementChild as HTMLElement).offsetWidth + 24
                        : 300
                      container.scrollTo({ left: cardWidth * idx, behavior: "smooth" })
                    }
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 cursor-pointer",
                    isActive ? "w-6 bg-brand-gold" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              )
            })}
          </motion.div>
        </motion.section>

        {/* Section 6: FAQ Accordion Section */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          aria-labelledby="faq-heading"
          className="mt-20 md:mt-28"
        >
          <motion.div variants={fadeUpVariants} className="text-left mb-8">
            <h2
              id="faq-heading"
              className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
            >
              Câu hỏi thường gặp
            </h2>
            <div className="mt-2 h-0.5 w-12 bg-brand-gold rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2 mt-8">
            <motion.div variants={fadeUpVariants} className="flex flex-col gap-4">
              {FAQS.slice(0, 2).map((faq, index) => {
                const globalIdx = index
                const isOpen = !!openFaqs[globalIdx]
                return (
                  <div
                    key={globalIdx}
                    className="bg-white border border-border/60 rounded-lg overflow-hidden transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]"
                  >
                    <button
                      onClick={() => toggleFaq(globalIdx)}
                      aria-expanded={isOpen}
                      className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 font-heading text-[14px] md:text-[15px] font-bold text-brand-blue hover:text-brand-gold transition-colors duration-200 cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-brand-blue/60 shrink-0 transition-transform duration-300",
                          isOpen && "transform rotate-180"
                        )}
                        strokeWidth={2.5}
                      />
                    </button>

                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-in-out text-brand-dark/85 font-body text-xs md:text-sm",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="p-5 md:p-6 pt-0 leading-relaxed border-t border-border/20">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </motion.div>

            <motion.div variants={fadeUpVariants} className="flex flex-col gap-4">
              {FAQS.slice(2, 4).map((faq, index) => {
                const globalIdx = index + 2
                const isOpen = !!openFaqs[globalIdx]
                return (
                  <div
                    key={globalIdx}
                    className="bg-white border border-border/60 rounded-lg overflow-hidden transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]"
                  >
                    <button
                      onClick={() => toggleFaq(globalIdx)}
                      aria-expanded={isOpen}
                      className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 font-heading text-[14px] md:text-[15px] font-bold text-brand-blue hover:text-brand-gold transition-colors duration-200 cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-brand-blue/60 shrink-0 transition-transform duration-300",
                          isOpen && "transform rotate-180"
                        )}
                        strokeWidth={2.5}
                      />
                    </button>

                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-in-out text-brand-dark/85 font-body text-xs md:text-sm",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="p-5 md:p-6 pt-0 leading-relaxed border-t border-border/20">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </motion.section>

        {/* Section 7: Related Services Section */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          aria-labelledby="related-services-heading"
          className="mt-20 md:mt-28"
        >
          <motion.div variants={fadeUpVariants} className="text-center mb-10">
            <h2
              id="related-services-heading"
              className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
            >
              Các dịch vụ liên quan
            </h2>
            <div className="mx-auto mt-2.5 h-0.5 w-12 bg-brand-gold rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            {RELATED_SERVICES.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.a
                  variants={fadeUpVariants}
                  key={index}
                  href={service.href}
                  className="flex items-center gap-4 bg-white border border-border/60 rounded-lg p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-10px_rgba(10,37,64,0.08)] hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-light group-hover:bg-brand-blue/5 transition-colors duration-300">
                    <Icon className="h-5 w-5 text-brand-blue group-hover:scale-105 transition-transform duration-300" strokeWidth={1.75} />
                  </div>

                  <div className="flex flex-col">
                    <span className="font-heading text-[14px] md:text-[15px] font-bold text-brand-blue leading-snug group-hover:text-brand-gold transition-colors duration-300">
                      {service.title}
                    </span>
                    <span className="font-body text-xs font-semibold text-brand-gold flex items-center gap-1.5 mt-1 leading-none group-hover:translate-x-0.5 transition-transform duration-300">
                      {service.ctaText}
                      <span className="text-[10px]">→</span>
                    </span>
                  </div>
                </motion.a>
              )
            })}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
