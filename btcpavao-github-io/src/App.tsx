import { useEffect, useRef, useState } from "react"
import {
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Globe2,
  Mail,
  Menu,
  MoonStar,
  SunMedium,
  Users,
  X,
} from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const SITE_URL = "https://btcpavao.com"
const ARTICLE_PATH = "/hr/ai-u-praksi/jedan-covjek-ai-i-dva-mjeseca-rada/"
const ARTICLE_URL = `${SITE_URL}${ARTICLE_PATH}`
const ARTICLE_TITLE = "Jedan čovjek, AI i dva mjeseca rada"
const ARTICLE_DESCRIPTION =
  "Osobni osvrt na to kako sam uz diktiranje, ChatGPT i Codex u manje od dva mjeseca dovršio knjigu, podigao web stranice i promijenio vlastiti način rada."
const ARTICLE_OG_DESCRIPTION =
  "Kako AI u praksi mijenja rad jednog generalista: od diktiranja u šetnji do knjige, web stranica, agenata i automatizacije."
const ARTICLE_DATE = "2026-06-12"
const ARTICLE_DISPLAY_DATE = "12. lipnja 2026."
const BOOK_SECTION_HEADING = "Knjiga koja je godinama čekala red"

const sectionLinks = [
  { label: "About", href: "#about" },
  { label: "Advisory", href: "#advisory" },
  { label: "Projects", href: "#projects" },
  { label: "For You", href: "#for-you" },
  { label: "Contact", href: "#contact" },
]

const socialLinks = [
  { label: "X", href: "https://x.com/btcpavao" },
  { label: "Nostr", href: "https://primal.net/btcpavao" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/pavaopahljina/" },
  {
    label: "GitBook",
    href: "https://btcpavao.gitbook.io/practical-bitcoin-standard/",
  },
]

const latestWriting = {
  category: "AI u praksi",
  title: ARTICLE_TITLE,
  description:
    "Prvi hrvatski zapis o tome kako mi je diktiranje, ChatGPT i Codex promijenilo svakodnevni rad.",
  href: ARTICLE_PATH,
  language: "HR",
  date: ARTICLE_DISPLAY_DATE,
}

const articleIntro = [
  "Postoji trenutak kada nova tehnologija prestane biti zanimljivost i postane dio svakodnevnog rada.",
  "Meni se to s AI-em dogodilo tek nedavno.",
  "ChatGPT koristim od početka, pa mogu reći da mi je već dulje vrijeme koristan alat. Ali ono što se dogodilo zadnja dva mjeseca nije samo to da je postao dio stvarnog radnog procesa, jer sam ga, na kraju krajeva, koristio i prije. Dogodilo se nešto jače: produktivnost je odjednom eksplodirala.",
  "Prvih mjeseci i godina koristio sam ga za pisanje ispravki, prevođenje, sažimanje i provjeru razmišljanja, i sve je to bilo korisno, ali još uvijek nije mijenjalo način na koji stvarno radim. Osjetio sam pomake u produktivnosti, naravno: brže bih napisao mail, brže bih provjerio kako popraviti neki problem na stranici, brže bih došao do prve verzije nečega. U tom smislu produktivnost se povećala, možda za 20, 30 ili 40 posto, ali to je i dalje bilo inkrementalno poboljšanje postojećeg načina rada.",
  "U manje od dva mjeseca počeo sam ga koristiti drukčije: aktivno, svakodnevno i operativno, ne kao tražilicu, ne kao igračku i ne kao zamjenu za vlastito razmišljanje, nego kao produžetak vlastitog rada. Kada sam mu počeo diktirati umjesto tipkati, i kada sam ga počeo slobodnije koristiti za stvari za koje sam ranije pretpostavljao da ih možda i ne može napraviti, promjene u produktivnosti počele su se mjeriti u redovima veličine, a ne samo u malim poboljšanjima.",
  "To je razlika između toga da nosiš vreću cementa na leđima sto kilometara i toga da tu istu vreću, zajedno s još deset tisuća takvih vreća, ukrcaš u kamion i pošalješ na odredište za nekoliko sati. U oba slučaja nešto se prenosi s jednog mjesta na drugo, ali to više nije ista kategorija rada.",
  "Koristim ga za pisanje, uređivanje, dizajn, programiranje, istraživanje, strukturiranje, čitanje nacrta, izradu web stranica i pripremu materijala za objavu. Ono što me najviše iznenadilo nije samo količina napravljenog posla, nego osjećaj da su se granice između ideje i izvedbe odjednom pomaknule puno bliže jedna drugoj.",
  "U tom kratkom razdoblju dovršio sam knjigu Bitcoin kao novac, koja je godinama postojala u bilješkama, nacrtima i idejama. Podigao sam i uredio više web stranica, među njima https://bitcoin-savjetovanje.com/, https://dvadesetjedan.com/ i https://btcpavao.com/. Napravio sam vizuale, vodiče, stranice, tehničke strukture, automatizacije i sustave za koje bi prije trebalo uključiti cijeli niz ljudi: urednika, dizajnera, developera, copywritera, istraživača i voditelja projekta.",
  "Nisam sve to napravio zato što sam odjednom postao programer, dizajner ili izdavački stručnjak.",
  "Nisam.",
  "Ja sam generalist. Znam ponešto o poduzetništvu, pisanju, Bitcoinu, webu, marketingu i proizvodima, ali nisam usko specijaliziran programer ni profesionalni dizajner. Upravo zato mi je ovo iskustvo bilo toliko snažno: AI mi nije samo pomogao napraviti ono što već znam raditi, nego mi je pomogao prijeći granice između područja u kojima sam prije morao stati i tražiti tuđu izvedbu.",
]

const articleSections = [
  {
    heading: "Od tipkanja prema diktiranju",
    paragraphs: [
      "Jedna od najvećih promjena nije bila u samom AI-u, nego u načinu na koji mu dajem ulaz.",
      "Prije sam pisao. Sada sve više diktiram.",
      "Koristim alat za transkripciju koji mi omogućuje da govor pretvorim u tekst gotovo odmah. To znači da ideju ne moram prvo prevesti u tipkanje, pa tek onda s njom nešto raditi, nego mogu hodati, voziti se, sjediti na kavi, uzeti mobitel i govoriti dok je misao još živa.",
      "Velik dio novog rada nastao je upravo tako.",
      "Šetnja od sat vremena više nije samo šetnja. Ona može postati nacrt poglavlja, ideja za članak, uputa za izmjenu web stranice ili razrada poslovnog procesa. Kada se vratim, ne vraćam se samo s mislima u glavi, nego s tekstom koji mogu dati ChatGPT-u da ga strukturira, očisti, propita i pretvori u nešto upotrebljivo.",
      "Ovaj tekst nastaje iz takvog procesa.",
      "Ideja mi je pala na pamet dok sam hodao. Izdiktirao sam je, a sirovi diktat zatim je postao materijal za uređivanje, razmišljanje i objavu. To mijenja odnos prema pisanju, jer pisanje više nije samo sjedenje pred praznim ekranom, nego može početi kao hodanje, razmišljanje naglas i hvatanje vlastitih misli prije nego što se ohlade.",
    ],
  },
  {
    heading: "Knjiga koja je godinama čekala red",
    paragraphs: [
      "Najveći konkretan primjer je knjiga Bitcoin kao novac.",
      "Ideje za tu knjigu nosio sam godinama. Imao sam bilješke, nacrte, stare verzije, GitBook, tekstove na engleskom i razne fragmente. Dio je bio napisan, dio je bio u glavi, a dio je bio razbacan kroz razgovore i dokumente.",
      "Prije AI-a, završiti takav projekt značilo bi ogroman ručni napor. Trebao bih dugo pisati, sam uređivati, tražiti strukturu, prepravljati, slati ljudima na čitanje, čekati povratne informacije i ponovno pisati, a nakon toga bi tek došli dizajn, prijelom, vizuali, naslovnica, priprema za tisak i svi tehnički formati.",
      "Sada je proces izgledao drugačije.",
      "Ja sam davao smjer, sadržaj, koncepte, kriterije i odluke. AI je pomagao strukturirati, proširivati, uređivati, preoblikovati i pripremati tekst. Codex je pomagao s implementacijom i tehničkom stranom. ChatGPT je pomagao s dizajnom, vizualima, naslovnicom, pripremom PDF-a i razumijevanjem izdavačkog procesa.",
      "Važno mi je jasno reći: AI nije napisao knjigu umjesto mene iz ničega.",
      "To ne bi imalo vrijednost.",
      "Vrijednost je bila u tome što je omogućio da ono što sam već godinama skupljao, mislio i objašnjavao konačno dobije oblik koji drugi ljudi mogu čitati. AI nije zamijenio iskustvo, nego mi je dao način da to iskustvo brže, jasnije i urednije pretvorim u knjigu.",
    ],
  },
  {
    heading: "Agenti kao probni čitatelji",
    paragraphs: [
      "Jedan od najzanimljivijih dijelova procesa bilo je korištenje različitih AI čitatelja.",
      "Pitao sam ChatGPT kako bih mogao simulirati različite profile čitatelja iz Hrvatske koji bi mogli uzeti knjigu u ruke. Iz toga su nastali profili ljudi različitih prihoda, životnih situacija, razina razumijevanja Bitcoina i odnosa prema novcu.",
      "Nakon toga sam te profile koristio kao trajne čitateljske perspektive.",
      "Kada bih napisao dio teksta, mogao sam ga dati tim čitateljima da ga pročitaju i komentiraju iz svoje pozicije. Jedan bi primijetio da je nešto preteško. Drugi bi pitao kako to vrijedi za obitelj. Treći bi reagirao iz perspektive poduzetnika. Četvrti bi bio skeptičan prema Bitcoinu. Peti bi pitao što učiniti ako osoba ima dug.",
      "Naravno, to nije isto kao stvarni ljudi, niti sam to doživljavao kao zamjenu za stvarne čitatelje. Ali je iznimno korisno kao prva, brza iteracija prije nego što tekst dođe do ljudi, jer odmah pokaže gdje je nešto nejasno, gdje rečenica preskače korak i gdje autor pretpostavlja da čitatelj zna više nego što stvarno zna.",
      "U starom procesu za takvo nešto trebalo bi organizirati istraživanje, pronaći ljude, čekati odgovore, obrađivati komentare i ponovno prolaziti kroz tekst. Sada se prva razina povratne informacije može dobiti odmah, više puta i u različitim fazama pisanja.",
      "To ne uklanja potrebu za stvarnim čitateljima, ali čini tekst zrelijim prije nego što dođe do njih.",
    ],
  },
  {
    heading: "Web stranice kroz razgovor",
    paragraphs: [
      "Paralelno s knjigom radio sam i web stranice.",
      "Tu mi je promjena možda bila još očitija, jer nisam morao sjesti i ručno naučiti sve što stoji iza moderne web stranice da bih nešto objavio. Nisam morao sam pisati svaku komponentu, podešavati svaki korak izgradnje stranice ili ručno spajati svaki tehnički detalj.",
      "Mogao sam razgovarati s Codexom.",
      "Objasnio bih što želim: kakvu stranicu, kakvu strukturu, kakav ton, koje sekcije, koji poziv na akciju, kakav vizualni dojam, kakve vodiče, kakav sadržaj. Codex bi zatim čitao postojeći kod, predlagao promjene i implementirao ih.",
      "Tako su nastajale stranice, vodiči, strukture, vizuali i tehničke izmjene.",
      "Ja nisam prestao odlučivati. Upravo suprotno, morao sam jasnije odlučivati, jer AI dobro radi kada mu čovjek zna dati smjer. Ako ne znaš što želiš, AI će proizvoditi mnogo teksta i koda, ali ne nužno i dobar proizvod. Ako znaš što pokušavaš napraviti, AI postaje suradnik koji može preuzeti velik dio izvedbe, ali ne može preuzeti tvoj kriterij.",
    ],
  },
  {
    heading: "Rad koji se preselio u kretanje",
    paragraphs: [
      "Još jedna stvar me iznenadila: promijenio se fizički oblik rada.",
      "Nekad sam većinu digitalnog rada zamišljao kao sjedenje za računalom. Laptop, stol, ekran, tipkovnica, sati koncentracije.",
      "Sada dio rada izgleda drugačije.",
      "Ponesem laptop i mobitel. Odem u šetnju. Odem se voziti motorom. Stanem na kavu. Izdiktiram ideju. Dam agentu zadatak. Zatvorim laptop. Nastavim dalje. Na sljedećoj pauzi pregledam što je napravljeno, donesem odluku i pošaljem sljedeću uputu.",
      "To ne znači da nema rada, nego da se dio rada premjestio iz jednog ukočenog oblika u ritam koji mi je prirodniji. I dalje treba razmišljati, pregledavati, donositi odluke, odbacivati loše prijedloge i imati ukus, kriterij i odgovornost. Ali po prvi put imam osjećaj da se ozbiljan stvaralački rad može bolje uklopiti u kretanje, govor, vožnju, šetnju i život, umjesto da baš sve mora početi i završiti u jednoj stolici.",
    ],
  },
  {
    heading: "Koliko bi to koštalo prije?",
    paragraphs: [
      "Teško je precizno izračunati koliko bi sve ovo koštalo bez AI-a.",
      "Ali možemo barem okvirno vidjeti što bi bilo potrebno.",
      "Za knjigu bi trebalo uključiti urednika, lektora, korektora, dizajnera naslovnice, grafičkog dizajnera za unutarnje vizuale, osobu za prijelom i pripremu za tisak, a vjerojatno i ljude za probno čitanje i istraživanje publike. Za web stranice bi trebalo uključiti developera, dizajnera, copywritera, osobu za SEO, možda voditelja projekta i nekoga tko razumije objavu stranice, domene, hosting i tehničke provjere. Za automatizacije bi opet trebalo uključiti nekoga tko razumije API-je, rasporede, skripte, GitHub radne tokove i održavanje.",
      "Da sam sve to radio klasičnim putem, vjerojatno bi se radilo o mjesecima posla i desecima tisuća eura ozbiljnog profesionalnog rada. Možda i više, ovisno o razini izvedbe, broju iteracija i kvaliteti ljudi.",
      "S AI-em trošak nije u potpunosti nestao, ali je postao minimalan dio onoga što bih platio da sam angažirao agencije ili pojedinačne stručnjake. U mom slučaju govorimo o oko 200 eura za dva mjeseca AI alata, plus oko 40 eura za Soniox, nasuprot desecima tisuća eura koliko bi vjerojatno stajao klasični put.",
      "Umjesto da kupujem izvedbu svakog pojedinog specijalista, kupujem pristup alatima i ulažem vlastito vrijeme u usmjeravanje, kontekst, odluke, pregledavanje i iteraciju.",
      "Drugim riječima, AI ne uklanja odgovornost.",
      "On povećava polugu.",
    ],
  },
  {
    heading: "AI kao poluga za generaliste",
    paragraphs: [
      "Ovo mi se čini posebno važno za ljude koji nisu programeri.",
      "Mnogi ljudi misle da je AI prvenstveno za tehničke osobe: programere, podatkovne stručnjake, inženjere, velike tvrtke i ljude koji već znaju raditi s kompleksnim sustavima.",
      "Moje iskustvo ide u drugom smjeru.",
      "AI je možda najzanimljiviji upravo za generaliste, za ljude koji razumiju problem, ali dosad nisu mogli sami izvesti sve dijelove rješenja. Za poduzetnike koji znaju što žele izgraditi, ali nemaju tim. Za autore koji imaju ideje, ali zapnu u strukturi. Za konzultante koji žele pretvoriti znanje u materijale. Za male tvrtke koje nemaju resurse za veliki interni odjel.",
      "Ako znaš razmišljati, postavljati pitanja, davati kontekst i donositi odluke, AI ne povećava vrijednost tvog vremena samo malo. Otvara prostor za poslove koje prije možda ne bi ni stavio na popis, jer su izgledali preveliko za jednog čovjeka.",
      "To ne znači da će svi rezultati biti dobri.",
      "Neće.",
      "AI zna griješiti. Zna zvučati uvjerljivo i kada nije u pravu. Zna proizvesti prosječan tekst. Zna pretjerati. Zna krivo razumjeti. Zna ponuditi rješenje koje tehnički radi, ali nije dobro za stvarni proizvod.",
      "Zato čovjek mora ostati urednik, vlasnik i sudac.",
      "Ali kada se to prihvati, alat postaje stvarno snažan.",
    ],
  },
  {
    heading: "Ovo je početak serijala",
    paragraphs: [
      "Ovaj tekst pišem kao prvi zapis, ne kao zaključak.",
      "I dalje učim gdje AI najviše pomaže, gdje ga treba držati pod kontrolom i kako agente, automatizacije, pisanje, kod i dizajn povezati u stvaran rad.",
      "Ali jedna stvar mi je već sada jasna.",
      "Ovo nije prolazna promjena u alatu koji koristim, nego promjena u odnosu između ideje i izvedbe, ona vrsta promjene nakon koje se povratak na staro više ne čini razumnim.",
      "Kada jedan čovjek može diktirati ideju u šetnji, pretvoriti je u strukturirani tekst, iz njega dobiti prompt, dati ga agentu, implementirati stranicu, pripremiti vizuale, objaviti sadržaj i zatim nastaviti iterirati, tada se smanjuje udaljenost između onoga što zamisliš i onoga što stvarno možeš napraviti.",
      "U starom svijetu mnoge ideje nikada nisu došle do izvedbe jer je put bio preskup, prespor ili prekompliciran. U novom svijetu veći problem postaje drugi: imati dovoljno jasne ideje, dobar kriterij i disciplinu da se ne raspršimo.",
      "Sam alat neće dati smisao poslu.",
      "Ali čovjeku koji ima smjer može dati ogromnu polugu.",
      "Zato mi se povratak na rad bez AI-a više ne čini kao realna opcija, slično kao što mi se ne čini realno zamišljati ozbiljan rad bez struje, automobila, kamiona ili aviona. Možeš znati kako se radilo prije, ali ne možeš se praviti da tehnologija nije promijenila samu veličinu mogućeg.",
      "Zato ću ovdje povremeno pisati o tome kako ga koristim u praksi: za pisanje, web, knjige, poslovne procese, agente, automatizacije i svakodnevni rad.",
      "Ne kao stručnjak koji tvrdi da ima završene odgovore.",
      "Nego kao čovjek koji je u zadnja dva mjeseca iz prve ruke vidio da se način rada upravo promijenio.",
      "I da bi bilo šteta praviti se da nije.",
    ],
  },
]

const focusItems = [
  {
    category: "Advisory",
    heading: "Practical Bitcoin-standard guidance",
    description:
      "One-on-one conversations for Bitcoiners who want to organize money, habits, risk, and next steps around Bitcoin.",
    cta: "Book a call",
    href: "https://cal.com/btcpavao/introductory-call",
  },
  {
    category: "Writing",
    heading: "Practical Bitcoin Standard",
    description:
      "My open-source writing project for people moving from Bitcoin conviction to everyday Bitcoin practice.",
    cta: "Read the guide",
    href: "https://btcpavao.gitbook.io/practical-bitcoin-standard/",
  },
  {
    category: "Communities",
    heading: "Local and global Bitcoin signal",
    description:
      "Supporting Bitcoin communities through events, writing, networks, and practical infrastructure.",
    cta: "Explore projects",
    href: "#projects",
  },
]

const advisoryTopics = [
  {
    title: "Bitcoin as primary money",
    description:
      "How to think about income, spending, saving, buffers, and fiat exposure.",
  },
  {
    title: "Budgeting on a Bitcoin standard",
    description:
      "Build a simple system for tracking expenses, planning cash flow, and reducing fiat noise.",
  },
  {
    title: "Debt-free transition",
    description:
      "Think clearly about debt, liquidity, risk, and time preference.",
  },
  {
    title: "Practical learning path",
    description:
      "Turn scattered Bitcoin content into a focused reading and implementation plan.",
  },
  {
    title: "Bitcoin education and consulting",
    description:
      "General Bitcoin education, custody guidance, inheritance planning, and security reviews.",
  },
  {
    title: "Community and media strategy",
    description:
      "Build stronger local Bitcoin signal through meetups, livestreams, writing, and networks.",
  },
]

const callFaqItems = [
  "We clarify where you are today.",
  "We identify the biggest source of fiat noise, debt, confusion, or friction.",
  "We outline simple next steps.",
  "You leave with a practical path, not generic theory.",
]

const audienceItems = [
  "You save in Bitcoin but still plan your life in fiat terms.",
  "You want a cleaner system for spending, saving, and budgeting.",
  "You want to reduce debt, noise, and financial fragility.",
  "You are building or joining a serious Bitcoin community.",
  "You want a structured path through Bitcoin, Austrian economics, and personal finance.",
]

const proofPoints = [
  {
    value: "10,000+",
    label: "Hours in Bitcoin",
    copy: "Studying, teaching, and working across the ecosystem.",
  },
  {
    value: "Global + Local",
    label: "Community Footprint",
    copy: "Operating across worldwide and Balkan Bitcoin networks.",
  },
  {
    value: "Open Source",
    label: "Public Writing",
    copy: "Building a practical guide for living on a Bitcoin standard.",
  },
]

const sectionReveal =
  "animate-initial:opacity-0 animate-inview:opacity-100 animate-initial:y-8 animate-inview:y-0 animate-duration-700 animate-ease-out animate-once"
const itemReveal =
  "animate-initial:opacity-0 animate-inview:opacity-100 animate-initial:y-6 animate-inview:y-0 animate-duration-600 animate-ease-out animate-once"
const subtleReveal =
  "animate-initial:opacity-0 animate-inview:opacity-100 animate-initial:y-4 animate-inview:y-0 animate-duration-500 animate-ease-out animate-once"
const liftHover =
  "transition-[border-color,box-shadow,background-color,color] duration-300 hover:border-primary/35 hover:shadow-[0_18px_40px_hsl(var(--hero-shadow)/0.08)]"
const staggerDelays = [
  "animate-delay-0",
  "animate-delay-100",
  "animate-delay-200",
  "animate-delay-300",
]

const projectGroups = [
  {
    title: "Core Work",
    description: "Work in the Bitcoin industry.",
    items: [
      {
        title: "Saifedean.com",
        focus: "Education",
        role: "Bitcoin education, Austrian economics, and high-signal learning infrastructure.",
        description:
          "Work around Bitcoin education, Austrian economics, and high-signal learning infrastructure.",
        href: "https://saifedean.com",
        icon: BookOpen,
        cta: "Visit site",
      },
      {
        title: "TheSaifHouse.com",
        focus: "Books",
        role: "Books, global fulfillment, checkout experience, and Bitcoin-native commerce.",
        description:
          "Bitcoin books delivered worldwide with a strong checkout and customer experience across bitcoin and fiat rails.",
        href: "https://thesaifhouse.com",
        icon: Globe2,
        cta: "Visit site",
      },
    ],
  },
  {
    title: "Open Source Work",
    description: "Open source & community building projects.",
    items: [
      {
        title: "Practical Bitcoin Standard",
        focus: "Open-source writing",
        role: "Turning Bitcoin conviction into everyday monetary habits.",
        description:
          "My open-source guide for turning Bitcoin conviction into everyday monetary habits.",
        href: "https://btcpavao.gitbook.io/practical-bitcoin-standard/",
        icon: BookOpen,
        cta: "Read guide",
      },
      {
        title: "TwentyOne.World",
        focus: "Community network",
        role: "Local community discovery, network coordination, and Bitcoin signal.",
        description:
          "A global network of local Bitcoin communities helping people find signal, events, and peers.",
        href: "https://twentyone.world",
        icon: Users,
        cta: "Visit site",
      },
    ],
  },
]

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <Button
      variant="outline"
      size="icon"
      className="glimmer-button inline-flex size-10 min-h-10 min-w-10 shrink-0 items-center justify-center rounded-full border-border/70 bg-background/85 p-0 leading-none backdrop-blur"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <SunMedium className="size-4" />
      ) : (
        <MoonStar className="size-4" />
      )}
    </Button>
  )
}

function SectionHeader({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string
  title: string
  copy?: string
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.05em] text-foreground sm:text-4xl">
        {title}
      </h2>
      {copy ? (
        <p className="mt-4 text-base leading-8 text-muted-foreground">{copy}</p>
      ) : null}
    </div>
  )
}

function getCurrentPath() {
  if (typeof window === "undefined") {
    return "/"
  }

  const { pathname } = window.location

  if (pathname === "/") {
    return pathname
  }

  return pathname.endsWith("/") ? pathname : `${pathname}/`
}

function setMetaContent(
  attribute: "name" | "property",
  key: string,
  content: string
) {
  let meta = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`
  )

  if (!meta) {
    meta = document.createElement("meta")
    meta.setAttribute(attribute, key)
    document.head.append(meta)
  }

  meta.content = content
}

function setCanonicalUrl(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  )

  if (!link) {
    link = document.createElement("link")
    link.rel = "canonical"
    document.head.append(link)
  }

  link.href = href
}

function renderLinkedText(text: string) {
  return text.split(/(https?:\/\/[^\s]+)/g).map((part, index) => {
    if (!part.startsWith("http")) {
      return part
    }

    const trailingMatch = part.match(/[.,;:!?]+$/)
    const trailing = trailingMatch?.[0] ?? ""
    const href = trailing ? part.slice(0, -trailing.length) : part
    const label = href.replace(/^https?:\/\//, "").replace(/\/$/, "")

    return (
      <span key={`${href}-${index}`}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground underline decoration-primary/35 underline-offset-4 hover:text-primary"
        >
          {label}
        </a>
        {trailing}
      </span>
    )
  })
}

function useArticleMetadata() {
  useEffect(() => {
    document.documentElement.lang = "hr"
    document.title = ARTICLE_TITLE
    setCanonicalUrl(ARTICLE_URL)
    setMetaContent("name", "description", ARTICLE_DESCRIPTION)
    setMetaContent("property", "og:type", "article")
    setMetaContent("property", "og:title", ARTICLE_TITLE)
    setMetaContent("property", "og:description", ARTICLE_OG_DESCRIPTION)
    setMetaContent("property", "og:url", ARTICLE_URL)
    setMetaContent("property", "article:section", "AI u praksi")
    setMetaContent("property", "article:published_time", ARTICLE_DATE)
    setMetaContent("name", "twitter:title", ARTICLE_TITLE)
    setMetaContent("name", "twitter:description", ARTICLE_OG_DESCRIPTION)
  }, [])
}

function ArticlePage() {
  useArticleMetadata()

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <div
        aria-hidden="true"
        className="page-atmosphere pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--hero-glow)/0.18)_0%,transparent_30%),radial-gradient(circle_at_85%_10%,hsl(var(--hero-ember)/0.16)_0%,transparent_18%),linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--background))_42%,hsl(var(--muted)/0.72)_150%)]"
      />
      <div
        aria-hidden="true"
        className="page-grid pointer-events-none absolute inset-0 [background-image:linear-gradient(hsl(var(--border)/0.28)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.28)_1px,transparent_1px)] [mask-image:linear-gradient(180deg,black,transparent_84%)] [background-size:68px_68px] opacity-55"
      />
      <div aria-hidden="true" className="ambient-orb ambient-orb-left" />
      <div aria-hidden="true" className="ambient-orb ambient-orb-right" />

      <header className="z-40 border-b border-border/60 bg-background/92 md:sticky md:top-0 md:bg-background/78 md:backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <a
            className="font-display text-base font-bold tracking-[-0.04em]"
            href="/"
          >
            Pavao Pahljina
          </a>

          <div className="flex items-center gap-2">
            <a
              href="/"
              className={`glimmer-button hidden h-10 items-center rounded-full border border-border/70 bg-background/80 px-4 text-sm font-medium text-muted-foreground transition hover:bg-card hover:text-foreground sm:inline-flex ${liftHover}`}
            >
              Home
            </a>
            <a
              href="/#contact"
              className={`glimmer-button hidden h-10 items-center rounded-full border border-border/70 bg-background/80 px-4 text-sm font-medium text-muted-foreground transition hover:bg-card hover:text-foreground sm:inline-flex ${liftHover}`}
            >
              Contact
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main
        id="top"
        className="relative mx-auto max-w-5xl px-4 pt-10 pb-20 sm:px-6 lg:px-8 lg:pt-14"
      >
        <article className="mx-auto max-w-3xl">
          <a
            href="/"
            className="glimmer-button inline-flex rounded-full border border-border/70 bg-card/72 px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-card hover:text-foreground"
          >
            Natrag na početnu
          </a>

          <div className="mt-8 flex flex-wrap items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
            <span className="rounded-full border border-border/70 bg-card/80 px-3 py-1">
              AI u praksi
            </span>
            <span className="rounded-full border border-border/70 bg-card/80 px-3 py-1">
              Hrvatski
            </span>
            <time
              className="rounded-full border border-border/70 bg-card/80 px-3 py-1"
              dateTime={ARTICLE_DATE}
            >
              {ARTICLE_DISPLAY_DATE}
            </time>
          </div>

          <header className="mt-8">
            <h1 className="font-display text-4xl leading-[1.03] font-bold tracking-[-0.05em] text-balance text-foreground sm:text-6xl">
              {ARTICLE_TITLE}
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-muted-foreground">
              Kako sam uz diktiranje, ChatGPT i Codex počeo raditi kao da imam
              mali tim oko sebe.
            </p>
          </header>

          <div className="mt-10 border-y border-border/70 py-8">
            <p className="max-w-2xl text-base leading-8 text-muted-foreground">
              Ovo je prvi tekst u serijalu o praktičnom korištenju AI-a. Nije
              manifest ni prodajna stranica, nego osobni zapis o tome kako se
              promijenio moj svakodnevni ritam rada.
            </p>
          </div>

          <div className="mt-10 space-y-10 text-lg leading-8 text-muted-foreground">
            <div className="space-y-6">
              {articleIntro.map((paragraph) => (
                <p key={paragraph}>{renderLinkedText(paragraph)}</p>
              ))}
            </div>

            {articleSections.map((section) => (
              <section key={section.heading} className="space-y-6">
                <h2 className="pt-4 font-display text-3xl font-bold tracking-[-0.04em] text-foreground">
                  {section.heading}
                </h2>
                {section.heading === BOOK_SECTION_HEADING ? (
                  <figure className="space-y-3">
                    <img
                      src="/bitcoin-kao-novac-cover.png"
                      alt='Naslovnica knjige "Bitcoin kao novac"'
                      width={1448}
                      height={1086}
                      loading="lazy"
                      decoding="async"
                      className="w-full rounded-lg border border-border/70 bg-card/80 shadow-soft"
                    />
                    <figcaption className="text-sm leading-6 text-muted-foreground">
                      Naslovnica knjige{" "}
                      <span className="font-medium text-foreground">
                        Bitcoin kao novac
                      </span>
                      .
                    </figcaption>
                  </figure>
                ) : null}
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{renderLinkedText(paragraph)}</p>
                ))}
              </section>
            ))}
          </div>

          <Card className="mt-14 rounded-[30px] border-border/70 bg-card/86 py-0 shadow-float">
            <CardContent className="p-6 sm:p-8">
              <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                AI u praksi
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-[-0.04em] text-foreground">
                Prvi zapis u novom serijalu
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                Ovo je prvi tekst u serijalu o tome kako koristim AI za pisanje,
                web stranice, knjige, agente i poslovne procese. Za razgovor o
                praktičnoj primjeni AI-a u vlastitom radu možeš mi se javiti
                kroz postojeći kontakt na stranici.
              </p>
              <Button
                asChild
                size="lg"
                className="glimmer-button mt-6 rounded-full px-6 shadow-[0_20px_40px_hsl(var(--primary)/0.22)]"
              >
                <a href="/#contact">
                  Kontakt
                  <Mail className="size-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </article>
      </main>

      <footer className="border-t border-border/60 bg-background/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a
            className="font-display text-base font-bold tracking-[-0.04em]"
            href="/"
          >
            Pavao Pahljina
          </a>

          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glimmer-button rounded-full border border-border/70 bg-background/80 px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary/30 hover:bg-card hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false)
      }
    }

    function handleResize() {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false)
      }
    }

    function handleScroll() {
      setShowBackToTop(window.scrollY > 320)
    }

    window.addEventListener("keydown", handleKeydown)
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("keydown", handleKeydown)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) {
      return
    }

    firstMobileLinkRef.current?.focus()
  }, [mobileMenuOpen])

  function scrollToTop() {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    })
  }

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <div
        aria-hidden="true"
        className="page-atmosphere pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--hero-glow)/0.18)_0%,transparent_30%),radial-gradient(circle_at_85%_10%,hsl(var(--hero-ember)/0.16)_0%,transparent_18%),linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--background))_42%,hsl(var(--muted)/0.72)_150%)]"
      />
      <div
        aria-hidden="true"
        className="page-grid pointer-events-none absolute inset-0 [background-image:linear-gradient(hsl(var(--border)/0.28)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.28)_1px,transparent_1px)] [mask-image:linear-gradient(180deg,black,transparent_84%)] [background-size:68px_68px] opacity-55"
      />
      <div aria-hidden="true" className="ambient-orb ambient-orb-left" />
      <div aria-hidden="true" className="ambient-orb ambient-orb-right" />

      <header className="z-40 border-b border-border/60 bg-background/92 md:sticky md:top-0 md:bg-background/78 md:backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a
            className={`font-display text-base font-bold tracking-[-0.04em] ${subtleReveal}`}
            href="#top"
          >
            Pavao Pahljina
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {sectionLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`glimmer-button inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium text-muted-foreground transition hover:bg-card/70 hover:text-foreground ${liftHover}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 lg:flex">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`glimmer-button inline-flex h-10 min-h-10 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/80 px-4 text-sm leading-none font-medium text-muted-foreground transition hover:border-primary/30 hover:bg-card hover:text-foreground ${liftHover}`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <ThemeToggle />

            <Button
              variant="outline"
              size="icon"
              className={`glimmer-button inline-flex size-10 min-h-10 min-w-10 shrink-0 items-center justify-center rounded-full border-border/70 bg-background/85 p-0 leading-none lg:hidden ${liftHover}`}
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={
                mobileMenuOpen ? "Close navigation" : "Open navigation"
              }
            >
              {mobileMenuOpen ? (
                <X className="size-4" />
              ) : (
                <Menu className="size-4" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen ? (
          <div
            id="mobile-nav"
            className="mx-auto max-w-6xl px-4 pb-4 lg:hidden"
          >
            <Card
              className={`overflow-hidden rounded-[28px] border-border/70 bg-card/95 py-0 shadow-soft ${itemReveal}`}
            >
              <CardContent className="grid gap-3 p-4">
                <div className="grid gap-2">
                  {sectionLinks.map((link) => (
                    <a
                      key={link.href}
                      ref={
                        link.href === sectionLinks[0].href
                          ? firstMobileLinkRef
                          : undefined
                      }
                      href={link.href}
                      className={`glimmer-button rounded-2xl px-4 py-3 text-sm font-medium text-foreground transition hover:bg-background/70 ${liftHover}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`glimmer-button rounded-2xl border border-border/70 bg-background/80 px-4 py-3 text-center text-sm font-medium text-muted-foreground transition hover:text-foreground ${liftHover}`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </header>

      <main
        id="top"
        className="mx-auto max-w-6xl px-4 pt-8 pb-20 sm:px-6 lg:px-8 lg:pt-12"
      >
        <section className="flex flex-col gap-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_360px] lg:items-start">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-4 py-2 text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase backdrop-blur">
                <span className="size-2 rounded-full bg-primary" />
                Pavao Pahljina
              </div>

              <div className="space-y-5">
                <p className="text-sm font-medium tracking-[0.24em] text-muted-foreground uppercase">
                  Bitcoin Standard Advisory
                </p>
                <h1 className="max-w-[11ch] font-display text-4xl leading-[0.95] font-bold tracking-[-0.06em] text-balance sm:max-w-[12ch] sm:text-6xl sm:tracking-[-0.07em] lg:text-7xl">
                  Practical guidance for living on a Bitcoin standard.
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                  I help Bitcoiners organize their money, habits, and community
                  life around Bitcoin through writing, advisory calls, and
                  hands-on project work.
                </p>
                <p className="max-w-2xl rounded-2xl border border-border/70 bg-card/64 px-4 py-3 text-sm leading-7 text-muted-foreground">
                  For Bitcoiners who already understand why Bitcoin matters and
                  want a practical path for using it as money.
                </p>
              </div>

              <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="animate-hover:scale-105 animate-tap:scale-95 animate-spring animate-stiffness-400 animate-damping-24 rounded-full px-6 shadow-[0_20px_40px_hsl(var(--primary)/0.22)]"
                >
                  <a
                    href="https://cal.com/btcpavao/introductory-call"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Schedule Advisory Call
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="animate-hover:scale-105 animate-tap:scale-95 animate-spring animate-stiffness-400 animate-damping-24 rounded-full border-border/70 bg-background/80 px-6"
                >
                  <a
                    href="https://btcpavao.gitbook.io/practical-bitcoin-standard/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Practical Bitcoin Standard
                  </a>
                </Button>
                <Button
                  asChild
                  variant="link"
                  className="animate-hover:scale-105 animate-tap:scale-95 animate-spring animate-stiffness-400 animate-damping-24 h-auto px-1 text-sm font-semibold"
                >
                  <a href="mailto:pavao@hey.com">
                    Email Pavao
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              </div>
            </div>

            <Card className="overflow-hidden rounded-[36px] border-border/70 bg-card/84 py-0 shadow-float backdrop-blur">
              <CardContent className="p-6 sm:p-7">
                <div className="relative mx-auto mb-6 w-full max-w-[220px]">
                  <div className="absolute inset-4 -z-10 rounded-full bg-[radial-gradient(circle,hsl(var(--hero-glow)/0.35),transparent_72%)] blur-2xl" />
                  <Avatar className="size-full rounded-full border-4 border-background shadow-[0_30px_80px_hsl(var(--hero-shadow)/0.16)]">
                    <AvatarImage
                      src="https://avatars.githubusercontent.com/u/109140795?v=4"
                      alt="Pavao GitHub profile image"
                      className="avatar-shimmer"
                    />
                    <AvatarFallback>PP</AvatarFallback>
                  </Avatar>
                </div>

                <div className="text-center">
                  <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                    Pavao Pahljina
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.05em]">
                    @btcpavao
                  </h2>
                  <p className="mt-2 text-base text-muted-foreground">
                    Bitcoin Standard Advisor
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className={itemReveal + " grid gap-3 sm:grid-cols-3"}>
            {proofPoints.map((item, index) => (
              <div
                key={item.value}
                className={`rounded-[28px] border border-border/70 bg-card/78 p-5 shadow-soft backdrop-blur ${liftHover} ${staggerDelays[index] ?? ""}`}
              >
                <p className="font-display text-2xl font-bold tracking-[-0.05em]">
                  {item.value}
                </p>
                <p className="mt-2 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  {item.label}
                </p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="about"
          className={sectionReveal + " mt-16 border-t border-border/60 pt-16"}
        >
          <SectionHeader
            eyebrow="About"
            title="Trusted signal, practical guidance, and real project involvement."
            copy="I work at the intersection of Bitcoin education, advisory support, and community-building for people moving toward a Bitcoin standard with more clarity and conviction."
          />

          <div className="mt-8 border-l border-border/70 pl-6 text-base leading-8 text-muted-foreground sm:pl-8 lg:max-w-4xl">
            <div className="space-y-5">
              <p>
                A former ed-tech entrepreneur turned full-time Bitcoiner,
                currently working on{" "}
                <a
                  href="https://saifedean.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Saifedean.com
                </a>
                ,{" "}
                <a
                  href="https://thesaifhouse.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TheSaifHouse.com
                </a>
                , and{" "}
                <a
                  href="https://twentyone.world"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TwentyOne.World
                </a>
                .
              </p>
              <p className="mt-5">
                I am also writing an open-source guide for living on a full
                Bitcoin standard:{" "}
                <a
                  href="https://btcpavao.gitbook.io/practical-bitcoin-standard/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  btcpavao.gitbook.io/practical-bitcoin-standard
                </a>
                . I have spent over 10,000 hours studying, teaching, and working
                in Bitcoin.
              </p>
            </div>
          </div>
        </section>

        <section
          id="advisory"
          className={sectionReveal + " mt-16 border-t border-border/60 pt-16"}
        >
          <SectionHeader
            eyebrow="Advisory"
            title="Work with me"
            copy="If you already understand why Bitcoin matters, the next challenge is practical: organizing your money, habits, risk, and environment around it."
          />

          <div className={itemReveal + " mt-8 grid gap-4 md:grid-cols-2"}>
            {advisoryTopics.map((item, index) => (
              <Card
                key={item.title}
                className={`rounded-[28px] border-border/70 bg-card/82 py-0 shadow-soft ${liftHover} ${staggerDelays[index % staggerDelays.length] ?? ""}`}
              >
                <CardContent className="p-6">
                  <p className="text-sm font-semibold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-display text-xl font-bold tracking-[-0.04em] text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div
            className={
              subtleReveal +
              " mt-8 flex flex-col gap-4 rounded-[30px] border border-border/70 bg-card/76 p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between"
            }
          >
            <div className="max-w-2xl">
              <h3 className="font-display text-xl font-bold tracking-[-0.04em] text-foreground">
                What happens on a call?
              </h3>
              <div className="mt-4 grid gap-2">
                {callFaqItems.map((item, index) => (
                  <p
                    key={item}
                    className="rounded-2xl border border-border/60 bg-background/64 px-4 py-3 text-sm leading-7 text-muted-foreground"
                  >
                    <span className="mr-3 font-semibold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </p>
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                This is practical education and guidance, not investment advice.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="glimmer-button shrink-0 rounded-full px-6 shadow-[0_20px_40px_hsl(var(--primary)/0.22)]"
            >
              <a
                href="https://cal.com/btcpavao/introductory-call"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book an advisory call
                <CalendarDays className="size-4" />
              </a>
            </Button>
          </div>
        </section>

        <section
          id="work"
          className={sectionReveal + " mt-16 border-t border-border/60 pt-16"}
        >
          <SectionHeader
            eyebrow="Work"
            title="Three ways to follow the work"
            copy="Start with the path that fits your intent: direct advisory, public writing, or community signal."
          />

          <div className="mt-8 divide-y divide-border/70 border-y border-border/70">
            {focusItems.map((item, index) => (
              <div
                key={item.category}
                className="grid gap-4 py-6 md:grid-cols-[120px_minmax(0,1fr)_minmax(0,0.95fr)] md:items-start"
              >
                <p className="text-sm font-semibold text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
                    {item.category}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.04em] text-foreground">
                    {item.heading}
                  </h3>
                </div>
                <p className="max-w-xl text-base leading-8 text-muted-foreground">
                  {item.description}
                </p>
                <Button
                  asChild
                  variant="link"
                  className="h-auto justify-self-start px-0 text-sm font-semibold md:col-start-2"
                >
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {item.cta}
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section
          className={sectionReveal + " mt-16 border-t border-border/60 pt-16"}
        >
          <SectionHeader
            eyebrow="Latest writing"
            title="A first Croatian note on AI in practice."
            copy="A quiet starting point for a new line of writing about how AI changes real everyday work."
          />

          <a
            href={latestWriting.href}
            className={`glimmer-button mt-8 grid gap-5 rounded-[30px] border border-border/70 bg-card/82 p-6 text-left shadow-soft transition hover:bg-card sm:p-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-center ${liftHover}`}
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1">
                  {latestWriting.category}
                </span>
                <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1">
                  {latestWriting.language}
                </span>
                <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1">
                  {latestWriting.date}
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.04em] text-foreground">
                {latestWriting.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                {latestWriting.description}
              </p>
            </div>

            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Read in Croatian
              <ArrowUpRight className="size-4" />
            </span>
          </a>
        </section>

        <section
          id="projects"
          className={sectionReveal + " mt-16 border-t border-border/60 pt-16"}
        >
          <SectionHeader
            eyebrow="Projects"
            title="Where the work lives"
            copy="Start with the part that matches your intent: company work, public writing, or community media."
          />

          <div className={itemReveal + " mt-8 space-y-10"}>
            {projectGroups.map((group) => (
              <div
                key={group.title}
                className={
                  itemReveal + " grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]"
                }
              >
                <div className="lg:pt-2">
                  <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                    {group.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {group.description}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {group.items.map((item, index) => {
                    const Icon = item.icon

                    return (
                      <Card
                        key={item.title}
                        className={`group rounded-[28px] border-border/70 bg-card/82 py-0 shadow-soft transition duration-300 hover:shadow-float ${liftHover} ${staggerDelays[index % staggerDelays.length] ?? ""}`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="rounded-2xl border border-border/70 bg-background/70 p-3 text-primary">
                              <Icon className="size-5" />
                            </div>
                            <span className="h-px flex-1 bg-border/70" />
                          </div>

                          <h3 className="mt-6 font-display text-2xl font-bold tracking-[-0.04em] text-foreground">
                            {item.title}
                          </h3>
                          <p className="mt-3 inline-flex rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                            {item.focus}
                          </p>
                          <p className="mt-3 text-sm leading-7 text-muted-foreground">
                            {item.description}
                          </p>
                          <div className="mt-4 rounded-2xl border border-border/70 bg-background/62 p-4">
                            <p className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                              Role
                            </p>
                            <p className="mt-2 text-sm leading-7 text-muted-foreground">
                              {item.role}
                            </p>
                          </div>

                          <Button
                            asChild
                            variant="link"
                            className="mt-5 h-auto px-0 text-sm font-semibold"
                          >
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.cta}
                              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="for-you"
          className={sectionReveal + " mt-16 border-t border-border/60 pt-16"}
        >
          <SectionHeader
            eyebrow="Who this is for"
            title="Past beginner conviction, toward daily practice."
            copy="This site is for people who are past the beginner stage and want to make Bitcoin more practical in daily life."
          />

          <div className={itemReveal + " mt-8 grid gap-3 md:grid-cols-2"}>
            {audienceItems.map((item, index) => (
              <div
                key={item}
                className={`rounded-[24px] border border-border/70 bg-card/78 p-5 text-sm leading-7 text-muted-foreground shadow-soft ${liftHover} ${staggerDelays[index % staggerDelays.length] ?? ""}`}
              >
                <span className="mr-3 font-semibold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className={sectionReveal + " mt-16 border-t border-border/60 pt-16"}
        >
          <Card
            className={
              sectionReveal +
              " overflow-hidden rounded-[38px] border-border/70 bg-card/86 py-0 shadow-float"
            }
          >
            <CardContent
              className={
                itemReveal +
                " grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.2fr)_320px] lg:p-10"
              }
            >
              <div>
                <SectionHeader
                  eyebrow="Contact"
                  title="Start with the simplest next step"
                  copy="Email is best for direct outreach. If you want to talk live, book a call. If you want to read first, start with Practical Bitcoin Standard."
                />

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="glimmer-button rounded-full px-6 shadow-[0_20px_40px_hsl(var(--primary)/0.22)] transition-[border-color,box-shadow,background-color,color] duration-300 hover:border-primary/35 hover:shadow-[0_24px_48px_hsl(var(--primary)/0.24)]"
                  >
                    <a href="mailto:pavao@hey.com">
                      <Mail className="size-4" />
                      Email Me
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="glimmer-button rounded-full border-border/70 bg-background/82 px-6 transition-[border-color,box-shadow,background-color,color] duration-300 hover:border-primary/35 hover:bg-card hover:shadow-[0_18px_40px_hsl(var(--hero-shadow)/0.08)]"
                  >
                    <a
                      href="https://cal.com/btcpavao/introductory-call"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CalendarDays className="size-4" />
                      Schedule a Call
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="glimmer-button rounded-full border-border/70 bg-background/82 px-6 transition-[border-color,box-shadow,background-color,color] duration-300 hover:border-primary/35 hover:bg-card hover:shadow-[0_18px_40px_hsl(var(--hero-shadow)/0.08)]"
                  >
                    <a
                      href="https://btcpavao.gitbook.io/practical-bitcoin-standard/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BookOpen className="size-4" />
                      Read the Guide
                    </a>
                  </Button>
                </div>
              </div>

              <div
                className={`animate-initial:opacity-0 animate-inview:opacity-100 animate-initial:y-6 animate-inview:y-0 animate-duration-600 animate-ease-out animate-once animate-delay-100 animate-initial:x-6 animate-inview:x-0 rounded-[30px] border border-border/70 bg-background/76 p-6`}
              >
                <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
                  Need a starting point?
                </p>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  If you are unsure where to start, send an email or book a call
                  and I will point you toward the right resource, conversation,
                  or community.
                </p>

                <div className="mt-6 space-y-3">
                  <a
                    href="mailto:pavao@hey.com"
                    className="glimmer-button block rounded-2xl border border-border/70 px-4 py-3 text-sm font-medium text-foreground transition hover:bg-card/70"
                  >
                    pavao@hey.com
                  </a>
                  <a
                    href="https://cal.com/btcpavao/introductory-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glimmer-button block rounded-2xl border border-border/70 px-4 py-3 text-sm font-medium text-foreground transition hover:bg-card/70"
                  >
                    cal.com/btcpavao/introductory-call
                  </a>
                  <a
                    href="https://btcpavao.gitbook.io/practical-bitcoin-standard/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glimmer-button block rounded-2xl border border-border/70 px-4 py-3 text-sm font-medium text-foreground transition hover:bg-card/70"
                  >
                    Practical Bitcoin Standard
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border/60 bg-background/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a
            className="font-display text-base font-bold tracking-[-0.04em]"
            href="#top"
          >
            Pavao Pahljina
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {sectionLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="glimmer-button rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-card/70 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glimmer-button rounded-full border border-border/70 bg-background/80 px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary/30 hover:bg-card hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {showBackToTop ? (
        <Button
          type="button"
          size="icon"
          className="glimmer-button floating-top-button fixed right-4 bottom-4 z-50 inline-flex size-10 min-h-10 min-w-10 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/94 p-0 leading-none shadow-soft md:right-6 md:bottom-6"
          style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp className="size-4" />
        </Button>
      ) : null}
    </div>
  )
}

export function App() {
  return getCurrentPath() === ARTICLE_PATH ? <ArticlePage /> : <HomePage />
}

export default App
