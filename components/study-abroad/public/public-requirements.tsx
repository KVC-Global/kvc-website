"use client"

import { cn } from "@/lib/utils"
import { Check, Info, ShieldCheck, Landmark } from "lucide-react"
import { useLocale } from "@/lib/i18n-client"
import type { PublicStudyRequirementsContent } from "@/sanity/public-study-page"

const DOCS_VI = [
  {
    title: "Thẻ học sinh (Student Pass):",
    description: "Bắt buộc đối với toàn bộ học sinh quốc tế để học tập hợp pháp tại Singapore. Quy trình nộp hồ sơ qua hệ thống SOLAR của Cục Di trú Singapore (ICA).",
  },
  {
    title: "Người giám hộ (Guardian):",
    description: "Học sinh dưới 18 tuổi bắt buộc phải có người giám hộ hợp pháp cư trú tại Singapore (là công dân Singapore hoặc thường trú nhân PR).",
  },
  {
    title: "Yêu cầu Tiếng Anh:",
    description: "Tùy lộ trình thi tuyển (AEIS, O-Level, J-PACT hoặc Polytechnic), học sinh cần chuẩn bị năng lực ngoại ngữ tương ứng (Cambridge CEQ, IELTS 5.5 - 6.0).",
  },
] as const

const DOCS_EN = [
  {
    title: "Student Pass:",
    description: "Mandatory for all international students to study legally in Singapore. Applied through the SOLAR system under ICA.",
  },
  {
    title: "Legal Guardian:",
    description: "Students under 18 must register a legal guardian residing in Singapore who is a Singapore Citizen or Permanent Resident (PR).",
  },
  {
    title: "English Proficiency:",
    description: "Depending on pathways (AEIS, O-Levels, J-PACT, or Polytechnic), students must prepare corresponding language standards (Cambridge CEQ, IELTS 5.5 - 6.0).",
  },
] as const

const COSTS_VI = [
  { item: "Chỗ ở (Ký túc xá / Căn hộ / Homestay)", fee: "800 – 1.500 SGD / tháng" },
  { item: "Ăn uống", fee: "300 – 500 SGD / tháng" },
  { item: "Di chuyển", fee: "50 – 80 SGD / tháng" },
  { item: "Chi tiêu cá nhân khác", fee: "200 – 400 SGD / tháng" },
] as const

const COSTS_EN = [
  { item: "Accommodation (Hostel / Flat / Homestay)", fee: "800 – 1,500 SGD / month" },
  { item: "Meals & Food", fee: "300 – 500 SGD / month" },
  { item: "Transportation", fee: "50 – 80 SGD / month" },
  { item: "Other Personal Outlays", fee: "200 – 400 SGD / month" },
] as const

export function PublicStudyAbroadRequirements({
  className,
  content,
}: {
  className?: string
  content?: PublicStudyRequirementsContent
}) {
  const locale = useLocale()
  const isEn = locale === "en"

  const conditions = content?.conditions?.length
    ? content.conditions
    : (isEn ? DOCS_EN : DOCS_VI)

  const costs = content?.costs?.length
    ? content.costs
    : (isEn ? COSTS_EN : COSTS_VI)

  return (
    <section
      aria-labelledby="public-reqs-heading"
      className={cn("mt-20 md:mt-28 w-full", className)}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
        {/* Left Side: Requirements & Guardian */}
        <div className="bg-white border border-border/60 rounded-lg p-6 md:p-8 shadow-sm lg:col-span-6 flex flex-col justify-between dark:border-border/10 dark:bg-card">
          <div>
            <div className="mb-6">
              <h2
                id="public-reqs-heading"
                className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
              >
                {content?.title1 || (isEn ? "Visa & Guardian Regulations" : "Quy định về Visa & Người giám hộ")}
              </h2>
              <span aria-hidden="true" className="mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
            </div>

            <ul className="space-y-4 font-body text-sm text-brand-dark/95">
              {conditions.map((cond, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-500 bg-emerald-50 text-emerald-600">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </div>
                  <span>
                    {cond.title && <strong>{cond.title} </strong>}
                    {cond.description}
                  </span>
                </li>
              ))}
            </ul>

            <div className="bg-brand-light border border-border/60 rounded-md p-4 flex gap-3 items-start mt-6">
              <ShieldCheck className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" strokeWidth={2} />
              <p className="font-body text-xs md:text-sm text-brand-blue/90 leading-normal">
                {content?.tipText1 ? (
                  content.tipText1
                ) : (
                  <>
                    <strong>{isEn ? "KVC Support:" : "Hỗ trợ từ KVC:"}</strong>{" "}
                    {isEn
                      ? "Arranging fast-track AEIS prep classes, advising on legal guardians, and managing solar application filing."
                      : "Hỗ trợ kết nối các lớp luyện thi AEIS cấp tốc, tư vấn thủ tục giám hộ và hoàn tất hồ sơ Student Pass trọn gói."}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Living Costs Table */}
        <div className="bg-white border border-border/60 rounded-lg p-6 md:p-8 shadow-sm lg:col-span-6 flex flex-col justify-between dark:border-border/10 dark:bg-card">
          <div>
            <div className="mb-6">
              <h2
                className="font-heading text-xl font-bold text-brand-blue sm:text-2xl"
              >
                {content?.title2 || (isEn ? "Estimated Cost of Living in Singapore" : "Dự trù chi phí sinh hoạt tại Singapore")}
              </h2>
              <span aria-hidden="true" className="mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-body text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border/80 bg-brand-light font-heading text-xs font-bold text-brand-blue">
                    <th className="py-2.5 px-3">{isEn ? "Expense Item" : "Khoản mục"}</th>
                    <th className="py-2.5 px-3 text-right">{isEn ? "Reference Cost" : "Chi phí tham khảo"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-brand-dark/90">
                  {costs.map((cost, idx) => (
                    <tr key={idx} className="hover:bg-brand-light/35 transition-colors">
                      <td className="py-3 px-3">{cost.item}</td>
                      <td className="py-3 px-3 text-right text-brand-blue font-semibold">{cost.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 bg-brand-light border border-border/60 rounded-md p-4 flex gap-3 items-start">
              <Info className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" strokeWidth={2} />
              <p className="font-body text-xs md:text-sm text-brand-blue/90 leading-normal">
                {content?.tipText2 ||
                  (isEn
                    ? "Actual outlays depend on student lifestyles and housing choices (school hostels, private homestays, or apartment rentals)."
                    : "Chi phí thực tế có thể thay đổi tùy thuộc vào phong cách sống và sự lựa chọn loại hình nhà ở (ký túc xá trường công, homestay tư nhân hoặc thuê căn hộ) của gia đình.")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scholarships Block */}
      <div className="mt-12 bg-white border border-border/60 rounded-lg p-6 md:p-8 shadow-sm dark:border-border/10 dark:bg-card">
        <span className="font-heading text-xs font-bold tracking-wider text-brand-gold uppercase">
          {content?.scholarshipEyebrow || (isEn ? "SINGAPORE MINISTRY OF EDUCATION (MOE) SCHOLARSHIPS" : "CHƯƠNG TRÌNH HỌC BỔNG CỦA BỘ GIÁO DỤC SINGAPORE (MOE)")}
        </span>
        <h3 className="font-heading text-xl font-bold text-brand-blue mt-2 mb-6 dark:text-foreground">
          {content?.scholarshipTitle || (isEn ? "Prestigious Scholarships for Outstanding Students" : "Cơ hội nhận học bổng danh giá cho học sinh xuất sắc")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ASEAN Scholarship */}
          <div className="border border-border/40 rounded-lg p-5 bg-brand-light/20">
            <h4 className="font-heading text-lg font-bold text-brand-blue border-b border-border pb-3 mb-4 flex items-center gap-2 dark:text-foreground">
              <Landmark className="h-5 w-5 text-brand-gold" />
              {content?.scholarship1?.title || (isEn ? "ASEAN Scholarship" : "Học bổng ASEAN (ASEAN Scholarship)")}
            </h4>
            <ul className="space-y-2.5 font-body text-sm text-muted-foreground list-disc pl-5 leading-normal">
              <li>
                <strong>{isEn ? "Target group:" : "Đối tượng:"}</strong>{" "}
                {content?.scholarship1?.target || (isEn ? "Outstanding students in Grades 8 to 10 in Vietnam." : "Dành cho học sinh xuất sắc lớp 8 đến lớp 10 tại Việt Nam.")}
              </li>
              <li>
                <strong>{isEn ? "Benefits:" : "Quyền lợi:"}</strong>{" "}
                {content?.scholarship1?.benefit || (isEn ? "Covers 100% of school fees, annual living allowance, hostel accommodation, return flight tickets, and national exam fees." : "Tài trợ 100% học phí, hỗ trợ chi phí sinh hoạt thường niên, cung cấp chỗ ở ký túc xá, vé máy bay khứ hồi khi bắt đầu và kết thúc khóa học, và lệ phí thi quốc gia.")}
              </li>
              <li>
                <strong>{isEn ? "Duration:" : "Thời hạn:"}</strong>{" "}
                {content?.scholarship1?.duration || (isEn ? "Lasts 4 years (from Secondary 3 to Pre-University 2)." : "Kéo dài 4 năm (từ lớp Trung học 3 đến hết lớp Dự bị Đại học 2).")}
              </li>
              <li>
                <strong>{isEn ? "Standard:" : "Yêu cầu:"}</strong>{" "}
                {content?.scholarship1?.standard || (isEn ? "Exceptional academic transcripts, rich ECA profiles, and passing the entrance test + interview from MOE." : "Thành tích học tập nổi bật, hoạt động ngoại khóa đa dạng và vượt qua bài thi tuyển sinh + phỏng vấn trực tiếp từ đại diện MOE.")}
              </li>
            </ul>
          </div>

          {/* MOE Pre-U Scholarship */}
          <div className="border border-border/40 rounded-lg p-5 bg-brand-light/20">
            <h4 className="font-heading text-lg font-bold text-brand-blue border-b border-border pb-3 mb-4 flex items-center gap-2 dark:text-foreground">
              <Landmark className="h-5 w-5 text-brand-gold" />
              {content?.scholarship2?.title || (isEn ? "MOE Pre-University Scholarship" : "Học bổng Dự bị Đại học MOE")}
            </h4>
            <ul className="space-y-2.5 font-body text-sm text-muted-foreground list-disc pl-5 leading-normal">
              <li>
                <strong>{isEn ? "Target group:" : "Đối tượng:"}</strong>{" "}
                {content?.scholarship2?.target || (isEn ? "International students preparing to enroll in Junior College (JC) in Singapore." : "Học sinh quốc tế chuẩn bị nhập học bậc Dự bị Đại học (Junior College) tại Singapore.")}
              </li>
              <li>
                <strong>{isEn ? "Benefits:" : "Quyền lợi:"}</strong>{" "}
                {content?.scholarship2?.benefit || (isEn ? "Provides a living allowance of 750 SGD per term plus school fee subsidies of up to 2,400 SGD/year." : "Trợ cấp sinh hoạt phí khoảng 750 SGD mỗi học kỳ kèm hỗ trợ chi phí học phí lên đến 2.400 SGD/năm.")}
              </li>
              <li>
                <strong>{isEn ? "Duration:" : "Thời hạn:"}</strong>{" "}
                {content?.scholarship2?.duration || (isEn ? "Lasts 2 years of the JC track." : "Kéo dài 2 năm học bậc JC.")}
              </li>
              <li>
                <strong>{isEn ? "Standard:" : "Yêu cầu:"}</strong>{" "}
                {content?.scholarship2?.standard || (isEn ? "Evaluated based on outstanding GCE 'O' Level results (L1R5 ≤ 8 points or equivalent)." : "Xét kết quả kỳ thi GCE &apos;O&apos; Level xuất sắc (điểm L1R5 ≤ 8 điểm hoặc tương đương).")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
