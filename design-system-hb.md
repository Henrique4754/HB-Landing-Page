# Design System — HB Comércio & Assistência (Documentos)

Sistema visual para papelaria da HB: orçamentos, laudos técnicos, ordens de serviço e recibos.
Base extraída do modelo de orçamento existente.

---

## 1. Identidade

**Marca:** HB Comércio & Assistência
**Endereço:** Rua Raul Cardoso, Nº131 — Campos dos Goytacazes, Rio de Janeiro, 28027
**Telefone:** (22) 99861-6139

**Personalidade visual:** técnico, direto, confiável. Documento de oficina/assistência,
não de escritório de advocacia. Sem ornamento, sem gradiente, sem sombra.
Hierarquia vem de **peso** e **cor**, nunca de moldura.

---

## 2. Cores

| Token | Hex | Uso |
|---|---|---|
| `--navy-900` | `#1A2A6C` | Título principal do documento, totais, cabeçalho de tabela |
| `--navy-600` | `#4A6CB3` | Nome da empresa, rótulos de rodapé (Subtotal, Ajustes) |
| `--navy-bar` | `#2B3A8F` | Faixa sólida do topo da folha |
| `--magenta-600` | `#C2185B` | Data de emissão / status |
| `--magenta-500` | `#E91E63` | Valor final em destaque |
| `--red-400` | `#E05252` | Aviso legal miúdo (validade, ressalvas) |
| `--slate-500` | `#5F7A7A` | Endereço, contato, texto de apoio |
| `--amber-700` | `#B87333` | Valores numéricos secundários (qtd, preço unitário) |
| `--ink-900` | `#1C1C1C` | Corpo de texto, descrições |
| `--row-alt` | `#F1F1F1` | Zebra de linha e blocos de campo vazio |
| `--rule` | `#D9D9D9` | Filete de separação de tabela |
| `--paper` | `#FFFFFF` | Fundo da folha |

Regra: **magenta só aparece 2× por página** (data e valor final, ou no laudo:
data e veredicto). Se aparecer uma terceira vez, perdeu a função.

---

## 3. Tipografia

Família única, sem serifa, humanista (Inter, Lato ou Source Sans Pro).
Nunca misturar duas famílias.

| Papel | Tamanho | Peso | Cor | Caixa |
|---|---|---|---|---|
| Título do documento | 32 pt | 800 | `--navy-900` | Normal |
| Nome da empresa | 17 pt | 400 | `--navy-600` | Normal |
| Linha de data/status | 12 pt | 700 | `--magenta-600` | Normal |
| Cabeçalho de tabela | 10 pt | 700 | `--navy-900` | Normal |
| Corpo / descrição | 10 pt | 400 | `--ink-900` | Normal |
| Rótulo de campo | 9 pt | 700 | `--navy-600` | Normal |
| Contato / endereço | 9 pt | 400 | `--slate-500` | Normal |
| Nota legal | 7,5 pt | 400 | `--red-400` | Normal |
| Valor final | 22 pt | 800 | `--magenta-500` | Normal |

Entrelinha: 1,35 no corpo, 1,1 em títulos. Sem itálico. Sem CAIXA ALTA em bloco.

---

## 4. Grade e espaçamento

- Folha A4 retrato, 210 × 297 mm.
- Margens: 18 mm laterais, 14 mm topo, 16 mm base.
- Faixa navy sólida no topo sangrando de borda a borda, altura 6 mm.
- Coluna única. Escala de espaçamento: **4 / 8 / 12 / 20 / 32 px**.
- Bloco de cabeçalho (marca) → título: 32 px.
- Título → primeiro conteúdo: 20 px.
- Entre seções: 20 px. Dentro de seção: 8 px.

---

## 5. Componentes

### 5.1 Cabeçalho da folha
Faixa navy no topo → nome da empresa em `--navy-600` → 3 linhas de contato em
`--slate-500`, alinhadas à esquerda. Sem logo centralizado, sem caixa.

### 5.2 Título + status
Título grande navy, e logo abaixo a linha magenta com data
(`Emitido em DD/MM/AAAA`). Nota legal em vermelho miúdo abaixo, quando houver.

### 5.3 Tabela de itens
- Cabeçalho: texto navy 700, filete `--rule` de 1 px abaixo, **sem fundo colorido**.
- Zebra: linhas pares com `--row-alt`.
- Primeira coluna alinhada à esquerda; numéricas à direita.
- Números secundários em `--amber-700`; total da linha em `--navy-900` 700.
- Sem bordas verticais. Nunca.

### 5.4 Bloco de campo aberto
Retângulo `--row-alt` sem borda, altura mínima 28 px, cantos retos.
Serve para preenchimento manual ou texto livre.

### 5.5 Rodapé de valores
Duas colunas: texto legal à esquerda em `--slate-500` 9 pt;
à direita, rótulos `--navy-600` + valores `--navy-900`, e o total final
em `--magenta-500` 22 pt como última linha.

### 5.6 Assinatura (novo, para laudo)
Filete `--rule` de 1 px, 60 mm de largura, com rótulo 8 pt `--slate-500` abaixo.
Dois lados: técnico responsável e cliente.

---

## 6. Adaptação para LAUDO TÉCNICO

Mantém toda a estrutura acima, trocando o miolo:

1. **Cabeçalho** — idêntico ao orçamento.
2. **Título** — `Laudo Técnico`, mais `Laudo Nº 0000` em `--slate-500` ao lado.
3. **Linha magenta** — `Emitido em DD/MM/AAAA`.
4. **Dados do cliente** — grade de 2 colunas, rótulo + valor: Nome, Telefone,
   Documento, Data de entrada.
5. **Identificação do equipamento** — grade de 2 colunas: Tipo, Marca/Modelo,
   Nº de série, Acessórios recebidos.
6. **Defeito relatado pelo cliente** — bloco de campo aberto, texto livre.
7. **Análise técnica** — bloco de campo aberto, maior (3–5 linhas).
8. **Testes realizados** — tabela no padrão 5.3, colunas:
   `Teste | Resultado | Observação`.
9. **Peças/componentes avaliados** — tabela no padrão 5.3, colunas:
   `Componente | Estado | Ação recomendada`.
10. **Conclusão / Parecer** — bloco destacado. Rótulo navy, veredicto em
    `--magenta-500` 16 pt 800 (ex.: `REPARÁVEL` / `SEM REPARO VIÁVEL`).
11. **Recomendações e prazo de garantia** — texto legal 9 pt `--slate-500`.
12. **Assinaturas** — componente 5.6.

---

## 7. Regras invioláveis

1. Uma família tipográfica só.
2. Sem bordas verticais em tabela; separação é por filete horizontal e zebra.
3. Cantos sempre retos (raio 0). Sem sombra em nenhum elemento.
4. Magenta é reservado a data e ao dado de maior peso da página.
5. Todo bloco preenchível tem fundo `--row-alt`, nunca borda tracejada.
6. Alinhamento à esquerda em tudo, exceto colunas numéricas e rodapé de valores.
7. Deve imprimir legível em preto e branco: a hierarquia sobrevive sem cor.
