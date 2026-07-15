import { Metadata } from "next"

import { StudyAbroadDetails } from "@/components/study-abroad/study-abroad-details"
import { StudyAbroadHero } from "@/components/study-abroad/study-abroad-hero"

export const metadata: Metadata = {
  title: "Du học Singapore - KVC Global",
  description: "Chương trình du học Diploma 6+6 tại Singapore. Vừa học vừa làm, lấy bằng quốc tế chỉ trong 1 năm với trợ cấp thực tập 800 - 1.500 SGD/tháng.",
}

export default function StudyAbroadPage() {
  return (
    <>
      <StudyAbroadHero />
      <StudyAbroadDetails />
    </>
  )
}
