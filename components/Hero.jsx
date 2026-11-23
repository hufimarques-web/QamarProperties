'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion'

const FRAME_COUNT = 80

export function Hero() {
  const sectionRef    = useRef(null)
  const canvasRef     = useRef(null)
  const imageLayerRef = useRef(null)

  // Single shared progress value driven by GSAP scrub — feeds all FM transforms
  const progress = useMotionValue(0)

  // ── Scroll cue: fades on first scroll ────────────────────────────────
  const cue_opacity = useTransform(progress, [0, 0.10], [1, 0])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const canvas  = canvasRef.current
    if (!canvas) return
    const ctx2d   = canvas.getContext('2d')
    const section = sectionRef.current

    const isMobile = window.innerWidth < 768
    const scrollPx = window.innerHeight * (isMobile ? 3.2 : 4)
    const prefix   = isMobile ? '/framesmobile/ezgif-frame-' : '/sequence/ezgif-frame-'

    // ── Canvas draw ──────────────────────────────────────────────────
    const images = new Array(FRAME_COUNT).fill(null)

    const drawFrame = (rawIndex) => {
      const idx = Math.min(Math.max(Math.round(rawIndex), 0), FRAME_COUNT - 1)
      const img = images[idx]
      if (!img || !img.complete || img.naturalWidth === 0) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const cw  = canvas.clientWidth
      const ch  = canvas.clientHeight
      if (cw === 0 || ch === 0) return

      if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
        canvas.width  = cw * dpr
        canvas.height = ch * dpr
        ctx2d.scale(dpr, dpr)
      }

      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const dx    = (cw - img.naturalWidth  * scale) / 2
      const dy    = (ch - img.naturalHeight * scale) / 2

      ctx2d.clearRect(0, 0, cw, ch)
      ctx2d.drawImage(img, dx, dy, img.naturalWidth * scale, img.naturalHeight * scale)
    }

    // ── Boot GSAP after all frames loaded ────────────────────────────
    let gsapCtx
    const boot = () => {
      if (imageLayerRef.current) imageLayerRef.current.style.opacity = '0'
      drawFrame(0)

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsapCtx = gsap.context(() => {
        ScrollTrigger.create({
          trigger:       section,
          start:         'top top',
          end:           `+=${scrollPx}`,
          pin:           true,
          anticipatePin: 1,
          scrub:         0.6,
          onUpdate(self) {
            drawFrame(self.progress * (FRAME_COUNT - 1))
            progress.set(self.progress)
          },
        })
      }, section)
    }

    // ── Preload frames ────────────────────────────────────────────────
    let loadedCount = 0
    let aborted = false

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image()
      img.decoding = 'async'
      const onDone = () => {
        if (aborted) return
        loadedCount++
        if (i === 0) drawFrame(0)
        if (loadedCount === FRAME_COUNT) boot()
      }
      img.onload  = onDone
      img.onerror = onDone
      img.src     = `${prefix}${String(i + 1).padStart(3, '0')}.png`
      images[i]   = img
    }

    return () => {
      aborted = true
      gsapCtx?.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', marginBottom: '-1px' }}
      aria-label="Hero"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Static first frame — shown while canvas loads */}
        <div
          ref={imageLayerRef}
          className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-500"
        >
          <Image
            alt="Aveiro Mobile"
            fill
            priority
            className="object-cover md:hidden"
            sizes="100vw"
            src="/framesmobile/ezgif-frame-001.png"
          />
          <Image
            alt="Aveiro Desktop"
            fill
            priority
            className="object-cover hidden md:block"
            sizes="100vw"
            src="/sequence/ezgif-frame-001.png"
          />
        </div>

        {/* Scroll-linked canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover scale-105 absolute inset-0 z-0"
          width={1920}
          height={1080}
        />



        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 pointer-events-none"
          style={{ opacity: cue_opacity }}
        >
          <span className="text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-nowrap opacity-90">
            Arraste e Descubra a Transformação
          </span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent opacity-60" />
        </motion.div>

      </div>
    </section>
  )
}
