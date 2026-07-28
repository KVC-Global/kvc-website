"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { DichVuFaqs } from "@/sanity/service-pages";

const FALLBACK_FAQS: import("@/sanity/service-pages").FaqItem[] = [
  { _key: "1", question: "KVC Global có hỗ trợ thành lập công ty tại Singapore không?", answer: "Có. KVC Global cung cấp dịch vụ thành lập công ty trọn gói tại Singapore, bao gồm tư vấn mô hình, đăng ký doanh nghiệp, bổ nhiệm company secretary, và hỗ trợ mở tài khoản ngân hàng." },
  { _key: "2", question: "Thời gian thành lập công ty tại Việt Nam mất bao lâu?", answer: "Thời gian trung bình từ 2-4 tuần tùy loại hình doanh nghiệp và ngành nghề đăng ký. Với doanh nghiệp FDI, thời gian có thể kéo dài hơn do cần xin IRC." },
  { _key: "3", question: "KVC có hỗ trợ xin Work Pass tại Singapore không?", answer: "Có. Chúng tôi hỗ trợ toàn bộ quy trình xin Employment Pass, EntrePass, S Pass và các loại giấy phép lao động khác tại Singapore." },
  { _key: "4", question: "Chi phí dịch vụ của KVC Global như thế nào?", answer: "Chi phí phụ thuộc vào loại hình dịch vụ và quy mô doanh nghiệp. Vui lòng liên hệ để được tư vấn và báo giá chi tiết phù hợp với nhu cầu của bạn." },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export function DichVuFaqs({
  className,
  data,
}: {
  className?: string;
  data?: DichVuFaqs;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const faqs = data?.faqs?.length ? data.faqs : FALLBACK_FAQS;
  const title = data?.title ?? "Câu hỏi thường gặp";

  return (
    <section
      aria-labelledby="dich-vu-faqs-heading"
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
            {data?.eyebrow ?? "FAQ"}
          </span>
          <h2
            id="dich-vu-faqs-heading"
            className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
          >
            {title}
          </h2>
          <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
        </motion.div>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-border rounded-2xl border border-border bg-white">
          {faqs.map((faq, idx) => {
            const isOpen = idx === openIdx;
            return (
              <div key={faq._key ?? faq.question}>
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-muted/50"
                  aria-expanded={isOpen}
                >
                  <HelpCircle className="h-5 w-5 shrink-0 text-brand-gold" strokeWidth={1.75} />
                  <span className="flex-1 font-heading text-sm font-bold text-brand-blue sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn("h-5 w-5 shrink-0 text-brand-gold transition-transform duration-300", isOpen && "rotate-180")}
                    strokeWidth={2.25}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 pl-[60px] text-sm leading-relaxed text-brand-dark/80 sm:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
