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

// Localização no Google Maps (busca pelo nome do negócio na cidade).
export const MAPS =
  "https://www.google.com/maps/search/?api=1&query=HB+Com%C3%A9rcio+e+Acess%C3%B3rios+Campos+dos+Goytacazes";

// Dados do negócio, confirmados com o cliente.
export const GOOGLE_RATING = "5,0"; // nota real do Google (5 avaliações)
export const BUSINESS_HOURS = "Seg a Sáb, 9h às 18h";
