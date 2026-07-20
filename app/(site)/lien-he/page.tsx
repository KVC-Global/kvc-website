import type { Metadata } from "next"

import { ContactPage } from "@/components/contact-page"

export const metadata: Metadata = {
  title: "Liên hệ - KVC Global",
  description:
    "Liên hệ với KVC Global để được tư vấn về du học Singapore, khóa học online quốc tế, Training Employment Pass và các dịch vụ định cư tại Singapore.",
  openGraph: {
    title: "Liên hệ - KVC Global",
    description:
      "Liên hệ với KVC Global để được tư vấn về du học Singapore, khóa học online quốc tế, Training Employment Pass và các dịch vụ định cư tại Singapore.",
    images: [
      {
        url: "/images/thumb-sharing.png",
        width: 1200,
        height: 630,
        alt: "KVC Global",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Liên hệ - KVC Global",
    description:
      "Liên hệ với KVC Global để được tư vấn về du học Singapore, khóa học online quốc tế, Training Employment Pass và các dịch vụ định cư tại Singapore.",
    images: ["/images/thumb-sharing.png"],
  },
}

export default function ContactRoutePage() {
  return <ContactPage />
}
