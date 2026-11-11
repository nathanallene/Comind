import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StudyShow } from "@/components/refine/views";
import { getStudy, studies } from "@/lib/content";

export function generateStaticParams() {
  return studies.map((study) => ({ slug: study.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getStudy(slug);
  if (!study) return {};
  return { title: study.title, description: study.summary };
}

export default async function StudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getStudy(slug)) notFound();
  return <StudyShow id={slug} />;
}
