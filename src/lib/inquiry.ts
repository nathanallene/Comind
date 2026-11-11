export type InquiryInput = {
  name: string
  email: string
  description: string
  companyWebsite: string
}

export type InquiryErrors = Partial<Record<keyof InquiryInput, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateInquiry(input: InquiryInput): InquiryErrors {
  const errors: InquiryErrors = {}
  if (input.name.trim().length < 2) errors.name = "Enter your name."
  if (!emailPattern.test(input.email.trim())) errors.email = "Enter a valid email address."
  if (input.description.trim().length < 10) {
    errors.description = "Enter a message of at least 10 characters."
  }
  return errors
}
