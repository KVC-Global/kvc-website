"use client";

import type { KhoaHocOnlinePageData } from "@/sanity/service-pages";
import { OnlineHero } from "@/components/online-hero";
import { OnlineIntro } from "@/components/online-intro";
import { OnlineDetails } from "@/components/online-details";
import { OnlineBenefits } from "@/components/online-benefits";
import { OnlineTestimonials } from "@/components/online-testimonials";
import { OnlineServices } from "@/components/online-services";
import { OnlineCta } from "@/components/online-cta";
import { OnlineFaq } from "@/components/online-faq";

interface Props {
  content?: KhoaHocOnlinePageData;
}

export function KhoaHocOnlinePage({ content }: Props) {
  return (
    <>
      <OnlineHero data={content?.heroSection} />
      <OnlineIntro data={content?.introSection} />
      <OnlineDetails />
      <OnlineBenefits data={content?.whySection} />
      <OnlineTestimonials data={content?.testimonialsSection} />
      <OnlineServices data={content?.servicesSection} />
      <OnlineCta data={content?.ctaSection} />
      <OnlineFaq data={content?.faqsSection} />
    </>
  );
}
