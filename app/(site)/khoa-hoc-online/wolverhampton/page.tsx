import type { Metadata } from "next"
import { OnlineWolverhampton } from "@/components/online-wolverhampton"

export const metadata: Metadata = {
  title: "University of Wolverhampton | KVC Global",
  description:
    "Học Đại học và Thạc sĩ Anh Quốc 100% Online cùng University of Wolverhampton. Nhận bằng cấp chính quy từ trường đại học công lập Vương quốc Anh.",
  openGraph: {
    title: "University of Wolverhampton | KVC Global",
    description:
      "Học Đại học và Thạc sĩ Anh Quốc 100% Online cùng University of Wolverhampton. Nhận bằng cấp chính quy từ trường đại học công lập Vương quốc Anh.",
    images: [{ url: "/images/thumb-sharing.png", width: 1200, height: 630, alt: "University of Wolverhampton | KVC Global" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "University of Wolverhampton | KVC Global",
    description:
      "Học Đại học và Thạc sĩ Anh Quốc 100% Online cùng University of Wolverhampton. Nhận bằng cấp chính quy từ trường đại học công lập Vương quốc Anh.",
    images: ["/images/thumb-sharing.png"],
  },
}

export default function WolverhamptonPage() {
  return <OnlineWolverhampton />
}
