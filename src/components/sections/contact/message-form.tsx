"use client"

import { AnimatePresence, motion } from "motion/react"
import { Check, CircleAlert, Loader2, Send } from "lucide-react"

import {
  MESSAGE_MAX,
  SUBJECT_STARTERS,
  useContactForm,
} from "@/components/sections/contact/use-contact-form"
import { SpamTrap } from "@/components/sections/contact/spam-trap"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError as BaseFieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useModKey } from "@/hooks/use-mod-key"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

const fieldClass =
  "h-11 rounded-none border-border bg-background/60 px-3.5 text-sm shadow-none transition-colors placeholder:text-muted-foreground/60 hover:border-primary/40 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15 aria-invalid:border-destructive/70 aria-invalid:ring-0 md:text-sm dark:bg-background/40"

function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <AnimatePresence initial={false}>
      {children && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <BaseFieldError id={id} className="flex items-center gap-1.5 text-xs">
            <CircleAlert className="size-3.5 shrink-0" />
            {children}
          </BaseFieldError>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function MessageForm() {
  const form = useContactForm()
  const mod = useModKey()
  const sent = form.status === "sent"

  const describe = (field: "name" | "email" | "message") =>
    form.errors[field] ? `contact-${field}-error` : undefined

  return (
    <div className="relative flex h-full flex-col">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex flex-1 flex-col items-start justify-center gap-4 p-6 sm:p-8"
          >
            <motion.span
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="grid size-12 place-items-center bg-primary text-primary-foreground"
            >
              <Check className="size-6" />
            </motion.span>
            <h3 className="text-3xl font-semibold tracking-tight">
              Thanks, {form.first}. It&apos;s in my inbox.
            </h3>
            <p className="max-w-md text-muted-foreground">
              I&apos;ll reply to{" "}
              <span className="text-foreground">{form.email.trim()}</span>.
              While you wait, the projects are a good place to look around.
            </p>
            <div className="flex gap-2">
              <Button asChild className="h-10 cursor-pointer px-4 text-sm">
                <a href="#projects">See the projects</a>
              </Button>
              <Button
                variant="outline"
                onClick={form.reset}
                className="h-10 cursor-pointer px-4 text-sm"
              >
                Send another
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            noValidate
            onSubmit={(e) => {
              e.preventDefault()
              void form.submit()
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                void form.submit()
              }
            }}
            aria-label="Send Pratham a message"
            className="flex flex-1 flex-col"
          >
            <div className="flex flex-col gap-1 px-6 pt-6 sm:px-7 lg:pt-5 tall:pt-7">
              <h3 className="text-2xl font-semibold tracking-tight">
                Send a message
              </h3>
              <p className="text-sm text-muted-foreground">
                Takes a minute. Name, email and a few lines is all I need.
              </p>
            </div>

            <div className="flex flex-1 flex-col gap-4 px-6 py-5 sm:px-7 lg:gap-3 lg:py-4 tall:gap-4 tall:py-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:gap-3 tall:gap-4">
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="contact-name">Name</FieldLabel>
                  <Input
                    id="contact-name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => form.setName(e.target.value)}
                    onBlur={() => form.touch("name")}
                    aria-invalid={Boolean(form.errors.name)}
                    aria-describedby={describe("name")}
                    placeholder="Jane Doe"
                    className={fieldClass}
                  />
                  <FieldError id="contact-name-error">
                    {form.errors.name}
                  </FieldError>
                </Field>
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="contact-email">Email</FieldLabel>
                  <Input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => form.setEmail(e.target.value)}
                    onBlur={() => form.touch("email")}
                    aria-invalid={Boolean(form.errors.email)}
                    aria-describedby={describe("email")}
                    placeholder="jane@company.com"
                    className={fieldClass}
                  />
                  <FieldError id="contact-email-error">
                    {form.errors.email}
                  </FieldError>
                </Field>
              </div>

              <Field className="gap-1.5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <FieldLabel htmlFor="contact-subject" className="gap-1">
                    Subject
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>
                  <ToggleGroup
                    type="single"
                    variant="outline"
                    size="sm"
                    spacing={1.5}
                    aria-label="Subject starters"
                    value={
                      (SUBJECT_STARTERS as readonly string[]).includes(
                        form.subject
                      )
                        ? form.subject
                        : ""
                    }
                    onValueChange={form.setSubject}
                    className="flex-wrap"
                  >
                    {SUBJECT_STARTERS.map((s) => (
                      <ToggleGroupItem
                        key={s}
                        value={s}
                        className="h-6 rounded-none border-border px-2 text-[0.6875rem] font-normal text-muted-foreground hover:border-primary/50 hover:bg-transparent hover:text-foreground data-[state=on]:border-primary data-[state=on]:bg-primary/10 data-[state=on]:text-primary"
                      >
                        {s}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
                <Input
                  id="contact-subject"
                  value={form.subject}
                  onChange={(e) => form.setSubject(e.target.value)}
                  placeholder="What's it about?"
                  className={fieldClass}
                />
              </Field>

              <Field className="flex-1 gap-1.5">
                <div className="flex items-baseline justify-between">
                  <FieldLabel htmlFor="contact-message">Message</FieldLabel>
                  <span className="font-mono text-[0.625rem] text-muted-foreground tabular-nums">
                    {form.message.length}/{MESSAGE_MAX}
                  </span>
                </div>
                <Textarea
                  id="contact-message"
                  rows={4}
                  maxLength={MESSAGE_MAX}
                  value={form.message}
                  onChange={(e) => form.setMessage(e.target.value)}
                  onBlur={() => form.touch("message")}
                  aria-invalid={Boolean(form.errors.message)}
                  aria-describedby={describe("message")}
                  placeholder="Tell me a little about the role, the project or the problem. A few lines is plenty."
                  className={cn(
                    fieldClass,
                    "field-sizing-fixed h-auto min-h-24 flex-1 resize-none py-2.5 leading-relaxed lg:min-h-20 tall:min-h-28"
                  )}
                />
                <FieldError id="contact-message-error">
                  {form.errors.message}
                </FieldError>
              </Field>
            </div>

            <SpamTrap form={form} />

            <Separator />
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 sm:px-7">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <span
                  className={cn(
                    "size-1.5 transition-colors",
                    form.hasDraft ? "bg-primary" : "bg-border"
                  )}
                />
                {form.hasDraft
                  ? "Draft saved on this device"
                  : "Goes straight to my inbox"}
              </p>
              <div className="flex items-center gap-3">
                <KbdGroup className="hidden text-xs text-muted-foreground sm:inline-flex pointer-coarse:hidden">
                  <Kbd className="border font-mono">{mod}</Kbd>
                  <Kbd className="border font-mono">↵</Kbd>
                </KbdGroup>
                <Button
                  type="submit"
                  disabled={form.status === "sending"}
                  className="group h-11 cursor-pointer gap-3 px-5 text-sm"
                >
                  {form.status === "sending" ? (
                    <>
                      Sending <Loader2 className="size-4! animate-spin" />
                    </>
                  ) : (
                    <>
                      Send message
                      <Send className="size-4! transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
