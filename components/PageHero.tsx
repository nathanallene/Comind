import Link from "next/link";

export function PageHero({
  kicker,
  title,
  lede,
  crumb,
}: {
  kicker: string;
  title: string;
  lede: string;
  crumb?: { href: string; label: string };
}) {
  return (
    <header className="page-hero">
      {crumb ? (
        <p className="crumb">
          <Link href={crumb.href}>{crumb.label}</Link>
          <span aria-hidden="true">/</span>
          <span>{title}</span>
        </p>
      ) : null}
      <p className="kicker">{kicker}</p>
      <h1>{title}</h1>
      <p className="lede">{lede}</p>
    </header>
  );
}
