type BitcoinPavaoMarkProps = {
  iconClassName?: string
  labelClassName?: string
}

export function BitcoinPavaoMark({
  iconClassName = "size-7",
  labelClassName,
}: BitcoinPavaoMarkProps) {
  return (
    <>
      <img
        src="/bitcoin-logo.svg"
        alt=""
        width="28"
        height="28"
        className={`shrink-0 ${iconClassName}`}
        aria-hidden="true"
      />
      <span className={labelClassName}>Pavao</span>
    </>
  )
}

type SiteBrandLinkProps = BitcoinPavaoMarkProps & {
  ariaCurrent?: "page"
  className?: string
  href?: string
}

export function SiteBrandLink({
  ariaCurrent,
  className = "",
  href = "/",
  iconClassName,
  labelClassName,
}: SiteBrandLinkProps) {
  return (
    <a
      href={href}
      aria-label="BTC Pavao — homepage"
      aria-current={ariaCurrent}
      className={`inline-flex min-h-11 items-center gap-2 font-display text-base font-bold tracking-[-0.035em] text-foreground ${className}`}
    >
      <BitcoinPavaoMark
        iconClassName={iconClassName}
        labelClassName={labelClassName}
      />
    </a>
  )
}
