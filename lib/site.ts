export const site = {
  name: "Cairn",
  legalName: "Cairn Systems",
  tagline: "Systems engineering",
  description:
    "Cairn builds client-specific software, optimizes AI products for accuracy, safety, speed, and cost, and develops for Raspberry Pi, NVIDIA Jetson, and other compact ARM systems. Engineers work on site when the project needs it.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const engagements = [
  { id: "client-solutions", label: "Client-focused solution" },
  { id: "ai-optimization", label: "AI product optimization" },
  { id: "software", label: "Custom software" },
  { id: "on-site", label: "On-site development" },
  { id: "embedded", label: "Embedded systems" },
  { id: "unsure", label: "Not sure yet" },
] as const;

export const budgets = [
  { id: "undecided", label: "Undecided" },
  { id: "under-25", label: "Under USD 25,000" },
  { id: "25-80", label: "USD 25,000 to 80,000" },
  { id: "80-200", label: "USD 80,000 to 200,000" },
  { id: "over-200", label: "Above USD 200,000" },
] as const;

export type EngagementId = (typeof engagements)[number]["id"];
export type BudgetId = (typeof budgets)[number]["id"];
