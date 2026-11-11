"use client";

import { useMenu } from "@refinedev/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Mark } from "@/components/Mark";
import { site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const { menuItems } = useMenu();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="brand">
          <Mark />
          <span>
            <strong>{site.name}</strong>
            <small>{site.tagline}</small>
          </span>
        </Link>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav id="site-nav" className={open ? "nav open" : "nav"}>
          {menuItems.map((item) => {
            const href = item.route ?? "/";
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link key={item.key} href={href} aria-current={active ? "page" : undefined}>
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/about"
            aria-current={pathname === "/about" ? "page" : undefined}
          >
            About
          </Link>
          <Link href="/consult" className="nav-cta">
            Start a project
          </Link>
        </nav>
      </div>
    </header>
  );
}
