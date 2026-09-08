"use client"

import { useEffect, useRef } from "react"
import createGlobe, { type COBEOptions } from "cobe"
import { useMotionValue, useReducedMotion, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

const MOVEMENT_DAMPING = 1400
const GLOBE_RADIUS_PERCENT = 40

export type GlobeLabel = {
  name: string
  flag?: string
  lat: number
  lng: number
  size?: number
  color?: readonly [number, number, number]
  kind?: "country" | "territory"
  offset?: readonly [number, number]
}

const EMPTY_GLOBE_LABELS: ReadonlyArray<GlobeLabel> = []

function projectLocation(lat: number, lng: number, phi: number, theta: number) {
  const latRad = (lat * Math.PI) / 180
  const lngRad = (lng * Math.PI) / 180
  const cosLat = Math.cos(latRad)
  const point = {
    x: cosLat * Math.cos(lngRad),
    y: Math.sin(latRad),
    z: -cosLat * Math.sin(lngRad),
  }
  const cosTheta = Math.cos(theta)
  const sinTheta = Math.sin(theta)
  const cosPhi = Math.cos(phi)
  const sinPhi = Math.sin(phi)

  const x = point.x * cosPhi + point.z * sinPhi
  const y =
    point.x * sinPhi * sinTheta +
    point.y * cosTheta -
    point.z * cosPhi * sinTheta
  const z =
    -point.x * sinPhi * cosTheta +
    point.y * sinTheta +
    point.z * cosPhi * cosTheta

  return {
    left: 50 + x * GLOBE_RADIUS_PERCENT,
    top: 50 - y * GLOBE_RADIUS_PERCENT,
    visible: z > 0.08,
  }
}

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
  labels = EMPTY_GLOBE_LABELS,
  initialPhi = config.phi,
  autoRotate = true,
}: {
  className?: string
  config?: COBEOptions
  labels?: ReadonlyArray<GlobeLabel>
  initialPhi?: number
  autoRotate?: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const labelRefs = useRef<Array<HTMLDivElement | null>>([])
  const phiRef = useRef(initialPhi)
  const widthRef = useRef(0)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)

  const r = useMotionValue(0)
  const shouldReduceMotion = useReducedMotion()
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth
      }
    }

    window.addEventListener("resize", onResize)
    onResize()

    const markers = labels.length
      ? labels.map(({ lat, lng, size = 0.045, color }) => ({
          location: [lat, lng] as [number, number],
          size,
          ...(color ? { color: [...color] as [number, number, number] } : {}),
        }))
      : config.markers

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      markers,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        if (
          autoRotate &&
          pointerInteracting.current === null &&
          shouldReduceMotion !== true
        ) {
          phiRef.current += 0.005
        }
        const phi = phiRef.current + rs.get()
        state.phi = phi
        state.width = widthRef.current * 2
        state.height = widthRef.current * 2

        labels.forEach(({ lat, lng }, index) => {
          const label = labelRefs.current[index]
          if (!label) return

          const position = projectLocation(lat, lng, phi, config.theta)
          label.style.left = `${position.left}%`
          label.style.top = `${position.top}%`
          label.style.opacity = position.visible ? "1" : "0"
        })
      },
    })

    const revealTimer = window.setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1"
    }, 0)

    return () => {
      window.clearTimeout(revealTimer)
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [rs, config, labels, shouldReduceMotion, autoRotate])

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-square w-full max-w-150",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 contain-[layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
      {labels.map((label, index) => {
        if (label.kind === "territory") return null

        const offsetX = label.offset?.[0] ?? 0
        const offsetY = label.offset?.[1] ?? -24

        return (
          <div
            key={label.name}
            ref={(node) => {
              labelRefs.current[index] = node
            }}
            aria-hidden="true"
            className="pointer-events-none absolute z-10 h-0 w-0 opacity-0 transition-opacity duration-200"
          >
            <svg
              aria-hidden="true"
              width="1"
              height="1"
              className="absolute hidden overflow-visible sm:block"
            >
              <line
                x1="0"
                y1="0"
                x2={offsetX}
                y2={offsetY}
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                className="text-brand-blue/25"
              />
            </svg>
            <span
              className="absolute top-0 left-0 hidden sm:block"
              style={{ transform: `translate(${offsetX}px, ${offsetY}px)` }}
            >
              <span className="inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-brand-blue/10 bg-white/95 px-2.5 py-1 font-heading text-[11px] font-semibold whitespace-nowrap text-brand-blue shadow-sm backdrop-blur-sm sm:text-xs">
                <span className="text-sm" aria-hidden="true">
                  {label.flag}
                </span>
                {label.name}
              </span>
            </span>
          </div>
        )
      })}
    </div>
  )
}
