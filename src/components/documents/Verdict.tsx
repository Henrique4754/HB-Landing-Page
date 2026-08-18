import { cn } from "../../lib/cn";

/**
 * Parecer conclusivo do laudo — o segundo (e último) uso do magenta na página.
 *
 * É o dado que o cliente procura primeiro ao receber a folha, então ele carrega
 * o maior peso tipográfico depois do título. Caixa alta é a única exceção à
 * regra de não usar caixa alta em bloco: aqui é uma palavra, não um bloco.
 */
export function Verdict({
  parecer,
  detalhe,
  className,
}: {
  /** Ex.: "REPARÁVEL", "SEM REPARO VIÁVEL", "SEM DEFEITO CONSTATADO". */
  parecer: string;
  detalhe?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <p className="font-display text-[16px] font-extrabold leading-tight text-doc-accent-strong">
        {parecer}
      </p>
      {detalhe && (
        <p className="text-[10px] leading-[1.35] text-doc-ink">{detalhe}</p>
      )}
    </div>
  );
}

export type LinhaValor = { rotulo: string; valor: string };

/**
 * Rodapé de valores: texto legal à esquerda, coluna de totais à direita.
 *
 * O total final quebra a escala de propósito (22px magenta contra 10px navy) —
 * é o único ponto da folha onde o tamanho, e não só o peso, faz a hierarquia.
 */
export function TotalsFooter({
  textoLegal,
  linhas,
  total,
  className,
}: {
  textoLegal?: string;
  linhas: LinhaValor[];
  total: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-8", className)}>
      <p className="max-w-[95mm] text-[9px] leading-[1.35] text-doc-slate">
        {textoLegal}
      </p>
      <div className="flex flex-col items-end gap-1">
        {linhas.map((linha) => (
          <div key={linha.rotulo} className="flex gap-6 text-[10px]">
            <span className="font-bold text-doc-navy-soft">{linha.rotulo}</span>
            <span className="font-bold text-doc-navy">{linha.valor}</span>
          </div>
        ))}
        <p className="font-display text-[22px] font-extrabold leading-tight text-doc-accent-strong">
          {total}
        </p>
      </div>
    </div>
  );
}

/**
 * Assinaturas do técnico e do cliente.
 *
 * Não existia no orçamento, mas laudo sem assinatura não tem valor probatório —
 * é o que transforma a folha de "relatório" em "documento".
 */
export function SignatureRow({ className }: { className?: string }) {
  const campos = ["Técnico responsável", "Cliente"];
  return (
    <div className={cn("flex justify-between gap-12", className)}>
      {campos.map((campo) => (
        <div key={campo} className="flex w-[60mm] flex-col gap-1">
          <span className="h-[1px] w-full bg-doc-rule" />
          <span className="text-[8px] text-doc-slate">{campo}</span>
        </div>
      ))}
    </div>
  );
}
