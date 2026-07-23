import { Metadata } from "next"

import { PrivateStudyAbroadDetails } from "@/components/study-abroad/private/private-details"
import { PrivateStudyAbroadHero } from "@/components/study-abroad/private/private-hero"

export const metadata: Metadata = {
  title: "Du học tư thục Singapore - KVC Global",
  description: "Hệ thống trường quốc tế tại Singapore đón nhận học sinh từ bậc mầm non đến hết trung học phổ thông (18 tháng đến 18 tuổi) với lộ trình chuẩn quốc tế.",
  openGraph: {
    title: "Du học tư thục Singapore - KVC Global",
    description: "Hệ thống trường quốc tế tại Singapore đón nhận học sinh từ bậc mầm non đến hết trung học phổ thông (18 tháng đến 18 tuổi) với lộ trình chuẩn quốc tế.",
    images: [
      {
        url: "/images/thumb-sharing.png",
        width: 1200,
        height: 630,
        alt: "Du học tư thục Singapore - KVC Global",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Du học tư thục Singapore - KVC Global",
    description: "Hệ thống trường quốc tế tại Singapore đón nhận học sinh từ bậc mầm non đến hết trung học phổ thông (18 tháng đến 18 tuổi) với lộ trình chuẩn quốc tế.",
    images: ["/images/thumb-sharing.png"],
  },
}

export default function PrivateStudyAbroadPage() {
  return (
    <>
      <PrivateStudyAbroadHero />
      <PrivateStudyAbroadDetails />
    </>
  )
}
