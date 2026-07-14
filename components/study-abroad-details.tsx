"use client"

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
} from "lucide-react"

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
    description:
      "Hoàn thành chương trình và nhận bằng chỉ trong 1 năm, ngắn hơn nhiều so với các lộ trình du học truyền thống.",
  },
  {
    icon: Wallet,
    title: "Vừa học vừa có thu nhập",
    description:
      "Trợ cấp thực tập từ 800 - 1.500 SGD/tháng, giúp trang trải một phần chi phí sinh hoạt.",
  },
  {
    icon: FileText,
    title: "Học phí linh hoạt",
    description:
      "Học phí có thể được đóng theo từng đợt, giảm áp lực tài chính cho gia đình.",
  },
  {
    icon: ENIcon,
    title: "Không yêu cầu IELTS",
    description:
      "Phù hợp với các bạn chưa có chứng chỉ tiếng Anh quốc tế, sẽ được học bổ trợ trong quá trình học.",
  },
  {
    icon: Briefcase,
    title: "Kinh nghiệm thực tế",
    description:
      "Thực tập tại doanh nghiệp, nhà hàng, khách sạn quốc tế ngay từ khi còn đi học.",
  },
  {
    icon: TrendingUp,
    title: "Cơ hội phát triển lâu dài",
    description:
      "Liên thông lên Cử nhân hoặc tìm kiếm việc làm, chuyển đổi sang các loại work pass phù hợp.",
  },
] as const

const MAJORS = [
  {
    name: "Tourism & Hospitality Management",
    icon: Hotel,
  },
  {
    name: "Food & Beverage Management / Operations",
    icon: Utensils,
  },
  {
    name: "Logistics & Retail Management",
    icon: Truck,
  },
  {
    name: "Công nghệ Thông tin (IT)",
    icon: Laptop,
  },
  {
    name: "Trí tuệ nhân tạo (AI)",
    icon: Brain,
  },
  {
    name: "Robotics",
    icon: Bot,
  },
  {
    name: "An ninh mạng (Cybersecurity)",
    icon: ShieldCheck,
  },
  {
    name: "Và nhiều ngành hấp dẫn khác",
    icon: PlusCircle,
  },
] as const

const REQUIREMENTS = [
  "Tốt nghiệp THPT",
  "18 - 35 tuổi",
  "Có khả năng giao tiếp tiếng Anh cơ bản (không bắt buộc IELTS/TOEFL ngay từ đầu)",
  "Đáp ứng các yêu cầu về sức khỏe và nhân thân theo quy định",
] as const

const GRADUATION_OPPORTUNITIES = [
  "Nhận bằng Diploma quốc tế, có giá trị liên thông toàn cầu.",
  "Tiếp tục học lên Cử nhân tại Singapore hoặc các nước khác.",
  "Tìm kiếm cơ hội việc làm chính thức tại Singapore, tùy năng lực và cơ hội thực tế tại thời điểm tốt nghiệp.",
  "Quay về Việt Nam làm việc với lợi thế bằng cấp quốc tế và kinh nghiệm thực tế.",
] as const

const SUPPORT_STEPS = [
  {
    icon: Compass,
    text: "Tư vấn chọn trường, chọn ngành phù hợp",
  },
  {
    icon: ClipboardList,
    text: "Hỗ trợ chuẩn bị hồ sơ đầy đủ, đúng yêu cầu",
  },
  {
    icon: FileSignature,
    text: "Hỗ trợ thủ tục xin visa du học",
  },
  {
    icon: UserCheck,
    text: "Kết nối doanh nghiệp thực tập uy tín",
  },
  {
    icon: Handshake,
    text: "Đồng hành xuyên suốt từ khi nộp hồ sơ đến khi hoàn thành chương trình",
  },
] as const

export function StudyAbroadDetails({ className }: { className?: string }) {
  return (
    <div className={cn("w-full bg-brand-light py-16 md:py-24", className)}>
      <div className="mx-auto w-full px-6">
        {/* Section 1: Introduction (Diploma 6+6 là gì?) */}
        <section
          aria-labelledby="intro-heading"
          className="grid grid-cols-1 items-center gap-10 md:gap-16 lg:grid-cols-12"
        >
          {/* Left Column: Image */}
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-brand shadow-lg lg:col-span-5">
            <Image
              src="/images/singapore-merlion-sunset.jpg"
              alt="Tượng Merlion và Marina Bay Sands tại Singapore"
              fill
              sizes="(max-w-1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
          </div>

          {/* Right Column: Text Content */}
          <div className="flex flex-col lg:col-span-7">
            <h2
              id="intro-heading"
              className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
            >
              Chương trình Diploma 6+6 là gì?
            </h2>

            <div className="mt-6 font-body text-sm leading-relaxed text-brand-dark/90 sm:text-base">
              <p>
                <strong className="font-semibold text-brand-blue">Diploma 6+6</strong> là mô hình đào tạo nghề tại Singapore, kết hợp giữa:
              </p>

              {/* Bullet Points */}
              <ul className="mt-4 space-y-3.5" aria-label="Cấu trúc chương trình">
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-gold bg-brand-gold/10">
                    <Check className="h-3 w-3 text-brand-gold" strokeWidth={3} />
                  </div>
                  <span>
                    <strong className="font-semibold text-brand-blue">6 tháng</strong> học lý thuyết tại trường
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-gold bg-brand-gold/10">
                    <Check className="h-3 w-3 text-brand-gold" strokeWidth={3} />
                  </div>
                  <span>
                    <strong className="font-semibold text-brand-blue">6 tháng</strong> thực tập hưởng lương tại các doanh nghiệp uy tín ở Singapore
                  </span>
                </li>
              </ul>

              <p className="mt-6">
                Sau khi hoàn thành, học viên nhận bằng Diploma quốc tế, tương đương bằng Cao đẳng tại Việt Nam, được công nhận và có giá trị liên thông lên Cử nhân tại Singapore và nhiều quốc gia khác.
              </p>

              <p className="mt-4">
                Đây là lộ trình được nhiều bạn trẻ Việt Nam lựa chọn vì thời gian học ngắn, chi phí hợp lý và có cơ hội tạo thu nhập ngay trong quá trình học.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Why Choose Us (Vì sao nên chọn Diploma 6+6?) */}
        <section
          aria-labelledby="benefits-heading"
          className="mt-20 md:mt-28"
        >
          <h2
            id="benefits-heading"
            className="text-center font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
          >
            Vì sao nên chọn Diploma 6+6?
          </h2>

          {/* Cards Grid */}
          <div className="mt-12 grid grid-cols-3 gap-8 sm:grid-cols-1 lg:grid-cols-6">
            {BENEFITS.map((benefit, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center rounded-2xl border border-border bg-white p-8 text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(10,37,64,0.1)]"
                >
                  {/* Icon Container */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-light">
                    <benefit.icon className="h-7 w-7 text-brand-blue" strokeWidth={1.75} />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-[16px] font-bold text-brand-blue sm:text-[17px]">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 font-body text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Section 3: Popular Majors & Entry Requirements */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Popular Majors Column */}
          <section
            aria-labelledby="majors-heading"
            className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] flex flex-col lg:col-span-6"
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
                    className="flex flex-col items-center justify-center border border-border/60 bg-white hover:bg-brand-light/40 rounded-xl p-4 text-center transition-all duration-300 hover:shadow-xs group min-h-[140px]"
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
          </section>

          {/* Entry Requirements Column */}
          <section
            aria-labelledby="reqs-heading"
            className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] flex flex-col justify-between overflow-hidden relative lg:col-span-6"
          >
            <div className="flex flex-col md:flex-row gap-6 h-full">
              {/* Left Content Area */}
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

                {/* Info Tip Banner */}
                <div className="bg-[#FFF8EE] border border-[#FFE7C4] rounded-xl p-4 flex gap-3 items-start mt-6">
                  <Lightbulb className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" strokeWidth={2} />
                  <p className="font-body text-xs md:text-sm text-brand-blue/90 leading-normal">
                    KVC Global sẽ tư vấn chi tiết điều kiện đầu vào phù hợp với từng trường và ngành học học viên quan tâm.
                  </p>
                </div>
              </div>

              {/* Mobile Portrait Image Container (visible only on mobile) */}
              <div className="relative h-[250px] w-full shrink-0 flex items-end justify-center overflow-hidden rounded-xl md:hidden">
                <Image
                  src="/images/student-portrait.jpg"
                  alt="Du học sinh KVC Global"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-bottom"
                />
              </div>
            </div>

            {/* Desktop Portrait Image Container (absolute positioned relative to section, visible only on desktop) */}
            <div className="absolute inset-y-0 right-0 hidden md:block md:w-[38%] lg:w-[35%] overflow-hidden z-0 pointer-events-none">
              <Image
                src="/images/student-portrait.jpg"
                alt="Du học sinh KVC Global"
                fill
                priority
                sizes="25vw"
                className="object-cover object-bottom"
              />
              {/* Faded overlay blending the image's left edge into the card's white background */}
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white via-white/40 to-transparent lg:w-28"
              />
            </div>
          </section>
        </div>

        {/* Section 4: Prospects & Support Journey */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Prospects Column (lg:col-span-5) */}
          <section
            aria-labelledby="prospects-heading"
            className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] flex flex-col justify-between overflow-hidden relative lg:col-span-5 min-h-[380px]"
          >
            <div className="relative z-10 flex flex-col justify-between h-full max-w-[72%] sm:max-w-[75%]">
              <div>
                <h2
                  id="prospects-heading"
                  className="font-heading text-xl font-bold text-brand-blue sm:text-2xl text-left"
                >
                  Sau khi tốt nghiệp, học viên có thể làm gì?
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

            {/* Graduation Cap illustration (absolute-positioned at bottom right corner, low opacity, transparent background) */}
            <div className="absolute bottom-0 right-0 h-[150px] w-[150px] sm:h-[180px] sm:w-[180px] lg:h-[205px] lg:w-[205px] pointer-events-none z-0 opacity-40">
              <Image
                src="/images/graduation-cap-transparent.png"
                alt="Bằng tốt nghiệp và mũ cử nhân"
                fill
                sizes="(max-w-768px) 150px, 205px"
                className="object-contain object-bottom object-right"
              />
            </div>
          </section>

          {/* Support Journey Column (lg:col-span-7) */}
          <section
            aria-labelledby="journey-heading"
            className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] flex flex-col lg:col-span-7"
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

            {/* Steps flow (horizontal on desktop/lg, vertical on mobile/md) */}
            <div className="flex flex-col lg:flex-row items-stretch justify-between gap-2 mt-4">
              {SUPPORT_STEPS.map((step, idx) => {
                const Icon = step.icon
                const isLast = idx === SUPPORT_STEPS.length - 1
                return (
                  <div key={idx} className="flex flex-col lg:flex-row items-center w-full lg:w-auto flex-1">
                    {/* Step Card */}
                    <div className="flex flex-col items-center border border-border/60 bg-white hover:bg-brand-light/40 rounded-xl p-4 text-center transition-all duration-300 hover:shadow-xs group min-h-[160px] w-full flex-1 justify-center">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-light group-hover:bg-white transition-colors shrink-0">
                        <Icon className="h-5 w-5 text-brand-blue" strokeWidth={1.75} />
                      </div>
                      <span className="font-body text-[12px] md:text-[13px] font-bold text-brand-blue leading-normal">
                        {step.text}
                      </span>
                    </div>

                    {/* Arrow connector */}
                    {!isLast && (
                      <div className="my-2 lg:my-0 lg:mx-2 shrink-0 self-center">
                        {/* Downward arrow on mobile/tablet */}
                        <svg
                          className="h-5 w-5 text-muted-foreground/60 block lg:hidden animate-pulse"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        {/* Rightward arrow on desktop */}
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
          </section>
        </div>
      </div>
    </div>
  )
}
