import type { Metadata } from "next";

import { DichVuHero } from "@/components/dich-vu/dich-vu-hero";
import { DichVuIntro } from "@/components/dich-vu/dich-vu-intro";
import { DichVuServices } from "@/components/dich-vu/dich-vu-services";
import { getLocale } from "@/lib/i18n-server";
import type { DichVuPageData } from "@/sanity/service-pages";
import { sanityFetch } from "@/sanity/live";
import { localizedAlternates } from "@/lib/seo";
import { DICH_VU_PAGE_QUERY } from "@/sanity/queries";

const fallbackMetadata: Metadata = {
  title: "Dịch vụ doanh nghiệp - KVC Global",
  description:
    "Dịch vụ doanh nghiệp toàn diện tại Việt Nam và Singapore: thành lập công ty, cơ cấu doanh nghiệp, work pass, visa, văn phòng, bất động sản và tuyển dụng nhân sự.",
  openGraph: {
    title: "Dịch vụ doanh nghiệp - KVC Global",
    description:
      "Dịch vụ doanh nghiệp toàn diện tại Việt Nam và Singapore: thành lập công ty, cơ cấu doanh nghiệp, work pass, visa, văn phòng, bất động sản và tuyển dụng nhân sự.",
    images: [
      { url: "/images/thumb-sharing.png", width: 1200, height: 630, alt: "Dịch vụ doanh nghiệp - KVC Global" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dịch vụ doanh nghiệp - KVC Global",
    description:
      "Dịch vụ doanh nghiệp toàn diện tại Việt Nam và Singapore: thành lập công ty, cơ cấu doanh nghiệp, work pass, visa, văn phòng, bất động sản và tuyển dụng nhân sự.",
    images: ["/images/thumb-sharing.png"],
  },
};

async function getDichVuPage() {
  const locale = await getLocale();
  const { data } = await sanityFetch({
    query: DICH_VU_PAGE_QUERY,
    params: { lang: locale },
  });
  return data as DichVuPageData | null;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const page = await getDichVuPage();
  const title = page?.seo?.title || fallbackMetadata.title;
  const description = page?.seo?.description || fallbackMetadata.description;
  return {
    title,
    description,
    alternates: localizedAlternates("/dich-vu", locale),
    openGraph: {
      title: title || undefined,
      description: description || undefined,
      images: [{ url: "/images/thumb-sharing.png", width: 1200, height: 630, alt: "KVC Global" }],
    },
    twitter: {
      card: "summary_large_image",
      title: title || undefined,
      description: description || undefined,
      images: ["/images/thumb-sharing.png"],
    },
  };
}

export default async function DichVuPage() {
  const page = await getDichVuPage();
  return (
    <>
      <DichVuHero data={page?.heroSection} />
      <DichVuIntro data={page?.introSection} videoData={page?.videoSection} />
      <DichVuServices data={page?.serviceCategories} accordionData={page?.accordionSections} />
    </>
  );
}
