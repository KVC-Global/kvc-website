import type { Metadata } from "next"
import { OnlineOssd } from "@/components/online-ossd"

export const metadata: Metadata = {
  title: "OSSD Ontario | KVC Global",
  description:
    "OSSD Canada — Bằng Tốt nghiệp Trung học Phổ thông Ontario. Chương trình được công nhận quốc tế, mở cánh cửa vào các trường đại học hàng đầu thế giới.",
  openGraph: {
    title: "OSSD Ontario | KVC Global",
    description:
      "OSSD Canada — Bằng Tốt nghiệp Trung học Phổ thông Ontario. Chương trình được công nhận quốc tế, mở cánh cửa vào các trường đại học hàng đầu thế giới.",
    images: [{ url: "/images/thumb-sharing.png", width: 1200, height: 630, alt: "OSSD Ontario | KVC Global" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OSSD Ontario | KVC Global",
    description:
      "OSSD Canada — Bằng Tốt nghiệp Trung học Phổ thông Ontario. Chương trình được công nhận quốc tế, mở cánh cửa vào các trường đại học hàng đầu thế giới.",
    images: ["/images/thumb-sharing.png"],
  },
}

export default function OssdPage() {
  return <OnlineOssd />
}
