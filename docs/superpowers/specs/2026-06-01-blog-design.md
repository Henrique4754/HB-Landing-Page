# Blog da HB Comércio — Design

**Data:** 2026-06-01
**Status:** Aprovado para implementação

## Contexto

A landing page da HB Comércio é um SPA Vite + React 19 + TS + Tailwind v4, sem
roteamento (uma página de scroll único), com SEO forte (JSON-LD LocalBusiness +
FAQPage, `sitemap.xml`, `robots.txt`, Open Graph). Deploy na Vercel. A "Política
de Privacidade" já é servida como HTML estático em `public/privacidade.html`.

Queremos um blog cujo objetivo é **duplo**: ranquear em buscas locais
("troca de tela iPhone Campos") **e** gerar conteúdo para compartilhar no
WhatsApp/Instagram. Os dois exigem que cada página seja **HTML indexável** com
título, descrição e Open Graph corretos no momento do crawl — conteúdo
renderizado só no client não atende.

## Decisão de arquitetura

**Gerador estático Markdown→HTML que compartilha o CSS Tailwind do site.**

Posts são arquivos Markdown no repositório. Um script de build, rodando **depois**
do `vite build`, converte cada `.md` em HTML e o injeta num template que referencia
o **mesmo arquivo CSS compilado** que o site já carrega. As páginas resultantes são
estáticas (`dist/blog/.../index.html`), totalmente indexáveis e com a aparência do
site, **sem React nem SSR** nas páginas de blog.

### Alternativas descartadas
- **`vite-react-ssg` (SSG React):** a lib só suporta Vite até a v7; o projeto está
  no Vite 8. Incompatível.
- **Prerender React próprio (SSR + `react-dom/server`):** reaproveitaria os
  componentes, mas adiciona SSR em Vite 8 (novo/menos testado) e mais código de
  build para manter. Maior risco para um blog pequeno.
- **Roteamento só no client (react-router puro):** conteúdo não fica no HTML →
  Google indexa mal e preview de link no WhatsApp/Insta não pega título/imagem.
  Mata os dois objetivos.

## Modelo de conteúdo

Cada post: `content/blog/<slug>.md` com frontmatter YAML.

```yaml
---
title: "Vale a pena trocar a tela do iPhone ou comprar outro?"
description: "Quando compensa consertar a tela e quando vale trocar de aparelho. Explicamos sem enrolação."
date: 2026-06-01
cover: /blog/covers/troca-tela-iphone.jpg   # opcional
tags: [iphone, tela]                         # opcional
draft: false                                 # opcional; true = não publica
---

Corpo em **Markdown** (h2, listas, links, negrito...).
```

Regras:
- `slug` vem do nome do arquivo.
- `draft: true` exclui o post do build (não gera página nem entra na lista/sitemap).
- `description` alimenta a meta description e o resumo no card da lista.
- Tempo de leitura é calculado a partir da contagem de palavras (≈200 ppm).

## Estrutura de arquivos

| Caminho | Papel |
|---|---|
| `content/blog/*.md` | Os posts (fonte) |
| `public/blog/covers/*` | Imagens de capa (servidas em `/blog/covers/...`) |
| `scripts/build-blog.mjs` | Gerador: lê md, gera HTML, regenera sitemap |
| `src/blog/template.ts` | Template do layout (header, footer, área do artigo, `<head>`) |
| `dist/blog/index.html` | Lista de posts (gerada) |
| `dist/blog/<slug>/index.html` | Página de cada post (gerada) |

URLs: `/blog/` (lista) e `/blog/<slug>/` (post) — URLs limpas servidas como
arquivos reais. Não há conflito com a SPA: o site não usa client router nem
rewrite catch-all, então os arquivos de `/blog/` são servidos diretamente pela
Vercel.

## Estilo (como o CSS é compartilhado)

- O blog usa **o mesmo stylesheet** compilado pelo Vite/Tailwind do site. O Vite
  gera `dist/assets/index-[hash].css`; o gerador lê o `dist/index.html` para
  descobrir o caminho exato (hash) e injeta o mesmo `<link rel="stylesheet">`
  no `<head>` das páginas de blog. Também replica o preconnect + `<link>` das
  Google Fonts e o `theme-color`.
- Para o Tailwind **não remover (purge)** as classes usadas só no template do
  blog, o `src/index.css` ganha uma diretiva `@source` apontando para
  `src/blog/template.ts`. Assim as utilities do template entram no CSS compilado.
- A tipografia do corpo do artigo ("prose") é um **bloco de CSS escrito à mão** no
  `src/index.css`, escopado a um container (ex.: `.article`), estilizando `h2`,
  `h3`, `p`, `ul`, `ol`, `a`, `blockquote`, `code`. Sem `@tailwindcss/typography`
  (zero dependência nova no runtime).

## SEO

Por **post**:
- `<title>` e meta description (do frontmatter).
- `<link rel="canonical">` apontando para a URL absoluta do post.
- Open Graph: `og:type=article`, `og:title`, `og:description`, `og:image`
  (capa do post, ou `og-image.png` como fallback), `og:url`.
- `twitter:card=summary_large_image`.
- JSON-LD **`BlogPosting`**: `headline`, `description`, `datePublished`, `image`,
  `author`/`publisher` = HB Comércio, `mainEntityOfPage` = URL do post.

Por **lista** (`/blog/`): `<title>`, description e canonical próprios.

**Sitemap:** o gerador regenera `dist/sitemap.xml` incluindo `/blog/` e cada post
publicado (com `lastmod` = `date`). A geração parte da lista atual de URLs do site.

**Link interno:** um item **"Blog"** é adicionado ao menu (`Nav`) e ao rodapé
(`Footer`) do site — componentes React, apenas um `<a href="/blog/">`.

## Design das páginas

Ambas reaproveitam a linguagem visual do site (cores, espaçamento, tipografia)
via as mesmas classes Tailwind. Header e footer do blog são **HTML estático no
template** (versão enxuta do `Nav`/`Footer`: logo + link "Site" + CTA WhatsApp;
footer com dados do negócio). Essa duplicação é intencional e aceitável — muda
pouco e evita arrastar React/JS pras páginas de blog.

### Lista `/blog/`
- Cabeçalho: logo + link "Site" + CTA WhatsApp.
- Título "Blog da HB" + subtítulo.
- Grid de **cards** (imagem de capa opcional, título, data, descrição curta),
  ordenados por `date` desc.
- CTA de orçamento (WhatsApp) ao fim.
- Footer.

### Post `/blog/<slug>/`
- Mesmo cabeçalho.
- Link "‹ Voltar ao blog".
- Título (`h1`), data + tempo de leitura.
- Imagem de capa (se houver).
- Corpo do artigo (`.article`, estilo prose).
- CTA final (WhatsApp).
- Footer.

## Build e dependências

- Script de build vira: `tsc -b && vite build && node scripts/build-blog.mjs`
  (o gerador roda por último, quando `dist/` e o CSS hash já existem).
- Dependências **de build** (dev, não entram no bundle do site):
  - `gray-matter` — parse de frontmatter.
  - `marked` — Markdown → HTML.
- O conteúdo é nosso (confiável), então não há sanitização de HTML de terceiros.

## Configuração compartilhada

- A **URL base** (hoje `https://hb-landing-page-tau.vercel.app`) é centralizada
  numa constante única consumida por canonical, OG e sitemap do blog. Quando o
  domínio `hbcomercio.com.br` entrar no ar, troca-se em um lugar só.

## Escopo inicial

- Engine completa (lista + post + SEO + sitemap + link no site).
- **1 post de exemplo real.** Tema sugerido (alto valor de busca local):
  "Vale a pena trocar a tela do iPhone ou comprar outro?". Tema final a confirmar
  na implementação.

## Fora de escopo (YAGNI)

- Painel/CMS, comentários, busca, paginação, categorias com páginas próprias,
  RSS, e múltiplos autores. Podem ser adicionados depois se houver necessidade.
