export function readingProgress(
  scrollY: number,
  start: number,
  bottom: number,
  viewportHeight: number
) {
  const distance = bottom - viewportHeight - start
  if (distance <= 0) return scrollY > start ? 1 : 0
  return Math.max(0, Math.min(1, (scrollY - start) / distance))
}
