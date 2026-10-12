import {
  Boxes,
  Cable,
  Cloud,
  Database,
  Layers,
  LayoutTemplate,
  PenTool,
  Server,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react"
import {
  siAntdesign,
  siApacheecharts,
  siBitbucket,
  siCss,
  siDocker,
  siExpress,
  siGit,
  siGithub,
  siGooglegemini,
  siGraphql,
  siHtml5,
  siJavascript,
  siJira,
  siJson,
  siJsonwebtokens,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siNpm,
  siPostman,
  siPwa,
  siReact,
  siRedis,
  siRedux,
  siShadcnui,
  siSocketdotio,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons"

import { cn } from "@/lib/utils"

const brands: Record<string, SimpleIcon> = {
  antd: siAntdesign,
  bitbucket: siBitbucket,
  css: siCss,
  docker: siDocker,
  echarts: siApacheecharts,
  express: siExpress,
  gemini: siGooglegemini,
  git: siGit,
  github: siGithub,
  graphql: siGraphql,
  html: siHtml5,
  javascript: siJavascript,
  jira: siJira,
  json: siJson,
  jwt: siJsonwebtokens,
  mongodb: siMongodb,
  nextjs: siNextdotjs,
  node: siNodedotjs,
  npm: siNpm,
  postman: siPostman,
  pwa: siPwa,
  react: siReact,
  redis: siRedis,
  redux: siRedux,
  shadcn: siShadcnui,
  socketio: siSocketdotio,
  tailwind: siTailwindcss,
  typescript: siTypescript,
}

const lines: Record<string, LucideIcon> = {
  boxes: Boxes,
  cable: Cable,
  cloud: Cloud,
  layers: Layers,
  layout: LayoutTemplate,
  pen: PenTool,
  server: Server,
  shield: ShieldCheck,
  sparkles: Sparkles,
  state: Database,
}

export function SkillIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const brand = brands[name]
  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        fill="currentColor"
        className={cn("size-5", className)}
      >
        <path d={brand.path} />
      </svg>
    )
  }
  const Line = lines[name] ?? Sparkles
  return (
    <Line aria-hidden strokeWidth={1.6} className={cn("size-5", className)} />
  )
}
