import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ArticleIndex } from "@/components/refine/views";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes on AI memory, quantization, on-site engineering, and optimization for compact computers.",
};

export default function JournalPage() {
  return (
    <div className="page">
      <div className="wrap narrow-wide">
        <PageHero
          kicker="Journal"
          title="Notes from the same problems we take on."
          lede="Tutorials, articles, and worked experiments on AI optimization, software tradeoffs, and embedded computers. The tools on this site use the same arithmetic."
        />
        <ArticleIndex />
      </div>
    </div>
  );
}
