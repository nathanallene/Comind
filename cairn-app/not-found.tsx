import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page">
      <div className="wrap narrow">
        <p className="kicker">404</p>
        <h1>That page is not on this site.</h1>
        <p className="lede">The address may be mistyped, or the page was never published.</p>
        <div className="actions">
          <Link className="button" href="/">
            Back to the start
          </Link>
          <Link className="button button-secondary" href="/consult">
            Submit a brief
          </Link>
        </div>
      </div>
    </div>
  );
}
