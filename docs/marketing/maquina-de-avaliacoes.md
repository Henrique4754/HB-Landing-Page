# Máquina de avaliações — de 5 pra 30+ no Google

Hoje a HB tem **5 avaliações, todas 5 estrelas**. A nota é ótima, o volume é o problema:
com 5 avaliações o Google tem pouca confiança pra te ranquear em busca local disputada,
e o cliente que compara três assistências escolhe a que tem 40 avaliações.

Meta realista: **30+ em 3 meses**. Isso é uma avaliação a cada dois dias úteis, mais ou
menos. Não precisa de campanha, precisa de rotina.

## O link e o QR

- **Link curto:** `https://www.hbcomercio.com.br/avaliar/`
- **QR pronto pra imprimir:** `docs/marketing/qr/qr-avaliar.svg` (vetorial, escala pra
  qualquer tamanho) e `qr-avaliar.png` (2048px, pra Canva ou gráfica).

O QR aponta pro site, não direto pro Google. Isso é de propósito: se o link do Google
mudar, edita `public/avaliar/index.html` e todo QR já impresso continua funcionando.

> **Melhoria de 2 minutos:** hoje o `/avaliar/` leva pra ficha no Maps, e o cliente ainda
> precisa tocar em "Avaliar". O ideal é o link que já abre nas estrelas. Pega em
> **Perfil da Empresa no Google > Pedir avaliações > copiar link** (formato
> `https://g.page/r/XXXX/review`) e troca a constante `DESTINO` no arquivo acima.
> Corta um toque do fluxo, o que em conversão de avaliação é bastante.

## Onde o QR entra

1. **Adesivo no balcão**, na altura do olho de quem está pagando. Tamanho mínimo 5x5cm.
2. **Cartãozinho junto do aparelho entregue.** Vai pra casa com o cliente e sobrevive ao
   momento em que ele lembra que gostou do serviço.
3. **Etiqueta na embalagem** do aparelho consertado.

Texto que vai junto do QR (curto, dá o motivo):

```
Gostou do serviço?
Aponta a câmera e deixa sua avaliação.
Leva 1 minuto e ajuda muito a nossa loja.
```

## O momento certo de pedir

Esse é o ponto que mais muda resultado. Peça **na entrega, com o aparelho funcionando na
mão do cliente**, não depois. O cliente acabou de ver o problema resolvido, é o pico de
satisfação dele.

O que falar, com o aparelho na mão dele:

```
Testa aí pra ver se está tudo certo... Show. Ó, se você puder deixar uma avaliação
no Google pra gente, ajuda demais. É só apontar a câmera nesse QR aqui. Leva um minuto.
```

Regras:

- **Peça sempre, pra todo cliente satisfeito.** A maioria não vai fazer na hora, e tudo
  bem: o follow-up pega esses.
- **Não peça** pra cliente que reclamou ou saiu com dúvida. Resolve primeiro.
- **Nunca ofereça desconto ou brinde em troca de avaliação.** É contra as regras do Google
  e pode derrubar a ficha inteira. O pedido é honesto, sem moeda de troca.

## Follow-up no WhatsApp

O follow-up é o que faz o número sair de 5 pra 30. Manda **no dia seguinte à entrega**,
entre 10h e 18h. Um só. Se não responder, deixa quieto.

**Mensagem padrão (conserto):**

```
Oi, [nome]! Aqui é da HB. Tudo certo com o [aparelho]?

Se ficou satisfeito com o serviço, você pode deixar uma avaliação rapidinha pra gente no Google? Ajuda demais uma loja pequena como a nossa.

https://www.hbcomercio.com.br/avaliar/

Qualquer coisa que aparecer, é só chamar aqui. A garantia é de 90 dias.
```

**Mensagem padrão (venda de iPhone):**

```
Oi, [nome]! Aqui é da HB. Curtindo o iPhone novo?

Se a experiência de compra foi boa, deixa uma avaliação pra gente no Google? Ajuda muito quem está procurando onde comprar aparelho lacrado aqui em Campos e fica na dúvida.

https://www.hbcomercio.com.br/avaliar/

Qualquer dúvida com o aparelho, é só chamar.
```

Por que funciona: usa o nome, lembra o aparelho, dá o motivo real ("loja pequena", "quem
está na dúvida") e fecha com utilidade em vez de cobrança.

**Se não responder:** não insista. Um lembrete não convertido custa menos que um cliente
irritado.

## Rotina semanal (15 minutos)

Toda sexta:

1. Abre a lista de aparelhos entregues na semana.
2. Manda o follow-up pra quem foi entregue e ainda não avaliou.
3. Responde **todas** as avaliações novas (ver abaixo).
4. Anota o total de avaliações numa planilha, pra ver a curva subindo.

## Responder avaliação também conta

O Google trata resposta do dono como sinal de negócio ativo, e quem lê as avaliações lê as
respostas. Responda todas, em até 48h.

**Avaliação 5 estrelas:**

```
Valeu, [nome]! Fico feliz que resolveu. Qualquer coisa com o [aparelho], é só chamar, a garantia é de 90 dias. Abraço!
```

Varie o texto. Resposta copiada e colada igual em todas fica evidente e passa impressão de
automação.

**Avaliação 3 estrelas ou menos:**

Não discuta em público, mesmo tendo razão. Quem lê depois julga o tom, não o mérito.

```
[nome], obrigado pelo retorno e desculpa pela experiência. Não foi o que a gente busca entregar. Me chama no (22) 99861-6139 que eu quero entender o que houve e resolver.
```

Resolve no privado. Cliente atendido às vezes edita a avaliação sozinho.

## O que não fazer

- **Não compre avaliação.** O Google detecta padrão e derruba a ficha. Recuperar é pior que
  começar do zero.
- **Não peça pra família e amigos que nunca foram clientes.** Perfis sem histórico de
  compra na região levantam bandeira.
- **Não dispare tudo no mesmo dia.** 20 avaliações numa terça é padrão anômalo. O ritmo
  natural (2 a 3 por semana) é o que sustenta.
- **Não use tablet da loja pra o cliente avaliar ali.** Várias avaliações do mesmo IP
  viram filtro.

## Como medir

Planilha simples, atualizada toda sexta:

| Semana | Total de avaliações | Novas | Nota média | Follow-ups enviados |
|---|---|---|---|---|
| | | | | |

Se em duas semanas seguidas as novas ficarem em zero, o problema está no pedido presencial,
não no follow-up. Volte pro roteiro da entrega.
