"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, Variants } from "framer-motion"
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Clock,
  Globe,
  Users,
  Star,
  ArrowRight,
  Monitor,
  FileText,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const HERO_BG = "/images/study-abroad-hero.jpg"

const WHY_ITEMS = [
  {
    icon: Globe,
    title: "Bằng cấp được công nhận quốc tế",
    desc: "OSSD được các trường đại học tại Canada và nhiều quốc gia sử dụng làm căn cứ xét tuyển đầu vào.",
  },
  {
    icon: Star,
    title: "Tăng cơ hội vào đại học",
    desc: "Học sinh được đánh giá dựa trên quá trình học tập thay vì chỉ một kỳ thi duy nhất, giúp xây dựng hồ sơ học tập toàn diện.",
  },
  {
    icon: Users,
    title: "Phát triển kỹ năng toàn diện",
    desc: "Kỹ năng nghiên cứu, làm việc nhóm, thuyết trình, quản lý thời gian, tư duy độc lập.",
  },
  {
    icon: Clock,
    title: "Linh hoạt trong học tập",
    desc: "Học trực tuyến, lộ trình học cá nhân hóa, chuyển đổi tín chỉ nếu đủ điều kiện.",
  },
]

const STRUCTURE_ITEMS = [
  {
    title: "Hoàn thành 30 tín chỉ",
    desc: "Bao gồm các môn học bắt buộc và tự chọn theo định hướng nghề nghiệp và đại học. Đối với học sinh bắt đầu Grade 9 từ năm học 2024 trở đi, yêu cầu gồm 17 tín chỉ bắt buộc và 13 tín chỉ tự chọn; các khóa trước đó là 18 tín chỉ bắt buộc và 12 tín chỉ tự chọn.",
  },
  {
    title: "Năng lực đọc viết",
    desc: "Học sinh cần đáp ứng yêu cầu về năng lực đọc – viết của tỉnh Ontario thông qua bài đánh giá hoặc khóa học thay thế theo quy định.",
  },
  {
    title: "Hoạt động cộng đồng",
    desc: "Hoàn thành 40 giờ hoạt động cộng đồng (Community Involvement) nhằm phát triển trách nhiệm xã hội và kỹ năng thực tiễn.",
  },
  {
    title: "Học trực tuyến",
    desc: "Theo quy định hiện hành, học sinh cần hoàn thành tối thiểu 2 tín chỉ học trực tuyến (trừ các trường hợp được miễn theo chính sách của Ontario).",
  },
]

const SUBJECTS = [
  {
    name: "English",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Mathematics",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Science",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Business Studies",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Computer Science",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Social Sciences",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Canadian & World Studies",
    image:
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Arts",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Health & Physical Education",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Technology",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "French",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Economics",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Accounting",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80&auto=format&fit=crop",
  },
]

const TARGET_AUDIENCE = [
  "Học sinh THCS chuẩn bị vào THPT.",
  "Học sinh THPT muốn chuyển sang chương trình quốc tế.",
  "Học sinh có kế hoạch du học Canada.",
  "Học sinh muốn xét tuyển vào các trường đại học quốc tế.",
  "Gia đình mong muốn con học theo chương trình giáo dục Canada.",
]

const BENEFITS = [
  {
    title: "Tư vấn lộ trình cá nhân",
    desc: "Đội ngũ chuyên gia hỗ trợ xây dựng kế hoạch học tập phù hợp với năng lực và mục tiêu của từng học sinh.",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Hỗ trợ chọn môn",
    desc: "Tư vấn lựa chọn môn học phù hợp với ngành học tương lai, điều kiện xét tuyển đại học, khả năng học tập.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Đồng hành xuyên suốt",
    desc: "Theo dõi tiến độ học tập, hỗ trợ hồ sơ, tư vấn hoạt động ngoại khóa, chuẩn bị hồ sơ đại học.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Mở rộng cơ hội quốc tế",
    desc: "OSSD giúp học sinh xây dựng nền tảng để ứng tuyển vào nhiều trường đại học tại Canada và các quốc gia khác.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80&auto=format&fit=crop",
  },
]

const LEARNING_FORMATS = [
  {
    icon: Globe,
    title: "Chương trình chuẩn Ontario",
    desc: "Nội dung đào tạo bám sát khung chương trình chính thức của Bộ Giáo dục Ontario, Canada.",
  },
  {
    icon: Monitor,
    title: "Môi trường học hiện đại",
    desc: "Nền tảng học trực tuyến tiên tiến với đầy đủ tài nguyên học tập và công cụ tương tác.",
  },
  {
    icon: Star,
    title: "Giáo viên đạt chuẩn",
    desc: "Đội ngũ giảng dạy được đào tạo và cấp phép theo tiêu chuẩn của tỉnh bang Ontario.",
  },
  {
    icon: FileText,
    title: "Đánh giá liên tục",
    desc: "Học sinh được đánh giá xuyên suốt quá trình học thay vì chỉ dựa vào một kỳ thi duy nhất.",
  },
  {
    icon: Clock,
    title: "Học tập linh hoạt",
    desc: "Lộ trình cá nhân hóa, học mọi lúc mọi nơi theo kế hoạch riêng của từng học sinh.",
  },
]

const STEPS = [
  { title: "Đăng ký tư vấn", desc: "Liên hệ với KVC Global để được tư vấn chi tiết về chương trình OSSD và lộ trình học tập phù hợp." },
  { title: "Đánh giá hồ sơ", desc: "Đội ngũ chuyên gia đánh giá học lực, hồ sơ hiện tại và mục tiêu để đưa ra định hướng tối ưu." },
  { title: "Xây dựng lộ trình", desc: "Thiết kế lộ trình học OSSD cá nhân hóa, lựa chọn môn học phù hợp với định hướng đại học." },
  { title: "Hoàn tất nhập học", desc: "Hoàn thiện thủ tục, kích hoạt tài khoản học tập và sẵn sàng bắt đầu hành trình OSSD." },
  { title: "Học tập & Hỗ trợ", desc: "Bắt đầu chương trình với sự đồng hành xuyên suốt từ KVC Global cho đến khi hoàn thành bằng." },
]

const PARENT_REASONS = [
  "Tư vấn chuyên sâu về hệ thống giáo dục Canada.",
  "Xây dựng lộ trình học tập cá nhân hóa.",
  "Hỗ trợ lựa chọn môn học và định hướng đại học.",
  "Đồng hành trong quá trình học và chuẩn bị hồ sơ du học.",
  "Kết nối với các chương trình chuyển tiếp và tuyển sinh quốc tế.",
]

export function OnlineOssd({ className }: { className?: string }) {
  const [currentSubject, setCurrentSubject] = React.useState(0)

  const nextSubject = React.useCallback(() => {
    setCurrentSubject((prev) => (prev + 1) % SUBJECTS.length)
  }, [])

  const prevSubject = React.useCallback(() => {
    setCurrentSubject((prev) => (prev - 1 + SUBJECTS.length) % SUBJECTS.length)
  }, [])

  React.useEffect(() => {
    const timer = setInterval(nextSubject, 4000)
    return () => clearInterval(timer)
  }, [nextSubject])

  return (
    <div className={cn("w-full", className)}>
      {/* ── Hero ── */}
      <section
        className="relative w-full overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url(/images/study-abroad-hero.jpg)" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-white from-55% to-transparent"
        />
        <Container className="relative flex min-h-[580px] flex-col justify-center pt-28 pb-20 md:min-h-[640px]">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex flex-wrap items-center gap-1.5 font-body text-xs font-medium text-muted-foreground md:text-sm"
          >
            <Link
              href="/"
              className="transition-colors duration-200 hover:text-foreground"
            >
              Trang chủ
            </Link>
            <span className="text-muted-foreground/60 select-none">&gt;</span>
            <Link
              href="/khoa-hoc-online"
              className="transition-colors duration-200 hover:text-foreground"
            >
              Khóa Học Online
            </Link>
            <span className="text-muted-foreground/60 select-none">&gt;</span>
            <span
              className="font-semibold text-foreground/80"
              aria-current="page"
            >
              OSSD Ontario
            </span>
          </motion.div>

          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-3 inline-block font-heading text-xs font-bold tracking-wider text-brand-gold uppercase sm:text-sm"
            >
              OSSD CANADA
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-heading text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl md:text-5xl"
            >
              Bằng Tốt nghiệp Trung học Phổ thông Ontario
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4 max-w-xl font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base md:text-[17px]"
            >
              Mở cánh cửa vào các trường đại học hàng đầu tại Canada, Anh, Mỹ,
              Úc và nhiều quốc gia khác với chương trình OSSD được công nhận
              quốc tế.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-3 max-w-xl font-body text-sm leading-relaxed text-brand-dark/75"
            >
              KVC Global mang đến chương trình OSSD theo hình thức học linh
              hoạt, giúp học sinh xây dựng hồ sơ học thuật vững chắc và tăng lợi
              thế khi xét tuyển đại học toàn cầu.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <Link
                href="#dang-ky"
                className="group inline-flex items-center gap-2 rounded-sm bg-brand-blue-mid px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-blue hover:shadow-lg"
              >
                Đăng ký tư vấn miễn phí
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── OSSD là gì? ── */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16"
          >
            <motion.div variants={fadeUpVariants} className="lg:col-span-5">
              <div className="relative aspect-4/3 overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80&auto=format&fit=crop"
                  alt="OSSD Ontario program"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </motion.div>
            <motion.div variants={fadeUpVariants} className="lg:col-span-7">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">
                OSSD là gì?
              </h2>
              <p className="mt-5 font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base">
                Ontario Secondary School Diploma (OSSD) là bằng tốt nghiệp trung
                học phổ thông chính thức của tỉnh Ontario, Canada. Đây là chương
                trình giáo dục được công nhận rộng rãi bởi các trường đại học và
                cao đẳng tại Canada cũng như nhiều quốc gia trên thế giới.
              </p>
              <p className="mt-4 font-body text-sm leading-relaxed text-brand-dark/85 sm:text-base">
                OSSD chú trọng phát triển toàn diện cho học sinh thông qua:
              </p>
              <ul className="mt-4 space-y-2.5">
                {[
                  "Kiến thức học thuật vững chắc.",
                  "Tư duy phản biện và giải quyết vấn đề.",
                  "Kỹ năng nghiên cứu và giao tiếp.",
                  "Hoạt động ngoại khóa và trách nhiệm cộng đồng.",
                  "Chuẩn bị sẵn sàng cho môi trường đại học quốc tế.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-gold bg-brand-gold/10">
                      <Check
                        className="h-3 w-3 text-brand-gold"
                        strokeWidth={3}
                      />
                    </div>
                    <span className="font-body text-sm text-brand-dark/85">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ── Vì sao chọn OSSD? ── */}
      <section className="py-16 md:py-24">
        <Container className="max-w-none px-4 sm:px-5 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
          <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                variants={fadeUpVariants}
                className="mb-12 text-center"
              >
                <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">
                  Vì sao chọn chương trình OSSD?
                </h2>
                <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
              </motion.div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {WHY_ITEMS.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={i}
                      variants={fadeUpVariants}
                      className="flex flex-col items-center rounded-lg border border-border bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue-mid">
                        <Icon
                          className="h-7 w-7 text-brand-gold-light"
                          strokeWidth={1.75}
                        />
                      </div>
                      <h3 className="font-heading text-[16px] font-bold text-brand-blue">
                        {item.title}
                      </h3>
                      <p className="mt-3 font-body text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {item.desc}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Cấu trúc chương trình ── */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">
                Cấu trúc chương trình OSSD
              </h2>
              <p className="mt-3 font-body text-sm text-brand-dark/75">
                Để nhận bằng OSSD, học sinh cần hoàn thành các yêu cầu tốt
                nghiệp theo quy định của Bộ Giáo dục Ontario.
              </p>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {STRUCTURE_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUpVariants}
                  className="flex gap-4 rounded-lg border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue-mid text-lg font-bold text-brand-gold-light">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-brand-blue">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-brand-dark/75">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Các môn học & Đối tượng phù hợp ── */}
      <section className="py-16 md:py-24">
        <Container className="max-w-none px-4 sm:px-5 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
          <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Các môn học */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div
                  variants={fadeUpVariants}
                  className="mb-8 text-center lg:text-left"
                >
                  <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">
                    Các môn học
                  </h2>
                  <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold lg:mx-0" />
                  <p className="mt-3 font-body text-sm text-brand-dark/75">
                    Học sinh có thể lựa chọn nhiều môn học thuộc các nhóm. Việc
                    lựa chọn môn học sẽ được tư vấn dựa trên định hướng ngành
                    nghề và trường đại học mong muốn.
                  </p>
                </motion.div>
                <div className="relative">
                  <div className="group relative aspect-video sm:aspect-4/3 overflow-hidden rounded-lg shadow-md">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSubject}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={SUBJECTS[currentSubject].image}
                          alt={SUBJECTS[currentSubject].name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 42vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/70 via-transparent to-transparent" />
                        <div className="absolute right-0 bottom-0 left-0 p-5">
                          <span className="font-heading text-lg font-bold text-white sm:text-xl">
                            {SUBJECTS[currentSubject].name}
                          </span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                    {/* Arrows */}
                    <button
                      onClick={prevSubject}
                      className="absolute top-1/2 left-3 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-blue opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100 hover:bg-white hover:shadow-lg"
                      aria-label="Previous subject"
                    >
                      <ChevronLeft className="h-5 w-5" strokeWidth={2} />
                    </button>
                    <button
                      onClick={nextSubject}
                      className="absolute top-1/2 right-3 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-blue opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100 hover:bg-white hover:shadow-lg"
                      aria-label="Next subject"
                    >
                      <ChevronRight className="h-5 w-5" strokeWidth={2} />
                    </button>
                  </div>
                  {/* Dots */}
                  <div className="mt-4 flex items-center justify-center gap-2">
                    {SUBJECTS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSubject(i)}
                        className={cn(
                          "h-2 rounded-full transition-all duration-300",
                          i === currentSubject
                            ? "w-6 bg-brand-gold"
                            : "w-2 bg-brand-blue-mid/30 hover:bg-brand-blue-mid/50"
                        )}
                        aria-label={`Go to subject ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Đối tượng phù hợp */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div
                  variants={fadeUpVariants}
                  className="mb-8 text-center lg:text-left"
                >
                  <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">
                    Đối tượng phù hợp
                  </h2>
                  <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold lg:mx-0" />
                </motion.div>
                <ul className="space-y-4">
                  {TARGET_AUDIENCE.map((item, i) => (
                    <motion.li
                      key={i}
                      variants={fadeUpVariants}
                      className="flex items-start gap-4 rounded-lg border border-border bg-white p-5 shadow-sm"
                    >
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gold/10">
                        <Check
                          className="h-4 w-4 text-brand-gold"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="font-body text-sm text-brand-dark/85 sm:text-base">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Hình thức học ── */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeUpVariants} className="mb-12 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">
                Hình thức học
              </h2>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="mx-auto max-w-5xl">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
                {LEARNING_FORMATS.map((item, i) => {
                  const Icon = item.icon
                  const isWide = i < 2
                  return (
                    <motion.div
                      key={i}
                      variants={fadeUpVariants}
                      className={cn(
                        "group relative overflow-hidden rounded-xl border border-border/60 bg-white p-6 shadow-sm transition-all duration-500 ease-out",
                        "hover:-translate-y-1 hover:border-brand-blue/25 hover:shadow-lg",
                        isWide ? "lg:col-span-3" : "lg:col-span-2",
                      )}
                    >
                      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-gold/[0.06] transition-all duration-500 group-hover:scale-150 group-hover:bg-brand-gold/[0.12]" />
                      <div className="relative z-10">
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-brand-gold/20 bg-brand-gold/[0.06] transition-all duration-500 group-hover:border-brand-gold/40 group-hover:bg-brand-gold/[0.14]">
                          <Icon
                            className="h-5 w-5 text-brand-gold transition-transform duration-500 group-hover:scale-110"
                            strokeWidth={1.75}
                          />
                        </div>
                        <h3 className="font-heading text-[15px] font-bold text-brand-blue transition-colors duration-500 group-hover:text-brand-blue-mid">
                          {item.title}
                        </h3>
                        <p className="mt-2 font-body text-xs leading-relaxed text-brand-dark/70 sm:text-sm">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Lợi ích khi học OSSD tại KVC Global ── */}
      <section className="py-16 md:py-24">
        <Container className="max-w-none px-4 sm:px-5 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
          <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div variants={fadeUpVariants} className="mb-10 text-center">
                <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">
                  Lợi ích khi học OSSD tại KVC Global
                </h2>
                <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
              </motion.div>
              <div className="flex gap-6 overflow-x-auto pb-4 -mx-2 px-2 snap-x snap-mandatory scrollbar-hide">
                {BENEFITS.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUpVariants}
                    className="group w-[280px] shrink-0 snap-start overflow-hidden rounded-lg border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:w-[300px]"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="300px"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading text-base font-bold text-brand-blue">
                        {item.title}
                      </h3>
                      <p className="mt-2 font-body text-sm leading-relaxed text-brand-dark/75">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Quy trình đăng ký ── */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeUpVariants} className="mb-14 text-center">
              <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">
                Quy trình đăng ký
              </h2>
              <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
            </motion.div>
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                {/* Vertical connecting line */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 left-8 w-px bg-brand-blue-mid/[0.12] sm:left-10"
                />
                <div className="flex flex-col gap-0">
                  {STEPS.map((step, i) => {
                    const isLast = i === STEPS.length - 1
                    return (
                      <motion.div
                        key={i}
                        variants={fadeUpVariants}
                        className="group relative flex gap-6 pb-10 last:pb-0 sm:gap-8"
                      >
                        {/* Number badge */}
                        <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_4px_20px_rgba(2,14,80,0.08)] ring-1 ring-brand-blue-mid/10 transition-all duration-500 group-hover:shadow-[0_8px_30px_rgba(2,14,80,0.14)] group-hover:ring-brand-gold/40 sm:h-20 sm:w-20">
                          <span className="font-heading text-2xl font-extrabold text-brand-blue-mid transition-colors duration-500 group-hover:text-brand-blue sm:text-3xl">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        {/* Content */}
                        <div className="flex-1 pt-1 sm:pt-2">
                          <h3 className="font-heading text-lg font-bold text-brand-blue">
                            {step.title}
                          </h3>
                          <p className="mt-1.5 font-body text-sm leading-relaxed text-brand-dark/70">
                            {step.desc}
                          </p>
                        </div>
                        {/* Connecting dot (except last) */}
                        {!isLast && (
                          <div
                            aria-hidden="true"
                            className="absolute left-[26.5px] top-[78px] z-10 h-3 w-3 rounded-full border-2 border-brand-blue-mid/20 bg-white sm:left-[34.5px] sm:top-[94px]"
                          />
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Vì sao phụ huynh chọn KVC? ── */}
      <section className="py-16 md:py-24">
        <Container className="max-w-none px-4 sm:px-5 md:px-6 lg:px-8 xl:max-w-none 2xl:max-w-none">
          <div className="rounded-lg bg-muted px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div variants={fadeUpVariants} className="mb-12 text-center">
                <h2 className="font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl">
                  Vì sao phụ huynh lựa chọn KVC Global?
                </h2>
                <div className="mx-auto mt-2.5 h-0.5 w-12 rounded-full bg-brand-gold" />
              </motion.div>
              <div className="mx-auto max-w-3xl">
                <ul className="space-y-4">
                  {PARENT_REASONS.map((item, i) => (
                    <motion.li
                      key={i}
                      variants={fadeUpVariants}
                      className="flex items-start gap-4 rounded-lg border border-border bg-white p-5 shadow-sm"
                    >
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gold/10">
                        <Check
                          className="h-4 w-4 text-brand-gold"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="font-body text-sm text-brand-dark/85 sm:text-base">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── CTA / Liên hệ ── */}
      <section className="bg-brand-blue-mid py-16 md:py-24">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <motion.h2
              variants={fadeUpVariants}
              className="font-heading text-2xl font-extrabold text-white sm:text-3xl"
            >
              Liên hệ KVC Global
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-white/80 sm:text-base"
            >
              KVC Global đồng hành cùng học sinh và phụ huynh từ bước lựa chọn
              chương trình OSSD đến quá trình hoàn thành bằng tốt nghiệp và
              chuẩn bị hồ sơ vào các trường đại học quốc tế.
            </motion.p>
            <motion.div variants={fadeUpVariants} className="mt-8">
              <Link
                href="/lien-he"
                className="group inline-flex items-center gap-2 rounded-sm bg-brand-gold px-8 py-4 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-gold/90 hover:shadow-lg"
              >
                Liên hệ ngay để được tư vấn miễn phí
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  )
}
