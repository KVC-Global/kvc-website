"use client";

import { motion, Variants } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { DichVuTestimonials } from "@/sanity/service-pages";

const FALLBACK_TESTIMONIALS: import("@/sanity/service-pages").TestimonialItem[] = [
  { _key: "1", name: "Anh Minh T.", role: "CEO — Công ty Công nghệ", quote: "KVC Global đã giúp chúng tôi thành lập công ty tại Singapore chỉ trong 2 tuần. Dịch vụ chuyên nghiệp và tận tâm.", rating: 5 },
  { _key: "2", name: "Chị Lan H.", role: "Giám đốc — Doanh nghiệp FDI", quote: "Đội ngũ KVC am hiểu sâu về pháp lý và thủ tục. Tôi rất hài lòng với dịch vụ thành lập doanh nghiệp tại Việt Nam.", rating: 5 },
  { _key: "3", name: "Anh David L.", role: "Nhà đầu tư — UK", quote: "Từ work pass đến thuê văn phòng, KVC lo trọn gói. Tôi không phải bận tâm điều gì khi mở rộng kinh doanh sang Singapore.", rating: 5 },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export function DichVuTestimonials({
  className,
  data,
}: {
  className?: string;
  data?: DichVuTestimonials;
}) {
  const testimonials = data?.testimonials?.length ? data.testimonials : FALLBACK_TESTIMONIALS;
  const title = data?.title ?? "Khách hàng nói gì về chúng tôi";

  return (
    <section
      aria-labelledby="dich-vu-testimonials-heading"
      className={cn("w-full bg-muted py-20 sm:py-24", className)}
    >
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center"
        >
          <span className="mb-3 block font-heading text-xs font-bold tracking-wider text-brand-gold uppercase sm:text-sm">
            ĐÁNH GIÁ
          </span>
          <h2
            id="dich-vu-testimonials-heading"
            className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
          >
            {title}
          </h2>
          <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <motion.blockquote
              key={t._key ?? t.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="relative rounded-lg border border-border/60 bg-white p-6 shadow-sm"
            >
              <Quote className="absolute right-4 top-4 h-8 w-8 text-brand-gold/15" strokeWidth={2} />
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn("h-4 w-4", i < (t.rating ?? 5) ? "fill-brand-gold text-brand-gold" : "text-muted-foreground/30")}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-brand-dark/80">{t.quote}</p>
              <footer className="mt-4 border-t border-border/40 pt-3">
                <cite className="not-italic font-heading text-sm font-bold text-brand-blue">{t.name}</cite>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
