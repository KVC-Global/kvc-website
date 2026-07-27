import type { Metadata } from "next";

import { DichVuPage } from "@/components/dich-vu-page";
import { getLocale } from "@/lib/i18n-server";
import type { DichVuPageData } from "@/sanity/service-pages";
import { sanityFetch } from "@/sanity/live";
import { DICH_VU_PAGE_QUERY } from "@/sanity/queries";

const fallbackMetadata: Metadata = {
  title: "Dịch vụ - KVC Global",
  description:
    "Dịch vụ doanh nghiệp toàn diện tại Việt Nam và Singapore: thành lập công ty, work pass, visa, du học, và định cư.",
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
  const page = await getDichVuPage();
  const title = page?.seo?.title || fallbackMetadata.title;
  const description =
    page?.seo?.description || fallbackMetadata.description;

  return {
    title,
    description,
    openGraph: {
      title: title || undefined,
      description: description || undefined,
      images: [
        { url: "/images/thumb-sharing.png", width: 1200, height: 630, alt: "KVC Global" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title || undefined,
      description: description || undefined,
      images: ["/images/thumb-sharing.png"],
    },
  };
}

export default async function DichVuRoutePage() {
  const page = await getDichVuPage();
  return <DichVuPage content={page || undefined} />;
}
