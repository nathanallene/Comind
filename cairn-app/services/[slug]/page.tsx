import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceShow } from "@/components/refine/views";
import { getService, services } from "@/lib/content";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.title, description: service.summary };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getService(slug)) notFound();
  return <ServiceShow id={slug} />;
}
