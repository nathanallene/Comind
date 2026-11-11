import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

const tools = [
  {
    href: "/tools/memory",
    number: "01",
    title: "AI memory calculator",
    text: "Estimate weight memory and key-value cache, then compare the total with Raspberry Pi and Jetson RAM budgets.",
  },
  {
    href: "/tools/hardware",
    number: "02",
    title: "Hardware comparison",
    text: "Filter compact boards by power, memory, and whether they have a tensor accelerator.",
  },
  {
    href: "/tools/optimize",
    number: "03",
    title: "Optimization planner",
    text: "Sketch latency, GPU-hours, and cost from quantization, caching, and batching. Factors are labeled as plans, not measurements.",
  },
];

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Planning tools for AI memory, compact-board comparison, and optimization tradeoffs.",
};

export default function ToolsPage() {
  return (
    <div className="page">
      <div className="wrap">
        <PageHero
          kicker="Tools"
          title="Calculators for the first cut."
          lede="Use these to see whether a model can fit, which class of board is even a candidate, and which optimization lever moves cost. Shipping numbers still come from the target device."
        />
        <div className="tool-grid tool-grid-page">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="tool-card">
              <span>{tool.number}</span>
              <strong>{tool.title}</strong>
              <em>{tool.text}</em>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
