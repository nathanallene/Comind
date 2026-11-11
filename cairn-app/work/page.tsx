import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { StudyCards } from "@/components/refine/views";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Sample engineering studies showing how Cairn reports latency, cost, memory, and other measured results.",
};

export default function WorkPage() {
  return (
    <div className="page">
      <div className="wrap">
        <PageHero
          kicker="Work"
          title="Results, written as measurements."
          lede="These are sample studies, composed to show the form of a finished engagement: the constraint, the change, and the numbers that were allowed to decide it. Replace them with your own project records."
        />
        <StudyCards />
      </div>
    </div>
  );
}
