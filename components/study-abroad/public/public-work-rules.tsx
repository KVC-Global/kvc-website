"use client"

import { Briefcase, AlertTriangle } from "lucide-react"
import type { PublicStudyWorkRulesContent } from "@/sanity/public-study-page"

export function PublicStudyAbroadWorkRules({ content }: { content?: PublicStudyWorkRulesContent }) {
  return (
    <section
      aria-labelledby="work-rules-heading"
      className="mt-20 md:mt-28 w-full"
    >
      <div className="bg-white border border-border/60 rounded-lg p-6 md:p-8 shadow-sm dark:border-border/10 dark:bg-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-light">
            <Briefcase className="h-5 w-5 text-brand-gold" />
          </div>
          <h2
            id="work-rules-heading"
            className="font-heading text-xl font-bold text-brand-blue sm:text-2xl dark:text-foreground"
          >
            {content?.title || "Quy định làm việc bán thời gian cho du học sinh"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Work Hours & Age */}
          <div className="space-y-4">
            <h3 className="font-heading text-[15px] font-bold text-brand-blue dark:text-foreground">
              {content?.sectionTitle1 || "Quy định về thời gian & độ tuổi"}
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {content?.sectionDesc1 || "Theo quy định của Bộ Nhân lực Singapore (MOM), học sinh hệ công lập đáp ứng điều kiện có thể đi làm thêm bán thời gian:"}
            </p>

            <ul className="space-y-3 font-body text-sm text-brand-dark/95 pl-4 list-disc">
              {content?.conditions1?.length ? (
                content.conditions1.map((cond, idx) => <li key={idx}>{cond}</li>)
              ) : (
                <>
                  <li><strong>Độ tuổi tối thiểu:</strong> Từ 14 tuổi trở lên.</li>
                  <li><strong>Trong học kỳ:</strong> Được phép làm việc tối đa 16 giờ/tuần.</li>
                  <li><strong>Trong kỳ nghỉ:</strong> Không giới hạn giờ làm việc trong các kỳ nghỉ chính thức của trường.</li>
                </>
              )}
            </ul>
          </div>

          {/* Internship & Exclusions */}
          <div className="space-y-4">
            <h3 className="font-heading text-[15px] font-bold text-brand-blue dark:text-foreground">
              {content?.sectionTitle2 || "Điều kiện cơ sở đào tạo & Thực tập"}
            </h3>
            <ul className="space-y-3 font-body text-sm text-brand-dark/95 pl-4 list-disc">
              {content?.conditions2?.length ? (
                content.conditions2.map((cond, idx) => <li key={idx}>{cond}</li>)
              ) : (
                <>
                  <li>
                    <strong>Cơ sở đào tạo:</strong> Chỉ dành cho sinh viên học tại các trường được MOM cấp phép (bao gồm hệ thống Polytechnic và Đại học công lập). Học sinh cấp Tiểu học và Trung học công lập <strong className="text-destructive font-semibold">không được phép</strong> làm thêm.
                  </li>
                  <li>
                    <strong>Học phần thực tập:</strong> Thực tập bắt buộc/tự chọn tích lũy tín chỉ liên quan trực tiếp đến chương trình học không cần xin giấy phép lao động riêng.
                  </li>
                  <li>
                    <strong>Thực tập ngoài chương trình:</strong> Cần xin giấy phép lao động phù hợp (TEP, WHP) trước khi bắt đầu làm việc.
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Warning Alert Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex gap-3 items-start mt-8">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" strokeWidth={2} />
          <p className="font-body text-xs md:text-sm text-amber-900 leading-normal">
            <strong>Cảnh báo quan trọng:</strong> {content?.warningText || "Làm việc bất hợp pháp (không đúng cơ sở đào tạo, quá số giờ quy định hoặc làm việc khi chưa được cho phép) có thể dẫn tới hình phạt thu hồi Student Pass và trục xuất ngay lập tức từ chính quyền Singapore."}
          </p>
        </div>
      </div>
    </section>
  )
}
