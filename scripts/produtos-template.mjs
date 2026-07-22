// Template estático da página de venda de iPhone (/iphones/).
// Reusa head/header/footer/businessNode do blog-template (mesmo CSS hashado).
import { SITE_URL, escapeHtml, head, header, footer, businessNode } from "./blog-template.mjs";

const WA_NUMBER = "5522998616139";

function waLink(text) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

function destaquesBlock(items = []) {
  if (!items.length) return "";
  return `<ul class="mt-6 grid gap-2.5 sm:grid-cols-2">
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

function optionsList(items = []) {
  return items
    .map((i, idx) => `<option value="${escapeHtml(i)}"${idx === 0 ? " selected" : ""}>${escapeHtml(i)}</option>`)
    .join("");
}

/** Página de venda /iphones/. Preço não é exibido — o CTA "Ver preço" leva
 * direto pro WhatsApp com cor/capacidade escolhidas já na mensagem. */
export function renderProductPage(product, { cssHref }) {
  const { data } = product;
  const canonical = `${SITE_URL}/iphones/`;
  const cores = data.cores || [];
  const capacidades = data.capacidades || [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      businessNode(),
      {
        "@type": "Product",
        name: "iPhone 17 Pro Max Lacrado",
        description: data.description,
        brand: { "@type": "Brand", name: "Apple" },
        url: canonical,
        image: `${SITE_URL}/og-image.png`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: data.cardTitle, item: canonical },
        ],
      },
    ],
  };

  return (
    head({
      title: `${data.title} | HB Assistência Técnica`,
      description: data.description,
      canonical,
      ogImage: null,
      cssHref,
      jsonLd,
      ogType: "website",
    }) +
    header() +
    `<main class="mx-auto max-w-[820px] px-5 py-12 sm:px-6">
    <nav aria-label="Trilha" class="text-xs text-muted">
      <a href="/" class="transition-colors hover:text-ink">Início</a>
      <span class="px-1.5">›</span>
      <span class="text-ink/80">${escapeHtml(data.cardTitle)}</span>
    </nav>

    <p class="mt-4 spec-label text-xs text-brand">Venda de iPhone</p>
    <h1 class="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">${escapeHtml(data.h1)}</h1>
    <p class="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">${escapeHtml(data.intro)}</p>

    <div class="mt-8 rounded-2xl border border-hairline bg-surface/60 p-5 sm:p-6">
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="block">
          <span class="text-xs font-semibold text-muted">Cor</span>
          <select id="cor-select" class="mt-1.5 w-full rounded-lg border border-hairline bg-surface px-3 py-2.5 text-sm text-ink">
            ${optionsList(cores)}
          </select>
        </label>
        <label class="block">
          <span class="text-xs font-semibold text-muted">Capacidade</span>
          <select id="cap-select" class="mt-1.5 w-full rounded-lg border border-hairline bg-surface px-3 py-2.5 text-sm text-ink">
            ${optionsList(capacidades)}
          </select>
        </label>
      </div>

      <a id="cta-preco" href="${waLink("Olá! Tenho interesse no iPhone 17 Pro Max lacrado.")}" target="_blank" rel="noopener noreferrer" class="glow-cta mt-5 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-cta px-6 font-semibold text-cta-ink transition-colors hover:bg-cta-hover sm:w-auto">Ver preço</a>
      <p class="mt-2.5 text-xs text-muted">Leva direto pro WhatsApp, já com a cor e a capacidade escolhidas.</p>
    </div>

    ${destaquesBlock(data.destaques)}

    <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <a href="tel:+5522998616139" class="inline-flex min-h-[48px] items-center justify-center rounded-full border border-hairline bg-surface px-6 font-semibold text-ink transition-colors hover:border-brand/60">Ligar (22) 99861-6139</a>
    </div>

    ${faqBlock(data.faq)}
  </main>
  <script>
    (function () {
      var corSel = document.getElementById("cor-select");
      var capSel = document.getElementById("cap-select");
      var cta = document.getElementById("cta-preco");
      function update() {
        var texto = "Olá! Tenho interesse no iPhone 17 Pro Max lacrado. Cor: " + corSel.value + " · Capacidade: " + capSel.value + ". Pode me passar o preço e a disponibilidade?";
        cta.href = "https://wa.me/${WA_NUMBER}?text=" + encodeURIComponent(texto);
      }
      corSel.addEventListener("change", update);
      capSel.addEventListener("change", update);
      update();
    })();
  </script>` +
    footer()
  );
}
