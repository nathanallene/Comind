"use client";

import type { BaseRecord, DataProvider } from "@refinedev/core";
import { articles, services, studies } from "@/lib/content";

function rows(resource: string): BaseRecord[] {
  const source =
    resource === "services"
      ? services
      : resource === "studies"
        ? studies
        : resource === "articles"
          ? articles
          : [];
  return source.map((item) => ({ ...item, id: item.slug }));
}

export const dataProvider = {
  getList: async ({ resource }) => {
    const data = rows(resource);
    return { data, total: data.length };
  },
  getMany: async ({ resource, ids }) => {
    const wanted = new Set((ids ?? []).map(String));
    return { data: rows(resource).filter((item) => wanted.has(String(item.id))) };
  },
  getOne: async ({ resource, id }) => {
    const data = rows(resource).find((item) => item.id === String(id));
    if (!data) {
      return Promise.reject({ message: "Record not found", statusCode: 404 });
    }
    return { data };
  },
  create: async ({ resource, variables }) => {
    if (resource !== "inquiries") {
      return Promise.reject({ message: "This record cannot be created.", statusCode: 405 });
    }
    const response = await fetch("/api/consult", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(variables),
    });
    const payload = (await response.json()) as { reference?: string; error?: string };
    if (!response.ok || !payload.reference) {
      return Promise.reject({
        message: payload.error ?? "The brief could not be saved.",
        statusCode: response.status,
      });
    }
    return { data: { id: payload.reference, reference: payload.reference } };
  },
  update: async ({ id, variables }) => ({
    data: {
      id,
      ...(typeof variables === "object" && variables ? variables : {}),
    },
  }),
  deleteOne: async ({ id }) => ({ data: { id } }),
  getApiUrl: () => "/api",
} as DataProvider;
