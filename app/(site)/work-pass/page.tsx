import { Metadata } from "next"
import { WorkPassDetails } from "@/components/work-pass/work-pass-details"
import { WorkPassHero } from "@/components/work-pass/work-pass-hero"

export const metadata: Metadata = {
  title: "TEP - Training Employment Pass Singapore - KVC Global",
  description: "Cơ hội làm việc và tích lũy kinh nghiệm thực tế tại Singapore cho sinh viên quốc tế và người trẻ có tiềm năng.",
  openGraph: {
    title: "TEP - Training Employment Pass Singapore - KVC Global",
    description: "Cơ hội làm việc và tích lũy kinh nghiệm thực tế tại Singapore cho sinh viên quốc tế và người trẻ có tiềm năng.",
    images: [
      {
        url: "/images/thumb-sharing.png",
        width: 1200,
        height: 630,
        alt: "TEP - Training Employment Pass Singapore - KVC Global",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TEP - Training Employment Pass Singapore - KVC Global",
    description: "Cơ hội làm việc và tích lũy kinh nghiệm thực tế tại Singapore cho sinh viên quốc tế và người trẻ có tiềm năng.",
    images: ["/images/thumb-sharing.png"],
  },
}

export default function WorkPassPage() {
  return (
    <>
      <WorkPassHero />
      <WorkPassDetails />
    </>
  )
}
