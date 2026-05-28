# PRD — Landing Page HB Comércio & Acessórios

> Documento de produto **pronto para construção**. Denso o suficiente para que outra conversa
> implemente a LP inteira em React sem precisar perguntar nada ao cliente.
> Idioma do site: **pt-BR**. Mercado: **Campos dos Goytacazes – RJ** (DDD 22).

---

## Contexto (por que esta LP existe)

Henrique Braga de Carvalho é dono da **HB Comércio & Acessórios**, assistência técnica de
celulares e computadores em Campos dos Goytacazes/RJ. Já existe uma página antiga, feita à mão em
HTML/CSS puro (`index.html` + `semantico.css`), com hero do iPhone "explodido", paleta azul e
fonte Poppins. Ela funciona, mas parece amadora e genérica.

**Objetivo da reconstrução:** uma LP profissional, com **muita personalidade** (sem cara de
template/IA), reescrita em **React**, que posicione a HB como **especialista premium** e converta
visitantes em conversas no WhatsApp. A estratégia central nasce da descoberta: **toda a objeção do
público é MEDO de deixar o aparelho** (preço, "vão resolver mesmo?", prazo, segurança dos dados,
confiança). A página inteira é desenhada para desarmar esse medo, seção por seção, combinando
**confiança** (base emocional) com **velocidade** (prova de força — o diferencial mais concreto).

Resultado esperado: mais orçamentos iniciados via WhatsApp, com ligação e formulário como
caminhos secundários para quem não quer falar na hora.

---

## 1. Visão geral do projeto

| Item | Definição |
|---|---|
| **Negócio** | HB Comércio & Acessórios — assistência técnica de celulares e computadores |
| **Dono** | Henrique Braga de Carvalho |
| **Região** | Campos dos Goytacazes – RJ e região (busca e leva na região) |
| **Posicionamento** | 💎 Premium / especialista — "o melhor da região, sem gambiarra" |
| **Conceito** | Híbrido **Confiança + Velocidade** ("em boas mãos" + "volta rápido") |
| **Público** | Pessoas físicas (todas as idades) **e** empresas/comércios com PCs e celulares |
| **Dor nº1** | "Já levei numa assistência e não resolveram" → medo de deixar o aparelho |
| **Objeções** | preço/incerteza · "vão resolver mesmo?" · prazo (ficar sem o aparelho) · dados/fotos · é confiável? |
| **Oferta** | Garantia 90 dias · celular no mesmo dia / PC em 48h · busca-e-leva · orçamento grátis (paga só se aprovar) · preço justo/transparente |
| **CTA nº1** | 💬 **WhatsApp** (`5522998616139`) |
| **CTAs secundários** | 📞 Ligação direta (`tel:+5522998616139`) · 📋 Formulário de contato |
| **Provas disponíveis** | Instagram + reels de serviços · Google Meu Negócio (usar só a nota/reviews) · fotos de bancada (a produzir) |

**Stack-alvo:** React (recomendado **Vite + React**), mobile-first, deploy estático (Vercel/Netlify).
Sem backend obrigatório — o formulário pode usar um serviço serverless (Formspree/EmailJS) ou
enviar via `wa.me` pré-preenchido. Migrar conteúdo do `index.html` atual; aposentar o CSS antigo.

### Métrica de sucesso
Cliques no CTA de WhatsApp / envios de formulário / cliques em "Ligar". (Instrumentar com eventos
de analytics nos botões — ver Checklist.)

---

## 2. Sistema visual

**Estilo geral:** *Tech premium escuro — "engenharia de precisão".* Tela grafite-navy à meia-luz,
grid sutil de blueprint, hairlines finas como num esquemático, números/labels em monoespaçada
("spec sheet"). Nada de gradiente arco-íris, blob roxo, ilustração "corporate memphis" ou stock
genérico — é isso que evita a cara de IA. Personalidade = precisão de oficina de elite + calor de
quem cuida do seu aparelho.

### Paleta (tokens semânticos)

```
--bg-base:        #070B18   /* fundo, grafite-navy quase preto */
--surface:        #0F1830   /* cards / superfícies */
--surface-2:      #16224A   /* hover / realce */
--brand:          #2563EB   /* azul-cobalto (o "B" da logo) — primária */
--brand-deep:     #0B1E4D   /* navy profundo (o "H" da logo) */
--text:           #F4F7FF   /* texto claro sobre dark */
--text-muted:     #9DAAC6   /* texto secundário */
--hairline:       rgba(255,255,255,.08)   /* bordas finas */
--hairline-brand: #1E2C52
--cta:            #25D366   /* VERDE WHATSAPP — ação primária */
--cta-hover:      #1FB855
--secondary:      #2563EB   /* ações secundárias (ligar/form) = azul-marca */
```

Regras: contraste AA garantido (`--text` sobre `--bg-base`/`--surface` passa folgado em 4.5:1).
CTA primário **sempre verde WhatsApp** (diz "isto abre o WhatsApp", contrasta sobre navy, é
autêntico). Ações secundárias em azul-marca. Não usar verde para nada que não seja ação de WhatsApp.

### Tipografia (Google Fonts, `font-display: swap`)

| Nível | Fonte | Pesos | Uso |
|---|---|---|---|
| **Display** | **Space Grotesk** | 600/700 | headlines, títulos de seção (cara técnica, troca a Poppins genérica) |
| **Body / UI** | **Inter** | 400/500 | corpo de texto, botões, FAQ |
| **Label / spec / números** | **JetBrains Mono** | 500 | labels ("GARANTIA · 90 DIAS"), prazos, números tabulares |

Escala de tipo: 12 · 14 · 16 · 20 · 24 · 32 · 48 · 64 (clamp/responsivo). Body base 16px (mínimo no
mobile p/ evitar zoom do iOS). Line-height 1.5–1.7 no corpo.

### Efeitos
Glow sutil só no CTA e no hero · bordas 1px com tint de marca (em vez de sombras pretas pesadas —
dark mode pede luz, não sombra) · raio 12–16px em cards, pill nos botões · blur de vidro na nav
fixa · textura blueprint faível no fundo de **uma** seção (diferenciais ou como funciona). Tudo
respeita `prefers-reduced-motion`.

### Tom & personalidade
**Preciso · Confiável · Ágil.** Voz: direta, sem jargão, com leve calor de bairro premium. Trata o
leitor por "você", fala "a gente". Zero "transforme sua experiência", zero "soluções inovadoras".

---

## 3. Arquitetura de seções

Ordem de conversão adaptada a **serviço local** (sem planos/preços nem logos de empresas; provas =
Google + rosto real). Fluxo: atenção → empatia → identificação → desarme de medo → confiança → ação.

| # | Seção | Objetivo | Conteúdo-chave | CTA |
|---|---|---|---|---|
| 0 | **Nav fixa** (glass) | acesso constante | logo HB · âncoras (Serviços, Por que a HB, Como funciona, Contato) · botão WhatsApp | 💬 WhatsApp |
| 1 | **Hero** | valor em 5s + animação assinatura | headline + subheadline + iPhone explodido→montado no scroll | 💬 WhatsApp + 📞 Ligar |
| 2 | **Barra de confiança** | matar desconfiança no 1º scroll | ⭐ Google · 🛡️ Garantia 90d · ⚡ Mesmo dia/48h · 💰 Orçamento grátis | — |
| 3 | **Problema / empatia** | gerar "isso sou eu" | nomeia a dor (já foi mal atendido) e os medos | — |
| 4 | **Serviços** | deixar o visitante se identificar | 3 cards: Celulares · Computadores · Falar com atendente | 💬 por card (pré-preenchido) |
| 5 | **Por que a HB** (diferenciais) | **desarmar cada medo** | 6 specs em mono: Garantia · Prazo · Busca-e-leva · Orçamento grátis · Dados seguros · Preço justo | 💬 WhatsApp |
| 6 | **Como funciona** | tirar a ansiedade do processo | 4 passos: chama → orçamento → conserta c/ garantia → devolve rápido | 💬 WhatsApp |
| 7 | **Prova social** | crença → confiança | grade de reels do Instagram · reviews Google · antes/depois bancada | link Instagram |
| 8 | **Sobre** | humanizar ("gente real") | texto + vídeo da bancada (`video/video manutenção.mp4`) | 💬 WhatsApp |
| 9 | **Formulário** | capturar quem não quer falar agora | 3 campos: nome · telefone · aparelho/problema | 📋 Enviar (azul) |
| 10 | **FAQ** | derrubar últimas objeções | 6 perguntas (preço, prazo, busca, dados, garantia, empresas) | — |
| 11 | **CTA final** | fechar quem rolou até o fim | headline de fechamento + reforço risco-zero | 💬 WhatsApp + 📞 Ligar |
| 12 | **Footer** | contato e localização | WhatsApp · telefone · Instagram · Maps · horário · área atendida · © | links |
| — | **Barra fixa mobile** | ação sempre à mão | WhatsApp + Ligar fixos no rodapé da tela | 💬 / 📞 |

**Posicionamento dos CTAs:** primário (verde WhatsApp) no hero, nav, cada card de serviço, após
diferenciais, após como funciona, sobre, e CTA final + barra fixa mobile. Secundário (azul):
"Ligar agora" (`tel:`) e "Pedir orçamento" (form). **Um CTA primário dominante por dobra de tela.**

**Mapa de objeções:** nomeadas na seção 3 → desarmadas nas seções 5 e 6 → última rodada no FAQ (10).
**Urgência:** suave e honesta ("orçamento grátis e sem compromisso", "atendemos hoje"). Escassez
forte fica **pendente** para refino posterior com `/content-strategy` — não inventar.

### Adaptações mobile
- **Barra fixa inferior** com WhatsApp + Ligar (sempre visível).
- Hero: headline + CTA priorizados; animação do iPhone em versão leve, com fallback estático
  (explodido→montado) sob `prefers-reduced-motion`.
- Cards de serviço empilham (1 coluna); grid de diferenciais 2→1; "como funciona" vira timeline vertical.
- Reels viram carrossel com swipe horizontal.
- Nav colapsa para logo + botão WhatsApp.

---

## 4. Copy completo por seção

> Placeholders entre `[ ]` = dados reais a inserir na construção. Apenas **1** permanece:
> a nota do Google (`[NOTA]`). Todo o resto está definido.

### 1 · Hero
- **Headline:** Seu aparelho de volta rápido — e em boas mãos.
- **Subheadline:** Manutenção de celulares e computadores em Campos dos Goytacazes e região. Orçamento grátis, garantia de 90 dias e seu aparelho pronto no mesmo dia — sem gambiarra.
- **CTA primário:** `Chamar no WhatsApp`
- **CTA secundário:** `Ligar agora`
- **Microcopy sob o botão:** Resposta rápida · Orçamento grátis · Sem compromisso

### 2 · Barra de confiança
`⭐ [NOTA] no Google` · `🛡️ Garantia de 90 dias` · `⚡ Celular no mesmo dia` · `💰 Orçamento grátis`
*(Ícones em SVG — Lucide. Os emojis aqui são só indicação de qual ícone usar, não vão no HTML.)*

### 3 · Problema / empatia
- **Título:** Já levou seu aparelho numa assistência e voltou pior?
- **Corpo:** Você conhece a sensação: deixa o celular ou o PC, espera dias, paga — e o problema continua. Ou some uma peça, mexem nas suas fotos, e ninguém te dá garantia de nada. Enquanto isso, o aparelho que você usa pra trabalhar fica parado.
- **Transição:** Na HB é o contrário disso.

### 4 · Serviços — título: **O que a gente resolve**
- **Card Celulares** — *Manutenção de Celulares* — "Tela quebrada, bateria viciada, não carrega, molhou? iPhone e Android. Troca de tela, bateria, películas e capas — com peças de qualidade e garantia." — CTA `Orçar meu celular`
- **Card Computadores** — *Manutenção de Computadores* — "PC travando, lento, não liga? Formatação, limpeza, upgrade de SSD/memória, montagem, Office e pasta térmica. Rápido de novo." — CTA `Orçar meu PC`
- **Card Atendente** — *Não é nada disso?* — "Fala direto com a gente que a gente resolve — seja qual for o problema do seu aparelho." — CTA `Falar com atendente`

### 5 · Por que a HB — título: **Por que confiar seu aparelho à HB**
- `GARANTIA · 90 DIAS` — Deu problema no que a gente consertou? Conserta de novo, sem custo.
- `PRAZO · MESMO DIA` — Celular pronto no mesmo dia, PC em até 48h. *(Varia com a complexidade.)*
- `BUSCA E LEVA` — A gente busca seu aparelho e devolve. Você não sai de casa.
- `ORÇAMENTO · GRÁTIS` — Avaliamos sem cobrar nada. Você só paga se aprovar.
- `DADOS · SEGUROS` — Suas fotos, conversas e arquivos ficam intactos e em sigilo.
- `PREÇO · JUSTO` — Sem surpresa na conta. O combinado é o que você paga.
- **CTA:** `Pedir meu orçamento grátis`

### 6 · Como funciona — título: **Simples assim**
1. **Chama no WhatsApp** — Conta o que tá rolando (ou manda foto). Se preferir, a gente busca.
2. **Orçamento grátis** — Avaliamos e passamos o preço. Sem compromisso, sem pegadinha.
3. **Conserto com garantia** — Aprovou? A gente resolve com peças de qualidade e 90 dias de garantia.
4. **De volta rápido** — Pronto no mesmo dia (celular) ou em até 48h (PC), funcionando como deve.
- **CTA:** `Começar agora no WhatsApp`

### 7 · Prova social
- **Título:** Trabalho de verdade, cliente satisfeito
- **Sub:** Veja reparos reais e o que diz quem já confiou na HB.
- **CTA:** `Ver mais no Instagram`

### 8 · Sobre — título: **Quem cuida do seu aparelho**
- **Corpo:** A HB Comércio é especializada em manutenção de celulares e computadores. Aqui não tem gambiarra nem atendente robô: tem bancada, ferramenta certa e gente que entende do assunto cuidando do seu aparelho como se fosse o próprio. Rápido, transparente e com garantia — do orçamento à entrega.
- **CTA:** `Falar com a HB`

### 9 · Formulário — título: **Prefere que a gente te chame?**
- **Sub:** Deixa seu contato e a gente retorna rapidinho com seu orçamento.
- **Campos:** Nome · Telefone (WhatsApp) · Qual aparelho e qual o problema?
- **Botão:** `Quero meu orçamento`
- **Microcopy:** Sem spam. Usamos seu contato só pra te responder.

### 10 · FAQ
- **Quanto custa o conserto?** Depende do serviço — por isso o orçamento é grátis e sem compromisso. A gente avalia e te passa o preço antes de qualquer coisa.
- **Quanto tempo demora?** Celular costuma ficar pronto no mesmo dia e PC em até 48h. Casos mais complexos podem levar um pouco mais — e a gente sempre avisa o prazo antes.
- **Vocês buscam o aparelho?** Sim. Na nossa região a gente busca e devolve. Você não sai de casa.
- **Meus dados e fotos estão seguros?** Totalmente. Seus arquivos ficam intactos e em sigilo. Se o serviço exigir formatação, avisamos antes e fazemos backup com você.
- **Tem garantia?** Tem — 90 dias no serviço. Deu problema no que consertamos, resolvemos de novo sem custo.
- **Atendem empresas?** Sim. Cuidamos de PCs e celulares de empresas e comércios da região também.

### 11 · CTA final
- **Headline:** Seu aparelho não precisa ficar parado.
- **Sub:** Orçamento grátis, garantia de 90 dias e conserto rápido. Manda uma mensagem agora — a gente resolve.
- **Botão:** `Chamar no WhatsApp`
- **Reforço:** Resposta rápida · Sem compromisso · Você só paga se aprovar
- **Secundário:** Ou ligue: (22) 99861-6139

### 12 · Footer
HB Comércio & Acessórios · Campos dos Goytacazes – RJ · WhatsApp (22) 99861-6139 · Instagram · Localização no Google Maps · Horário: `[HORÁRIO a confirmar]` · "Busca e leva em Campos e região" · © Henrique Braga de Carvalho — HB Comércio & Acessórios.

### Links de ação (reutilizar padrão atual)
- WhatsApp genérico: `https://wa.me/5522998616139`
- Celular: `https://wa.me/5522998616139?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20or%C3%A7amento%20para%20meu%20celular!`
- Computador: `https://wa.me/5522998616139?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20or%C3%A7amento%20para%20meu%20computador!`
- Atendente: `https://wa.me/5522998616139?text=Ol%C3%A1!%20Gostaria%20de%20saber%20a%20respeito`
- Ligação: `tel:+5522998616139`
- Instagram: perfil da HB (`[handle a confirmar]` — link de reel existente já no projeto)

### Meta / SEO
- **Title:** HB Comércio — Conserto de Celular e Computador em Campos dos Goytacazes
- **Meta description:** Assistência técnica de celulares e computadores em Campos dos Goytacazes. Orçamento grátis, garantia de 90 dias e conserto no mesmo dia. Chame no WhatsApp.
- OG image a gerar (1200×630) com headline + logo sobre fundo navy.

---

## 5. Comportamentos e animações por seção

Princípios globais: durações 150–300ms (micro), ≤400ms (transições); animar só `transform`/`opacity`;
ease-out na entrada, ease-in na saída; **sempre** honrar `prefers-reduced-motion`; nunca causar CLS.

| Seção | Comportamento |
|---|---|
| **Nav** | Transparente sobre o hero → ganha fundo glass (blur + `--bg-base` translúcido) após ~80px de scroll. Âncoras com scroll suave. |
| **Hero — animação assinatura** | iPhone começa **explodido**; conforme o usuário rola, as peças **se encaixam** (montagem) e ele fica inteiro ao fim da seção. Implementação: **scroll-scrubbed** (progresso ligado ao scroll, não autoplay). Entrada de headline/CTA com fade-up em stagger (30–50ms). |
| **Barra de confiança** | Fade-up em stagger dos 4 badges ao entrar na viewport (IntersectionObserver). |
| **Problema** | Fade-up simples. Pode destacar palavras-chave do medo com peso/cor ao entrar. |
| **Serviços** | Cards entram em stagger; hover = leve elevação + borda `--brand` + scale 1.02 (sem layout shift). |
| **Diferenciais** | Specs entram em stagger; fundo com textura blueprint faível e parallax discreto. Labels em mono. |
| **Como funciona** | Linha conectando os 4 passos "desenha" no scroll; números em mono aparecem em sequência. |
| **Prova social** | Reels em grade/carrossel; lazy-load. Reviews em fade. Carrossel com swipe no mobile. |
| **Sobre** | Vídeo com `controls`, `loop`, `muted`, `playsInline`, `preload="metadata"`; entra com fade. |
| **Formulário** | Validação inline no blur; botão mostra loading → sucesso/erro; `aria-live` p/ erros; teclados semânticos (`tel`). |
| **FAQ** | Accordion: abre/fecha com transição de altura suave; um aberto por vez (opcional); acessível por teclado. |
| **CTA final** | Glow pulsante muito sutil no botão (respeitando reduced-motion). |
| **Barra fixa mobile** | Aparece após sair do hero; não cobre conteúdo (padding-bottom reservado). |

**Animação do hero — nota de produção (dependência crítica):** o asset atual é uma única imagem
estática (`image/iphone exploded.png`). Para a montagem no scroll, escolher uma abordagem:
- **(Recomendado) Camadas PNG/SVG** — recortar o iPhone em peças individuais e animar cada uma com
  `transform` (translate/rotate/scale) ligado ao progresso de scroll. Mais controle e performático.
- **Sequência de frames** — renderizar ~30–60 frames explodido→montado e fazer scrub (canvas).
  Mais fiel, porém mais pesado; exige otimização (WebP, preload progressivo).
- **Fallback** — sob `prefers-reduced-motion` ou mobile fraco: crossfade simples entre imagem
  explodida e montada, ou apenas a imagem montada. **Sem isso, a página ainda deve funcionar.**

Bibliotecas sugeridas: Framer Motion (`useScroll`/`useTransform`) ou GSAP ScrollTrigger.

---

## 6. Referências visuais em palavras

Para inspiração (o cliente vai pesquisar e validar visualmente):
- **iFixit** — a estética de "vista explodida"/diagrama técnico de reparo; peças identificadas,
  sensação de competência e transparência. É a referência nº1 para o hero.
- **Apple (páginas de produto)** — vistas explodidas premium, fundo escuro, foco no objeto,
  animação ligada ao scroll, respiro generoso. Referência de polimento e "premium".
- **Linear / Vercel** — UI dark tech: navy/grafite, hairlines, glow contido, tipografia grotesque,
  hierarquia limpa. Referência do "tech dark com personalidade, sem poluir".
- **Teenage Engineering** — uso de monoespaçada, labels tipo "spec", minimalismo com caráter
  industrial. Referência para os labels dos diferenciais.
- **Mood em uma frase:** bancada de engenharia à meia-luz; iPhone explodido flutuando como
  diagrama técnico; azul-cobalto sobre grafite; prazos e garantias escritos como specs; oficina de
  elite — limpa, séria, onde seu aparelho está em boas mãos e volta rápido.

---

## 7. Restrições e decisões de design documentadas

**Decisões tomadas (com o cliente):**
- Conceito **híbrido** confiança + velocidade (não 100% um nem outro).
- Manter identidade **azul/tech** da logo e levar para **dark mode premium**.
- **Hero do iPhone com montagem no scroll** é elemento assinatura — prioridade de personalidade.
- **CTA primário = verde WhatsApp**; secundários = azul-marca.
- Tipografia: **Space Grotesk + Inter + JetBrains Mono** (aposenta a Poppins).
- Formulário = **seção própria perto do fim** (WhatsApp continua sendo a ação dominante).
- Barra de confiança usa **só a nota do Google** — sem "anos de mercado" nem "qtd de aparelhos"
  (não inventar números).
- Headline principal: "Seu aparelho de volta rápido — e em boas mãos."
- Região fixada: **Campos dos Goytacazes – RJ**.

**Restrições / não-fazer:**
- ❌ Nada que pareça feito por IA: stock genérico, blobs, gradientes arco-íris, "corporate memphis",
  copy tipo "transforme sua experiência".
- ❌ Emoji como ícone estrutural — usar **SVG** (Lucide).
- ❌ Inventar provas (números, depoimentos) que não existem.
- ❌ Mais de um CTA primário competindo por dobra de tela.
- ✅ Mobile-first; tap targets ≥44px; body ≥16px; sem scroll horizontal.
- ✅ Acessibilidade AA: contraste, foco visível, alt text, labels de form, `prefers-reduced-motion`.

**Pendências para depois (não bloqueiam a construção) — refinar com `/content-strategy`:**
- Dor nº1 mais precisa do público (validar/segmentar).
- Urgência/escassez real (promoções, agenda).
- Provas sociais ricas: fotos de bancada, antes/depois, depoimentos selecionados.
- Dados a inserir: nota exata do Google, horário de atendimento, @ do Instagram.

---

## 8. Checklist de entrega (Definition of Done)

**Setup**
- [ ] Projeto React (Vite) criado; estrutura de componentes por seção; conteúdo migrado do `index.html`.
- [ ] Tokens de design (paleta + tipografia + escala) num arquivo central (CSS vars / theme).
- [ ] Fontes Google carregadas com `font-display: swap` (Space Grotesk, Inter, JetBrains Mono).
- [ ] Ícones via Lucide (SVG); logo HB em SVG/PNG nítido; favicons reaproveitados.

**Seções (todas implementadas com o copy da §4)**
- [ ] Nav fixa (glass) · [ ] Hero + animação · [ ] Barra de confiança · [ ] Problema · [ ] Serviços
- [ ] Diferenciais · [ ] Como funciona · [ ] Prova social · [ ] Sobre (+vídeo) · [ ] Formulário
- [ ] FAQ (accordion) · [ ] CTA final · [ ] Footer · [ ] Barra fixa mobile

**Funcional**
- [ ] CTA WhatsApp em todos os pontos definidos, com `wa.me` pré-preenchido por contexto.
- [ ] Botões "Ligar" (`tel:`) funcionando; formulário enviando (serviço definido) com validação inline e estado de sucesso/erro.
- [ ] Animação do hero (montagem no scroll) com asset em camadas/sequência **e fallback** estático.
- [ ] Eventos de analytics nos CTAs (WhatsApp / Ligar / Form).

**Qualidade**
- [ ] Responsivo verificado em 375px, 768px, 1024px, 1440px; sem scroll horizontal; landscape ok.
- [ ] `prefers-reduced-motion` testado (animações reduzidas/desligadas).
- [ ] Contraste AA conferido; foco visível; alt text; labels de formulário; navegação por teclado.
- [ ] Performance: hero < 200KB, imagens WebP + `loading="lazy"` abaixo da dobra, LCP < 2,5s, CLS < 0,1.
- [ ] SEO: title + meta description + OG image; `lang="pt-BR"`; headings em hierarquia.

**Conteúdo a inserir antes do go-live**
- [ ] Nota real do Google · [ ] Horário de atendimento · [ ] @ do Instagram · [ ] reels/fotos de prova social.

---

### Verificação end-to-end (como testar)
1. Rodar o app React localmente (`npm run dev`) e percorrer a página inteira no desktop e no mobile (DevTools responsivo).
2. Conferir cada CTA: WhatsApp abre conversa pré-preenchida correta; "Ligar" dispara discagem; formulário valida e envia.
3. Rolar o hero e confirmar a montagem do iPhone; ativar `prefers-reduced-motion` e confirmar o fallback.
4. Rodar Lighthouse (Performance/Accessibility/SEO) e validar as metas da §8.
5. Testar em um celular real (Android e iPhone) — tap targets, barra fixa, carrossel de reels.