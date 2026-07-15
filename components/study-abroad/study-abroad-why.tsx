"use client"

import { Clock, Wallet, FileText, Briefcase, TrendingUp } from "lucide-react"

const ENIcon = () => (
  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-blue font-heading text-[11px] font-extrabold text-brand-blue tracking-tight select-none">
    EN
  </div>
)

const BENEFITS = [
  {
    icon: Clock,
    title: "Tiết kiệm thời gian",
    description:
      "Hoàn thành chương trình và nhận bằng chỉ trong 1 năm, ngắn hơn nhiều so với các lộ trình du học truyền thống.",
  },
  {
    icon: Wallet,
    title: "Vừa học vừa có thu nhập",
    description:
      "Trợ cấp thực tập từ 800 - 1.500 SGD/tháng, giúp trang trải một phần chi phí sinh hoạt.",
  },
  {
    icon: FileText,
    title: "Học phí linh hoạt",
    description:
      "Học phí có thể được đóng theo từng đợt, giảm áp lực tài chính cho gia đình.",
  },
  {
    icon: ENIcon,
    title: "Không yêu cầu IELTS",
    description:
      "Phù hợp với các bạn chưa có chứng chỉ tiếng Anh quốc tế, sẽ được học bổ trợ trong quá trình học.",
  },
  {
    icon: Briefcase,
    title: "Kinh nghiệm thực tế",
    description:
      "Thực tập tại doanh nghiệp, nhà hàng, khách sạn quốc tế ngay từ khi còn đi học.",
  },
  {
    icon: TrendingUp,
    title: "Cơ hội phát triển lâu dài",
    description:
      "Liên thông lên Cử nhân hoặc tìm kiếm việc làm, chuyển đổi sang các loại work pass phù hợp.",
  },
] as const

export function StudyAbroadWhy() {
  return (
    <section
      aria-labelledby="why-heading"
      className="mt-20 md:mt-28 w-full"
    >
      <h2
        id="why-heading"
        className="text-center font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl"
      >
        Vì sao nên chọn Diploma 6+6?
      </h2>
      <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-16 rounded-full bg-secondary" />

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {BENEFITS.map((benefit, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center rounded-lg border border-border bg-white p-8 text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(10,37,64,0.1)]"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-light">
                <benefit.icon className="h-7 w-7 text-brand-blue" strokeWidth={1.75} />
              </div>

              <h3 className="font-heading text-[16px] font-bold text-brand-blue sm:text-[17px]">
                {benefit.title}
              </h3>

              <p className="mt-3 font-body text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {benefit.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
