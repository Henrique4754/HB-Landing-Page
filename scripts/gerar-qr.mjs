// Gera o QR code do balcão apontando pra https://www.hbcomercio.com.br/avaliar/
// Rodar sob demanda (não faz parte do build): node scripts/gerar-qr.mjs
//
// Nível de correção de erro "H" (30%): o QR continua legível mesmo com o
// papel sujo, amassado ou com o logo colado por cima. Vale a pena num
// adesivo de balcão que vai levar poeira e dedo.
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "docs", "marketing", "qr");
const URL_DESTINO = "https://www.hbcomercio.com.br/avaliar/";

mkdirSync(OUT_DIR, { recursive: true });

const opcoes = {
  errorCorrectionLevel: "H",
  margin: 2,
  color: { dark: "#000000", light: "#FFFFFF" },
};

// SVG: vetorial, escala pra qualquer tamanho de impressão sem serrilhar.
const svg = await QRCode.toString(URL_DESTINO, { ...opcoes, type: "svg", width: 1024 });
writeFileSync(join(OUT_DIR, "qr-avaliar.svg"), svg);

// PNG grande: pra quem for colar no Canva ou mandar pra gráfica.
const png = await QRCode.toBuffer(URL_DESTINO, { ...opcoes, width: 2048 });
writeFileSync(join(OUT_DIR, "qr-avaliar.png"), png);

console.log(`✓ QR gerado para ${URL_DESTINO}`);
console.log(`  ${join(OUT_DIR, "qr-avaliar.svg")}`);
console.log(`  ${join(OUT_DIR, "qr-avaliar.png")}`);
