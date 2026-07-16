import type { Metadata } from "next"

import { OnlineDetails } from "@/components/online-details"
import { OnlineDirectory } from "@/components/online-directory"
import { OnlineHero } from "@/components/online-hero"

export const metadata: Metadata = {
  title: "Khóa học Online | KVC Global",
  description:
    "Khám phá các chương trình học online và du học trực tuyến từ xa tại KVC Global — OSSD Ontario, OTHM, Qualifi, University of Wolverhampton. Bằng cấp quốc tế, linh hoạt thời gian, tiết kiệm chi phí.",
}

export default function KhoaHocOnlinePage() {
  return (
    <>
      <OnlineHero />
      <OnlineDirectory />
      <OnlineDetails />
    </>
  )
}
