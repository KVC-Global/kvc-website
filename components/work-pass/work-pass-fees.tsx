"use client"

import { Clock, Plane } from "lucide-react"
import type { WorkPassFeesContent } from "@/sanity/work-pass-page"
import { workPassIcons } from "./work-pass-icons"
import { cn } from "@/lib/utils"

const DEFAULT_FEES = [
  { category: "Phi xin TEP (MOM)", cost: "105" },
  { category: "Phi Issuance (nếu áp dụng)", cost: "185" },
  { category: "Phi dịch vụ tư vấn (KVC Global)", cost: "Liên hệ" },
]

const DEFAULT_PROCESSING = [
  {
    icon: "Clock",
    title: "Thời gian xét duyệt hồ sơ: 2 - 4 tuần",
    description: "(Tùy thuộc vào hồ sơ và doanh nghiệp bảo lãnh)",
  },
  {
    icon: "Plane",
    title: "Thời gian nhập cảnh: Sau khi nhận IPA, bạn có 3 tháng để nhập cảnh Singapore.",
    description: "",
  },
]

export function WorkPassFees({ content }: { content?: WorkPassFeesContent }) {
  const feesList = content?.feesList?.length
    ? content.feesList
    : [
        ...DEFAULT_FEES,
        { category: "Tổng chi phí ước tính", cost: "Liên hệ", isBold: true }
      ]

  const processingItems = content?.processingItems?.length
    ? content.processingItems.map((item) => ({
        icon: item.icon ? workPassIcons[item.icon] || Clock : Clock,
        title: item.title || "",
        description: item.description || "",
      }))
    : DEFAULT_PROCESSING.map((item) => ({
        icon: item.icon === "Plane" ? Plane : Clock,
        title: item.title,
        description: item.description,
      }))

  return (
    <section aria-labelledby="fees-heading" className="mt-20 md:mt-28 w-full">
      <div className="text-center mb-12">
        <h2
          id="fees-heading"
          className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
        >
          {content?.title || "4. Chi phí & thời gian xử lý"}
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Column 1: Reference Costs Card */}
        <div className="flex flex-col border border-border bg-white rounded-[20px] p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-10px_rgba(10,37,64,0.08)] transition-all duration-300">
          <h3 className="font-heading text-lg font-bold text-brand-blue mb-6">
            {content?.feesTitle || "Chi phí tham khảo"}
          </h3>

          <div className="w-full mt-2">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="font-heading font-bold text-brand-blue">
                  <th className="px-6 py-3.5 bg-brand-light rounded-l-lg border-r border-border/60">
                    {content?.feesCategoryHeader || "Hạng mục"}
                  </th>
                  <th className="px-6 py-3.5 bg-brand-light rounded-r-lg text-center">
                    {content?.feesCostHeader || "Chi phí (SGD)"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 font-body text-brand-dark/95">
                {feesList.map((fee, idx) => {
                  const isLast = idx === feesList.length - 1
                  const isBold = ('isBold' in fee ? fee.isBold : false) || isLast
                  return (
                    <tr
                      key={idx}
                      className={cn(
                        isBold && "font-bold",
                        !isBold && "border-b border-border/40"
                      )}
                    >
                      <td className="px-6 py-4 text-brand-blue border-r border-border/60">
                        {fee.category}
                      </td>
                      <td className="px-6 py-4 text-center text-brand-blue">
                        {fee.cost}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-4 font-body text-xs italic text-muted-foreground">
            {content?.feesNote || "*Chi phí có thể thay đổi theo quy định của MOM."}
          </p>
        </div>

        {/* Column 2: Timeline Card */}
        <div className="flex flex-col border border-border bg-white rounded-[20px] p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-10px_rgba(10,37,64,0.08)] transition-all duration-300 justify-center">
          <h3 className="font-heading text-lg font-bold text-brand-blue mb-8">
            {content?.processingTitle || "Thời gian xử lý"}
          </h3>

          <div className="space-y-8">
            {processingItems.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="flex flex-col gap-8">
                  {idx > 0 && <hr className="border-t border-border w-full" />}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-light border border-border">
                      <Icon className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-heading text-sm sm:text-base font-bold text-brand-blue leading-snug">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="mt-1 font-body text-xs sm:text-sm text-muted-foreground leading-normal">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
