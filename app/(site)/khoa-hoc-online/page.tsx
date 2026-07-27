import type { Metadata } from "next";

import { KhoaHocOnlinePage } from "@/components/khoa-hoc-online-page";
import { getLocale } from "@/lib/i18n-server";
import type { KhoaHocOnlinePageData } from "@/sanity/service-pages";
import { sanityFetch } from "@/sanity/live";
import { KHOA_HOC_ONLINE_PAGE_QUERY } from "@/sanity/queries";

const fallbackMetadata: Metadata = {
  title: "Khoá học Online - KVC Global",
  description:
    "Khóa học online quốc tế từ KVC Global - OSSD, OTHM, Qualifi, Wolverhampton. Nhận chứng chỉ quốc tế ngay tại Việt Nam.",
};

async function getKhoaHocOnlinePage() {
  const locale = await getLocale();
  const { data } = await sanityFetch({
    query: KHOA_HOC_ONLINE_PAGE_QUERY,
    params: { lang: locale },
  });
  return data as KhoaHocOnlinePageData | null;
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getKhoaHocOnlinePage();
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

export default async function KhoaHocOnlineRoutePage() {
  const page = await getKhoaHocOnlinePage();
  return <KhoaHocOnlinePage content={page || undefined} />;
}
