# Alinhar site aos aparelhos atendidos — Design

**Data:** 2026-06-01
**Status:** Aprovado para implementação

## Contexto

O site da HB Comércio hoje apresenta os serviços em **2 cards** (Manutenção de
Celulares, Manutenção de Computadores) + 1 card pega-tudo ("Não é nada disso?"),
em [src/components/sections/Services.tsx](../../../src/components/sections/Services.tsx).
O schema `OfferCatalog` (em `index.html`) lista 6 serviços, e o `<title>`/meta
citam só "celular e computador". Isso subrepresenta o que a HB realmente conserta.

## Aparelhos atendidos (confirmado com o cliente)

- **Celular:** iPhone (especialidade) + Android (todas as marcas).
- **Computador:** PC e notebook Windows + **Mac/MacBook**.
- **Tablet / iPad.**
- **Smartwatch / Apple Watch.**
- **Videogame / console:** PlayStation, Xbox, Nintendo.
- **Não atende:** TV, fones, caixas de som, impressoras.

Todos com **peso parecido**. Apple é um ponto forte (combina com o hero, que é um
iPhone) e deve aparecer naturalmente na copy (iPhone, Mac, iPad, Apple Watch).

## Decisão

Reestruturar a seção Serviços para um **grid de 6 cards (3×2)**, um por categoria,
mantendo o padrão de card atual (ícone + título + problemas comuns + CTA WhatsApp).
Refletir o mesmo leque no SEO (schema + título/meta) e no FAQ.

Alternativas descartadas: (B) 2 cards grandes + faixa secundária — rebaixa os novos
aparelhos, contradiz "peso parecido"; (C) organizar por problema em vez de aparelho
— reformulação grande e quebra a UX de auto-identificação.

## Mudanças

### 1. `src/lib/site.ts` — mensagens de WhatsApp
Adicionar ao objeto `WA` três mensagens pré-preenchidas:
- `tablet`: "Olá! Gostaria de fazer um orçamento para meu tablet/iPad!"
- `smartwatch`: "Olá! Gostaria de fazer um orçamento para meu smartwatch!"
- `videogame`: "Olá! Gostaria de fazer um orçamento para meu videogame!"

### 2. `src/components/sections/Services.tsx` — 6 cards
Array `SERVICES` passa a ter 6 itens, nesta ordem:

1. **Manutenção de Celulares** — ícone `Smartphone`. Body: iPhone e Android (todas
   as marcas); tela, bateria, não carrega, molhou, conector de carga. CTA "Orçar
   meu celular" → `WA.celular`, location `services_celular`.
2. **Manutenção de Computadores** — ícone `Monitor`. Body: PC, notebook e
   Mac/MacBook; formatação, lentidão, não liga, upgrade de SSD/memória, limpeza.
   CTA "Orçar meu PC" → `WA.pc`, location `services_pc`.
3. **Tablets e iPad** — ícone `Tablet`. Body: tela, bateria, conector de carga,
   não liga. CTA "Orçar meu tablet" → `WA.tablet`, location `services_tablet`.
4. **Smartwatch e Apple Watch** — ícone `Watch`. Body: troca de tela/vidro e
   bateria. CTA "Orçar meu relógio" → `WA.smartwatch`, location `services_smartwatch`.
5. **Videogames e Consoles** — ícone `Gamepad2`. Body: PlayStation, Xbox e
   Nintendo; não liga, superaquece, leitor, HDMI, controle. CTA "Orçar meu console"
   → `WA.videogame`, location `services_videogame`.
6. **Não é nada disso?** — ícone `MessageCircle`. Body: pega-tudo. CTA "Falar com
   atendente" → `WA.atendente`, location `services_atendente`. (Mantido.)

Grid: continua responsivo; 3 colunas no desktop (vira 2 linhas com 6 cards). Ícones
de `lucide-react`: `Smartphone`, `Monitor`, `Tablet`, `Watch`, `Gamepad2`,
`MessageCircle`.

### 3. `index.html` — schema `OfferCatalog`
Acrescentar ao `itemListElement` (mantendo os existentes):
- "Manutenção de Mac e MacBook"
- "Manutenção de tablets e iPad"
- "Manutenção de smartwatch e Apple Watch"
- "Conserto de videogames (PlayStation, Xbox e Nintendo)"

### 4. `index.html` — título, descrição e OG
- `<title>`: "HB Comércio | Conserto de Celular, Computador e Videogame em Campos
  dos Goytacazes".
- `meta[name=description]` e OG description: ampliar para citar celular, computador,
  videogame e tablet (mantendo "orçamento grátis, garantia de 90 dias, mesmo dia").
- `description` do `LocalBusiness` (JSON-LD): mesma ampliação.

### 5. FAQ — 1 pergunta nova
- Em [src/components/sections/FAQ.tsx](../../../src/components/sections/FAQ.tsx):
  adicionar "Vocês consertam videogame, tablet e Mac também?" com resposta
  afirmativa (lista os aparelhos atendidos).
- Espelhar a mesma Q/A na entrada `FAQPage` do JSON-LD em `index.html`.

### 6. Copy — pontos que citam só "celular e computador"
- `src/components/sections/Footer.tsx`, coluna "Atendimento": ampliar a linha
  "Celulares e computadores · pessoas e empresas" para incluir o leque
  (celulares, computadores, tablets, smartwatches e videogames).
- Varrer demais seções (Hero, Problem, WhyHB, HowItWorks, About, FinalCTA) por
  menções a "celular e computador" e ajustar pontualmente onde a restrição
  empobreça; **sem** reescrever seções inteiras (YAGNI).

## Fora de escopo

- Não criar páginas dedicadas por aparelho (futuro possível, casaria com o blog).
- Não mexer no hero 3D (segue iPhone, reforça o ângulo Apple).
- Não adicionar categorias não atendidas (TV, fones, impressoras).

## Critérios de sucesso

- Seção Serviços mostra as 5 categorias reais + pega-tudo, com CTAs de WhatsApp
  contextualizados.
- Schema e FAQ refletem o leque (melhor cobertura de busca local e citação por LLM).
- `<title>`/meta ampliados sem perder os diferenciais.
- Build e `tsc` passam; ícones existem em `lucide-react`.
