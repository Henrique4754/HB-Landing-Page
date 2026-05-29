/**
 * Constantes do negócio + links de ação reutilizáveis (PRD §4 "Links de ação").
 * Centralizar aqui evita espalhar telefones/URLs pelos componentes.
 */

export const PHONE_DISPLAY = "(22) 99861-6139";
export const PHONE_TEL = "tel:+5522998616139";

const WA_NUMBER = "5522998616139";

/** Monta um link wa.me com mensagem pré-preenchida (encode automático). */
export function wa(text?: string): string {
  const base = `https://wa.me/${WA_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Mensagens pré-preenchidas por contexto (cada CTA abre a conversa certa). */
export const WA = {
  generic: wa("Olá! Gostaria de fazer um orçamento."),
  celular: wa("Olá! Gostaria de fazer um orçamento para meu celular!"),
  pc: wa("Olá! Gostaria de fazer um orçamento para meu computador!"),
  atendente: wa("Olá! Gostaria de saber a respeito"),
} as const;

// Instagram: perfil oficial da HB.
export const INSTAGRAM = "https://www.instagram.com/hb_comercio.acessorios/";

/**
 * Reels reais exibidos na seção de prova social.
 * `videoSrc` é hospedado por nós (mp4 comprimido) pra rodar inline sem o chrome
 * do Instagram; `poster` é o 1º frame (jpg leve) — carrega instantâneo;
 * `instagramUrl` mantém o link original pra quem quiser ver o post original.
 */
export type Reel = {
  videoSrc: string;
  poster: string;
  instagramUrl: string;
};

export const REELS: Reel[] = [
  {
    videoSrc: "/video/reels/reel-1.mp4",
    poster: "/video/reels/reel-1-poster.jpg",
    instagramUrl: "https://www.instagram.com/hb_comercio.acessorios/reel/DSFxGPFkYuT/",
  },
  {
    videoSrc: "/video/reels/reel-2.mp4",
    poster: "/video/reels/reel-2-poster.jpg",
    instagramUrl: "https://www.instagram.com/hb_comercio.acessorios/reel/DOqcn53DSu9/",
  },
  {
    videoSrc: "/video/reels/reel-3.mp4",
    poster: "/video/reels/reel-3-poster.jpg",
    instagramUrl: "https://www.instagram.com/hb_comercio.acessorios/reel/DMVcbO5sD8a/",
  },
];

// Localização no Google Maps (busca pelo nome + endereço pra cair no pin certo).
export const MAPS =
  "https://www.google.com/maps/search/?api=1&query=HB+Com%C3%A9rcio+Rua+Raul+Cardoso+131+Campos+dos+Goytacazes";

// Dados do negócio, confirmados com o cliente.
export const GOOGLE_RATING = "5,0"; // nota real do Google (5 avaliações)
export const BUSINESS_HOURS = "Seg a Sáb, 9h às 18h";
export const ADDRESS = "Rua Raul Cardoso, 131 · Campos dos Goytacazes/RJ";
export const ADDRESS_SHORT = "Rua Raul Cardoso, 131";

/**
 * Avaliações reais coletadas no Google Meu Negócio (5 no total — bate com
 * o `reviewCount` do schema LocalBusiness). Editado SÓ pra corrigir acentos
 * e pontuação; conteúdo e nomes são exatamente como aparecem no Google.
 */
export type Review = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  text: string;
};

export const REVIEWS: Review[] = [
  {
    author: "Sailon Israel",
    rating: 5,
    date: "dez. 2022",
    text: "Gostei muito do atendimento, não teve enrolação. Me explicou o que tava acontecendo com meu PS4 da melhor maneira possível.",
  },
  {
    author: "Julio Cesar Almeida Barreto",
    rating: 5,
    date: "dez. 2022",
    text: "Eficiência e qualidade profissional, excelente atendimento.",
  },
  {
    author: "Ellen Christel",
    rating: 5,
    date: "nov. 2022",
    text: "Excelente atendimento, preço justo e pontualidade.",
  },
  {
    author: "Andrey Dias",
    rating: 5,
    date: "jul. 2025",
    text: "Loja com profissional excelente! Super recomendo!",
  },
  {
    author: "Laiza Mello",
    rating: 5,
    date: "jul. 2025",
    text: "Ótimo atendimento, produtos de qualidade, já vou sair indicando pra todo mundo.",
  },
];
