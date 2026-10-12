import type { NavItem, Social } from "@/types"

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")

export const siteConfig = {
  name: "Pratham Nemade",
  role: "Product Engineer",
  title: "Pratham Nemade | Product Engineer",
  description:
    "Product Engineer in Bengaluru building fintech and SaaS products. Currently making credit card onboarding feel simple at Hyperface.",
  url: siteUrl,
  email: "pnemade1916@gmail.com",
  location: "Bengaluru, India",
  now: "Building Onboard IQ at Hyperface",
  resume: "/documents/Pratham-Nemade-Resume.pdf",
  resumeUpdated: "Oct 2026",
}

export const navItems: NavItem[] = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

export const socials: Social[] = [
  {
    label: "GitHub",
    href: "https://github.com/pratham-nemade",
    handle: "pratham-nemade",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/pratham-nemade-56131a207/",
    handle: "pratham-nemade",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/Pratham_11/",
    handle: "Pratham_11",
  },
]

export const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "service_29ut92w",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_o85er9k",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "iqXcBPHCECvcGkmJr",
}
