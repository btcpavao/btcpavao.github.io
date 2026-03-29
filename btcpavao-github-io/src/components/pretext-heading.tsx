import {
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { layoutWithLines, prepareWithSegments } from "@chenglou/pretext"

type PretextHeadingProps<T extends ElementType> = {
  as?: T
  text: string
  textClassName: string
  wrapperClassName?: string
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className">

function getLineHeight(style: CSSStyleDeclaration) {
  if (style.lineHeight === "normal") {
    return Math.round(Number.parseFloat(style.fontSize) * 1.2)
  }

  return Number.parseFloat(style.lineHeight)
}

export function PretextHeading<T extends ElementType = "h2">({
  as,
  text,
  textClassName,
  wrapperClassName,
  ...props
}: PretextHeadingProps<T>) {
  const Tag = (as ?? "h2") as ElementType
  const containerRef = useRef<HTMLElement | null>(null)
  const probeRef = useRef<HTMLSpanElement | null>(null)
  const [lines, setLines] = useState<string[] | null>(null)
  const [lineStyle, setLineStyle] = useState<CSSProperties | null>(null)

  const fallback = useMemo(
    () => <span className={textClassName}>{text}</span>,
    [text, textClassName]
  )

  useEffect(() => {
    const container = containerRef.current
    const probe = probeRef.current
    if (!container || !probe) {
      return undefined
    }

    let frame = 0

    const measure = () => {
      frame = 0

      const width = container.clientWidth
      if (!width) {
        return
      }

      const style = window.getComputedStyle(probe)
      const font = style.font
      if (!font) {
        return
      }

      const nextLineHeight = getLineHeight(style)
      const prepared = prepareWithSegments(text, font)
      const nextLines = layoutWithLines(prepared, width, nextLineHeight).lines.map(
        (line) => line.text
      )

      setLines(nextLines)
      setLineStyle({ lineHeight: `${nextLineHeight}px` })
    }

    const scheduleMeasure = () => {
      if (frame) {
        window.cancelAnimationFrame(frame)
      }

      frame = window.requestAnimationFrame(measure)
    }

    scheduleMeasure()

    const resizeObserver = new ResizeObserver(scheduleMeasure)
    resizeObserver.observe(container)

    const fontFaceSet = document.fonts
    void fontFaceSet.ready.then(scheduleMeasure)
    fontFaceSet.addEventListener?.("loadingdone", scheduleMeasure)

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame)
      }
      resizeObserver.disconnect()
      fontFaceSet.removeEventListener?.("loadingdone", scheduleMeasure)
    }
  }, [text, textClassName])

  return (
    <Tag ref={containerRef} className={wrapperClassName} {...props}>
      <span
        ref={probeRef}
        aria-hidden="true"
        className={`pointer-events-none absolute invisible whitespace-normal ${textClassName}`}
      >
        {text}
      </span>
      {lines && lineStyle ? (
        <span className={`${textClassName} block`}>
          {lines.map((line, index) => (
            <span key={`${line}-${index}`} className="block" style={lineStyle}>
              {line}
            </span>
          ))}
        </span>
      ) : (
        fallback
      )}
    </Tag>
  )
}
