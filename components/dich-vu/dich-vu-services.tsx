"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import {
  ArrowRight,
  Building2,
  GraduationCap,
  MapPin,
  Landmark,
} from "lucide-react"

import { Container } from "@/components/ui/container"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
}

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const inView = { once: true, margin: "-80px" } as const

const SERVICE_SECTIONS = [
  {
    id: "vietnam",
    icon: MapPin,
    tag: "Việt Nam",
    heading: "Thành lập & vận hành",
    headingAccent: "công ty tại Việt Nam",
    background: "bg-white",
    description: [
      "KVC Global đồng hành cùng doanh nhân quốc tế trong việc thành lập và vận hành công ty tại Việt Nam một cách nhanh chóng, đúng pháp luật. Từ khâu chuẩn bị hồ sơ pháp lý, đăng ký kinh doanh, đến tư vấn thuế và kế toán — chúng tôi cung cấp giải pháp trọn gói giúp bạn tập trung vào phát triển kinh doanh.",
      "Với hơn 10 năm kinh nghiệm tại thị trường Việt Nam, đội ngũ chuyên gia của KVC Global am hiểu sâu sắc môi trường pháp lý và văn hóa kinh doanh địa phương, đảm bảo doanh nghiệp của bạn vận hành thuận lợi ngay từ ngày đầu.",
    ],
    image: "/images/dat-nuoc-singapore-01.jpg",
    imageAlt: "Thành lập công ty tại Việt Nam cùng KVC Global",
    cta: { href: "/lien-he", label: "Tư vấn thành lập công ty" },
  },
  {
    id: "singapore",
    icon: Landmark,
    tag: "Singapore",
    heading: "Thành lập công ty, Work Pass &",
    headingAccent: "giải pháp doanh nghiệp toàn diện",
    background: "bg-brand-light",
    description: [
      "Singapore là cửa ngõ chiến lược để doanh nghiệp vươn ra thị trường quốc tế. KVC Global cung cấp dịch vụ thành lập công ty, đăng ký cơ cấu doanh nghiệp, xin Work Pass và Visa cho chủ doanh nghiệp cùng nhân sự nước ngoài.",
      "Ngoài ra, chúng tôi còn hỗ trợ tìm kiếm văn phòng, bất động sản thương mại và tuyển dụng nhân sự chất lượng cao — tất cả trong một giải pháp tích hợp, giúp doanh nghiệp của bạn nhanh chóng hiện diện và phát triển bền vững tại đảo quốc sư tử.",
    ],
    image: "/images/singapore-flyer.jpg",
    imageAlt: "Dịch vụ doanh nghiệp tại Singapore",
    cta: { href: "/lien-he", label: "Khám phá giải pháp Singapore" },
  },
  {
    id: "cross",
    icon: Building2,
    tag: "Dịch vụ liên kết chéo",
    heading: "Tư vấn giáo dục cho",
    headingAccent: "gia đình chủ doanh nghiệp",
    background: "bg-white",
    description: [
      "Khi doanh nhân quốc tế chuyển đến Singapore sinh sống và làm việc, việc tìm kiếm môi trường giáo dục phù hợp cho con em là một ưu tiên hàng đầu. KVC Global kết nối gia đình doanh nhân với các chương trình du học chất lượng cao, từ bậc phổ thông đến đại học và sau đại học.",
      "Chúng tôi tư vấn lộ trình học tập cá nhân hóa, hỗ trợ thủ tục nhập học và đồng hành cùng gia đình trong suốt quá trình học tập tại Singapore — để bạn an tâm phát triển sự nghiệp trong khi con em nhận được nền giáo dục tốt nhất.",
    ],
    image: "/images/student-portrait.jpg",
    imageAlt: "Tư vấn du học cho gia đình doanh nhân",
    cta: {
      href: "/du-hoc",
      label: "Tìm hiểu chương trình du học",
      icon: GraduationCap,
    },
  },
] as const

export function DichVuServices() {
  return (
    <>
      {/* ───────── Section header ───────── */}
      <section className="w-full bg-white pt-20 pb-10 sm:pt-24 sm:pb-12 md:pt-28">
        <Container>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            className="flex flex-col items-center text-center"
          >
            <p className="text-sm font-semibold tracking-[0.24em] text-brand-gold uppercase">
              Dịch vụ của chúng tôi
            </p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl">
              Giải pháp theo từng thị trường
            </h2>
            <span className="mt-4 block h-1 w-12 rounded-sm bg-brand-gold" />
          </motion.div>
        </Container>
      </section>

      {/* ───────── 3 service sections (Câu chuyện KVC Global style) ───────── */}
      {SERVICE_SECTIONS.map((section, idx) => {
        const Icon = section.icon
        const isEven = idx % 2 !== 0

        return (
          <section
            key={section.id}
            id={section.id}
            className={`w-full py-16 sm:py-20 md:py-24 ${section.background}`}
          >
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={inView}
            >
              <Container
                className={`grid items-center gap-10 sm:gap-12 md:grid-cols-2 ${
                  isEven ? "md:*:last:order-first" : ""
                }`}
              >
                {/* Text column */}
                <motion.div variants={fadeUp} className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-blue-mid">
                      <Icon
                        className="h-5 w-5 text-brand-gold-light"
                        strokeWidth={1.75}
                      />
                    </div>
                    <p className="text-sm font-semibold tracking-[0.24em] text-brand-gold uppercase">
                      {section.tag}
                    </p>
                  </div>
                  <h2 className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-brand-blue sm:text-3xl md:text-4xl">
                    {section.heading}
                    <span className="block text-brand-gold">
                      {section.headingAccent}
                    </span>
                  </h2>
                  <div className="mt-5 space-y-4">
                    {section.description.map((para) => (
                      <p
                        key={para}
                        className="text-sm leading-relaxed text-brand-dark/80 sm:text-base"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                  {section.cta && (
                    <Link
                      href={section.cta.href}
                      className="group mt-8 inline-flex w-fit items-center gap-2 rounded-sm bg-brand-blue-mid px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue hover:shadow-lg sm:px-7 sm:py-3.5"
                    >
                      {"icon" in section.cta && (
                        <GraduationCap className="h-4 w-4" />
                      )}
                      {section.cta.label}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </motion.div>

                {/* Image column */}
                <motion.div
                  variants={fadeUp}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-[0_24px_60px_-24px_rgba(15,27,45,0.18)] sm:aspect-[3/2]"
                >
                  <Image
                    src={section.image}
                    alt={section.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </motion.div>
              </Container>
            </motion.div>
          </section>
        )
      })}
    </>
  )
}
