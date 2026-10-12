import { cn } from "@/lib/utils"

export const sectionPadTop = "pt-16 sm:pt-20 lg:pt-8 lg:tall:pt-16"
const sectionPadBottom = "pb-16 sm:pb-20 lg:pb-8 lg:tall:pb-16"
export const sectionPad = `${sectionPadTop} ${sectionPadBottom}`

export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    />
  )
}
