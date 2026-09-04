"use client"

import * as React from "react"
import { Building2, Info, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLocale } from "@/lib/i18n-client"
import type { PrivateStudySchoolsContent } from "@/sanity/private-study-page"

const SCHOOLS_VI = [
  {
    id: "ais",
    name: "Australian International School (AIS)",
    desc: "Đào tạo từ bậc mầm non đến Lớp 12, kết hợp chương trình giảng dạy của Úc với các chứng chỉ quốc tế: IB PYP (mầm non – Lớp 5), IGCSE (Lớp 10) và IBDP (Lớp 11-12).",
    levels: [
      { grade: "Infant Care", age: "2 tháng – 18 tháng", fee: "Từ 3.330 SGD / tháng" },
      { grade: "Preschool & Kindergarten", age: "18 tháng – 5 tuổi", fee: "Từ 10.068 SGD / học kỳ" },
      { grade: "Bậc Tiểu học (Lớp Dự bị – Lớp 5)", age: "6 – 11 tuổi", fee: "Từ 21.210 SGD / học kỳ" },
      { grade: "Bậc Trung học (Lớp 6 – Lớp 12)", age: "11 – 18 tuổi", fee: "Từ 25.200 SGD / học kỳ" },
    ],
  },
  {
    id: "sais",
    name: "Stamford American International School (SAIS)",
    desc: "Trường theo tiêu chuẩn Mỹ, nhận học sinh từ 18 tháng đến 18 tuổi, với 4 lộ trình học thuật: IB Diploma, Advanced Placement (AP), BTEC và các khóa học nội bộ Stamford Courses.",
    levels: [
      { grade: "Early Years (Mầm non)", age: "18 tháng – 6 tuổi", fee: "Từ 18.000 – 42.000 SGD / năm" },
      { grade: "Tiểu học", age: "6 – 11 tuổi", fee: "Từ 49.040 SGD / năm" },
      { grade: "Trung học cơ sở", age: "11 – 14 tuổi", fee: "Từ 53.210 SGD / năm" },
      { grade: "Trung học phổ thông", age: "14 – 18 tuổi", fee: "Từ 56.110 SGD / năm" },
    ],
  },
  {
    id: "brighton",
    name: "Brighton College (Singapore)",
    desc: "Thuộc hệ thống giáo dục Brighton College từ Vương quốc Anh, đào tạo học sinh từ 18 tháng đến 18 tuổi theo chương trình Anh Quốc (EYFS, IGCSE, A-Level).",
    levels: [
      { grade: "Khối Mầm non", age: "18 tháng – 6 tuổi", fee: "Từ 18.000 – 35.000 SGD / năm" },
      { grade: "Prep School (Tiểu học)", age: "6 – 11 tuổi", fee: "Từ 42.500 SGD / năm" },
      { grade: "Senior School", age: "Từ 11 tuổi", fee: "Từ 49.500 SGD / năm" },
      { grade: "Chương trình đặc biệt (PCP & PCS)", age: "Year 1 – Year 8", fee: "Từ 61.500 SGD / năm" },
    ],
  },
  {
    id: "cis",
    name: "Canadian International School (CIS)",
    desc: "Thành lập từ năm 1990, đào tạo theo chuẩn IB xuyên suốt từ mầm non đến trung học phổ thông (PYP, MYP, IBDP).",
    levels: [
      { grade: "Nursery", age: "18 tháng – 2 tuổi", fee: "Từ 10.780 SGD / học kỳ" },
      { grade: "Preschool & Kindergarten", age: "2 – 5 tuổi", fee: "Từ 19.635 SGD / học kỳ" },
      { grade: "Tiểu học (Lớp 1-3 / 4-6)", age: "6 – 11 tuổi", fee: "Từ 20.155 – 21.925 SGD / học kỳ" },
      { grade: "Trung học cơ sở (Lớp 7 – 10)", age: "11 – 16 tuổi", fee: "Từ 24.680 SGD / học kỳ" },
      { grade: "Trung học phổ thông (Lớp 11 – 12)", age: "16 – 18 tuổi", fee: "Từ 25.775 SGD / học kỳ" },
    ],
  },
  {
    id: "xwa",
    name: "XCL World Academy (XWA)",
    desc: "Trường quốc tế theo chuẩn IB, nhận học sinh từ 2 đến 18 tuổi, chú trọng chương trình song ngữ Anh – Trung cùng các lựa chọn ngoại ngữ khác (Pháp, Tây Ban Nha, Quan Thoại), kết hợp định hướng công nghệ và AI.",
    levels: [
      { grade: "Nursery", age: "18 tháng – 2 tuổi", fee: "Từ 14.500 SGD / học kỳ" },
      { grade: "Preschool & Kindergarten", age: "2 – 5 tuổi", fee: "Từ 15.330 SGD / học kỳ" },
      { grade: "Tiểu học (Lớp 1 – 5)", age: "6 – 11 tuổi", fee: "Từ 21.505 SGD / học kỳ" },
      { grade: "Trung học cơ sở (Lớp 6 – 10)", age: "11 – 16 tuổi", fee: "Từ 23.230 SGD / học kỳ" },
      { grade: "Trung học phổ thông (Lớp 11 – 12)", age: "16 – 18 tuổi", fee: "Từ 25.190 SGD / học kỳ" },
    ],
  },
] as const

const SCHOOLS_EN = [
  {
    id: "ais",
    name: "Australian International School (AIS)",
    desc: "Offers education from Preschool to Grade 12, combining the Australian curriculum with international qualifications: IB PYP (Preschool - Grade 5), IGCSE (Grade 10), and IBDP (Grades 11-12).",
    levels: [
      { grade: "Infant Care", age: "2 months – 18 months", fee: "From 3,330 SGD / month" },
      { grade: "Preschool & Kindergarten", age: "18 months – 5 years", fee: "From 10,068 SGD / term" },
      { grade: "Primary School (Prep – Grade 5)", age: "6 – 11 years", fee: "From 21,210 SGD / term" },
      { grade: "Secondary School (Grade 6 – Grade 12)", age: "11 – 18 years", fee: "From 25,200 SGD / term" },
    ],
  },
  {
    id: "sais",
    name: "Stamford American International School (SAIS)",
    desc: "US-standard curriculum, accepting students from 18 months to 18 years old, offering 4 pathways: IB Diploma, Advanced Placement (AP), BTEC, and internal Stamford Courses.",
    levels: [
      { grade: "Early Years (Preschool)", age: "18 months – 6 years", fee: "From 18,000 – 42,000 SGD / year" },
      { grade: "Primary School", age: "6 – 11 years", fee: "From 49,040 SGD / year" },
      { grade: "Middle School", age: "11 – 14 years", fee: "From 53,210 SGD / year" },
      { grade: "High School", age: "14 – 18 years", fee: "From 56,110 SGD / year" },
    ],
  },
  {
    id: "brighton",
    name: "Brighton College (Singapore)",
    desc: "Part of the prestigious Brighton College family in the UK, offering education for pupils aged 18 months to 18 years under the British curriculum (EYFS, IGCSE, A-Level).",
    levels: [
      { grade: "Early Years", age: "18 months – 6 years", fee: "From 18,000 – 35,000 SGD / year" },
      { grade: "Prep School (Primary)", age: "6 – 11 years", fee: "From 42,500 SGD / year" },
      { grade: "Senior School", age: "From 11 years", fee: "From 49,500 SGD / year" },
      { grade: "Specialist Programs (PCP & PCS)", age: "Year 1 – Year 8", fee: "From 61,500 SGD / year" },
    ],
  },
  {
    id: "cis",
    name: "Canadian International School (CIS)",
    desc: "Established in 1990, providing the IB curriculum framework from Early Years to High School (PYP, MYP, IBDP).",
    levels: [
      { grade: "Nursery", age: "18 months – 2 years", fee: "From 10,780 SGD / term" },
      { grade: "Preschool & Kindergarten", age: "2 – 5 years", fee: "From 19,635 SGD / term" },
      { grade: "Primary School (Grades 1-3 / 4-6)", age: "6 – 11 years", fee: "From 20,155 – 21,925 SGD / term" },
      { grade: "Middle School (Grades 7 – 10)", age: "11 – 16 years", fee: "From 24,680 SGD / term" },
      { grade: "High School (Grades 11 – 12)", age: "16 – 18 years", fee: "From 25,775 SGD / term" },
    ],
  },
  {
    id: "xwa",
    name: "XCL World Academy (XWA)",
    desc: "An IB World School accepting students aged 2 to 18, focusing on English-Mandarin bilingual curriculum, French and Spanish electives, tech, and AI.",
    levels: [
      { grade: "Nursery", age: "18 months – 2 years", fee: "From 14,500 SGD / term" },
      { grade: "Preschool & Kindergarten", age: "2 – 5 years", fee: "From 15,330 SGD / term" },
      { grade: "Primary School (Grades 1 – 5)", age: "6 – 11 years", fee: "From 21,505 SGD / term" },
      { grade: "Middle School (Grades 6 – 10)", age: "11 – 16 years", fee: "From 23,230 SGD / term" },
      { grade: "High School (Grades 11 – 12)", age: "16 – 18 years", fee: "From 25,190 SGD / term" },
    ],
  },
] as const

export function PrivateStudyAbroadSchools({ content }: { content?: PrivateStudySchoolsContent }) {
  const locale = useLocale()
  const isEn = locale === "en"

  const [activeSchoolId, setActiveSchoolId] = React.useState<string>("ais")

  const schools = content?.items?.length
    ? content.items
    : (isEn ? SCHOOLS_EN : SCHOOLS_VI)

  // Fallback to the first school in the resolved list if current selection is invalid
  const currentActiveId = activeSchoolId || schools[0]?.id || ""
  const activeSchool = schools.find((s) => s.id === currentActiveId) || schools[0]

  const noteBox = (
    <div className="bg-brand-light border border-border/60 rounded-md p-4 flex gap-3 items-start dark:border-border/10 dark:bg-muted/40 lg:px-3 lg:py-2 lg:gap-2.5">
      <Info className="h-5 w-5 text-brand-gold shrink-0 mt-0.5 lg:h-4 lg:w-4 lg:mt-px" strokeWidth={2} />
      <p className="font-body text-xs md:text-sm text-brand-blue/90 leading-normal lg:leading-snug">
        {content?.tipText ? (
          content.tipText
        ) : (
          <>
            <strong>{isEn ? "Note:" : "Lưu ý:"}</strong>{" "}
            {isEn
              ? "Tuition fees and programs of international schools are for reference at the latest intake. KVC Global will update the exact costs during direct consultation."
              : "Thông tin học phí và chương trình của các trường quốc tế mang tính chất tham khảo tại thời điểm tuyển sinh mới nhất. KVC Global sẽ cập nhật chi phí chính xác trong quá trình tư vấn trực tiếp."}
          </>
        )}
      </p>
    </div>
  )

  return (
    <section className="mt-20 w-full md:mt-28">
      <div className="text-center mb-10">
        <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">
          {content?.title || (isEn ? "Top International Schools in Singapore" : "Các trường quốc tế hàng đầu tại Singapore")}
        </h2>
        <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
      </div>

      {activeSchool && (
        <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
          {/* Left Side: School Selection Tabs & Note */}
          <div className="col-span-4 flex flex-col gap-2.5">
            <div className="flex flex-col gap-2 bg-brand-light/30 border border-border/50 rounded-lg p-3">
              {schools.map((school) => {
                const isSelected = school.id === currentActiveId
                return (
                  <button
                    key={school.id}
                    onClick={() => setActiveSchoolId(school.id || "")}
                    type="button"
                    className={cn(
                      "w-full text-left px-4 py-3.5 rounded-md font-heading text-sm font-bold transition-all flex items-center gap-3 cursor-pointer",
                      isSelected
                        ? "bg-brand-blue text-white shadow-md scale-[1.02]"
                        : "text-brand-blue/80 hover:bg-brand-light hover:text-brand-blue"
                    )}
                  >
                    <Building2
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isSelected ? "text-brand-gold-light" : "text-brand-gold"
                      )}
                    />
                    <span className="truncate">{school.name}</span>
                  </button>
                )
              })}
            </div>
            {noteBox}
          </div>

          {/* Right Side: Details & Fees Table */}
          <div className="col-span-8 bg-white border border-border/60 rounded-lg p-6 shadow-sm dark:border-border/10 dark:bg-card">
            <h3 className="font-heading text-xl font-bold text-brand-blue mb-3 dark:text-foreground">
              {activeSchool.name}
            </h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground mb-6">
              {activeSchool.desc}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-body text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border/80 bg-brand-light font-heading text-xs font-bold text-brand-blue uppercase">
                    <th className="py-3 px-4">{isEn ? "Level" : "Bậc học"}</th>
                    <th className="py-3 px-4">{isEn ? "Age / Grade" : "Độ tuổi / Khối lớp"}</th>
                    <th className="py-3 px-4">{isEn ? "Reference Tuition" : "Học phí tham khảo"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-brand-dark/90">
                  {activeSchool.levels?.map((lvl, index) => (
                    <tr key={index} className="hover:bg-brand-light/35 transition-colors">
                      <td className="py-3.5 px-4 font-semibold">{lvl.grade}</td>
                      <td className="py-3.5 px-4">{lvl.age}</td>
                      <td className="py-3.5 px-4 text-brand-blue font-semibold">{lvl.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Mobile layout: Card Accordion List */}
      <div className="lg:hidden flex flex-col gap-4">
        {schools.map((school) => {
          const isOpen = school.id === currentActiveId
          return (
            <div
              key={school.id}
              className="border border-border bg-white rounded-lg overflow-hidden shadow-sm dark:border-border/10 dark:bg-card"
            >
              <button
                type="button"
                onClick={() => setActiveSchoolId(isOpen ? "" : school.id || "")}
                className={cn(
                  "flex w-full items-center justify-between p-4 font-heading text-sm font-bold text-brand-blue text-left transition-colors cursor-pointer",
                  isOpen && "bg-brand-blue text-white"
                )}
              >
                <span className="flex items-center gap-3">
                  <Building2 className={cn("h-5 w-5", isOpen ? "text-brand-gold-light" : "text-brand-gold")} />
                  {school.name}
                </span>
                <ChevronRight className={cn("h-4 w-4 transform transition-transform", isOpen ? "rotate-90" : "")} />
              </button>

              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="p-4 border-t border-border/60 dark:border-border/10">
                    <p className="font-body text-xs leading-relaxed text-muted-foreground mb-4">
                      {school.desc}
                    </p>

                    <div className="flex flex-col gap-3 font-body text-xs">
                      {school.levels?.map((lvl, index) => (
                        <div
                          key={index}
                          className="bg-brand-light/50 border border-border/40 rounded p-3 flex flex-col gap-1.5 dark:border-border/10 dark:bg-muted/50"
                        >
                          <div className="font-bold text-brand-blue dark:text-foreground">{lvl.grade}</div>
                          <div className="text-muted-foreground flex justify-between">
                            <span>{isEn ? "Age / Grade:" : "Độ tuổi/Khối:"}</span>
                            <span>{lvl.age}</span>
                          </div>
                          <div className="text-brand-blue font-bold flex justify-between mt-1 pt-1 border-t border-dashed border-border/60 dark:border-border/10 dark:text-foreground">
                            <span>{isEn ? "Tuition:" : "Học phí:"}</span>
                            <span>{lvl.fee}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        <div className="mt-2">{noteBox}</div>
      </div>
    </section>
  )
}
