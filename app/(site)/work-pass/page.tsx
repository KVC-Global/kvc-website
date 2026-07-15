import { Metadata } from "next"
import { WorkPassHero } from "@/components/work-pass/work-pass-hero"

export const metadata: Metadata = {
  title: "TEP - Training Employment Pass Singapore - KVC Global",
  description: "Cơ hội làm việc và tích lũy kinh nghiệm thực tế tại Singapore cho sinh viên quốc tế và người trẻ có tiềm năng.",
}

export default function WorkPassPage() {
  return (
    <>
      <WorkPassHero />
    </>
  )
}
