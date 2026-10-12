"use client"

import { motion } from "motion/react"

import { reveal } from "@/lib/motion"
import { cn } from "@/lib/utils"

export function SectionTitle({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <motion.h2
      {...reveal()}
      className={cn(
        "text-5xl leading-[0.95] font-bold tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl",
        className
      )}
    >
      {children}
    </motion.h2>
  )
}
