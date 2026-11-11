import type { Metadata } from "next";
import { OptimizePlanner } from "@/components/OptimizePlanner";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Optimization planner",
  description:
    "Plan the effect of quantization, caching, and batching on latency, GPU time, and cost. These are planning factors, not a benchmark.",
};

export default function OptimizePage() {
  return (
    <div className="page">
      <div className="wrap">
        <PageHero
          kicker="Tool 03"
          title="Optimization planner"
          lede="Enter the baseline you have measured or priced. The factors below are a first cut from FP16, with no cache and no batching. They do not know if your answers got worse."
          crumb={{ href: "/tools", label: "Tools" }}
        />
        <OptimizePlanner />
      </div>
    </div>
  );
}
