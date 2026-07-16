import { Metadata } from "next"

import { StudyAbroadDetails } from "@/components/study-abroad/study-abroad-details"
import { StudyAbroadHero } from "@/components/study-abroad/study-abroad-hero"

export const metadata: Metadata = {
  title: "Du học Singapore - KVC Global",
  description: "Chương trình du học Diploma 6+6 tại Singapore. Vừa học vừa làm, lấy bằng quốc tế chỉ trong 1 năm với trợ cấp thực tập 800 - 1.500 SGD/tháng.",
  openGraph: {
    title: "Du học Singapore - KVC Global",
    description: "Chương trình du học Diploma 6+6 tại Singapore. Vừa học vừa làm, lấy bằng quốc tế chỉ trong 1 năm với trợ cấp thực tập 800 - 1.500 SGD/tháng.",
    images: [
      {
        url: "/images/thumb-sharing.png",
        width: 1200,
        height: 630,
        alt: "Du học Singapore - KVC Global",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Du học Singapore - KVC Global",
    description: "Chương trình du học Diploma 6+6 tại Singapore. Vừa học vừa làm, lấy bằng quốc tế chỉ trong 1 năm với trợ cấp thực tập 800 - 1.500 SGD/tháng.",
    images: ["/images/thumb-sharing.png"],
  },
}

export default function StudyAbroadPage() {
  return (
    <>
      <StudyAbroadHero />
      <StudyAbroadDetails />
    </>
  )
}
