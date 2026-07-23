"use client"

import * as React from "react"
import { Building2, Info, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const SCHOOLS = [
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

export function PrivateStudyAbroadSchools() {
  const [activeSchoolId, setActiveSchoolId] = React.useState<string>("ais")
  const activeSchool = SCHOOLS.find((s) => s.id === activeSchoolId) || SCHOOLS[0]

  return (
    <section
      id="truong-tieu-bieu"
      aria-labelledby="schools-heading"
      className="mt-20 md:mt-28 w-full"
    >
      <div className="text-center mb-10">
        <h2
          id="schools-heading"
          className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
        >
          Trường quốc tế tiêu biểu tại Singapore
        </h2>
        <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
      </div>

      {/* Desktop layout: Tabs + Table */}
      <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
        {/* Left Side: School Selection Tabs */}
        <div className="col-span-4 flex flex-col gap-2">
          {SCHOOLS.map((school) => {
            const isActive = school.id === activeSchoolId
            return (
              <button
                key={school.id}
                type="button"
                onClick={() => setActiveSchoolId(school.id)}
                className={cn(
                  "flex items-center justify-between rounded-lg border p-4 text-left font-heading text-[15px] font-bold transition-all duration-300",
                  isActive
                    ? "border-brand-blue bg-brand-blue text-white shadow-md"
                    : "border-border bg-white text-brand-blue hover:bg-brand-light"
                )}
              >
                <span className="flex items-center gap-3">
                  <Building2 className={cn("h-5 w-5", isActive ? "text-brand-gold-light" : "text-brand-gold")} />
                  {school.name.split(" (")[0]}
                </span>
                <ChevronRight className={cn("h-4 w-4 transition-transform", isActive && "translate-x-1")} />
              </button>
            )
          })}
        </div>

        {/* Right Side: Details & Fees Table */}
        <div className="col-span-8 bg-white border border-border/60 rounded-lg p-6 shadow-sm">
          <h3 className="font-heading text-xl font-bold text-brand-blue mb-3">
            {activeSchool.name}
          </h3>
          <p className="font-body text-sm leading-relaxed text-muted-foreground mb-6">
            {activeSchool.desc}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-body text-sm border-collapse">
              <thead>
                <tr className="border-b border-border/80 bg-brand-light font-heading text-xs font-bold text-brand-blue uppercase">
                  <th className="py-3 px-4">Bậc học</th>
                  <th className="py-3 px-4">Độ tuổi / Khối lớp</th>
                  <th className="py-3 px-4">Học phí tham khảo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-brand-dark/90">
                {activeSchool.levels.map((lvl, index) => (
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

      {/* Mobile layout: Card Accordion List */}
      <div className="lg:hidden flex flex-col gap-4">
        {SCHOOLS.map((school) => {
          const isOpen = school.id === activeSchoolId
          return (
            <div
              key={school.id}
              className="border border-border bg-white rounded-lg overflow-hidden shadow-sm"
            >
              <button
                type="button"
                onClick={() => setActiveSchoolId(isOpen ? "" : school.id)}
                className={cn(
                  "flex w-full items-center justify-between p-4 font-heading text-sm font-bold text-brand-blue text-left transition-colors",
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
                  <div className="p-4 border-t border-border/60">
                    <p className="font-body text-xs leading-relaxed text-muted-foreground mb-4">
                      {school.desc}
                    </p>

                    <div className="flex flex-col gap-3 font-body text-xs">
                      {school.levels.map((lvl, index) => (
                        <div
                          key={index}
                          className="bg-brand-light/50 border border-border/40 rounded p-3 flex flex-col gap-1.5"
                        >
                          <div className="font-bold text-brand-blue">{lvl.grade}</div>
                          <div className="text-muted-foreground flex justify-between">
                            <span>Độ tuổi/Khối:</span>
                            <span>{lvl.age}</span>
                          </div>
                          <div className="text-brand-blue font-bold flex justify-between mt-1 pt-1 border-t border-dashed border-border/60">
                            <span>Học phí:</span>
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
      </div>

      <div className="bg-brand-light border border-border/60 rounded-md p-4 flex gap-3 items-start mt-8 max-w-3xl mx-auto">
        <Info className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" strokeWidth={2} />
        <p className="font-body text-xs md:text-sm text-brand-blue/90 leading-normal">
          <strong>Lưu ý:</strong> Thông tin học phí và chương trình của các trường quốc tế mang tính chất tham khảo tại thời điểm tuyển sinh mới nhất. KVC Global sẽ cập nhật chi phí chính xác trong quá trình tư vấn trực tiếp.
        </p>
      </div>
    </section>
  )
}
