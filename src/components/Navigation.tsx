"use client"

import { ModeToggle } from "@/components/ModeToggle"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { nav } from "@/lib/site"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full px-4 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-center">
        <div className="flex items-center gap-4">
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList className="flex max-w-5xl flex-wrap justify-center rounded-full border border-foreground/10 bg-gradient-to-r from-foreground/5 via-foreground/10 to-foreground/5 px-4 py-2 backdrop-blur-md">
              {nav.map((item) => (
                <NavigationMenuItem key={item.href} className="px-2">
                  <NavigationMenuLink
                    href={item.href}
                    className="flex items-center text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-foreground/10 bg-gradient-to-r from-foreground/5 via-foreground/10 to-foreground/5 px-4 backdrop-blur-md lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            {open ? "Close" : "Menu"}
          </button>
          <ModeToggle />
        </div>
      </div>
      {open ? (
        <div
          id="mobile-nav"
          className="mx-auto mt-2 flex max-w-md flex-col rounded-3xl border border-foreground/10 bg-background/95 p-3 backdrop-blur-md lg:hidden"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-full px-4 py-2 text-sm text-foreground/80 hover:bg-foreground/5"
            >
              {item.label}
            </a>
          ))}
        </div>
      ) : null}
    </nav>
  )
}
