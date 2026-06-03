// Template estático das páginas de serviço (/conserto/<slug>/).
// Reusa head/header/footer/ctaBlock do blog-template (mesmo CSS hashado).
// Programmatic SEO: 1 página por intenção de busca, com schema Service + FAQ.
import {
  SITE_URL,
  escapeHtml,
  head,
  header,
  footer,
  ctaBlock,
} from "./blog-template.mjs";

const WA_LINK = (text) =>
  "https://wa.me/5522998616139?text=" + encodeURIComponent(text);

/** Lista "O que resolvemos" a partir do array do frontmatter. */
function resolveList(items = []) {
  if (!items.length) return "";
  return `<ul class="mt-5 grid gap-2.5 sm:grid-cols-2">
    ${items
      .map(
        (i) =>
          `<li class="flex items-start gap-2.5 rounded-xl border border-hairline bg-surface/60 px-4 py-3 text-sm text-ink">
        <span class="mt-1 size-1.5 shrink-0 rounded-full bg-cta"></span>
        <span>${escapeHtml(i)}</span>
      </li>`,
      )
      .join("\n    ")}
  </ul>`;
}

/** Bloco de FAQ visível (casa com o FAQPage do JSON-LD). */
function faqBlock(faq = []) {
  if (!faq.length) return "";
  return `<section class="mt-12">
    <h2 class="font-display text-2xl font-bold text-ink">Perguntas frequentes</h2>
    <div class="mt-5 flex flex-col gap-3">
      ${faq
        .map(
          (f) =>
            `<details class="group rounded-xl border border-hairline bg-surface/60 px-5 py-4">
        <summary class="cursor-pointer list-none font-display text-base font-semibold text-ink marker:hidden">${escapeHtml(f.q)}</summary>
        <p class="mt-2 text-sm leading-relaxed text-muted">${escapeHtml(f.a)}</p>
      </details>`,
        )
        .join("\n      ")}
    </div>
  </section>`;
}

/** Links cruzados pros outros serviços (evita página órfã + distribui autoridade). */
function relatedBlock(related = [], allBySlug = {}) {
  const items = related.map((slug) => allBySlug[slug]).filter(Boolean);
  if (!items.length) return "";
  return `<section class="mt-12">
    <h2 class="font-display text-xl font-semibold text-ink">Veja também</h2>
    <div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      ${items
        .map(
          (s) =>
            `<a href="/conserto/${s.slug}/" class="group rounded-xl border border-hairline bg-surface/60 px-4 py-3 transition-colors hover:border-brand/60">
        <span class="font-display text-sm font-semibold text-ink transition-colors group-hover:text-brand">${escapeHtml(s.data.cardTitle || s.data.h1)}</span>
      </a>`,
        )
        .join("\n      ")}
    </div>
  </section>`;
}

/** Página de um serviço /conserto/<slug>/. */
export function renderServicePage(service, { cssHref, allBySlug = {} }) {
  const { slug, data, html } = service;
  const canonical = `${SITE_URL}/conserto/${slug}/`;
  const waText =
    data.waText || `Olá! Gostaria de um orçamento para ${data.cardTitle || data.h1}.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        serviceType: data.serviceType || data.h1,
        name: data.h1,
        description: data.description,
        url: canonical,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: { "@type": "City", name: "Campos dos Goytacazes" },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: canonical,
          servicePhone: "+5522998616139",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: data.cardTitle || data.h1, item: canonical },
        ],
      },
      ...(Array.isArray(data.faq) && data.faq.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: data.faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
    ],
  };

  // Destaques (prazo / garantia / orçamento) — só renderiza os preenchidos.
  const highlights = [
    data.prazo && { label: "Prazo", value: data.prazo },
    { label: "Garantia", value: "90 dias no serviço" },
    { label: "Orçamento", value: "Grátis e sem compromisso" },
  ].filter(Boolean);

  return (
    head({
      title: `${data.title} | HB Comércio`,
      description: data.description,
      canonical,
      ogImage: data.cover || null,
      cssHref,
      jsonLd,
      ogType: "website",
    }) +
    header() +
    `<main class="mx-auto max-w-[820px] px-5 py-12 sm:px-6">
    <nav aria-label="Trilha" class="text-xs text-muted">
      <a href="/" class="transition-colors hover:text-ink">Início</a>
      <span class="px-1.5">›</span>
      <span class="text-ink/80">${escapeHtml(data.cardTitle || data.h1)}</span>
    </nav>

    <h1 class="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">${escapeHtml(data.h1)}</h1>
    <p class="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">${escapeHtml(data.intro)}</p>

    <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <a href="${WA_LINK(waText)}" target="_blank" rel="noopener noreferrer" class="glow-cta inline-flex min-h-[48px] items-center justify-center rounded-full bg-cta px-6 font-semibold text-cta-ink transition-colors hover:bg-cta-hover">Chamar no WhatsApp</a>
      <a href="tel:+5522998616139" class="inline-flex min-h-[48px] items-center justify-center rounded-full border border-hairline bg-surface px-6 font-semibold text-ink transition-colors hover:border-brand/60">Ligar (22) 99861-6139</a>
    </div>

    <div class="mt-8 grid gap-3 sm:grid-cols-3">
      ${highlights
        .map(
          (h) =>
            `<div class="rounded-xl border border-hairline bg-surface/60 px-4 py-3">
        <p class="spec-label text-[11px] text-brand">${escapeHtml(h.label)}</p>
        <p class="mt-0.5 text-sm font-semibold text-ink">${escapeHtml(h.value)}</p>
      </div>`,
        )
        .join("\n      ")}
    </div>

    ${
      Array.isArray(data.resolvemos) && data.resolvemos.length
        ? `<h2 class="mt-12 font-display text-2xl font-bold text-ink">O que a gente resolve</h2>${resolveList(data.resolvemos)}`
        : ""
    }

    <article class="article mt-10">${html}</article>

    ${faqBlock(data.faq)}
    ${ctaBlock()}
    ${relatedBlock(data.related, allBySlug)}
  </main>` +
    footer()
  );
}
