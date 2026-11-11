"use client";

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import type { ReactNode } from "react";
import { dataProvider } from "@/providers/data-provider";

const resources = [
  {
    name: "studies",
    list: "/work",
    show: "/work/:id",
    meta: { label: "Work" },
  },
  {
    name: "services",
    list: "/services",
    show: "/services/:id",
    meta: { label: "Services" },
  },
  {
    name: "articles",
    list: "/journal",
    show: "/journal/:id",
    meta: { label: "Journal" },
  },
  {
    name: "tools",
    list: "/tools",
    meta: { label: "Tools" },
  },
];

export function RefineApp({ children }: { children: ReactNode }) {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider}
      resources={resources}
      options={{
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
      }}
    >
      {children}
    </Refine>
  );
}
