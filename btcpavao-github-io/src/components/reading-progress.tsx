import { useEffect, useRef } from "react"
import { readingProgress } from "@/reading-progress"

export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const bar = ref.current
    const article = document.querySelector("article")
    const content = document.querySelector("[data-reading-content]") ?? article
    const header = document.querySelector(".home-header")
    if (!bar || !article || !content) return
    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      const offset = header?.getBoundingClientRect().height ?? 0
      const start = Math.max(
        0,
        article.getBoundingClientRect().top + y - offset
      )
      const bottom = content.getBoundingClientRect().bottom + y
      const progress = readingProgress(y, start, bottom, window.innerHeight)
      bar.style.setProperty("--reading-progress", String(progress))
      bar.style.top = `${offset}px`
      bar.dataset.active = String(y > 8)
      bar.setAttribute("aria-valuenow", String(Math.round(progress * 100)))
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    const observer = new ResizeObserver(schedule)
    observer.observe(article)
    observer.observe(content)
    if (header) observer.observe(header)
    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [])
  return (
    <div
      ref={ref}
      className="reading-progress"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
    />
  )
}
