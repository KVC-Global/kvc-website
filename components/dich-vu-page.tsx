"use client";

import type { DichVuPageData } from "@/sanity/service-pages";
import { DichVuHero } from "@/components/dich-vu/dich-vu-hero";
import { DichVuIntro } from "@/components/dich-vu/dich-vu-intro";
import { DichVuServices } from "@/components/dich-vu/dich-vu-services";

interface Props {
  content?: DichVuPageData;
}

export function DichVuPage({ content }: Props) {
  return (
    <>
      <DichVuHero data={content?.heroSection} />
      <DichVuIntro data={content?.introSection} />
      <DichVuServices data={content?.serviceCategories} accordionData={content?.accordionSections} />
    </>
  );
}
