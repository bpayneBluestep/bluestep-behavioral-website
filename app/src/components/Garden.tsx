import { useEffect, useRef } from 'react'

// Fairy garden theme effects (temporary, see garden.css): drifting fireflies, a
// sparkle trail behind the cursor on desktop, and butterflies when a form is sent.
// One canvas, one animation loop, paused while the tab is hidden. Renders nothing
// under reduced motion.

type Fly = { x: number; y: number; vx: number; vy: number; phase: number; speed: number; r: number }
type Spark = { x: number; y: number; vx: number; vy: number; life: number; size: number }

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** A soft glowing dot, drawn once per color and stamped every frame. */
function glowSprite(rgb: string) {
  const c = document.createElement('canvas')
  c.width = c.height = 48
  const g = c.getContext('2d')!
  const grad = g.createRadialGradient(24, 24, 0, 24, 24, 24)
  grad.addColorStop(0, `rgba(${rgb},1)`)
  grad.addColorStop(0.18, `rgba(${rgb},0.85)`)
  grad.addColorStop(0.45, `rgba(${rgb},0.22)`)
  grad.addColorStop(1, `rgba(${rgb},0)`)
  g.fillStyle = grad
  g.fillRect(0, 0, 48, 48)
  return c
}

function star(g: CanvasRenderingContext2D, x: number, y: number, s: number) {
  g.beginPath()
  g.moveTo(x, y - s)
  g.quadraticCurveTo(x, y, x + s, y)
  g.quadraticCurveTo(x, y, x, y + s)
  g.quadraticCurveTo(x, y, x - s, y)
  g.quadraticCurveTo(x, y, x, y - s)
  g.fill()
}

function releaseButterflies(from: DOMRect) {
  for (let i = 0; i < 7; i++) {
    const b = document.createElement('span')
    b.className = 'butterfly'
    b.textContent = '🦋'
    b.setAttribute('aria-hidden', 'true')
    b.style.left = `${from.left + from.width * (0.2 + Math.random() * 0.6)}px`
    b.style.top = `${from.top}px`
    b.style.setProperty('--dx', `${(Math.random() - 0.5) * 260}px`)
    b.style.animationDelay = `${i * 90}ms`
    document.body.appendChild(b)
    b.addEventListener('animationend', () => b.remove())
  }
}

export default function Garden() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (reducedMotion()) return
    const onSubmit = (e: Event) => {
      const btn = (e.target as HTMLFormElement).querySelector('button[type=submit]')
      if (btn) releaseButterflies(btn.getBoundingClientRect())
    }
    document.addEventListener('submit', onSubmit, true)
    return () => document.removeEventListener('submit', onSubmit, true)
  }, [])

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || reducedMotion()) return
    const g = canvas.getContext('2d')!
    const sprites = { light: glowSprite('214,160,60'), dark: glowSprite('255,224,138') }
    const sparkColor = { light: 'rgba(206,120,160,', dark: 'rgba(255,236,170,' }
    let w = 0
    let h = 0
    let flies: Fly[] = []
    const sparks: Spark[] = []

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(34, Math.round((w * h) / 42000))
      flies = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 0.9,
        r: 10 + Math.random() * 12,
      }))
    }
    resize()
    window.addEventListener('resize', resize)

    // Sparkle trail: desktop pointers only, throttled.
    const fine = window.matchMedia('(pointer: fine)').matches
    let lastSpark = 0
    const onMove = (e: PointerEvent) => {
      const now = performance.now()
      if (now - lastSpark < 28) return
      lastSpark = now
      sparks.push({
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 0.8,
        vy: 0.2 + Math.random() * 0.6,
        life: 1,
        size: 2 + Math.random() * 3,
      })
      if (sparks.length > 60) sparks.shift()
    }
    if (fine) window.addEventListener('pointermove', onMove, { passive: true })

    let raf = 0
    let t = 0
    function frame() {
      t += 1 / 60
      const theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
      const sprite = sprites[theme]
      g.clearRect(0, 0, w, h)

      for (const f of flies) {
        f.vx += (Math.random() - 0.5) * 0.02
        f.vy += (Math.random() - 0.5) * 0.02
        f.vx = Math.max(-0.4, Math.min(0.4, f.vx))
        f.vy = Math.max(-0.35, Math.min(0.35, f.vy))
        f.x += f.vx
        f.y += f.vy + Math.sin(t * f.speed + f.phase) * 0.15
        if (f.x < -20) f.x = w + 20
        if (f.x > w + 20) f.x = -20
        if (f.y < -20) f.y = h + 20
        if (f.y > h + 20) f.y = -20
        const pulse = 0.5 + 0.5 * Math.sin(t * f.speed * 1.6 + f.phase)
        g.globalAlpha = (theme === 'dark' ? 0.25 : 0.18) + pulse * (theme === 'dark' ? 0.7 : 0.45)
        g.drawImage(sprite, f.x - f.r, f.y - f.r, f.r * 2, f.r * 2)
      }

      g.globalAlpha = 1
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.x += s.vx
        s.y += s.vy
        s.life -= 0.025
        if (s.life <= 0) {
          sparks.splice(i, 1)
          continue
        }
        g.fillStyle = `${sparkColor[theme]}${s.life.toFixed(2)})`
        star(g, s.x, s.y, s.size * s.life)
      }

      raf = requestAnimationFrame(frame)
    }

    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(frame)
    }
    document.addEventListener('visibilitychange', onVisibility)
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-30 h-full w-full" />
}
