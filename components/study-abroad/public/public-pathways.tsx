"use client"

import { Compass, FileCheck, Coins, HelpCircle } from "lucide-react"
import { useLocale } from "@/lib/i18n-client"
import type { PublicStudyPathwaysContent } from "@/sanity/public-study-page"
import { publicStudyIcons } from "./public-study-icons"

export function PublicStudyAbroadPathways({ content }: { content?: PublicStudyPathwaysContent }) {
  const locale = useLocale()
  const isEn = locale === "en"
  const cards = content?.cards

  return (
    <section
      id="lo-trinh"
      aria-labelledby="pathways-heading"
      className="mt-20 md:mt-28 w-full"
    >
      <div className="text-center mb-12">
        <h2
          id="pathways-heading"
          className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
        >
          {content?.title || (isEn ? "Singapore Public School Pathways by Age" : "Lộ trình du học công lập theo độ tuổi")}
        </h2>
        <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {cards?.length ? (
          cards.map((card, index) => (
            <div
              key={index}
              className="bg-white border border-border/60 rounded-lg p-6 md:p-8 shadow-sm flex flex-col justify-between dark:border-border/10 dark:bg-card"
            >
              <div>
                <span className="font-heading text-xs font-bold tracking-wider text-brand-gold uppercase">
                  {card.eyebrow}
                </span>
                <h3 className="font-heading text-xl font-bold text-brand-blue mt-2 mb-4 dark:text-foreground">
                  {card.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground mb-6">
                  {card.description}
                </p>

                <ul className="space-y-3 font-body text-sm text-brand-dark/95">
                  {card.conditions?.map((cond, condIndex) => {
                    const iconName = cond.icon
                    const Icon = iconName ? publicStudyIcons[iconName] : HelpCircle

                    return (
                      <li key={condIndex} className="flex gap-3 items-start">
                        <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-blue">
                          <Icon className="h-3 w-3" />
                        </div>
                        <span>
                          <strong>{cond.boldText}</strong>{cond.normalText}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <>
            {/* Primary Pathway Card */}
            <div className="bg-white border border-border/60 rounded-lg p-6 md:p-8 shadow-sm flex flex-col justify-between dark:border-border/10 dark:bg-card">
              <div>
                <span className="font-heading text-xs font-bold tracking-wider text-brand-gold uppercase">
                  {isEn ? "PRIMARY LEVEL (AGES 7 – 12)" : "BẬC TIỂU HỌC (7 – 12 TUỔI)"}
                </span>
                <h3 className="font-heading text-xl font-bold text-brand-blue mt-2 mb-4 dark:text-foreground">
                  {isEn ? "Build a Solid Foundation" : "Xây dựng nền tảng vững chắc"}
                </h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground mb-6">
                  {isEn
                    ? "Curriculum focuses on comprehensive development of Language, Math, Science, and Life Skills. Mandarin is taught as a second language, providing a major asset."
                    : "Chương trình chú trọng phát triển toàn diện Ngôn ngữ, Toán, Khoa học và Kỹ năng sống. Đặc biệt, tiếng Trung Phổ thông được dạy như ngôn ngữ thứ hai, là lợi thế lớn cho học sinh Việt Nam."}
                </p>

                <ul className="space-y-3 font-body text-sm text-brand-dark/95">
                  <li className="flex gap-3 items-start">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-blue">
                      <Compass className="h-3 w-3" />
                    </div>
                    <span>
                      <strong>{isEn ? "AEIS/S-AEIS Entrance Exams: " : "Thi tuyển AEIS/S-AEIS: "}</strong>
                      {isEn
                        ? "Test in Math & English in September (AEIS) or February (S-AEIS)."
                        : "Dự thi môn Toán & Tiếng Anh vào tháng 9 (AEIS) hoặc tháng 2 (S-AEIS)."}
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-blue">
                      <FileCheck className="h-3 w-3" />
                    </div>
                    <span>
                      <strong>{isEn ? "English Requirement (P2-P5): " : "Yêu cầu Tiếng Anh (P2-P5): "}</strong>
                      {isEn
                        ? "Must obtain a qualifying Cambridge English (CEQ) score before registering for AEIS."
                        : "Cần có chứng chỉ tiếng Anh Cambridge (CEQ) phù hợp trước khi đăng ký AEIS."}
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-blue">
                      <Coins className="h-3 w-3" />
                    </div>
                    <span>
                      <strong>{isEn ? "Reference Tuition Fees: " : "Học phí tham khảo: "}</strong>
                      {isEn ? "Ranges from 600 – 800 SGD / month." : "Dao động từ 600 – 800 SGD/tháng."}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Secondary Pathway Card */}
            <div className="bg-white border border-border/60 rounded-lg p-6 md:p-8 shadow-sm flex flex-col justify-between dark:border-border/10 dark:bg-card">
              <div>
                <span className="font-heading text-xs font-bold tracking-wider text-brand-gold uppercase">
                  {isEn ? "SECONDARY LEVEL (AGES 12 – 17)" : "BẬC TRUNG HỌC (12 – 17 TUỔI)"}
                </span>
                <h3 className="font-heading text-xl font-bold text-brand-blue mt-2 mb-4 dark:text-foreground">
                  {isEn ? "Shape Academic Pathways" : "Định hình lộ trình học thuật"}
                </h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground mb-6">
                  {isEn
                    ? "Prepares students for national examinations (N-Level/O-Level), while utilizing Full Subject-Based Banding to customize routes per abilities (G1/G2/G3)."
                    : "Chuẩn bị cho học sinh các kỳ thi quốc gia (N-Level/O-Level), đồng thời áp dụng hệ thống Phân Ban Môn Học Toàn Phần (Subject-Based Banding) giúp cá nhân hóa lộ trình học theo năng lực (G1/G2/G3)."}
                </p>

                <ul className="space-y-3 font-body text-sm text-brand-dark/95">
                  <li className="flex gap-3 items-start">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-blue">
                      <Compass className="h-3 w-3" />
                    </div>
                    <span>
                      <strong>{isEn ? "AEIS/S-AEIS Entrance Exams: " : "Thi tuyển AEIS/S-AEIS: "}</strong>
                      {isEn ? "Test in Math & English to enter Secondary Grades 1-3." : "Thi tuyển môn Toán & Tiếng Anh để vào các lớp Trung học 1-3."}
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-blue">
                      <FileCheck className="h-3 w-3" />
                    </div>
                    <span>
                      <strong>{isEn ? "Alternative Pathway (O-Levels): " : "Lộ trình thay thế (O-Level): "}</strong>
                      {isEn
                        ? "Prep and take GCE 'O' Level exams directly at local private schools to apply for Polytechnic colleges."
                        : "Ôn luyện và thi trực tiếp chứng chỉ GCE 'O' Level tại trường tư thục tại Singapore để xét tuyển vào Cao đẳng công lập (Polytechnic)."}
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-blue">
                      <Coins className="h-3 w-3" />
                    </div>
                    <span>
                      <strong>{isEn ? "Reference Tuition Fees: " : "Học phí tham khảo: "}</strong>
                      {isEn ? "Around 1,000 – 1,200 SGD / month." : "Khoảng 1.000 – 1.200 SGD/tháng."}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Junior College vs Polytechnic Comparison Table/Layout */}
      <div className="mt-12 bg-white border border-border/60 rounded-lg p-6 md:p-8 shadow-sm dark:border-border/10 dark:bg-card">
        <span className="font-heading text-xs font-bold tracking-wider text-brand-gold uppercase">
          {isEn ? "PRE-UNIVERSITY / POLYTECHNIC (AGES 16 – 19)" : "BẬC DỰ BỊ ĐẠI HỌC / CAO ĐẲNG CÔNG LẬP (16 – 19 TUỔI)"}
        </span>
        <h3 className="font-heading text-xl font-bold text-brand-blue mt-2 mb-6 dark:text-foreground">
          {content?.compareTitle || (isEn ? "Comparing Junior College (JC) vs Polytechnic (Poly) Pathways" : "So sánh lộ trình Junior College (JC) vs Polytechnic (Poly)")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Junior College */}
          <div className="border border-border/40 rounded-lg p-5 bg-brand-light/20">
            <h4 className="font-heading text-lg font-bold text-brand-blue border-b border-border pb-3 mb-4 dark:text-foreground">
              {content?.compareCard1?.title || "Junior College (JC)"}
            </h4>
            <div className="flex flex-col gap-4 font-body text-sm leading-normal">
              <div>
                <span className="font-semibold text-brand-blue">{isEn ? "Study duration:" : "Thời gian học:"}</span>
                <span className="ml-1 text-muted-foreground">
                  {content?.compareCard1?.duration || (isEn ? "2-year pre-university program." : "Chương trình dự bị đại học kéo dài 2 năm.")}
                </span>
              </div>
              <div>
                <span className="font-semibold text-brand-blue">{isEn ? "Target outcome:" : "Định hướng đầu ra:"}</span>
                <span className="ml-1 text-muted-foreground">
                  {content?.compareCard1?.objective || (isEn ? "Prepares students directly for the GCE A-Level exams to apply for top-tier public universities." : "Chuẩn bị trực tiếp cho kỳ thi GCE A-Level để xét tuyển vào các đại học công lập hàng đầu.")}
                </span>
              </div>
              <div>
                <span className="font-semibold text-brand-blue">{isEn ? "Entry requirements:" : "Điều kiện xét tuyển:"}</span>
                <span className="ml-1 text-muted-foreground">
                  {content?.compareCard1?.criteria || (isEn ? "Evaluates talent profiles, secondary and grade 10/11 academic transcripts, ECA, personal essays, and J-PACT score." : "Xác nhận hồ sơ tài năng, học bạ cấp 2 và lớp 10/11, hoạt động ngoại khóa, bài luận cá nhân và tham gia kỳ thi J-PACT.")}
                </span>
              </div>
              <div>
                <span className="font-semibold text-brand-blue">{isEn ? "Reference tuition fee:" : "Học phí tham khảo:"}</span>
                <span className="ml-1 text-brand-gold font-semibold">
                  {content?.compareCard1?.feeReference || (isEn ? "Around 1,200 – 1,400 SGD / month." : "Khoảng 1.200 – 1.400 SGD/tháng.")}
                </span>
              </div>
            </div>
          </div>

          {/* Polytechnic */}
          <div className="border border-border/40 rounded-lg p-5 bg-brand-light/20">
            <h4 className="font-heading text-lg font-bold text-brand-blue border-b border-border pb-3 mb-4 dark:text-foreground">
              {content?.compareCard2?.title || (isEn ? "Polytechnic (Cao đẳng công lập)" : "Polytechnic (Cao đẳng công lập)")}
            </h4>
            <div className="flex flex-col gap-4 font-body text-sm leading-normal">
              <div>
                <span className="font-semibold text-brand-blue">{isEn ? "Study duration:" : "Thời gian học:"}</span>
                <span className="ml-1 text-muted-foreground">
                  {content?.compareCard2?.duration || (isEn ? "3-year practical/professional training program (leading to a Diploma)." : "Đào tạo chuyên môn/thực hành kéo dài 3 năm (nhận bằng Diploma).")}
                </span>
              </div>
              <div>
                <span className="font-semibold text-brand-blue">{isEn ? "Target outcome:" : "Định hướng đầu ra:"}</span>
                <span className="ml-1 text-muted-foreground">
                  {content?.compareCard2?.objective || (isEn ? "Enters direct employment upon graduation, or transfers to local/overseas Universities with credit exemptions." : "Làm việc trực tiếp sau khi tốt nghiệp, hoặc học liên thông lên Đại học (được giảm tín chỉ).")}
                </span>
              </div>
              <div>
                <span className="font-semibold text-brand-blue">{isEn ? "Entry requirements:" : "Điều kiện xét tuyển:"}</span>
                <span className="ml-1 text-muted-foreground">
                  {content?.compareCard2?.criteria || (isEn ? "Requires high school transcript GPA of 7.0 or higher, with IELTS score of 5.5 - 6.0." : "Xét điểm học bạ THPT trung bình từ 7.0 trở lên, đi kèm chứng chỉ IELTS tối thiểu 5.5 - 6.0.")}
                </span>
              </div>
              <div>
                <span className="font-semibold text-brand-blue">{isEn ? "Reference tuition fee:" : "Học phí tham khảo:"}</span>
                <span className="ml-1 text-brand-gold font-semibold">
                  {content?.compareCard2?.feeReference || (isEn ? "Around 11,000 – 14,000 SGD / year." : "Khoảng 11.000 – 14.000 SGD/năm.")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
