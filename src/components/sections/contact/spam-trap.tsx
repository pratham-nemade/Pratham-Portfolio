import type { ContactForm } from "@/components/sections/contact/use-contact-form"
import { Input } from "@/components/ui/input"

export function SpamTrap({ form }: { form: ContactForm }) {
  return (
    <Input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden
      value={form.website}
      onChange={(e) => form.setWebsite(e.target.value)}
      className="absolute left-[-9999px] size-px opacity-0"
    />
  )
}
