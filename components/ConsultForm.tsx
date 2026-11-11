"use client";

import { useCreate } from "@refinedev/core";
import { useState, type FormEvent } from "react";
import { validateInquiry, type InquiryErrors, type InquiryInput } from "@/lib/inquiry";
import { budgets, engagements } from "@/lib/site";

const initial: InquiryInput = {
  name: "",
  organization: "",
  email: "",
  engagement: "",
  timeline: "",
  budget: "undecided",
  requirements: "",
  companyWebsite: "",
};

export function ConsultForm() {
  const [values, setValues] = useState<InquiryInput>(initial);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState("");
  const [reference, setReference] = useState("");
  const { mutate } = useCreate();

  function update<K extends keyof InquiryInput>(key: K, value: InquiryInput[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    const nextErrors = validateInquiry(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setPending(true);
    mutate(
      {
        resource: "inquiries",
        values,
        successNotification: false,
        errorNotification: false,
      },
      {
        onSuccess: (response) => {
          const saved = response?.data as { reference?: string } | undefined;
          if (!saved?.reference) {
            setFormError("The brief could not be saved. Try again.");
            setPending(false);
            return;
          }
          setReference(saved.reference);
          setPending(false);
        },
        onError: (error) => {
          setFormError(error?.message || "The brief could not be saved. Try again.");
          setPending(false);
        },
      },
    );
  }

  if (reference) {
    return (
      <div className="form-success" role="status">
        <p className="kicker">Brief received</p>
        <h2>Reference {reference}</h2>
        <p>
          {values.name}, the brief from {values.organization} is stored with this
          site under that reference. It is not emailed. Keep the code if you follow up.
        </p>
        <dl className="confirm-list">
          <div>
            <dt>Work</dt>
            <dd>{engagements.find((item) => item.id === values.engagement)?.label}</dd>
          </div>
          <div>
            <dt>Timing</dt>
            <dd>{values.timeline}</dd>
          </div>
        </dl>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="honeypot" aria-hidden="true">
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

      <div className="field-row">
        <Field
          id="name"
          label="Name"
          error={errors.name}
          value={values.name}
          autoComplete="name"
          onChange={(value) => update("name", value)}
        />
        <Field
          id="organization"
          label="Organization"
          error={errors.organization}
          value={values.organization}
          autoComplete="organization"
          onChange={(value) => update("organization", value)}
        />
      </div>

      <Field
        id="email"
        label="Email"
        type="email"
        error={errors.email}
        value={values.email}
        autoComplete="email"
        onChange={(value) => update("email", value)}
      />

      <div className="field-row">
        <div className="field">
          <label htmlFor="engagement">Kind of work</label>
          <select
            id="engagement"
            name="engagement"
            value={values.engagement}
            aria-invalid={Boolean(errors.engagement)}
            aria-describedby={errors.engagement ? "engagement-error" : undefined}
            onChange={(event) => update("engagement", event.target.value)}
          >
            <option value="">Select</option>
            {engagements.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
          {errors.engagement ? (
            <p id="engagement-error" className="field-error">
              {errors.engagement}
            </p>
          ) : null}
        </div>
        <Field
          id="timeline"
          label="Timing"
          error={errors.timeline}
          value={values.timeline}
          placeholder="A pilot in eight weeks"
          onChange={(value) => update("timeline", value)}
        />
      </div>

      <div className="field">
        <label htmlFor="budget">Budget</label>
        <select
          id="budget"
          name="budget"
          value={values.budget}
          onChange={(event) => update("budget", event.target.value)}
        >
          {budgets.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="requirements">The requirement</label>
        <textarea
          id="requirements"
          name="requirements"
          rows={7}
          value={values.requirements}
          placeholder="What must be true when the work is finished, and what cannot change?"
          aria-invalid={Boolean(errors.requirements)}
          aria-describedby={errors.requirements ? "requirements-error" : undefined}
          onChange={(event) => update("requirements", event.target.value)}
        />
        {errors.requirements ? (
          <p id="requirements-error" className="field-error">
            {errors.requirements}
          </p>
        ) : null}
      </div>

      {formError ? (
        <p className="form-error" role="alert">
          {formError}
        </p>
      ) : null}

      <button className="button" type="submit" disabled={pending}>
        {pending ? "Saving" : "Submit the brief"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
