# Design: faixas de preço "a partir de" para conserto de celular

Data: 2026-06-03
Status: aprovado (design validado com o cliente)

## Objetivo

Publicar faixas de preço "a partir de" para os consertos de celular da HB no site
(schema, conteúdo visível e `llms.txt`), com base numa fórmula de precificação que
respeita o modelo de negócio real: baixo volume, sem estoque, peça comprada sob
demanda e adiantada do próprio bolso, com 3 meses de garantia obrigatória.

Posicionamento escolhido: **preço justo + qualidade** (meio-termo), competindo por
confiança, garantia e atendimento, não por ser o mais barato.

## Fonte dos custos

Catálogo do principal fornecedor (Rafael Cell), lido via API pública do próprio
catálogo (`/api/cardapio`, JSON renderizado por JS). Amostra de 3.386 itens com
preço, salva em `docs/superpowers/specs/rafaelcell-catalogo.csv`.

Custos de peça (o que a HB paga), em R$:

| Peça | mín | p25 | mediana | média | máx |
|---|---|---|---|---|---|
| Tela iPhone (comuns X–13) | 85 | 120 | 190 | 228 | 1530 |
| Tela Samsung/Galaxy | 45 | 65 | 95 | 152 | 1400 |
| Tela Moto/Xiaomi | 45 | 65 | 85 | 100 | 360 |
| Bateria iPhone | 30 | 80 | 115 | 115 | 210 |
| Bateria Android | 15 | 55 | 65 | 59 | 115 |
| Conector de carga iPhone | 30 | 40 | 60 | 70 | 170 |

97% das telas custam ≤ R$500 (939 itens contra 28), o que valida o corte de faixa
em R$500.

## Fórmula de precificação (regra do negócio)

Seja `C` = custo da peça no fornecedor.

- **Faixa 1 — `C` ≤ R$500** (baterias, telas paralelas, conector, flex; a maioria):
  `Preço = (2 × C) + mão de obra`
  O `2×` cobre a peça + a reserva de garantia de 3 meses (autoseguro: se a peça
  falhar, a reposição já está paga; se não falhar, é lucro). É a prática do mercado
  local e o método que o cliente já usa.

- **Faixa 2 — `C` > R$500** (telas originais/premium):
  `Preço = C + (0,30 × C) + mão de obra`
  Dobrar peça cara afasta o cliente; 30% mantém a reserva de garantia num patamar
  que o cliente aceita.

Mão de obra por dificuldade:
- Fácil (bateria, conector): R$80
- Médio (tela colada/aro, microfone): R$100
- Difícil (placa, micro-solda, premium): **terceirizado**. O valor varia conforme o
  custo do parceiro, então fica **fora desta fórmula e do preço publicado** — orçado
  caso a caso.

Regras de borda:
- **Piso de serviço:** nenhum orçamento abaixo de R$100 total.
- **Busca e leva:** taxa à parte por distância (já existe, fora desta fórmula).
- **Arredondar** o preço final para número cheio.

Exemplos de validação:
- Bateria iPhone 11 (C=110, fácil R$80) → 2×110 + 80 = **R$300**
- Tela iPhone 13 Pro (C=310, médio R$100) → 2×310 + 100 = **R$720**
- Tela iPhone 17 Pro Max paralela (C=480, médio R$100) → 2×480 + 100 = **R$1.060**

## Faixas "a partir de" a publicar (somente CELULAR)

Base: custo barato-comum (≈ p25) na Faixa 1, com a fórmula acima, arredondado.

| Serviço | Conta (caso de entrada) | A partir de |
|---|---|---|
| Troca de tela | 2×65 + 100 (médio) | **R$230** |
| Troca de bateria | 2×55 + 80 (fácil) | **R$190** |
| Conector de carga | 2×40 + 80 (fácil) | **R$160** |

Disclaimer obrigatório junto das faixas: *"Valores de referência a partir de; o
preço final é fechado após avaliação grátis do aparelho."*

## Escopo de publicação

- **Celular:** publica as faixas acima.
- **Computador, videogame, Mac, tablet, smartwatch:** **sem preço** — mantêm
  "orçamento grátis sob avaliação". Esse fornecedor é só de peça de celular; não há
  custo real para cravar faixa, e não se inventa preço.
- `priceRange` geral do negócio no LocalBusiness: manter `"$$"` (meio-termo).

## Implementação (o que muda no código)

1. **`scripts/servicos-template.mjs`** — suportar um campo opcional `precos` no
   frontmatter. Quando presente:
   - Renderiza um bloco visível "Preços de referência" (tabela serviço → "a partir
     de R$X") com o disclaimer.
   - Adiciona ao schema `Service` um `offers` do tipo `AggregateOffer` com
     `priceCurrency: "BRL"` e `lowPrice` = menor valor da lista.
   - Sem `precos`, nada muda (as outras páginas seguem iguais).

2. **`content/servicos/celular.md`** — adicionar no frontmatter:
   ```
   precos:
     - servico: "Troca de tela"
       apartirde: 230
     - servico: "Troca de bateria"
       apartirde: 190
     - servico: "Conector de carga"
       apartirde: 160
   precoNota: "Valores de referência a partir de; o preço final é fechado após avaliação grátis do aparelho."
   ```

3. **`public/llms.txt`** — na entrada de conserto de celular, acrescentar:
   "Troca de tela a partir de R$230, troca de bateria a partir de R$190, conector de
   carga a partir de R$160 (valores de referência, fechados após avaliação grátis)."

4. **`scripts/precos-referencia.mjs`** *(novo, ferramenta de dev)* — busca a API do
   fornecedor, calcula os percentis de custo por categoria, aplica a fórmula e
   imprime as faixas "a partir de" sugeridas. O cliente roda `node
   scripts/precos-referencia.mjs` quando quiser recalibrar (ex.: 1×/mês). Fica fora
   do build da Vercel (já coberto pelo `/scripts/*` do `.vercelignore`; não precisa
   de whitelist porque não roda no build).

## Fora de escopo

- Preço para serviços que não sejam de celular.
- Tabela de preço por modelo específico (só faixas "a partir de").
- Automação de atualização (a recalibração é manual, rodando o script).

## Riscos / observações

- Preço de peça flutua; as faixas precisam de recalibração periódica (script ajuda).
- Publicar preço expõe valores a concorrentes e pode atrair quem busca só preço; o
  posicionamento "justo + qualidade" e o disclaimer "a partir de" mitigam isso.
- "A partir de" é piso: orçamentos específicos (ex.: iPhone) saem mais altos, o que
  é esperado e honesto.
