import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleShow } from "@/components/refine/views";
import { articles, getArticle } from "@/lib/content";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.summary };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getArticle(slug)) notFound();
  return <ArticleShow id={slug} />;
}
