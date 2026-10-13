export function galleryIndex(index: number, direction: number, count: number) {
  return (index + direction + count) % count
}

export function swipeDirection(dx: number, dy: number) {
  if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.25) return 0
  return dx < 0 ? 1 : -1
}
