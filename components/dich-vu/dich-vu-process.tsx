"use client";

import { motion, Variants } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { DichVuProcess } from "@/sanity/service-pages";

const FALLBACK_STEPS: import("@/sanity/service-pages").IconItem[] = [
  { _key: "1", icon: "MessageSquare", title: "Tư vấn ban đầu", description: "Trao đổi nhu cầu và đề xuất giải pháp phù hợp." },
  { _key: "2", icon: "FileText", title: "Chuẩn bị hồ sơ", description: "Thu thập và hoàn thiện toàn bộ tài liệu cần thiết." },
  { _key: "3", icon: "ClipboardCheck", title: "Nộp và xử lý", description: "Nộp hồ sơ lên cơ quan chức năng và theo dõi tiến độ." },
  { _key: "4", icon: "Rocket", title: "Bàn giao & vận hành", description: "Hoàn tất thủ tục và hỗ trợ doanh nghiệp đi vào hoạt động." },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

function getIcon(iconName?: string) {
  if (!iconName) return LucideIcons.MessageSquare;
  return (LucideIcons as unknown as Record<string, React.ComponentType>)[iconName] || LucideIcons.MessageSquare;
}

export function DichVuProcess({
  className,
  data,
}: {
  className?: string;
  data?: DichVuProcess;
}) {
  const steps = data?.steps?.length ? data.steps : FALLBACK_STEPS;
  const eyebrow = data?.eyebrow ?? "QUY TRÌNH";
  const title = data?.title ?? "Quy trình làm việc";

  return (
    <section
      aria-labelledby="dich-vu-process-heading"
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
            {eyebrow}
          </span>
          <h2
            id="dich-vu-process-heading"
            className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
          >
            {title}
          </h2>
          <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
        </motion.div>

        <div className="relative mt-16">
          {/* Connecting line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-8 top-0 hidden h-full w-0.5 bg-gradient-to-b from-brand-gold/40 via-brand-gold/20 to-transparent md:block"
          />

          <div className="flex flex-col gap-10 md:gap-14">
            {steps.map((step, idx) => {
              const Icon = getIcon(step.icon);
              return (
                <motion.div
                  key={step._key ?? step.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUp}
                  className="relative flex flex-col gap-4 md:flex-row md:gap-8 md:pl-20"
                >
                  {/* Step number + icon on the line */}
                  <div className="absolute left-0 hidden h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-brand-blue text-white shadow-lg md:flex">
                    <span className="font-heading text-lg font-bold">{idx + 1}</span>
                  </div>

                  {/* Mobile number */}
                  <div className="flex items-center gap-3 md:hidden">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white">
                      <span className="font-heading text-sm font-bold">{idx + 1}</span>
                    </div>
                    <Icon className="h-6 w-6 text-brand-gold" strokeWidth={1.75} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-lg border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md md:p-8">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="hidden h-6 w-6 text-brand-gold md:block" strokeWidth={1.75} />
                      <h3 className="font-heading text-lg font-bold text-brand-blue">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-brand-dark/80 sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
