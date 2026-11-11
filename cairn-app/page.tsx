import Link from "next/link";
import { ArticleIndex, ServiceIndex, StudyCards } from "@/components/refine/views";
import { SectionLabel } from "@/components/SectionLabel";
import { site } from "@/lib/site";

const tools = [
  {
    href: "/tools/memory",
    title: "Memory calculator",
    text: "Weights, key-value cache, and whether a board still has room.",
  },
  {
    href: "/tools/hardware",
    title: "Hardware comparison",
    text: "Raspberry Pi and Jetson boards side by side, with the published limits.",
  },
  {
    href: "/tools/optimize",
    title: "Optimization planner",
    text: "A first cut of latency, GPU time, and cost. Not a benchmark.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="kicker">{site.tagline}</p>
            <h1>Start with the limit that decides the design.</h1>
            <p className="lede">
              Cairn writes software, tunes AI products, and builds for compact
              computers. The limit might be a latency budget, a safety case, a
              unit cost, or a board already bolted to a machine. When the work
              depends on the room, engineers come to the site.
            </p>
            <div className="actions">
              <Link className="button" href="/consult">
                Describe the project
              </Link>
              <Link className="button button-secondary" href="/work">
                See the studies
              </Link>
            </div>
            <p className="spec-line">Software · AI optimization · On-site · Embedded</p>
          </div>
          <aside className="brief" aria-label="Example client brief">
            <p className="kicker">Example brief</p>
            <dl>
              <div>
                <dt>Objective</dt>
                <dd>Inspect parts on the existing line without adding a rack.</dd>
              </div>
              <div>
                <dt>Constraint</dt>
                <dd>Under 50 ms on the device, and a false-reject rate quality will sign.</dd>
              </div>
              <div>
                <dt>Where it runs</dt>
                <dd>A Jetson-class module, embedded Linux, power already budgeted.</dd>
              </div>
            </dl>
            <Link href="/consult">Start from your own constraint</Link>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionLabel index="01">How the work is framed</SectionLabel>
          <div className="measure-grid">
            <article>
              <h2>Requirements before architecture</h2>
              <p>
                Individual objectives and technical limits are written first. The
                design is checked against that page, not against a generic product shape.
              </p>
            </article>
            <article>
              <h2>Accuracy, safety, speed, cost</h2>
              <p>
                AI work moves those together. A faster model that misses the bar
                the client named is reported as a failed experiment.
              </p>
            </article>
            <article>
              <h2>New systems and old ones</h2>
              <p>
                New applications and the maintenance of systems already in use
                follow the same standard: a scope, a test around the risky path, and a record.
              </p>
            </article>
            <article>
              <h2>On the device, and on site</h2>
              <p>
                Raspberry Pi, NVIDIA Jetson, and other ARM boards are measured
                for time, memory, and power. Engineers go to the premises when the room is the lab.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionLabel index="02">Services</SectionLabel>
          <ServiceIndex />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionLabel index="03">Selected studies</SectionLabel>
          <StudyCards preview />
          <p className="section-more">
            <Link href="/work">All studies</Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap split-home">
          <div>
            <SectionLabel index="04">Journal</SectionLabel>
            <ArticleIndex />
          </div>
          <div>
            <SectionLabel index="05">Tools</SectionLabel>
            <div className="tool-grid">
              {tools.map((tool) => (
                <Link key={tool.href} href={tool.href} className="tool-card">
                  <strong>{tool.title}</strong>
                  <span>{tool.text}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap cta-band">
          <div>
            <SectionLabel index="06">Consultation</SectionLabel>
            <h2>Tell us the requirement and the limit.</h2>
            <p>
              A useful first note names the objective, what cannot change, and
              where the system has to run. The form keeps a reference code on this server.
            </p>
          </div>
          <Link className="button" href="/consult">
            Submit a brief
          </Link>
        </div>
      </section>
    </>
  );
}
