// Template estático do blog. Funções puras: recebem dados, devolvem HTML.
// Todas as classes Tailwind aqui são escaneadas via `@source` em src/index.css.

export const SITE_URL = "https://www.hbcomercio.com.br";

const WA_LINK =
  "https://wa.me/5522998616139?text=" +
  encodeURIComponent("Olá! Gostaria de fazer um orçamento.");
const PHONE_DISPLAY = "(22) 99861-6139";

/**
 * NAP canônico do negócio — fonte ÚNICA pras páginas estáticas (serviço/blog).
 * Confere LETRA POR LETRA com o Perfil da Empresa no Google (verificado em
 * jun/2026): R. Raul Cardoso, 131 - Parque Rosário, Campos dos Goytacazes - RJ,
 * 28027-290. Mantenha em sincronia se o perfil mudar.
 */
export const BUSINESS = {
  name: "HB Assistência Técnica e Acessórios",
  phoneDisplay: PHONE_DISPLAY,
  phoneTel: "+5522998616139",
  street: "Rua Raul Cardoso, 131",
  neighborhood: "Parque Rosário",
  city: "Campos dos Goytacazes",
  region: "RJ",
  postalCode: "28027-290",
  hours: "Seg a Sáb, 9h às 18h",
  // Bairros que a HB atende (loja no Parque Rosário + busca e entrega na cidade
  // toda). Mira clientes que buscam por bairro, sem mexer no endereço verificado.
  // Curadoria livre — edite à vontade. Mantenha sincronizado com a "área de
  // atendimento" do Perfil do Google.
  neighborhoodsServed: ["Centro", "Parque Avenida Pelinca", "Parque Aurora"],
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=HB+Com%C3%A9rcio+Rua+Raul+Cardoso+131+Campos+dos+Goytacazes",
  instagram: "https://www.instagram.com/hb_comercio.acessorios/",
};

/**
 * Nó LocalBusiness completo (JSON-LD). Incluído no @graph de CADA página de
 * serviço pra que o Google leia os sinais locais (endereço, geo, telefone,
 * área atendida) sem depender de resolver um @id em outra URL. O mesmo @id
 * é referenciado por Service.provider, fechando o grafo na própria página.
 */
export function businessNode() {
  return {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS.name,
    alternateName: ["HB Assistência Técnica", "HB Comércio", "HB Comércio & Acessórios"],
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/og-image.png`,
    logo: `${SITE_URL}/og-image.png`,
    telephone: BUSINESS.phoneTel,
    priceRange: "$$",
    currenciesAccepted: "BRL",
    paymentAccepted: "Dinheiro, PIX, Cartão de Crédito, Cartão de Débito",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.street,
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: "BR",
    },
    areaServed: [
      { "@type": "City", name: BUSINESS.city },
      ...BUSINESS.neighborhoodsServed.map((n) => ({
        "@type": "Place",
        name: `${n}, ${BUSINESS.city}`,
      })),
    ],
    geo: { "@type": "GeoCoordinates", latitude: -21.7587, longitude: -41.3186 },
    hasMap: BUSINESS.mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [BUSINESS.instagram],
  };
}

/**
 * Bloco local VISÍVEL — endereço, horário, telefone e link do mapa. Reforça a
 * relevância local de cada página de serviço e mantém o NAP consistente entre
 * página visível, JSON-LD e Perfil do Google (sinal forte pra busca local).
 */
export function localBlock() {
  return `<section class="mt-12" aria-labelledby="atendimento-local">
    <h2 id="atendimento-local" class="font-display text-2xl font-bold text-ink">Atendimento em ${escapeHtml(BUSINESS.city)}</h2>
    <div class="mt-5 grid gap-4 rounded-2xl border border-hairline bg-surface/60 p-5 sm:grid-cols-2 sm:p-6">
      <div class="text-sm text-muted">
        <p class="font-display text-base font-semibold text-ink">${escapeHtml(BUSINESS.name)}</p>
        <p class="mt-2">${escapeHtml(BUSINESS.street)} — ${escapeHtml(BUSINESS.neighborhood)}</p>
        <p>${escapeHtml(BUSINESS.city)}/${escapeHtml(BUSINESS.region)} · CEP ${escapeHtml(BUSINESS.postalCode)}</p>
        <p class="mt-2">${escapeHtml(BUSINESS.hours)}</p>
        <p class="mt-2"><a href="tel:${BUSINESS.phoneTel}" class="underline decoration-dotted underline-offset-2 transition-colors hover:text-ink">${escapeHtml(BUSINESS.phoneDisplay)}</a></p>
      </div>
      <div class="flex flex-col justify-center gap-3">
        <a href="${BUSINESS.mapsUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-[44px] items-center justify-center rounded-full border border-hairline bg-surface px-5 text-sm font-semibold text-ink transition-colors hover:border-brand/60">Ver no mapa</a>
        <p class="text-xs text-muted">Atendemos toda ${escapeHtml(BUSINESS.city)} — ${escapeHtml(BUSINESS.neighborhoodsServed.slice(0, 3).join(", "))} e região. Se preferir, <strong class="font-semibold text-ink/80">buscamos e entregamos</strong> seu aparelho em casa ou na empresa.</p>
      </div>
    </div>
  </section>`;
}

const MESES = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

/** Formata uma data (Date ou string) como "01 jun 2026" usando UTC (evita off-by-one). */
export function formatDate(date) {
  const d = new Date(date);
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${dd} ${MESES[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** Escapa texto para uso seguro em atributos/elementos HTML. */
export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function head({ title, description, canonical, ogImage, cssHref, jsonLd, ogType = "article" }) {
  const img = ogImage ? `${SITE_URL}${ogImage}` : `${SITE_URL}/og-image.png`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
  <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png?v=2" />
  <meta name="theme-color" content="#070B18" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:locale" content="pt_BR" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${img}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="${img}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${cssHref}" />
  ${jsonLd ? `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n</script>` : ""}
</head>
<body>`;
}

export function header() {
  return `<header class="sticky top-0 z-50 border-b border-hairline bg-base/80 backdrop-blur-xl">
  <div class="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 sm:h-[72px] sm:px-6 lg:px-8">
    <a href="/" aria-label="HB Assistência Técnica — início" class="inline-flex items-center gap-2.5 rounded-lg">
      <span class="grid size-10 shrink-0 place-items-center overflow-hidden rounded-md bg-white">
        <img src="/logo.svg" alt="HB Assistência Técnica e Acessórios" width="40" height="40" class="size-10 scale-[1.18] object-contain" />
      </span>
      <span class="font-display text-lg font-bold leading-none tracking-tight text-ink">HB <span class="text-muted">Assistência Técnica</span></span>
    </a>
    <nav class="flex items-center gap-3">
      <a href="/" class="hidden text-sm font-medium text-muted transition-colors hover:text-ink sm:inline">Site</a>
      <a href="${WA_LINK}" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-[44px] items-center justify-center rounded-full bg-cta px-5 text-sm font-semibold text-cta-ink">WhatsApp</a>
    </nav>
  </div>
</header>`;
}

export function footer() {
  return `<footer class="border-t border-hairline bg-surface/40">
  <div class="mx-auto max-w-[1200px] px-5 py-10 sm:px-6 lg:px-8">
    <div class="flex flex-col gap-3 text-sm text-muted">
      <p>HB Assistência Técnica e Acessórios — conserto de celulares e computadores em Campos dos Goytacazes/RJ.</p>
      <nav aria-label="Serviços" class="flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
        <a href="/iphones/" class="underline decoration-dotted underline-offset-2 transition-colors hover:text-ink">Comprar iPhone</a>
        <a href="/conserto/celular/" class="underline decoration-dotted underline-offset-2 transition-colors hover:text-ink">Conserto de celular</a>
        <a href="/conserto/computador/" class="underline decoration-dotted underline-offset-2 transition-colors hover:text-ink">Conserto de computador</a>
        <a href="/conserto/videogame/" class="underline decoration-dotted underline-offset-2 transition-colors hover:text-ink">Conserto de videogame</a>
        <a href="/conserto/mac-macbook/" class="underline decoration-dotted underline-offset-2 transition-colors hover:text-ink">Assistência Mac e MacBook</a>
        <a href="/conserto/tablet-ipad/" class="underline decoration-dotted underline-offset-2 transition-colors hover:text-ink">Conserto de tablet e iPad</a>
        <a href="/conserto/smartwatch/" class="underline decoration-dotted underline-offset-2 transition-colors hover:text-ink">Smartwatch e Apple Watch</a>
        <a href="/blog/" class="underline decoration-dotted underline-offset-2 transition-colors hover:text-ink">Blog</a>
      </nav>
      <p>WhatsApp ${BUSINESS.phoneDisplay} · ${BUSINESS.street} — ${BUSINESS.neighborhood}, ${BUSINESS.city}/${BUSINESS.region} · CEP ${BUSINESS.postalCode} · ${BUSINESS.hours}</p>
      <p>
        <a href="/" class="underline decoration-dotted underline-offset-2 transition-colors hover:text-ink">Voltar ao site</a>
        ·
        <a href="/privacidade.html" class="underline decoration-dotted underline-offset-2 transition-colors hover:text-ink">Política de Privacidade</a>
      </p>
    </div>
  </div>
</footer>
</body>
</html>`;
}

export function ctaBlock() {
  return `<div class="mt-12 rounded-2xl border border-hairline bg-surface p-6 text-center sm:p-8">
    <h2 class="font-display text-xl font-semibold text-ink">Precisa consertar seu aparelho?</h2>
    <p class="mx-auto mt-2 max-w-md text-sm text-muted">Orçamento grátis e sem compromisso. Chame a gente no WhatsApp.</p>
    <a href="${WA_LINK}" target="_blank" rel="noopener noreferrer" class="glow-cta mt-5 inline-flex min-h-[48px] items-center justify-center rounded-full bg-cta px-6 font-semibold text-cta-ink transition-colors hover:bg-cta-hover">Quero meu orçamento</a>
  </div>`;
}

function card(post) {
  const { slug, data, readingTime } = post;
  const cover = data.cover
    ? `<img src="${data.cover}" alt="${escapeHtml(data.coverAlt || data.title)}" class="aspect-[16/9] w-full object-cover" loading="lazy" />`
    : "";
  return `<a href="/blog/${slug}/" class="group flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface transition-colors hover:border-brand/60">
      ${cover}
      <div class="flex flex-1 flex-col gap-2 p-5">
        <p class="text-xs text-muted">${formatDate(data.date)} · ${readingTime} min</p>
        <h2 class="font-display text-lg font-semibold text-ink transition-colors group-hover:text-brand">${escapeHtml(data.title)}</h2>
        <p class="text-sm text-muted">${escapeHtml(data.description)}</p>
      </div>
    </a>`;
}

/** Página de listagem /blog/. */
export function renderListPage(posts, { cssHref }) {
  const canonical = `${SITE_URL}/blog/`;
  return (
    head({
      title: "Blog da HB | Dicas de conserto de celular e computador",
      description:
        "Dicas e respostas sobre conserto de celular e computador em Campos dos Goytacazes. Conteúdo direto da HB Assistência Técnica.",
      canonical,
      ogImage: null,
      cssHref,
      jsonLd: null,
    }) +
    header() +
    `<main class="mx-auto max-w-[1200px] px-5 py-14 sm:px-6 lg:px-8">
    <p class="spec-label text-xs text-brand">Blog</p>
    <h1 class="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">Blog da HB</h1>
    <p class="mt-3 max-w-2xl text-muted">Dicas práticas sobre conserto de celular e computador, direto de quem mexe com isso todo dia em Campos dos Goytacazes.</p>
    <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      ${posts.map(card).join("\n      ")}
    </div>
    ${ctaBlock()}
  </main>` +
    footer()
  );
}

/** Box de bio do autor no rodapé do post (sinal de E-E-A-T). */
export function authorBio() {
  return `<aside class="mt-12 flex items-center gap-4 rounded-2xl border border-hairline bg-surface/40 p-5">
    <img src="/about/henrique.jpg" alt="Henrique Braga, técnico da HB Assistência Técnica" width="64" height="64" class="size-16 shrink-0 rounded-full object-cover" loading="lazy" />
    <div class="text-sm text-muted">
      <p class="font-semibold text-ink">Henrique Braga</p>
      <p class="mt-1">Técnico responsável pela HB Assistência Técnica e Acessórios, em Campos dos Goytacazes. Conserta celular, computador e mais todo dia na bancada, e escreve aqui pra te ajudar a entender o problema antes de gastar.</p>
    </div>
  </aside>`;
}

/** Página de um post /blog/<slug>/. */
export function renderPostPage(post, { cssHref }) {
  const { slug, data, html, readingTime } = post;
  const canonical = `${SITE_URL}/blog/${slug}/`;
  const cover = data.cover
    ? `<img src="${data.cover}" alt="${escapeHtml(data.coverAlt || data.title)}" class="mt-6 aspect-[16/9] w-full rounded-2xl object-cover" />`
    : "";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    description: data.description,
    datePublished: new Date(data.date).toISOString().slice(0, 10),
    dateModified: new Date(data.updated || data.date).toISOString().slice(0, 10),
    image: data.cover ? `${SITE_URL}${data.cover}` : `${SITE_URL}/og-image.png`,
    mainEntityOfPage: canonical,
    author: {
      "@type": "Person",
      name: "Henrique Braga",
      jobTitle: "Técnico em manutenção de eletrônicos",
      worksFor: {
        "@type": "Organization",
        name: "HB Assistência Técnica e Acessórios",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "HB Assistência Técnica e Acessórios",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.png` },
    },
  };
  return (
    head({
      title: `${data.title} | HB Assistência Técnica`,
      description: data.description,
      canonical,
      ogImage: data.cover,
      cssHref,
      jsonLd,
    }) +
    header() +
    `<main class="mx-auto max-w-[720px] px-5 py-12 sm:px-6">
    <a href="/blog/" class="text-sm text-muted transition-colors hover:text-ink">‹ Voltar ao blog</a>
    <h1 class="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">${escapeHtml(data.title)}</h1>
    <p class="mt-3 text-sm text-muted">Por Henrique Braga · ${formatDate(data.date)} · ${readingTime} min de leitura${data.updated ? ` · Atualizado em ${formatDate(data.updated)}` : ""}</p>
    ${cover}
    <article class="article mt-8">${html}</article>
    ${authorBio()}
    ${ctaBlock()}
  </main>` +
    footer()
  );
}
