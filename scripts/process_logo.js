/**
 * Processa o logo: remove fundo branco (alpha matting suave) + recorta nas bordas
 * + gera favicons em vários tamanhos (PNG) + apple-touch-icon + logo principal.
 *
 * Uso uma vez (one-shot). Não precisa rodar de novo a menos que troque o logo.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "image/logo.jpeg";
const OUT_DIR = "public/favicons";

async function whiteToAlpha(src) {
  const img = sharp(src).ensureAlpha();
  const meta = await img.metadata();
  const { width, height } = meta;
  const raw = await img.raw().toBuffer();
  const out = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const o = i * 4;
    const r = raw[o], g = raw[o + 1], b = raw[o + 2];
    out[o] = r;
    out[o + 1] = g;
    out[o + 2] = b;
    // Branco puro -> alpha 0. Tom intermediário -> rampa suave. Cor -> opaco.
    const bright = (r + g + b) / 3;
    if (bright >= 250) out[o + 3] = 0;
    else if (bright >= 210) out[o + 3] = Math.round((250 - bright) * (255 / 40));
    else out[o + 3] = 255;
  }
  return sharp(out, { raw: { width, height, channels: 4 } });
}

async function findBbox(transparentImg) {
  const { width, height } = await transparentImg.metadata();
  const raw = await transparentImg.raw().toBuffer();
  let minX = width, minY = height, maxX = 0, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const a = raw[(y * width + x) * 4 + 3];
      if (a > 16) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

await mkdir(OUT_DIR, { recursive: true });

// 1) Logo transparente recortado nas bordas reais do conteúdo
const transparent = await whiteToAlpha(SRC);
const bbox = await findBbox(transparent);
console.log("bbox real:", bbox);

const tight = sharp(await transparent.raw().toBuffer(), {
  raw: { width: (await transparent.metadata()).width, height: (await transparent.metadata()).height, channels: 4 },
}).extract(bbox);

// Salva logo "master" (max 512 no lado maior)
await tight
  .clone()
  .resize({ width: 512, height: 512, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile("public/logo.png");
console.log("public/logo.png OK");

// 2) Favicons em vários tamanhos
const sizes = [16, 32, 48, 96, 192, 512];
for (const s of sizes) {
  await tight
    .clone()
    .resize({ width: s, height: s, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(`${OUT_DIR}/favicon-${s}x${s}.png`);
  console.log(`${OUT_DIR}/favicon-${s}x${s}.png OK`);
}

// 3) Apple touch icon — fundo navy pra aparecer bonito como home screen
await tight
  .clone()
  .resize({ width: 160, height: 160, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .extend({ top: 10, bottom: 10, left: 10, right: 10, background: { r: 7, g: 11, b: 24, alpha: 1 } })
  .png()
  .toFile(`${OUT_DIR}/apple-touch-icon.png`);
console.log(`${OUT_DIR}/apple-touch-icon.png OK`);

console.log("done");
