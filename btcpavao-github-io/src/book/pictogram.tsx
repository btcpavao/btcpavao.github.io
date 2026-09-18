const drawings: Record<string, string> = {
  start: "M5 5Q10 3 16 6Q22 3 27 5V26Q22 24 16 27Q10 24 5 26ZM16 6V27",
  budget: "M6 4H26V28H6ZM10 10H22M10 16H22M10 22H18",
  debt: "M7 5H25V27H7ZM11 2V8M21 2V8M7 12H25M11 17H21M11 22H19",
  giving:
    "M3 21L9 18L18 20L23 17Q27 16 29 20L19 27L8 26L3 28M12 9C8 2 20 1 20 8C26 1 31 7 26 12L20 17Z",
  living: "M4 10H28V26H4ZM4 14H28M21 19H25M9 5H23",
  "net-worth": "M3 28H29M6 28V18H12V28M14 28V11H20V28M22 28V4H28V28",
  "long-term-trend": "M4 4V28H29M6 23L11 18L16 20L21 10L27 5",
  "spend-hold-invest": "M5 7H27V15H5ZM9 15V28M23 15V28M13 3H19V7M5 23H27",
  "custody-continuity":
    "M16 3L27 7V16Q27 24 16 29Q5 24 5 16V7ZM11 16L15 20L22 12",
  "put-it-into-practice":
    "M7 4H25V29H7ZM11 10L13 12L17 8M19 11H22M11 20L13 22L17 18M19 21H22",
  home: "M3 15L16 3L29 15M7 12V28H25V12M13 28V19H19V28",
  car: "M4 14L8 7H24L28 14V25H4ZM4 16H28M9 21H11M21 21H23M7 25V29M25 25V29",
  family:
    "M8 14A5 5 0 1 0 8 4A5 5 0 1 0 8 14M24 14A5 5 0 1 0 24 4A5 5 0 1 0 24 14M2 28V22Q2 17 8 17Q14 17 14 22V28M18 28V22Q18 17 24 17Q30 17 30 22V28",
  money:
    "M16 3A13 13 0 1 0 16 29A13 13 0 1 0 16 3M12 8V24M17 8V24M10 10H18Q25 14 18 16H12M18 16Q26 20 18 23H10",
  exchange: "M3 10H27L22 5M29 22H5L10 27",
}
export function Pictogram({
  name,
  className = "",
}: {
  name: string
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`bam-icon ${className}`}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={drawings[name] ?? drawings.budget} />
    </svg>
  )
}
