1- Canonical/OG/schema apontando pra hb-landing-page-tau.vercel.app (index.html:29,72). Domínio .vercel.app perde autoridade SEO. Antes do vercel deploy --prod, vale ligar um domínio próprio (hbcomercio.com.br ou similar) e atualizar canonical, og:image absoluta, @id do schema, sitemap.xml.
2- Falta endereço físico no schema — PostalAddress só tem cidade/UF (index.html:80-84). Adicionar streetAddress + postalCode libera rich snippet completo no Google (mapa, endereço, "Como chegar").
3-Sem política de privacidade / LGPD — o formulário coleta nome + telefone sem disclosure. É obrigatório por lei e o "Sem spam" do form (ContactForm.tsx:177-179) não substitui. Faltam: link no footer + checkbox opcional no form.
4-Form não captura lead real — só monta wa.me e abre WhatsApp. Se o usuário fechar a aba do WhatsApp antes de mandar, o lead some. Vale plugar Web3Forms/Resend/Formspree pra mandar pro seu email em paralelo.
5-Hero 3D usa 500vh (Hero.tsx:121) — 5 viewports de pinned scroll é cansativo em laptop. O comentário do PRD fala em 220vh+. Vale testar 250–300vh.
6- "HB Comércio & Acessórios" no nome, mas acessórios não aparecem como serviço. A loja vende capa/película/carregador? Se sim, é uma 4ª categoria que sobe ticket médio e SEO ("capinha iPhone Campos dos Goytacazes").
7- Problem é só um parágrafo (Problem.tsx). Identificação aumenta com 3 sintomas em bullets/ícones ("Tela trincada", "Bateria não segura", "PC engasgando").
8- Sem rosto/nome do dono em About — o vídeo da bancada é ótimo, mas confiança dispara com "Eu sou o Henrique, tô na bancada há X anos…" + foto. O nome aparece só no copyright do footer.
9- Faltam perguntas comuns na FAQ: "Posso parcelar?", "Vocês usam peças originais ou paralelas?", "Atendem fora de Campos?".
10- Logo PNG (public/logo.png) — SVG renderiza nítido em qualquer DPI e pesa menos.
11- Sem botão tel: no Nav desktop — só WhatsApp (Nav.tsx:54-62). Dois CTAs no header reduzem fricção em quem já tá decidido.
12- OG image — não vi o conteúdo. Garantir que ela tem headline + CTA visível, não só a logo. É o que aparece quando alguém compartilha no WhatsApp/Insta.


1= Estou ciente da nescessidade de um dominio próprio, mas ainda estou providenciando
2= O endereço é Rua Raul Cardoso n 131
3= Pode implementar de acrodo com a LGPD
4= Estou ciente mas vou deixar para depois
5= Vamos testar em 300vh
6= vendemos sim, mas como no momento estou sem estoque não dei muita enfase nisso
7= Faça o que for melhorar, não esqueça de mantar um bom /copywriting e usar o /humanizer para retirar os traços de textos gerados por IA
8= faz o esqueleto da section depois eu vou tirar uam foto pra colocar la
9= implemente as perguntas que achar que vai agregar
10= pode implementar
11= pode implementar
12= vamos deixar essa para o final, pois, eu não entendi muito bem