import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ServiceIndex } from "@/components/refine/views";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Client-focused solutions, AI optimization, custom software, on-site engineers, and embedded development for Raspberry Pi, Jetson, and other ARM systems.",
};

export default function ServicesPage() {
  return (
    <div className="page">
      <div className="wrap">
        <PageHero
          kicker="Services"
          title="Five ways the work shows up."
          lede="The same rule covers all of them. The client's objective and the technical limit are written first. The build, the model change, or the site visit is how that page gets met."
        />
        <ServiceIndex />
      </div>
    </div>
  );
}
