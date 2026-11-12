"use client"

import { Button } from "@/components/ui/button"
import { validateInquiry, type InquiryErrors, type InquiryInput } from "@/lib/inquiry"
import { buildContactMailto, site } from "@/lib/site"
import { cn } from "@/lib/utils"
import { useState, type FormEvent } from "react"

const initial: InquiryInput = {
  name: "",
  email: "",
  description: "",
  companyWebsite: "",
}

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400/50 dark:focus:ring-cyan-400/20"

export function InquiryForm() {
  const [values, setValues] = useState<InquiryInput>(initial)
  const [errors, setErrors] = useState<InquiryErrors>({})
  const [openedMail, setOpenedMail] = useState(false)

  function update<K extends keyof InquiryInput>(key: K, value: InquiryInput[K]) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (values.companyWebsite.trim()) {
      setOpenedMail(true)
      return
    }

    const nextErrors = validateInquiry(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    window.location.href = buildContactMailto(values)
    setOpenedMail(true)
  }

  if (openedMail) {
    return (
      <div
        className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-8 dark:border-slate-700/80 dark:bg-slate-900/80"
        role="status"
      >
        <p className="text-sm font-medium text-cyan-700 dark:text-cyan-400">Mail app opened</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-50">Finish in your inbox</h2>
        <p className="mt-4 text-foreground/70">
          {values.name ? `${values.name}, y` : "Y"}our mail app should be open with a message ready for{" "}
          <span className="font-medium text-foreground">{site.email}</span>. Send it from there to complete
          your inquiry.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild className="rounded-full px-6">
            <a href={buildContactMailto(values)}>Open mail again</a>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="rounded-full px-6"
            onClick={() => setOpenedMail(false)}
          >
            Edit message
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit} noValidate>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="companyWebsite">Website</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
          value={values.companyWebsite}
          onChange={(event) => update("companyWebsite", event.target.value)}
        />
      </div>
      <Field id="name" label="Name" error={errors.name} value={values.name} onChange={(value) => update("name", value)} />
      <Field
        id="email"
        label="Email address"
        type="email"
        error={errors.email}
        value={values.email}
        onChange={(value) => update("email", value)}
      />
      <Area
        id="description"
        label="Message"
        error={errors.description}
        value={values.description}
        placeholder="Tell us about your interests and what you would like to learn or discuss."
        onChange={(value) => update("description", value)}
      />
      <Button
        type="submit"
        className="w-full rounded-full bg-slate-900 px-8 py-6 text-base text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 sm:w-auto"
      >
        Send message
      </Button>
      <p className="text-sm text-foreground/60">
        Send message opens your mail app with this note addressed to {site.email}.
      </p>
    </form>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  type = "text",
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  hint?: string
  type?: string
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-slate-800 dark:text-slate-200">
        {label}
        {hint ? <span className="ml-2 font-normal text-foreground/50">{hint}</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
        className={cn(fieldClass, error && "border-red-400 focus:border-red-400 focus:ring-red-400/20")}
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  )
}

function Area({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  placeholder,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  hint?: string
  placeholder?: string
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-slate-800 dark:text-slate-200">
        {label}
        {hint ? <span className="ml-2 font-normal text-foreground/50">{hint}</span> : null}
      </label>
      <textarea
        id={id}
        name={id}
        rows={5}
        value={value}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
        className={cn(fieldClass, "resize-y", error && "border-red-400 focus:border-red-400 focus:ring-red-400/20")}
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  )
}
