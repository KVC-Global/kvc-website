import { Metadata } from "next"

import { UniMasterStudyAbroadDetails } from "@/components/study-abroad/uni-master/uni-master-details"
import { UniMasterStudyAbroadHero } from "@/components/study-abroad/uni-master/uni-master-hero"

export const metadata: Metadata = {
  title: "Chương trình Đại học - Thạc sĩ tại Singapore - KVC Global",
  description: "Tư vấn lộ trình đại học và thạc sĩ cá nhân hóa tại Singapore. Lựa chọn ngành học đa dạng, chi phí linh hoạt và cơ hội việc làm rộng mở.",
  openGraph: {
    title: "Chương trình Đại học - Thạc sĩ tại Singapore - KVC Global",
    description: "Tư vấn lộ trình đại học và thạc sĩ cá nhân hóa tại Singapore. Lựa chọn ngành học đa dạng, chi phí linh hoạt và cơ hội việc làm rộng mở.",
    images: [
      {
        url: "/images/thumb-sharing.png",
        width: 1200,
        height: 630,
        alt: "Chương trình Đại học - Thạc sĩ tại Singapore - KVC Global",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chương trình Đại học - Thạc sĩ tại Singapore - KVC Global",
    description: "Tư vấn lộ trình đại học và thạc sĩ cá nhân hóa tại Singapore. Lựa chọn ngành học đa dạng, chi phí linh hoạt và cơ hội việc làm rộng mở.",
    images: ["/images/thumb-sharing.png"],
  },
}

export default function UniMasterStudyAbroadPage() {
  return (
    <>
      <UniMasterStudyAbroadHero />
      <UniMasterStudyAbroadDetails />
    </>
  )
}
