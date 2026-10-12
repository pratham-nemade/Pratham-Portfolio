import type { SkillGroup } from "@/types"

export const skillsIntro = {
  title: "What I build *with*.",
  text: "Everything I reach for to take a product from a rough idea to something people rely on, grouped by the job it does.",
}

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    description:
      "Interfaces that feel quick, stay accessible and don't fall apart as the product grows.",
    glyph: ["11111", "10001", "10101", "10001", "11111"],
    items: [
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Redux Toolkit", icon: "redux" },
      { name: "Zustand", icon: "state" },
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
    ],
  },
  {
    id: "platform",
    title: "Product & Platform",
    description:
      "The groundwork that lets one codebase serve many banks and brands, each with its own look and rules.",
    glyph: ["11111", "00000", "11111", "00000", "11111"],
    items: [
      { name: "Progressive Web Apps", icon: "pwa" },
      { name: "Multi-Tenant Architecture", icon: "layers" },
      { name: "Server-Driven UI", icon: "layout" },
      { name: "JSON Config Systems", icon: "json" },
      { name: "KYC & Onboarding Flows", icon: "shield" },
      { name: "Low Level Design", icon: "pen" },
    ],
  },
  {
    id: "ui",
    title: "UI & Design Systems",
    description:
      "Shared building blocks, so new screens come together fast and still look like they belong.",
    glyph: ["11100", "11100", "00000", "00111", "00111"],
    items: [
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "shadcn/ui", icon: "shadcn" },
      { name: "Ant Design", icon: "antd" },
      { name: "Component Architecture", icon: "boxes" },
    ],
  },
  {
    id: "realtime",
    title: "Real-time & AI",
    description:
      "Things that update live, and AI that actually saves people time.",
    glyph: ["00100", "01010", "10101", "01010", "00100"],
    items: [
      { name: "WebSockets", icon: "cable" },
      { name: "Socket.io", icon: "socketio" },
      { name: "Gemini API", icon: "gemini" },
      { name: "Groq API", icon: "sparkles" },
      { name: "ECharts", icon: "echarts" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Data",
    description:
      "APIs, logins and storage. The quiet parts that keep everything else working.",
    glyph: ["01110", "10001", "01110", "10001", "01110"],
    items: [
      { name: "Node.js", icon: "node" },
      { name: "Express", icon: "express" },
      { name: "REST APIs", icon: "server" },
      { name: "GraphQL", icon: "graphql" },
      { name: "JWT Auth", icon: "jwt" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Redis", icon: "redis" },
    ],
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    description:
      "How I version, test, ship and keep track of the work, day to day.",
    glyph: ["10000", "11000", "11100", "11110", "11111"],
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Bitbucket", icon: "bitbucket" },
      { name: "npm", icon: "npm" },
      { name: "Docker", icon: "docker" },
      { name: "AWS", icon: "cloud" },
      { name: "Postman", icon: "postman" },
      { name: "Jira", icon: "jira" },
    ],
  },
]
