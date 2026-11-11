"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="page">
      <div className="wrap narrow">
        <p className="kicker">Error</p>
        <h1>This page failed to load.</h1>
        <p className="lede">The rest of the site is still available.</p>
        <button className="button" type="button" onClick={() => reset()}>
          Try again
        </button>
      </div>
    </div>
  );
}
