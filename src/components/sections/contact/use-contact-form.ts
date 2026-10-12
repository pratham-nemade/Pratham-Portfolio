"use client"

import { useEffect, useState } from "react"
import { track } from "@vercel/analytics"

import { emailjsConfig, siteConfig } from "@/config/site"

export const SUBJECT_STARTERS = [
  "Job opportunity",
  "Project inquiry",
  "Collaboration",
  "Just saying hi",
] as const

type ContactStatus = "idle" | "sending" | "sent"
type Field = "name" | "email" | "message"

export const MESSAGE_MAX = 1000
const DRAFT_KEY = "contact-draft"

const isEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim())

export function useContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [website, setWebsite] = useState("")
  const [status, setStatus] = useState<ContactStatus>("idle")
  const [touched, setTouched] = useState<Record<Field, boolean>>({
    name: false,
    email: false,
    message: false,
  })
  const [attempted, setAttempted] = useState(false)

  const checks = {
    name: name.trim().length > 1,
    email: isEmail(email),
    message: message.trim().length > 9,
  }
  const valid = checks.name && checks.email && checks.message
  const show = (f: Field) => (touched[f] || attempted) && !checks[f]
  const errors = {
    name: show("name") ? "Please add your name." : "",
    email: show("email")
      ? email.trim()
        ? "That email doesn't look quite right."
        : "Add your email so I can reply."
      : "",
    message: show("message") ? "A few more words, please." : "",
  }
  const touch = (f: Field) => setTouched((t) => ({ ...t, [f]: true }))

  const first = name.trim().split(" ")[0]
  const finalSubject = subject.trim() || `A message from ${name.trim()}`
  const hasDraft = Boolean(name || email || subject || message)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        const d = JSON.parse(localStorage.getItem(DRAFT_KEY) ?? "null")
        if (!d) return
        setName(d.name ?? "")
        setEmail(d.email ?? "")
        setSubject(d.subject ?? "")
        setMessage(d.message ?? "")
      } catch {}
    })
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    try {
      if (hasDraft && status !== "sent")
        localStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({ name, email, subject, message })
        )
    } catch {}
  }, [name, email, subject, message, hasDraft, status])

  const clearDraft = () => {
    try {
      localStorage.removeItem(DRAFT_KEY)
    } catch {}
  }

  const mailto = () =>
    `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      finalSubject
    )}&body=${encodeURIComponent(
      `${message.trim()}\n\n${name.trim()}\n${email.trim()}`
    )}`

  const reset = () => {
    setName("")
    setEmail("")
    setSubject("")
    setMessage("")
    setTouched({ name: false, email: false, message: false })
    setAttempted(false)
    setStatus("idle")
  }

  const submit = async () => {
    if (status !== "idle") return false
    if (!valid) {
      setAttempted(true)
      return false
    }
    const reply = email.trim()
    const delivered = () => {
      setStatus("sent")
      clearDraft()
      if (!website)
        track("Message sent", { subject: subject.trim() ? "custom" : "none" })
      void import("sonner").then(({ toast }) =>
        toast.success("Message sent", {
          description: `Thanks, ${first}. I'll reply to ${reply} soon.`,
        })
      )
      return true
    }
    if (website) return delivered()

    setStatus("sending")
    try {
      const { send } = await import("@emailjs/browser")
      await send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: name.trim(),
          from_email: reply,
          reply_to: reply,
          subject: finalSubject,
          phone: "",
          message: message.trim(),
        },
        { publicKey: emailjsConfig.publicKey }
      )
      return delivered()
    } catch {
      setStatus("idle")
      const fallback = mailto()
      void import("sonner").then(({ toast }) =>
        toast.error("That didn't go through", {
          description:
            "Your message is saved here. Send it from your own email app instead?",
          action: {
            label: "Use my email app",
            onClick: () => window.location.assign(fallback),
          },
          duration: 12000,
        })
      )
      return false
    }
  }

  return {
    name,
    setName,
    email,
    setEmail,
    subject,
    setSubject,
    message,
    setMessage,
    website,
    setWebsite,
    status,
    checks,
    errors,
    touch,
    valid,
    first,
    hasDraft,
    submit,
    reset,
  }
}

export type ContactForm = ReturnType<typeof useContactForm>
