export function AccentText({
  text,
  accentClassName = "text-primary",
}: {
  text: string
  accentClassName?: string
}) {
  return text.split(/(\*[^*]+\*)/).map((part, i) =>
    part.startsWith("*") ? (
      <span key={i} className={accentClassName}>
        {part.slice(1, -1)}
      </span>
    ) : (
      part
    )
  )
}
