import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About",
  description:
    "Cairn is a systems engineering practice for client-specific software, AI optimization, and compact computers.",
};

export default function AboutPage() {
  return (
    <div className="page">
      <div className="wrap narrow">
        <PageHero
          kicker="About"
          title="A practice built around the client's limit."
          lede="Cairn takes software, AI products, and compact computers as one engineering problem: something has to be true at the end, and something else is not allowed to break while you get there."
        />
        <div className="prose">
          <h2>What the work is</h2>
          <p>
            Clients arrive with a requirement that is already specific. A product
            needs a feature the current codebase can barely hold. A model is
            accurate and too expensive. A board in a cabinet runs out of memory
            after a day. The engagement starts by writing that requirement down,
            including the technical objective and the limit.
          </p>
          <p>
            From there the work is custom software, an optimization of an AI
            product, an engineer on the client's premises, or software for a
            single-board computer. Raspberry Pi, NVIDIA Jetson, and other ARM
            systems on embedded Linux are ordinary targets, not a side interest.
          </p>
          <h2>How an engagement starts</h2>
          <p>
            The consultation form asks for the objective, the timing, and the
            requirement in your own words. The reply, when this site is connected
            to a real mailbox, should come back with the constraints restated and
            the measures that would decide the work. If those measures are wrong,
            the proposal is wrong.
          </p>
          <h2>What the site is for</h2>
          <p>
            The studies show the shape of a report. The journal holds the
            reasoning behind the tools. The tools themselves are planning aids:
            memory, a hardware shortlist, and an optimization sketch. None of
            them replaces a measurement on the device or the task set that will
            be used for acceptance.
          </p>
          <p>
            Pages are static, the form checks its input, and the server sends
            ordinary security headers. Navigation stays on one list so a visitor
            can reach the work, the services, the notes, the tools, or the form
            without a tour.
          </p>
          <p>
            <Link href="/consult">Submit a brief</Link> or{" "}
            <Link href="/services">read the services</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
