// Gera as páginas estáticas do blog em dist/ a partir de content/blog/*.md.
// Roda DEPOIS de `vite build` (precisa do dist/ e do CSS hashado).
import {
  readFileSync,
  writeFileSync,
  readdirSync,
  mkdirSync,
  existsSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { marked } from "marked";
import { renderListPage, renderPostPage, SITE_URL } from "./blog-template.mjs";
import { renderServicePage } from "./servicos-template.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIR = join(ROOT, "content", "blog");
const SERVICOS_DIR = join(ROOT, "content", "servicos");
const DIST = join(ROOT, "dist");

// 1. Descobrir o CSS hashado que o Vite gerou (lendo o index.html).
const indexHtml = readFileSync(join(DIST, "index.html"), "utf8");
const cssMatch =
  indexHtml.match(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+\.css)"/) ||
  indexHtml.match(/<link[^>]+href="([^"]+\.css)"[^>]*rel="stylesheet"/);
if (!cssMatch) {
  throw new Error("Não encontrei o <link rel=stylesheet> em dist/index.html.");
}
const cssHref = cssMatch[1];

// 2. Ler e parsear os posts (ignorando drafts).
if (!existsSync(CONTENT_DIR)) {
  throw new Error(`Pasta de conteúdo não existe: ${CONTENT_DIR}`);
}
const posts = readdirSync(CONTENT_DIR)
  .filter((f) => f.endsWith(".md"))
  .map((file) => {
    const raw = readFileSync(join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const slug = file.replace(/\.md$/, "");
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.round(words / 200));
    const html = marked.parse(content);
    return { slug, data, html, readingTime };
  })
  .filter((p) => p.data.draft !== true)
  .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));

// 3. Escrever a página de cada post.
for (const post of posts) {
  const dir = join(DIST, "blog", post.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), renderPostPage(post, { cssHref }));
}

// 4. Escrever a listagem.
mkdirSync(join(DIST, "blog"), { recursive: true });
writeFileSync(join(DIST, "blog", "index.html"), renderListPage(posts, { cssHref }));

// 5. Páginas de serviço (programmatic SEO) — content/servicos/*.md → /conserto/<slug>/.
let servicos = [];
if (existsSync(SERVICOS_DIR)) {
  servicos = readdirSync(SERVICOS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = readFileSync(join(SERVICOS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.md$/, "");
      return { slug, data, html: marked.parse(content) };
    })
    .filter((s) => s.data.draft !== true);

  const allBySlug = Object.fromEntries(servicos.map((s) => [s.slug, s]));
  for (const service of servicos) {
    const dir = join(DIST, "conserto", service.slug);
    mkdirSync(dir, { recursive: true });
    writeFileSync(
      join(dir, "index.html"),
      renderServicePage(service, { cssHref, allBySlug }),
    );
  }
}

// 6. Regenerar o sitemap incluindo blog e páginas de serviço.
const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: `${SITE_URL}/`, lastmod: today, changefreq: "monthly", priority: "1.0" },
  ...servicos.map((s) => ({
    loc: `${SITE_URL}/conserto/${s.slug}/`,
    lastmod: today,
    changefreq: "monthly",
    priority: "0.8",
  })),
  { loc: `${SITE_URL}/blog/`, lastmod: today, changefreq: "weekly", priority: "0.7" },
  ...posts.map((p) => ({
    loc: `${SITE_URL}/blog/${p.slug}/`,
    lastmod: new Date(p.data.date).toISOString().slice(0, 10),
    changefreq: "monthly",
    priority: "0.6",
  })),
];
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n` +
        `    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
    )
    .join("\n") +
  `\n</urlset>\n`;
writeFileSync(join(DIST, "sitemap.xml"), sitemap);

console.log(
  `✓ Estático gerado: ${posts.length} post(s) + ${servicos.length} serviço(s) + listas + sitemap.`,
);
