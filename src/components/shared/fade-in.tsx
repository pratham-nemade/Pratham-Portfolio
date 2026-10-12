import { cn } from "@/lib/utils"

export function FadeIn({
  delay = 0,
  className,
  children,
}: {
  delay?: number
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "animate-in duration-800 ease-smooth fade-in slide-in-from-bottom-4",
        className
      )}
      style={{ animationDelay: `${delay}s`, animationFillMode: "both" }}
    >
      {children}
    </div>
  )
}
