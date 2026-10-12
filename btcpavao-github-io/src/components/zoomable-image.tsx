import { useEffect, useRef, useState, type ImgHTMLAttributes, type RefObject } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"

function ImageViewer({ src, alt, opener, onClose }: {
  src: string
  alt: string
  opener: RefObject<HTMLImageElement | null>
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

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
      <img className="article-image-viewer__image" src={src} alt={alt} decoding="async" />
    </dialog>,
    document.body,
  )
}

export function ZoomableImage({ src, alt = "", className = "", ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [open, setOpen] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

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
        onClick={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            setOpen(true)
          }
        }}
      />
      {open && src ? <ImageViewer src={src} alt={alt} opener={imageRef} onClose={() => setOpen(false)} /> : null}
    </>
  )
}
