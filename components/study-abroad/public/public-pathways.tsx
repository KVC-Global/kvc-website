"use client"

import { Calendar, Compass, FileCheck, Coins } from "lucide-react"

export function PublicStudyAbroadPathways() {
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
          Lộ trình du học công lập theo độ tuổi
        </h2>
        <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-brand-gold" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Primary Pathway Card */}
        <div className="bg-white border border-border/60 rounded-lg p-6 md:p-8 shadow-sm flex flex-col justify-between dark:border-border/10 dark:bg-card">
          <div>
            <span className="font-heading text-xs font-bold tracking-wider text-brand-gold uppercase">
              BẬC TIỂU HỌC (7 – 12 TUỔI)
            </span>
            <h3 className="font-heading text-xl font-bold text-brand-blue mt-2 mb-4 dark:text-foreground">
              Xây dựng nền tảng vững chắc
            </h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground mb-6">
              Chương trình chú trọng phát triển toàn diện Ngôn ngữ, Toán, Khoa học và Kỹ năng sống. Đặc biệt, tiếng Trung Phổ thông được dạy như ngôn ngữ thứ hai, là lợi thế lớn cho học sinh Việt Nam.
            </p>

            <ul className="space-y-3 font-body text-sm text-brand-dark/95">
              <li className="flex gap-3 items-start">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-blue">
                  <Compass className="h-3 w-3" />
                </div>
                <span>
                  <strong>Thi tuyển AEIS/S-AEIS:</strong> Dự thi môn Toán & Tiếng Anh vào tháng 9 (AEIS) hoặc tháng 2 (S-AEIS).
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-blue">
                  <FileCheck className="h-3 w-3" />
                </div>
                <span>
                  <strong>Yêu cầu Tiếng Anh (P2-P5):</strong> Cần có chứng chỉ tiếng Anh Cambridge (CEQ) phù hợp trước khi đăng ký AEIS.
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-blue">
                  <Coins className="h-3 w-3" />
                </div>
                <span>
                  <strong>Học phí tham khảo:</strong> Dao động từ 600 – 800 SGD/tháng.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Secondary Pathway Card */}
        <div className="bg-white border border-border/60 rounded-lg p-6 md:p-8 shadow-sm flex flex-col justify-between dark:border-border/10 dark:bg-card">
          <div>
            <span className="font-heading text-xs font-bold tracking-wider text-brand-gold uppercase">
              BẬC TRUNG HỌC (12 – 17 TUỔI)
            </span>
            <h3 className="font-heading text-xl font-bold text-brand-blue mt-2 mb-4 dark:text-foreground">
              Định hình lộ trình học thuật
            </h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground mb-6">
              Chuẩn bị cho học sinh các kỳ thi quốc gia (N-Level/O-Level), đồng thời áp dụng hệ thống Phân Ban Môn Học Toàn Phần (Subject-Based Banding) giúp cá nhân hóa lộ trình học theo năng lực (G1/G2/G3).
            </p>

            <ul className="space-y-3 font-body text-sm text-brand-dark/95">
              <li className="flex gap-3 items-start">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-blue">
                  <Compass className="h-3 w-3" />
                </div>
                <span>
                  <strong>Thi tuyển AEIS/S-AEIS:</strong> Thi tuyển môn Toán & Tiếng Anh để vào các lớp Trung học 1-3.
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-blue">
                  <FileCheck className="h-3 w-3" />
                </div>
                <span>
                  <strong>Lộ trình thay thế (O-Level):</strong> Ôn luyện và thi trực tiếp chứng chỉ GCE 'O' Level tại trường tư thục tại Singapore để xét tuyển vào Cao đẳng công lập (Polytechnic).
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-blue">
                  <Coins className="h-3 w-3" />
                </div>
                <span>
                  <strong>Học phí tham khảo:</strong> Khoảng 1.000 – 1.200 SGD/tháng.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Junior College vs Polytechnic Comparison Table/Layout */}
      <div className="mt-12 bg-white border border-border/60 rounded-lg p-6 md:p-8 shadow-sm dark:border-border/10 dark:bg-card">
        <span className="font-heading text-xs font-bold tracking-wider text-brand-gold uppercase">
          BẬC DỰ BỊ ĐẠI HỌC / CAO ĐẲNG CÔNG LẬP (16 – 19 TUỔI)
        </span>
        <h3 className="font-heading text-xl font-bold text-brand-blue mt-2 mb-6 dark:text-foreground">
          So sánh lộ trình Junior College (JC) vs Polytechnic (Poly)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Junior College */}
          <div className="border border-border/40 rounded-lg p-5 bg-brand-light/20">
            <h4 className="font-heading text-lg font-bold text-brand-blue border-b border-border pb-3 mb-4 dark:text-foreground">
              Junior College (JC)
            </h4>
            <div className="flex flex-col gap-4 font-body text-sm leading-normal">
              <div>
                <span className="font-semibold text-brand-blue">Thời gian học:</span>
                <span className="ml-1 text-muted-foreground">Chương trình dự bị đại học kéo dài 2 năm.</span>
              </div>
              <div>
                <span className="font-semibold text-brand-blue">Định hướng đầu ra:</span>
                <span className="ml-1 text-muted-foreground">Chuẩn bị trực tiếp cho kỳ thi GCE A-Level để xét tuyển vào các đại học công lập hàng đầu.</span>
              </div>
              <div>
                <span className="font-semibold text-brand-blue">Điều kiện xét tuyển:</span>
                <span className="ml-1 text-muted-foreground">Xác nhận hồ sơ tài năng, học bạ cấp 2 và lớp 10/11, hoạt động ngoại khóa, bài luận cá nhân và tham gia kỳ thi J-PACT.</span>
              </div>
              <div>
                <span className="font-semibold text-brand-blue">Học phí tham khảo:</span>
                <span className="ml-1 text-brand-gold font-semibold">Khoảng 1.200 – 1.400 SGD/tháng.</span>
              </div>
            </div>
          </div>

          {/* Polytechnic */}
          <div className="border border-border/40 rounded-lg p-5 bg-brand-light/20">
            <h4 className="font-heading text-lg font-bold text-brand-blue border-b border-border pb-3 mb-4 dark:text-foreground">
              Polytechnic (Cao đẳng công lập)
            </h4>
            <div className="flex flex-col gap-4 font-body text-sm leading-normal">
              <div>
                <span className="font-semibold text-brand-blue">Thời gian học:</span>
                <span className="ml-1 text-muted-foreground">Đào tạo chuyên môn/thực hành kéo dài 3 năm (nhận bằng Diploma).</span>
              </div>
              <div>
                <span className="font-semibold text-brand-blue">Định hướng đầu ra:</span>
                <span className="ml-1 text-muted-foreground">Làm việc trực tiếp sau khi tốt nghiệp, hoặc học liên thông lên Đại học (được giảm tín chỉ).</span>
              </div>
              <div>
                <span className="font-semibold text-brand-blue">Điều kiện xét tuyển:</span>
                <span className="ml-1 text-muted-foreground">Xét điểm học bạ THPT trung bình từ 7.0 trở lên, đi kèm chứng chỉ IELTS tối thiểu 5.5 - 6.0.</span>
              </div>
              <div>
                <span className="font-semibold text-brand-blue">Học phí tham khảo:</span>
                <span className="ml-1 text-brand-gold font-semibold">Khoảng 11.000 – 14.000 SGD/năm.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
