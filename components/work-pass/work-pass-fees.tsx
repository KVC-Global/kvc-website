"use client"

import { Clock, Plane } from "lucide-react"

export function WorkPassFees() {
  return (
    <section aria-labelledby="fees-heading" className="mt-20 md:mt-28 w-full">
      <div className="text-center mb-12">
        <h2
          id="fees-heading"
          className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
        >
          4. Chi phí & thời gian xử lý
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-secondary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Column 1: Reference Costs Card */}
        <div className="flex flex-col border border-border bg-white rounded-[20px] p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-10px_rgba(10,37,64,0.08)] transition-all duration-300">
          <h3 className="font-heading text-lg font-bold text-brand-blue mb-6">
            Chi phí tham khảo
          </h3>

          <div className="w-full mt-2">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="font-heading font-bold text-brand-blue">
                  <th className="px-6 py-3.5 bg-[#FFF8EE] rounded-l-lg border-r border-border/60">Hạng mục</th>
                  <th className="px-6 py-3.5 bg-[#FFF8EE] rounded-r-lg text-center">Chi phí (SGD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 font-body text-brand-dark/95">
                <tr className="border-b border-border/40">
                  <td className="px-6 py-4 font-semibold text-brand-blue border-r border-border/60">Phi xin TEP (MOM)</td>
                  <td className="px-6 py-4 text-center font-bold text-brand-blue">105</td>
                </tr>
                <tr className="border-b border-border/40">
                  <td className="px-6 py-4 font-semibold text-brand-blue border-r border-border/60">Phi Issuance (nếu áp dụng)</td>
                  <td className="px-6 py-4 text-center font-bold text-brand-blue">185</td>
                </tr>
                <tr className="border-b border-border/40">
                  <td className="px-6 py-4 font-semibold text-brand-blue border-r border-border/60">Phi dịch vụ tư vấn (KVC Global)</td>
                  <td className="px-6 py-4 text-center font-bold text-brand-blue">Liên hệ</td>
                </tr>
                <tr className="font-bold">
                  <td className="px-6 py-4 text-brand-blue border-r border-border/60">Tổng chi phí ước tính</td>
                  <td className="px-6 py-4 text-center text-brand-blue">Liên hệ</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 font-body text-xs italic text-muted-foreground">
            *Chi phí có thể thay đổi theo quy định của MOM.
          </p>
        </div>

        {/* Column 2: Timeline Card */}
        <div className="flex flex-col border border-border bg-white rounded-[20px] p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-10px_rgba(10,37,64,0.08)] transition-all duration-300 justify-center">
          <h3 className="font-heading text-lg font-bold text-brand-blue mb-8">
            Thời gian xử lý
          </h3>

          <div className="space-y-8">
            {/* Timeline Item 1 */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-light border border-border">
                <Clock className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
              </div>
              <div className="flex flex-col">
                <h4 className="font-heading text-sm sm:text-base font-bold text-brand-blue leading-snug">
                  Thời gian xét duyệt hồ sơ: 2 - 4 tuần
                </h4>
                <p className="mt-1 font-body text-xs sm:text-sm text-muted-foreground leading-normal">
                  (Tùy thuộc vào hồ sơ và doanh nghiệp bảo lãnh)
                </p>
              </div>
            </div>

            <hr className="border-t border-border" />

            {/* Timeline Item 2 */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-light border border-border">
                <Plane className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
              </div>
              <div className="flex flex-col">
                <h4 className="font-heading text-sm sm:text-base font-bold text-brand-blue leading-snug">
                  Thời gian nhập cảnh: Sau khi nhận IPA, bạn có 3 tháng để nhập cảnh Singapore.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
