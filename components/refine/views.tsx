"use client";

import { useList, useNavigation, useOne } from "@refinedev/core";
import Link from "next/link";
import { Blocks } from "@/components/Blocks";
import { PageHero } from "@/components/PageHero";
import {
  articles,
  formatDate,
  readingMinutes,
  services,
  studies,
  type Article,
  type Service,
  type Study,
} from "@/lib/content";

type ServiceRecord = Service & { id: string };
type StudyRecord = Study & { id: string };
type ArticleRecord = Article & { id: string };

const serviceData = { data: services.map((item) => ({ ...item, id: item.slug })), total: services.length };
const studyData = { data: studies.map((item) => ({ ...item, id: item.slug })), total: studies.length };
const articleData = { data: articles.map((item) => ({ ...item, id: item.slug })), total: articles.length };

export function ServiceIndex() {
  const { showUrl } = useNavigation();
  const { result } = useList<ServiceRecord>({
    resource: "services",
    queryOptions: { initialData: serviceData },
  });
  const items = result?.data?.length ? result.data : serviceData.data;

  return (
    <div className="service-index">
      {items.map((service) => (
        <Link key={service.id} href={showUrl("services", service.id)} className="service-row">
          <span className="service-num">{service.number}</span>
          <span>
            <strong>{service.title}</strong>
            <em>{service.summary}</em>
          </span>
          <span className="service-go">View</span>
        </Link>
      ))}
    </div>
  );
}

export function StudyCards({ preview = false }: { preview?: boolean }) {
  const { showUrl } = useNavigation();
  const { result } = useList<StudyRecord>({
    resource: "studies",
    queryOptions: { initialData: studyData },
  });
  const items = result?.data?.length ? result.data : studyData.data;

  return (
    <div className="study-grid">
      {items.map((study) => (
        <Link key={study.id} href={showUrl("studies", study.id)} className="study-card">
          <p className="study-meta">{study.sector}</p>
          <h2>{study.title}</h2>
          <p>{study.summary}</p>
          <ul className="metric-list">
            {(preview ? study.metrics.slice(0, 2) : study.metrics).map((metric) => (
              <li key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </li>
            ))}
          </ul>
        </Link>
      ))}
    </div>
  );
}

export function ArticleIndex() {
  const { showUrl } = useNavigation();
  const { result } = useList<ArticleRecord>({
    resource: "articles",
    queryOptions: { initialData: articleData },
  });
  const items = result?.data?.length ? result.data : articleData.data;

  return (
    <div className="entry-list">
      {items.map((article) => (
        <Link key={article.id} href={showUrl("articles", article.id)} className="entry">
          <span>
            {article.kind} · {formatDate(article.date)} · {readingMinutes(article.blocks)} min
          </span>
          <strong>{article.title}</strong>
          <em>{article.summary}</em>
        </Link>
      ))}
    </div>
  );
}

export function ServiceShow({ id }: { id: string }) {
  const fallback = serviceData.data.find((item) => item.id === id);
  const { result } = useOne<ServiceRecord>({
    resource: "services",
    id,
    queryOptions: {
      initialData: fallback ? { data: fallback } : undefined,
    },
  });
  const service = result ?? fallback;
  if (!service) return null;

  return (
    <div className="page">
      <div className="wrap narrow-wide">
        <PageHero
          kicker={`Service ${service.number}`}
          title={service.title}
          lede={service.lede}
          crumb={{ href: "/services", label: "Services" }}
        />
        <div className="split">
          <section>
            <h2>What we need from you</h2>
            <ul className="plain-list">
              {service.needs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>What we deliver</h2>
            <ul className="plain-list">
              {service.delivers.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
        <section className="measure-block">
          <h2>What gets measured</h2>
          <ul className="plain-list">
            {service.measures.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <ul className="related">
          {service.related.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function StudyShow({ id }: { id: string }) {
  const fallback = studyData.data.find((item) => item.id === id);
  const { result } = useOne<StudyRecord>({
    resource: "studies",
    id,
    queryOptions: {
      initialData: fallback ? { data: fallback } : undefined,
    },
  });
  const study = result ?? fallback;
  if (!study) return null;

  return (
    <div className="page">
      <div className="wrap narrow">
        <PageHero
          kicker={study.sector}
          title={study.title}
          lede={study.summary}
          crumb={{ href: "/work", label: "Work" }}
        />
        <ul className="metric-list metric-band">
          {study.metrics.map((metric) => (
            <li key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </li>
          ))}
        </ul>
        <div className="prose">
          <h2>The constraint</h2>
          {study.problem.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <h2>The work</h2>
          {study.approach.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <h2>What was reported</h2>
          {study.result.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="note">
            Sample study. The figures illustrate the report, and they are not a claim about a named client.
          </p>
        </div>
        <p className="section-more">
          <Link href="/consult">Describe a similar constraint</Link>
        </p>
      </div>
    </div>
  );
}

export function ArticleShow({ id }: { id: string }) {
  const fallback = articleData.data.find((item) => item.id === id);
  const { result } = useOne<ArticleRecord>({
    resource: "articles",
    id,
    queryOptions: {
      initialData: fallback ? { data: fallback } : undefined,
    },
  });
  const article = result ?? fallback;
  if (!article) return null;

  return (
    <div className="page">
      <div className="wrap narrow">
        <PageHero
          kicker={`${article.kind} · ${formatDate(article.date)} · ${readingMinutes(article.blocks)} min`}
          title={article.title}
          lede={article.summary}
          crumb={{ href: "/journal", label: "Journal" }}
        />
        <Blocks blocks={article.blocks} />
        <p className="section-more">
          <Link href="/tools">Use the planning tools</Link>
        </p>
      </div>
    </div>
  );
}
