import Link from "next/link";
import { Mark } from "@/components/Mark";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <Link href="/" className="brand">
            <Mark />
            <span>
              <strong>{site.name}</strong>
              <small>{site.tagline}</small>
            </span>
          </Link>
          <p>
            Client-specific software, AI systems tuned for the bar they have to
            clear, and compact computers measured on the device that will ship.
          </p>
        </div>
        <div>
          <h2>Practice</h2>
          <Link href="/services">Services</Link>
          <Link href="/work">Selected studies</Link>
          <Link href="/about">How engagements start</Link>
          <Link href="/consult">Project consultation</Link>
        </div>
        <div>
          <h2>Library</h2>
          <Link href="/journal">Journal</Link>
          <Link href="/tools/memory">Memory calculator</Link>
          <Link href="/tools/hardware">Hardware comparison</Link>
          <Link href="/tools/optimize">Optimization planner</Link>
        </div>
      </div>
      <div className="wrap footer-end">
        <span>{site.legalName}</span>
        <span>Sample studies stand in until your own records replace them.</span>
      </div>
    </footer>
  );
}
