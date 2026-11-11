import type { Metadata } from "next";
import { HardwareCompare } from "@/components/HardwareCompare";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Hardware comparison",
  description:
    "Compare Raspberry Pi and NVIDIA Jetson boards by memory, power, accelerator, and the job each one is suited to.",
};

export default function HardwarePage() {
  return (
    <div className="page">
      <div className="wrap">
        <PageHero
          kicker="Tool 02"
          title="Hardware comparison"
          lede="A short list of compact ARM computers used in this practice. Filter by the power ceiling, the memory floor, and whether the workload needs a tensor accelerator."
          crumb={{ href: "/tools", label: "Tools" }}
        />
        <HardwareCompare />
      </div>
    </div>
  );
}
