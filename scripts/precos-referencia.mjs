// Ferramenta de DEV (não entra no build/deploy — fica fora pelo .vercelignore).
//
// Puxa o catálogo do fornecedor, calcula o custo das peças e aplica a fórmula
// de precificação da HB para sugerir as faixas "a partir de" a publicar no site.
// Rode quando o preço das peças mudar (ex.: 1x/mês):
//
//   node scripts/precos-referencia.mjs
//
// Depois é só atualizar os números em content/servicos/celular.md (precos) e
// em public/llms.txt. A fórmula está documentada em
// docs/superpowers/specs/2026-06-03-precos-faixas-celular-design.md

const API = "https://rafaelcell.0444g.xyz/api/cardapio";

// --- Parâmetros da fórmula (ajuste aqui se a regra mudar) ---
const MAO_DE_OBRA = { facil: 80, medio: 100 }; // difícil é terceirizado (fora)
const PISO = 100; // nenhum serviço sai abaixo disso
const TETO_FAIXA1 = 500; // peça acima disso entra na Faixa 2
const RESERVA_FAIXA2 = 0.3; // 30% de reserva de garantia na peça cara

/** Preço final a partir do custo da peça. */
function precoFinal(custo, mo) {
  const bruto =
    custo <= TETO_FAIXA1 ? 2 * custo + mo : custo + RESERVA_FAIXA2 * custo + mo;
  return Math.max(PISO, Math.round(bruto / 10) * 10); // arredonda pra dezena
}

/** Percentil simples (0..1) de uma lista de números. */
function percentil(nums, p) {
  if (!nums.length) return 0;
  const s = [...nums].sort((a, b) => a - b);
  return s[Math.floor(s.length * p)];
}

// Cada serviço publicado: como achar a peça "de entrada" (mais barata comum) e a mão de obra.
const SERVICOS = [
  {
    nome: "Troca de tela",
    mo: MAO_DE_OBRA.medio,
    // telas Android (Moto/Xiaomi/Samsung) = piso realista de preço
    filtro: (n) =>
      /^FRONTAL/.test(n) &&
      !/CAMERA/.test(n) &&
      /MOTO|XIAOMI|REDMI|POCO|SAMSUNG|GALAXY|\bA0|\bA1|\bA2|\bA3/.test(n),
  },
  {
    nome: "Troca de bateria",
    mo: MAO_DE_OBRA.facil,
    filtro: (n) => /^BATERIA/.test(n) && /SAMSUNG|GALAXY|MOTO|XIAOMI|REDMI|POCO/.test(n),
  },
  {
    nome: "Conector de carga",
    mo: MAO_DE_OBRA.facil,
    filtro: (n) => /CONECTOR|DOCK|FLEX.*CARGA/.test(n) && /IPHONE/.test(n),
  },
];

async function main() {
  const res = await fetch(API, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`API respondeu ${res.status}`);
  const data = await res.json();

  const itens = [];
  for (const cat of data.categorias || []) {
    for (const p of cat.produtos || []) {
      const preco = Number(p.preco);
      if (preco > 0) itens.push({ nome: String(p.nome || "").toUpperCase(), custo: preco });
    }
  }
  console.log(`Catálogo: ${itens.length} itens com preço.\n`);

  console.log("Serviço            custo p25   a partir de");
  console.log("-----------------  ---------   -----------");
  for (const s of SERVICOS) {
    const custos = itens.filter((i) => s.filtro(i.nome)).map((i) => i.custo);
    if (!custos.length) {
      console.log(`${s.nome.padEnd(17)}  (sem itens encontrados — revisar filtro)`);
      continue;
    }
    const p25 = percentil(custos, 0.25);
    const faixa = precoFinal(p25, s.mo);
    console.log(
      `${s.nome.padEnd(17)}  R$ ${String(p25).padEnd(6)}  R$ ${faixa}  (n=${custos.length}, mão de obra R$${s.mo})`,
    );
  }
  console.log(
    "\nDica: 'a partir de' usa o p25 (peça barata comum). Confira e atualize\n" +
      "content/servicos/celular.md e public/llms.txt se mudou.",
  );
}

main().catch((e) => {
  console.error("Falhou:", e.message);
  process.exit(1);
});
