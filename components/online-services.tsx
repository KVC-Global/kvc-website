"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { KhoaHocOnlineServices } from "@/sanity/service-pages";

const FALLBACK_SERVICES: { title: string; icon: string; href: string; ctaText: string }[] = [
  { title: "Khóa học ngắn hạn", icon: "GraduationCap", href: "#", ctaText: "Tìm hiểu" },
  { title: "Tư vấn hướng nghiệp", icon: "Briefcase", href: "#", ctaText: "Khám phá" },
  { title: "Chứng chỉ quốc tế", icon: "IdCard", href: "#", ctaText: "Tìm hiểu" },
  { title: "Hỗ trợ doanh nghiệp", icon: "Building2", href: "#", ctaText: "Tìm hiểu" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export function OnlineServices({
  className,
  data,
}: {
  className?: string;
  data?: KhoaHocOnlineServices;
}) {
  const services = data?.services?.length ? data.services : FALLBACK_SERVICES;
  const title = data?.title ?? "Các dịch vụ liên quan";

  return (
    <section
      aria-labelledby="online-services-heading"
      className={cn("w-full bg-white py-20 sm:py-24", className)}
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
            DỊCH VỤ
          </span>
          <h2
            id="online-services-heading"
            className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
          >
            {title}
          </h2>
          <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service, index) => {
            const Icon = getIcon(service.icon, GraduationCap);
            const href = "href" in service && service.href ? service.href : "#";
            const ctaText = "ctaText" in service && service.ctaText ? service.ctaText : "Tìm hiểu";
            return (
              <motion.div key={service.title ?? index} variants={fadeUp}>
                <Link
                  href={href}
                  className="group flex cursor-pointer items-center gap-4 rounded-lg border border-border/60 bg-white p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-10px_rgba(10,37,64,0.08)]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue-mid transition-colors duration-300 group-hover:bg-brand-blue">
                    <Icon
                      className="h-5 w-5 text-brand-gold-light transition-transform duration-300 group-hover:scale-105"
                      strokeWidth={1.75}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading text-[14px] leading-snug font-bold text-brand-blue transition-colors duration-300 group-hover:text-brand-gold md:text-[15px]">
                      {service.title}
                    </span>
                    <span className="mt-1 flex items-center gap-1.5 font-body text-xs leading-none font-semibold text-brand-gold transition-transform duration-300 group-hover:translate-x-0.5">
                      {ctaText}
                      <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
