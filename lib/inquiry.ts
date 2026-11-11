import { budgets, engagements, type BudgetId, type EngagementId } from "@/lib/site";

export type InquiryInput = {
  name: string;
  organization: string;
  email: string;
  engagement: string;
  timeline: string;
  budget: string;
  requirements: string;
  companyWebsite?: string;
};

export type InquiryErrors = Partial<Record<keyof InquiryInput, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry(input: InquiryInput): InquiryErrors {
  const errors: InquiryErrors = {};

  if (input.name.trim().length < 2) errors.name = "Enter your name.";
  if (input.organization.trim().length < 2) {
    errors.organization = "Enter the organization.";
  }
  if (!emailPattern.test(input.email.trim()) || input.email.trim().length > 160) {
    errors.email = "Enter a valid email address.";
  }
  if (!engagements.some((item) => item.id === input.engagement)) {
    errors.engagement = "Choose the kind of work.";
  }
  if (input.timeline.trim().length < 2) {
    errors.timeline = "Give a rough timing, even if it is a range.";
  }
  if (input.budget && !budgets.some((item) => item.id === input.budget)) {
    errors.budget = "Choose a budget band.";
  }
  if (input.requirements.trim().length < 40) {
    errors.requirements =
      "Describe the requirement in a few sentences (at least 40 characters).";
  }

  return errors;
}

export function isEngagement(value: string): value is EngagementId {
  return engagements.some((item) => item.id === value);
}

export function isBudget(value: string): value is BudgetId {
  return budgets.some((item) => item.id === value);
}
