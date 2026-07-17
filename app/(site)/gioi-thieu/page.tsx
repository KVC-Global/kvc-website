import { Metadata } from "next"

import { AboutPage } from "@/components/about-page"

export const metadata: Metadata = {
  title: "Giới thiệu - KVC Global",
  description:
    "Giới thiệu về KVC Global, đội ngũ chuyên gia và các dịch vụ hỗ trợ du học, việc làm và định cư tại Singapore.",
}

export default function AboutRoutePage() {
  return <AboutPage />
}
