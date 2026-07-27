"use client";

import { motion, Variants } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { DichVuWhy } from "@/sanity/service-pages";

// Fallback: mirror style from DichVuIntro's pillars section
const FALLBACK_ITEMS: import("@/sanity/service-pages").IconItem[] = [
  { _key: "1", icon: "Building2", title: "Kinh nghiệm", description: "15+ năm kinh nghiệm tư vấn doanh nghiệp tại Việt Nam và Singapore." },
  { _key: "2", icon: "Globe2", title: "Toàn cầu", description: "Mạng lưới đối tác rộng khắp giúp doanh nghiệp mở rộng quốc tế." },
  { _key: "3", icon: "ShieldCheck", title: "Tin cậy", description: "Dịch vụ chuyên nghiệp, minh bạch và tuân thủ pháp luật." },
  { _key: "4", icon: "Users", title: "Đồng hành", description: "Đội ngũ chuyên gia tận tâm hỗ trợ trong suốt hành trình." },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

function getIcon(iconName?: string) {
  if (!iconName) return LucideIcons.ShieldCheck;
  return (LucideIcons as unknown as Record<string, React.ComponentType>)[iconName] || LucideIcons.ShieldCheck;
}

export function DichVuWhy({
  className,
  data,
}: {
  className?: string;
  data?: DichVuWhy;
}) {
  const items = data?.items?.length ? data.items : FALLBACK_ITEMS;
  const title = data?.title ?? "Tại sao chọn KVC Global?";

  return (
    <section
      aria-labelledby="dich-vu-why-heading"
      className={cn("w-full bg-muted py-20 sm:py-24", className)}
    >
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
          className="text-center"
        >
          <motion.span
            variants={fadeUp}
            className="mb-3 block font-heading text-xs font-bold tracking-wider text-brand-gold uppercase sm:text-sm"
          >
            LÝ DO CHỌN KVC
          </motion.span>
          <motion.h2
            variants={fadeUp}
            id="dich-vu-why-heading"
            className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
          >
            {title}
          </motion.h2>
          <motion.span
            variants={fadeUp}
            aria-hidden="true"
            className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <motion.div
                key={item._key ?? item.title}
                variants={fadeUp}
                className="group rounded-lg border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/30 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-light group-hover:bg-brand-blue/5 transition-colors">
                  <Icon className="h-6 w-6 text-brand-gold" strokeWidth={2} />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-brand-blue">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-dark/80">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
