"use client";

import type { KhoaHocOnlinePageData } from "@/sanity/service-pages";

// Existing hardcoded components (used as fallback when CMS data is missing)
import { OnlineHero } from "@/components/online-hero";
import { OnlineDetails } from "@/components/online-details";
import { OnlineBenefits } from "@/components/online-benefits";
import { OnlineCta } from "@/components/online-cta";
import { OnlineFaq } from "@/components/online-faq";

interface Props {
  content?: KhoaHocOnlinePageData;
}

/**
 * Khoá học Online page component.
 *
 * Currently renders existing hardcoded components. When CMS data becomes
 * available in Sanity (after editors populate the schema), individual
 * sections can be overridden with CMS content.
 *
 * To add CMS-driven rendering for a section, check content?.sectionName
 * and render the CMS version instead of the hardcoded component.
 */
export function KhoaHocOnlinePage({ content }: Props) {
  // When CMS data is available, individual sections can be replaced.
  // For now, all sections fall back to the existing hardcoded components.

  return (
    <>
      <OnlineHero />
      <OnlineDetails />
      <OnlineBenefits />
      <OnlineCta />
      <OnlineFaq />
    </>
  );
}
