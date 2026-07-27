"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { urlFor } from "@/sanity/image";
import { cn } from "@/lib/utils";
import type { KhoaHocOnlineIntro } from "@/sanity/service-pages";

const FALLBACK_INTRO = {
  title: "Học tập linh hoạt cùng KVC Global",
  highlightText: "Chương trình đào tạo trực tuyến",
  paragraphs: [
    "KVC Global mang đến các chương trình đào tạo trực tuyến chất lượng quốc tế, giúp học viên Việt Nam tiếp cận nền giáo dục tiên tiến mà không cần rời khỏi đất nước.",
  ],
  bullets: ["Bằng cấp được công nhận quốc tế", "Linh hoạt thời gian và địa điểm", "Tiết kiệm chi phí so với du học trực tiếp"],
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export function OnlineIntro({
  className,
  data,
}: {
  className?: string;
  data?: KhoaHocOnlineIntro;
}) {
  const title = data?.title ?? FALLBACK_INTRO.title;
  const highlightText = data?.highlightText ?? FALLBACK_INTRO.highlightText;
  const paragraphs = data?.paragraphs?.length ? data.paragraphs : FALLBACK_INTRO.paragraphs;
  const bullets = data?.bullets?.length ? data.bullets : FALLBACK_INTRO.bullets;
  const image = data?.image;
  const imageAlt = data?.imageAlt ?? "";

  return (
    <section className={cn("w-full bg-white py-20 sm:py-24", className)}>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <span className="mb-3 block font-heading text-xs font-bold tracking-wider text-brand-gold uppercase sm:text-sm">
              {highlightText}
            </span>
            <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">
              {title}
            </h2>
            <span aria-hidden="true" className="mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
            {paragraphs.map((p, i) => (
              <p key={i} className="mt-4 text-sm leading-relaxed text-brand-dark/80 sm:text-base">
                {p}
              </p>
            ))}
            <ul className="mt-6 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" strokeWidth={2.5} />
                  <span className="text-sm text-brand-dark/80 sm:text-base">{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          {image && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg"
            >
              <Image src={urlFor(image).width(600).height(450).url()} alt={imageAlt} fill className="object-cover" />
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
