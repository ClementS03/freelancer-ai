"use client"

import { useState } from "react"

interface FormContent {
  placeholder: string
  submitLabel: string
  submittingLabel: string
  successTitle: string
  successDesc: string
  note: string
}

export function NewsletterForm({ content: c }: { content: FormContent }) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    if (!email) return
    setStatus("submitting")
    setErrorMsg("")

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error || "Une erreur est survenue.")
        setStatus("error")
      } else {
        setStatus("success")
        setEmail("")
      }
    } catch {
      setErrorMsg("Impossible de se connecter. Réessaie dans un instant.")
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-accent-border bg-accent-muted p-5">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">
          ✓
        </span>
        <div>
          <p className="font-semibold text-text-primary text-sm">{c.successTitle}</p>
          <p className="mt-1 text-xs text-text-secondary">{c.successDesc}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={c.placeholder}
          required
          disabled={status === "submitting"}
          className="input flex-1 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? c.submittingLabel : c.submitLabel}
        </button>
      </form>

      {status === "error" && (
        <p className="mt-2 text-xs text-red-400">{errorMsg}</p>
      )}

      <p className="mt-3 text-xs text-text-tertiary">{c.note}</p>
    </div>
  )
}
