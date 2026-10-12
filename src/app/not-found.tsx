import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-50" />
      <div className="pointer-events-none absolute inset-0 opacity-40 blur-3xl hero-glow" />
      <Container className="relative flex flex-col items-start gap-6">
        <span className="font-mono text-[0.625rem] tracking-[0.3em] text-primary uppercase">
          Error 404
        </span>
        <h1 className="text-6xl leading-none font-bold tracking-[-0.04em] sm:text-8xl">
          Nothing <span className="text-primary">here</span>.
        </h1>
        <p className="max-w-md text-lg text-pretty text-muted-foreground">
          This page doesn&apos;t exist, or it moved. Everything else is right
          where you left it.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild className="h-11 gap-2 px-5 text-sm">
            <Link href="/">
              <ArrowLeft className="size-4!" />
              Back to the portfolio
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-11 px-5 text-sm">
            <a href={`mailto:${siteConfig.email}`}>Email me</a>
          </Button>
        </div>
      </Container>
    </main>
  )
}
