export type NavItem = {
  label: string
  href: string
}

export type SocialLabel = "GitHub" | "LinkedIn" | "LeetCode"

export type Social = {
  label: SocialLabel
  href: string
  handle: string
}

export type JourneyStop = {
  period: string
  title: string
  place: string
  kind: "Work" | "Education"
  short: string
  text: string
  current?: boolean
  focus?: string
}

export type Skill = { name: string; icon: string }

export type SkillGroup = {
  id: string
  title: string
  description: string
  glyph: string[]
  items: Skill[]
}

export type SystemNode = {
  id: string
  label: string
  tech: string
  detail: string
  x: number
  y: number
}

export type SystemEdge = { from: string; to: string; label: string }

export type Project = {
  slug: string
  name: string
  tagline: string
  role: string
  year: string
  problem: string
  solution: string
  facts: { value: string; label: string }[]
  system: { nodes: SystemNode[]; edges: SystemEdge[] }
  image: string
  stack: string[]
  links: {
    live?: string
    github?: string
  }
}
