"use client"

import { useEffect } from "react"
import Link from "next/link"
import { RotateCw } from "lucide-react"

import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="relative flex min-h-svh items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-50" />
      <Container className="relative flex flex-col items-start gap-6">
        <span className="font-mono text-[0.625rem] tracking-[0.3em] text-primary uppercase">
          Something broke
        </span>
        <h1 className="text-5xl leading-none font-bold tracking-[-0.04em] sm:text-7xl">
          That wasn&apos;t <span className="text-primary">supposed</span> to
          happen.
        </h1>
        <p className="max-w-md text-lg text-pretty text-muted-foreground">
          Something went wrong while loading this page. Trying again usually
          sorts it out.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => retry()} className="h-11 gap-2 px-5 text-sm">
            <RotateCw className="size-4!" />
            Try again
          </Button>
          <Button asChild variant="outline" className="h-11 px-5 text-sm">
            <Link href="/">Back to the portfolio</Link>
          </Button>
        </div>
      </Container>
    </main>
  )
}
