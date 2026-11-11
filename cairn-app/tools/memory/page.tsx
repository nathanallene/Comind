import type { Metadata } from "next";
import { MemoryCalculator } from "@/components/MemoryCalculator";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "AI memory calculator",
  description:
    "Estimate transformer weight memory and key-value cache, then check the plan against Raspberry Pi and NVIDIA Jetson memory budgets.",
};

export default function MemoryPage() {
  return (
    <div className="page">
      <div className="wrap">
        <PageHero
          kicker="Tool 01"
          title="AI memory calculator"
          lede="Weight memory is parameters times bytes. Cache memory follows the layers, key-value heads, and sequence length. A quarter of each board's RAM is held back for the system."
          crumb={{ href: "/tools", label: "Tools" }}
        />
        <MemoryCalculator />
      </div>
    </div>
  );
}
