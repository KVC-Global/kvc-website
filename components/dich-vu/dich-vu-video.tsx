"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { useState } from "react"

import type { DichVuVideoSection } from "@/sanity/service-pages"

import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

export function DichVuVideo({ className, data }: { className?: string; data?: DichVuVideoSection }) {
  const [isPlaying, setIsPlaying] = useState(false)

  const eyebrow = data?.eyebrow ?? "Khám Phá KVC Global"
  const title = data?.title ?? "Giải pháp toàn diện của chúng tôi"
  const videoUrl = data?.videoUrl ?? "/videos/fallback.mp4"

  return (
    <section className={cn("w-full bg-white py-16 md:py-24 dark:bg-background", className)}>
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-3 block font-heading text-xs font-bold tracking-wider text-brand-gold uppercase sm:text-sm">
              {eyebrow}
            </span>
            <h2 className="mb-8 font-heading text-2xl font-extrabold text-brand-blue sm:text-3xl dark:text-foreground">
              {title}
            </h2>
          </motion.div>

          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl border border-border/50 dark:border-border/10"
          >
            {!isPlaying ? (
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer group bg-brand-dark/10"
                onClick={() => setIsPlaying(true)}
              >
                {/* Fallback placeholder cover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue to-brand-blue-mid opacity-95" />
                
                {/* Custom pattern overlay for aesthetics */}
                <div 
                  className="absolute inset-0 opacity-10" 
                  style={{
                    backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                    backgroundSize: "24px 24px"
                  }}
                />

                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-blue shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                    <Play className="h-6 w-6 ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            ) : (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={videoUrl}
                autoPlay
                controls
                playsInline
              />
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
