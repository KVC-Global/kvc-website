"use client";

import type { DichVuPageData } from "@/sanity/service-pages";

// Existing hardcoded components (used as fallback when CMS data is missing)
import { DichVuHero } from "@/components/dich-vu/dich-vu-hero";
import { DichVuIntro } from "@/components/dich-vu/dich-vu-intro";
import { DichVuServices } from "@/components/dich-vu/dich-vu-services";

interface Props {
  content?: DichVuPageData;
}

/**
 * Dịch vụ (Services) page component.
 *
 * Currently renders existing hardcoded components. When CMS data becomes
 * available in Sanity (after editors populate the schema), individual
 * sections can be overridden with CMS content.
 *
 * To add CMS-driven rendering for a section, check content?.sectionName
 * and render the CMS version instead of the hardcoded component.
 */
export function DichVuPage({ content }: Props) {
  return (
    <>
      <DichVuHero />
      <DichVuIntro />
      <DichVuServices />
    </>
  );
}
