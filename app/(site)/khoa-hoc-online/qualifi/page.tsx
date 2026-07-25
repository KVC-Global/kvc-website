import type { Metadata } from "next"
import { OnlineQualifi } from "@/components/online-qualifi"

export const metadata: Metadata = {
  title: "QUALIFI | KVC Global",
  description:
    "Học Chứng chỉ QUALIFI Anh Quốc trực tuyến cùng KVC Global. Nâng tầm sự nghiệp với bằng cấp quốc tế được công nhận toàn cầu.",
  openGraph: {
    title: "QUALIFI | KVC Global",
    description:
      "Học Chứng chỉ QUALIFI Anh Quốc trực tuyến cùng KVC Global. Nâng tầm sự nghiệp với bằng cấp quốc tế được công nhận toàn cầu.",
    images: [{ url: "/images/thumb-sharing.png", width: 1200, height: 630, alt: "QUALIFI | KVC Global" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "QUALIFI | KVC Global",
    description:
      "Học Chứng chỉ QUALIFI Anh Quốc trực tuyến cùng KVC Global. Nâng tầm sự nghiệp với bằng cấp quốc tế được công nhận toàn cầu.",
    images: ["/images/thumb-sharing.png"],
  },
}

export default function QualifiPage() {
  return <OnlineQualifi />
}
