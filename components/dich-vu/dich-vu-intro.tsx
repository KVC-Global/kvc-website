"use client"

import { motion, Variants } from "framer-motion"
import {
  Building2,
  Globe2,
  GraduationCap,
  Scale,
  Users,
  Briefcase,
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
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const PILLARS = [
  { icon: Building2, label: "Thành lập\ndoanh nghiệp" },
  { icon: Scale, label: "Pháp lý" },
  { icon: Users, label: "Nhân sự" },
  { icon: Globe2, label: "Nhập cư" },
  { icon: GraduationCap, label: "Giáo dục" },
] as const

export function DichVuIntro() {
  return (
    <section
      aria-label="Giới thiệu dịch vụ"
      className="w-full bg-white pt-16 sm:pt-20 md:pt-24"
    >
      <Container>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-4xl"
        >
          {/* ── Section label ── */}
          <motion.div variants={fadeUp} className="text-center">
            <span className="inline-block rounded-sm bg-brand-blue-mid px-3 py-1 text-xs font-bold tracking-[0.2em] text-brand-gold-light uppercase">
              Dịch vụ cốt lõi
            </span>
          </motion.div>

          {/* ── 5 Pillar cards ── */}
          <motion.div
            variants={fadeUp}
            className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5"
          >
            {/* Connecting line on desktop */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[10%] right-[10%] top-8 hidden h-0.5 bg-gradient-to-r from-transparent via-brand-gold/25 to-transparent md:block"
            />

            {PILLARS.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.label}
                  className="group relative flex flex-col items-center gap-3 rounded-xl border border-border/60 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/30 hover:shadow-md"
                >
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue-mid to-brand-blue shadow-md transition-transform duration-300 group-hover:scale-105">
                    <Icon
                      className="h-6 w-6 text-brand-gold-light"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="text-center font-heading text-xs font-bold leading-tight text-brand-dark/75 sm:text-sm">
                    {pillar.label}
                  </span>
                </div>
              )
            })}
          </motion.div>

          {/* ── Paragraph 1 ── */}
          <motion.div variants={fadeUp} className="mt-10">
            <p className="text-center font-body text-base leading-relaxed text-brand-dark/85 sm:text-lg md:text-xl md:leading-relaxed">
              KVC Global cung cấp giải pháp tư vấn toàn diện dành cho doanh
              nghiệp, nhà đầu tư và chủ doanh nghiệp mong muốn mở rộng hoạt động
              tại Việt Nam và Singapore. Chúng tôi kết nối các dịch vụ về thành
              lập doanh nghiệp, pháp lý, nhân sự, nhập cư và giáo dục, giúp
              khách hàng xây dựng nền tảng kinh doanh vững chắc và phát triển
              bền vững tại thị trường quốc tế.
            </p>
          </motion.div>

          {/* ── Divider ── */}
          <motion.div variants={fadeUp} className="mt-10 flex items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
            <Briefcase className="h-5 w-5 shrink-0 text-brand-gold" strokeWidth={1.75} />
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
          </motion.div>

          {/* ── Paragraph 2 — highlighted card ── */}
          <motion.div
            variants={fadeUp}
            className="relative mt-10 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-blue-mid to-brand-blue p-6 shadow-xl sm:p-8 md:p-10"
          >
            {/* Decorative glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-gold/15 blur-3xl"
            />

            <div className="relative z-10">
              <p className="font-body text-sm leading-relaxed text-white/90 sm:text-base md:text-lg md:leading-relaxed">
                Với mạng lưới đối tác chiến lược tại Việt Nam và Singapore, KVC
                Global mang đến giải pháp One-Stop Business Solution, giúp doanh
                nghiệp tiết kiệm thời gian, tối ưu chi phí và tập trung vào tăng
                trưởng kinh doanh. Ý tưởng cung cấp giải pháp trọn gói từ thành
                lập doanh nghiệp, nhập cư, tuyển dụng đến giáo dục cũng là mô hình
                được nhiều đơn vị tư vấn quốc tế áp dụng.
              </p>
            </div>

            {/* Bottom accent line */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent sm:left-8 sm:right-8"
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
