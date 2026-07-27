"use client";

import type { DichVuPageData } from "@/sanity/service-pages";
import { DichVuHero } from "@/components/dich-vu/dich-vu-hero";
import { DichVuIntro } from "@/components/dich-vu/dich-vu-intro";
import { DichVuServices } from "@/components/dich-vu/dich-vu-services";
import { DichVuWhy } from "@/components/dich-vu/dich-vu-why";
import { DichVuProcess } from "@/components/dich-vu/dich-vu-process";
import { DichVuTestimonials } from "@/components/dich-vu/dich-vu-testimonials";
import { DichVuPartners } from "@/components/dich-vu/dich-vu-partners";
import { DichVuFaqs } from "@/components/dich-vu/dich-vu-faqs";

interface Props {
  content?: DichVuPageData;
}

export function DichVuPage({ content }: Props) {
  return (
    <>
      <DichVuHero data={content?.heroSection} />
      <DichVuIntro />
      <DichVuServices />
      <DichVuWhy data={content?.whySection} />
      <DichVuProcess data={content?.processSection} />
      <DichVuTestimonials data={content?.testimonialsSection} />
      <DichVuPartners data={content?.partnersSection} />
      <DichVuFaqs data={content?.faqsSection} />
    </>
  );
}
