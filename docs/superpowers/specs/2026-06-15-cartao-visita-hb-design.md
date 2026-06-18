# Cartão de Visita — HB Assistência Técnica e Acessórios

**Data:** 2026-06-15
**Objetivo:** Cartão físico distribuído pelo motorista (Henrique) durante corridas de
Uber, funcionando como ponte da corrida para a loja de assistência técnica. O cartão é
**institucional puro da HB** — não menciona Uber nem o motorista. O Uber é apenas o canal
de distribuição (plateia cativa dentro do carro, já com o celular na mão).

## Estratégia

- **Ação nº1:** levar a pessoa a falar com a loja no WhatsApp.
- **Insight tático:** o passageiro está com o celular na mão dentro do carro. Por isso o
  **QR Code é o elemento central do verso** — ele escaneia ali na hora.
- **Posicionamento:** assistência técnica de confiança em Campos dos Goytacazes/RJ.

## Especificações técnicas

- **Tamanho final:** 90 × 50 mm (padrão Brasil).
- **Sangria:** 3 mm em todos os lados → área total 96 × 56 mm.
- **Margem de segurança:** 3-4 mm internos (nada de texto/logo colado no corte).
- **Lados:** frente + verso (dois lados).
- **Saídas:**
  - PDF de impressão com **sangria + marcas de corte** (para a gráfica local).
  - Versão pronta para **Canva Print** (orçamento e impressão pelo próprio Canva).
  - PNG alta resolução (300 dpi) para preview/divulgação digital.
- **Resolução:** 300 dpi.
- **Cantos:** retos (padrão; mais barato e compatível com qualquer gráfica).

## Paleta (tokens da marca, do site)

| Token | Hex | Uso |
|---|---|---|
| Navy base | `#070b18` | fundo do verso |
| Navy profundo | `#0b1e4d` | o "H" da logo / sombras |
| Azul-cobalto | `#2563eb` | sotaque, faixa, detalhes |
| Verde WhatsApp | `#25d366` | telefone/CTA no verso |
| Texto claro | `#f4f7ff` | texto sobre navy |
| Branco | `#ffffff` | fundo da frente |
| Texto secundário | `#9daac6` | rodapé discreto do verso |

> Observação de impressão: converter para CMYK na gráfica. O verde WhatsApp e o cobalto
> podem destoar em CMYK — pedir prova de cor se a gráfica oferecer.

## Logo

- Usar `public/logo.svg` (ou a versão `image/logo fundo branco em SVG.svg` para fundo claro).
- Logo "HB" com carrinho de compras integrado ao "B", gradiente azul.

## FRENTE (fundo claro — "quem somos")

Layout:

```
┌────────────────────────────────────┐
│  [logo HB]                          │
│                                     │
│  Quebrou? A gente conserta.         │  ← gancho (headline)
│                                     │
│  HB Assistência Técnica            │
│  e Acessórios                       │
│                                     │
│  Celular · Computador & Mac ·       │  ← serviços
│  Tablet/iPad · Smartwatch ·         │
│  Videogame                          │
│                                ▌    │  ← faixa cobalto (sotaque)
└────────────────────────────────────┘
```

Conteúdo (texto exato):

- **Headline:** `Quebrou? A gente conserta.`
- **Nome:** `HB Assistência Técnica e Acessórios`
- **Serviços:** `Celular · Computador & Mac · Tablet/iPad · Smartwatch · Videogame`

## VERSO (fundo navy `#070b18` — "como agir")

Layout:

```
┌────────────────────────────────────┐
│   ┌────────┐                        │
│   │        │   WhatsApp             │
│   │  QR    │   (22) 99861-6139      │  ← QR + Zap em verde
│   │  CODE  │                        │
│   │        │   ★ 5,0 no Google      │
│   └────────┘                        │
│   "Aponte a câmera e fale com a gente"│
│ ──────────────────────────────────  │
│  Rua Raul Cardoso, 131 · Campos/RJ  │  ← rodapé discreto
│  Seg a Sáb, 9h às 18h               │
│  @hb_comercio.acessorios            │
│  hbcomercio.com.br                  │
└────────────────────────────────────┘
```

Conteúdo (dados reais, de `src/lib/site.ts`):

- **QR Code (destino):** `https://wa.me/5522998616139?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20or%C3%A7amento.`
  (WhatsApp direto, com mensagem pré-preenchida "Olá! Gostaria de fazer um orçamento.")
- **Legenda do QR:** `Aponte a câmera e fale com a gente`
- **WhatsApp (em verde):** `(22) 99861-6139`
- **Prova social:** `★ 5,0 no Google`
- **Endereço:** `Rua Raul Cardoso, 131 · Campos dos Goytacazes/RJ`
- **Horário:** `Seg a Sáb, 9h às 18h`
- **Instagram:** `@hb_comercio.acessorios`
- **Site:** `hbcomercio.com.br`

### Hierarquia do verso

1. QR Code (maior elemento, lado esquerdo/centro).
2. WhatsApp em verde (alto contraste sobre navy).
3. Nota 5,0 do Google (selo de confiança).
4. Bloco de rodapé (endereço, horário, redes) em `#9daac6`, menor, discreto.

## Produção

- Ferramenta: **Canva** (via integração MCP) — criar design de cartão de visita 90×50mm
  frente e verso, aplicar a marca, gerar o QR Code apontando para o link de WhatsApp acima,
  e exportar PDF de impressão + PNG.
- Conferir, ao gerar, qual o tamanho padrão de cartão do Canva BR (90×50mm) e habilitar
  sangria nas exportações.

## Voz / copy (regra firme do projeto)

- Sem em dash "—" solto; sem aspas curvas; sem palavras-bordão de IA (regra do humanizer
  aplicada em todo o conteúdo da HB).

## Fora de escopo (YAGNI)

- Nenhuma menção a Uber/motorista no cartão.
- Sem versão "cartão pessoal".
- Sem cantos arredondados, verniz localizado ou acabamentos especiais nesta versão
  (pode-se avaliar depois conforme orçamento da gráfica).
