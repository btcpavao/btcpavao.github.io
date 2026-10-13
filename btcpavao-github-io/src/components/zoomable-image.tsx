import { useEffect, useRef, useState, type ImgHTMLAttributes, type RefObject } from "react"
import { createPortal } from "react-dom"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { galleryIndex, swipeDirection } from "./gallery-navigation"

type GalleryImage = { src: string; alt: string }
export type Gallery = { images: GalleryImage[]; startIndex: number }

export function ImageViewer({ images, startIndex, opener, onClose }: Gallery & {
  opener: RefObject<HTMLElement | null>
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const gesture = useRef<{ id: number; x: number; y: number } | null>(null)
  const [index, setIndex] = useState(startIndex)
  const { src, alt } = images[index]
  const multiple = images.length > 1
  const move = (direction: number) => setIndex(current => galleryIndex(current, direction, images.length))

  useEffect(() => {
    const previousFocus = opener.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
    closeRef.current?.focus({ preventScroll: true })
    return () => {
      document.body.style.overflow = previousOverflow
      previousFocus?.focus({ preventScroll: true })
    }
  }, [opener])

  return createPortal(
    <dialog
      ref={dialogRef}
      className="article-image-viewer"
      aria-label={alt || "Enlarged article image"}
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault()
          move(event.key === "ArrowRight" ? 1 : -1)
        }
      }}
    >
      <button
        ref={closeRef}
        type="button"
        className="article-image-viewer__close"
        aria-label="Close enlarged image"
        onClick={onClose}
      >
        <X size={24} aria-hidden="true" />
      </button>
      <div
        className="article-image-viewer__stage"
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0) { gesture.current = null; return }
          gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerUp={(event) => {
          const start = gesture.current
          gesture.current = null
          if (!start || start.id !== event.pointerId) return
          const direction = swipeDirection(event.clientX - start.x, event.clientY - start.y)
          if (direction) move(direction)
        }}
        onPointerCancel={() => { gesture.current = null }}
      >
        <img className="article-image-viewer__image" src={src} alt={alt} decoding="async" draggable={false} />
      </div>
      {multiple && <>
        <button type="button" className="article-image-viewer__previous" aria-label="Previous image" onClick={() => move(-1)}>
          <ChevronLeft size={26} aria-hidden="true" />
        </button>
        <button type="button" className="article-image-viewer__next" aria-label="Next image" onClick={() => move(1)}>
          <ChevronRight size={26} aria-hidden="true" />
        </button>
        <p className="article-image-viewer__position" role="status" aria-live="polite" aria-atomic="true">
          <span aria-hidden="true">{index + 1} / {images.length}</span>
          <span className="sr-only">Image {index + 1} of {images.length}: {alt}</span>
        </p>
      </>}
    </dialog>,
    document.body,
  )
}

export function ZoomableImage({ src, alt = "", className = "", ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [gallery, setGallery] = useState<Gallery | null>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const openGallery = () => {
    const image = imageRef.current
    if (!image || !src) return
    // Read the article's rendered order, including lazy images, only on opening.
    const scope = image.closest("article") ?? image.closest("main")
    const siblings = scope ? [...scope.querySelectorAll<HTMLImageElement>(".article-image-zoom[src]")] : [image]
    const startIndex = siblings.indexOf(image)
    setGallery({
      images: siblings.map(item => ({ src: item.src, alt: item.alt })),
      startIndex: Math.max(0, startIndex),
    })
  }

  return (
    <>
      <img
        {...props}
        ref={imageRef}
        src={src}
        alt={alt}
        className={`article-image-zoom ${className}`}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label={`Open image fullscreen: ${alt}`}
        onClick={openGallery}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            openGallery()
          }
        }}
      />
      {gallery ? <ImageViewer {...gallery} opener={imageRef} onClose={() => setGallery(null)} /> : null}
    </>
  )
}
