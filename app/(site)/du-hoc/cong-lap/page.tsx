import { Metadata } from "next"

import { PublicStudyAbroadDetails } from "@/components/study-abroad/public/public-details"
import { PublicStudyAbroadHero } from "@/components/study-abroad/public/public-hero"

export const metadata: Metadata = {
  title: "Du học công lập Singapore - KVC Global",
  description: "Hệ thống giáo dục công lập Singapore hàng đầu thế giới dưới sự quản lý của MOE, từ bậc Tiểu học đến Dự bị Đại học/Polytechnic.",
  openGraph: {
    title: "Du học công lập Singapore - KVC Global",
    description: "Hệ thống giáo dục công lập Singapore hàng đầu thế giới dưới sự quản lý của MOE, từ bậc Tiểu học đến Dự bị Đại học/Polytechnic.",
    images: [
      {
        url: "/images/thumb-sharing.png",
        width: 1200,
        height: 630,
        alt: "Du học công lập Singapore - KVC Global",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Du học công lập Singapore - KVC Global",
    description: "Hệ thống giáo dục công lập Singapore hàng đầu thế giới dưới sự quản lý của MOE, từ bậc Tiểu học đến Dự bị Đại học/Polytechnic.",
    images: ["/images/thumb-sharing.png"],
  },
}

export default function PublicStudyAbroadPage() {
  return (
    <>
      <PublicStudyAbroadHero />
      <PublicStudyAbroadDetails />
    </>
  )
}
