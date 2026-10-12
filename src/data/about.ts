import type { JourneyStop } from "@/types"

export const aboutIntro = "The person behind the *pixels*."

export const bio = [
  "I'm Pratham, a *Product Engineer* in Bengaluru. I build web products for fintech and SaaS, where a confusing screen can cost someone real money, so I care a lot about things being clear, fast and dependable.",
  "Right now I'm at *Hyperface*, building Onboard IQ, the credit card onboarding that runs inside apps like HDFC, SBI, Google Pay and Airtel Payments Bank, on a platform handling over ten million API calls a month. Before that, I was the only frontend engineer at a US SaaS company. The timeline below has the details.",
  "I tend to think in *systems, not screens*. If I'm about to build the same thing a third time, I'd rather build the piece that makes it configurable, so one codebase can serve many brands and teams. I like owning the whole thing, from architecture and APIs to the last bit of interaction, and working closely with product, design and compliance along the way.",
  "Next, I want to grow into a *product-minded engineering lead*: someone with a say in what gets built and why, not only how. I'd love to work on products millions of people use every day, and to help every team I'm on raise its bar.",
]

export const journey: JourneyStop[] = [
  {
    period: "2019 · 2023",
    title: "B.E. Information Technology",
    place: "Priyadarshini College of Engineering · Nagpur",
    short: "B.E. in IT",
    kind: "Education",
    text: "Four years of computer science basics, and where I found out how much I enjoy building things other people use.",
  },
  {
    period: "2023 · 2024",
    title: "Full Stack Web Development",
    place: "Masai School · Bengaluru",
    short: "Masai School",
    kind: "Education",
    text: "An intense MERN bootcamp. I built full-stack apps end to end in small agile teams, with code reviews on everything, and learned what shipping really feels like.",
  },
  {
    period: "Oct 2024 · Apr 2026",
    title: "Frontend Developer",
    place: "Sunbase · USA, Remote",
    short: "Sunbase",
    kind: "Work",
    text: "I was the only frontend engineer. I built a Gemini-powered assistant that now runs on 30+ websites, a live dashboard that halved support requests, and a widget system that made new features much quicker to ship.",
  },
  {
    period: "Jun 2026 · Present",
    title: "Product Engineer",
    place: "Hyperface · Bengaluru",
    short: "Hyperface",
    kind: "Work",
    text: "I lead the frontend of Onboard IQ, the white-label credit card onboarding that lives inside big banks' apps. Its screens come from the server, so a new bank can launch in days rather than weeks.",
    current: true,
    focus: "Building Onboard IQ",
  },
]

export const portrait = {
  src: "/images/pratham.jpg",
  alt: "Pratham Nemade sitting by a mountain river",
  focus: { x: 0.6, y: 0.32 },
}
