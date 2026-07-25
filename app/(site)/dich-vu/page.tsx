import { Metadata } from "next"

import { DichVuHero } from "@/components/dich-vu/dich-vu-hero"
import { DichVuIntro } from "@/components/dich-vu/dich-vu-intro"
import { DichVuServices } from "@/components/dich-vu/dich-vu-services"

export const metadata: Metadata = {
  title: "Dịch vụ doanh nghiệp - KVC Global",
  description:
    "Dịch vụ doanh nghiệp toàn diện tại Việt Nam và Singapore: thành lập công ty, cơ cấu doanh nghiệp, work pass, visa, văn phòng, bất động sản và tuyển dụng nhân sự.",
  openGraph: {
    title: "Dịch vụ doanh nghiệp - KVC Global",
    description:
      "Dịch vụ doanh nghiệp toàn diện tại Việt Nam và Singapore: thành lập công ty, cơ cấu doanh nghiệp, work pass, visa, văn phòng, bất động sản và tuyển dụng nhân sự.",
    images: [
      {
        url: "/images/thumb-sharing.png",
        width: 1200,
        height: 630,
        alt: "Dịch vụ doanh nghiệp - KVC Global",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dịch vụ doanh nghiệp - KVC Global",
    description:
      "Dịch vụ doanh nghiệp toàn diện tại Việt Nam và Singapore: thành lập công ty, cơ cấu doanh nghiệp, work pass, visa, văn phòng, bất động sản và tuyển dụng nhân sự.",
    images: ["/images/thumb-sharing.png"],
  },
}

export default function DichVuPage() {
  return (
    <>
      <DichVuHero />
      <DichVuIntro />
      <DichVuServices />
    </>
  )
}
