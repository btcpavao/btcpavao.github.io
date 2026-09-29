import { ArrowUpRight, CalendarDays } from "lucide-react"

import { BOOKING_URL } from "@/site-config"

type ConsultingInvitationProps = {
  question: string
  detail: string
  className?: string
}

export function ConsultingInvitation({
  question,
  detail,
  className = "",
}: ConsultingInvitationProps) {
  return (
    <section
      className={`rounded-[28px] border border-border/70 bg-card/82 p-6 shadow-soft sm:p-8 ${className}`.trim()}
      aria-label="Discuss your Bitcoin question with Pavao"
    >
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/12 text-primary">
          <CalendarDays className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-bold tracking-[0.14em] text-primary uppercase">
            Apply this to your situation
          </p>
          <h2 className="mt-3 font-display text-2xl leading-tight font-bold tracking-[-0.035em] text-balance sm:text-3xl">
            {question}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            {detail}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            Book a 15-minute introduction to outline the question and decide
            whether a longer session would help. If we arrange one, that session
            is Value for Value: afterwards, you decide what it was worth. No
            fixed fee or obligation.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-[background-color,transform] duration-200 hover:bg-primary/90 active:scale-[0.98]"
          >
            Book a 15-minute introduction
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            Please keep private keys, passphrases, and wallet files out of the
            booking form.
          </p>
        </div>
      </div>
    </section>
  )
}
