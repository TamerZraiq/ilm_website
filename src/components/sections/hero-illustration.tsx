/* eslint-disable @next/next/no-img-element */
'use client'

import { motion, useReducedMotion } from 'framer-motion'

const SCENE = { width: 480, height: 600 }

const handEase: [number, number, number, number] = [0.22, 1, 0.36, 1]
const burstEase: [number, number, number, number] = [0.34, 1.56, 0.64, 1]

interface DecorativeElement {
  src: string
  offsetX: number
  offsetY: number
  width: number
  height: number
  ambient?: 'float' | 'pulse'
  floatDuration?: number
}

const decorativeElements: DecorativeElement[] = [
  // Leaves — LEFT side of hand, fanning outward like tree branches
  { src: '/logo-frames/Frame%204.svg', offsetX: -200, offsetY: 30, width: 130, height: 97 },
  { src: '/logo-frames/Frame%202.svg', offsetX: -210, offsetY: -50, width: 140, height: 57, ambient: 'float', floatDuration: 9 },
  { src: '/logo-frames/Frame%2010.svg', offsetX: -170, offsetY: -110, width: 42, height: 65 },
  { src: '/logo-frames/Frame%209.svg', offsetX: -145, offsetY: -155, width: 50, height: 79, ambient: 'float', floatDuration: 10 },
  { src: '/logo-frames/Frame%205.svg', offsetX: -110, offsetY: -90, width: 32, height: 35 },
  { src: '/logo-frames/Frame%203.svg', offsetX: -80, offsetY: -195, width: 40, height: 92, ambient: 'float', floatDuration: 8 },
  { src: '/logo-frames/Frame%208.svg', offsetX: -40, offsetY: -175, width: 28, height: 68 },
  // Stars — UPPER-RIGHT of hand, above fingertips
  { src: '/logo-frames/Frame%2011.svg', offsetX: 120, offsetY: -155, width: 70, height: 67 },
  { src: '/logo-frames/Frame%207.svg', offsetX: 170, offsetY: -85, width: 42, height: 40 },
  { src: '/logo-frames/Frame%206.svg', offsetX: 70, offsetY: -215, width: 28, height: 26, ambient: 'pulse' },
]

function AmbientWrapper({
  type,
  floatDuration = 9,
  children,
}: {
  type?: 'float' | 'pulse'
  floatDuration?: number
  children: React.ReactNode
}) {
  if (type === 'float') {
    return (
      <motion.div
        className="h-full w-full"
        animate={{ y: [0, -5, 0, 5, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.5,
        }}
      >
        {children}
      </motion.div>
    )
  }

  if (type === 'pulse') {
    return (
      <motion.div
        className="h-full w-full"
        animate={{ opacity: [1, 0.6, 1] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.5,
        }}
      >
        {children}
      </motion.div>
    )
  }

  return <>{children}</>
}

export function HeroIllustration() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="pointer-events-none relative mx-auto aspect-[4/5] w-60 sm:w-[336px] lg:w-[480px]">
      <div
        className="absolute left-0 top-0 origin-top-left scale-50 sm:scale-[0.7] lg:scale-100"
        style={{ width: SCENE.width, height: SCENE.height }}
      >
        {/* Hand — clips off-screen entrance */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <motion.div
              style={{ transformOrigin: 'bottom center' }}
              initial={
                prefersReducedMotion
                  ? false
                  : { y: '120%', rotate: -90, scale: 0.8 }
              }
              animate={{ y: 0, rotate: 0, scale: 1 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 1.2, ease: handEase }
              }
            >
              <img
                src="/logo-frames/Frame%201.svg"
                alt="Ilm Learning Center"
                style={{ height: 400, width: 'auto' }}
              />
            </motion.div>
          </div>
        </div>

        {/* Confetti burst — renders on top of hand */}
        {decorativeElements.map((el, i) => (
          <motion.div
            key={el.src}
            className="absolute"
            style={{
              top: '45%',
              left: '50%',
              width: el.width,
              height: el.height,
              marginTop: -el.height / 2,
              marginLeft: -el.width / 2,
            }}
            initial={
              prefersReducedMotion
                ? { x: el.offsetX, y: el.offsetY }
                : { scale: 0, opacity: 0, x: 0, y: 0 }
            }
            animate={{
              x: el.offsetX,
              y: el.offsetY,
              scale: 1,
              opacity: 1,
            }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    delay: 1.2 + i * 0.03,
                    duration: 0.5,
                    ease: burstEase,
                  }
            }
          >
            <AmbientWrapper
              type={prefersReducedMotion ? undefined : el.ambient}
              floatDuration={el.floatDuration}
            >
              <img src={el.src} alt="" className="h-full w-full" />
            </AmbientWrapper>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
