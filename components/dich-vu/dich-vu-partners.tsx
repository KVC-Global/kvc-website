"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Container } from "@/components/ui/container";
import { urlFor } from "@/sanity/image";
import { cn } from "@/lib/utils";
import type { DichVuPartners } from "@/sanity/service-pages";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export function DichVuPartners({
  className,
  data,
}: {
  className?: string;
  data?: DichVuPartners;
}) {
  const partners = data?.partners?.length ? data.partners : [];
  const title = data?.title ?? "Đối tác của chúng tôi";
  if (!partners.length) return null; // Nothing to show

  return (
    <section
      aria-labelledby="dich-vu-partners-heading"
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
            ĐỐI TÁC
          </span>
          <h2
            id="dich-vu-partners-heading"
            className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
          >
            {title}
          </h2>
          <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
          className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner._id ?? partner.name}
              variants={fadeUp}
              className="flex items-center justify-center rounded-lg border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              {partner.logo ? (
                <Image
                  src={urlFor(partner.logo).width(160).height(80).url()}
                  alt={partner.name}
                  width={160}
                  height={80}
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <span className="font-heading text-sm font-bold text-muted-foreground">{partner.name}</span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
