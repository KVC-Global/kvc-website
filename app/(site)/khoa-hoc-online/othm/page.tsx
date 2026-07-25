import type { Metadata } from "next"
import { OnlineOthm } from "@/components/online-othm"

export const metadata: Metadata = {
  title: "OTHM | KVC Global",
  description:
    "Học Chứng chỉ OTHM Anh Quốc trực tuyến cùng KVC Global. Mở rộng cơ hội nghề nghiệp và học tập quốc tế với bằng cấp được công nhận toàn cầu.",
  openGraph: {
    title: "OTHM | KVC Global",
    description:
      "Học Chứng chỉ OTHM Anh Quốc trực tuyến cùng KVC Global. Mở rộng cơ hội nghề nghiệp và học tập quốc tế với bằng cấp được công nhận toàn cầu.",
    images: [{ url: "/images/thumb-sharing.png", width: 1200, height: 630, alt: "OTHM | KVC Global" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OTHM | KVC Global",
    description:
      "Học Chứng chỉ OTHM Anh Quốc trực tuyến cùng KVC Global. Mở rộng cơ hội nghề nghiệp và học tập quốc tế với bằng cấp được công nhận toàn cầu.",
    images: ["/images/thumb-sharing.png"],
  },
}

export default function OthmPage() {
  return <OnlineOthm />
}
