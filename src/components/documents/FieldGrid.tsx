import { cn } from "../../lib/cn";

/**
 * Rótulo de seção. Filete abaixo em vez de fundo colorido: numa folha impressa
 * um fundo chapado gasta tinta e achata a hierarquia — a linha basta pra dizer
 * "começou um bloco novo".
 */
export function SectionLabel({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "border-b border-doc-rule pb-1 text-[10px] font-bold text-doc-navy",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export type Campo = { rotulo: string; valor?: string };

/**
 * Grade rótulo/valor em duas colunas — dados do cliente, do equipamento etc.
 *
 * Valor ausente vira um filete de preenchimento manual, e não um espaço em
 * branco: a folha precisa funcionar impressa e preenchida à caneta, que é como
 * a oficina usa na prática.
 */
export function FieldGrid({
  campos,
  colunas = 2,
  className,
}: {
  campos: Campo[];
  colunas?: 1 | 2;
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid gap-x-8 gap-y-2",
        colunas === 2 ? "grid-cols-2" : "grid-cols-1",
        className,
      )}
    >
      {campos.map((campo) => (
        <div key={campo.rotulo} className="flex flex-col gap-0.5">
          <dt className="text-[9px] font-bold text-doc-navy-soft">
            {campo.rotulo}
          </dt>
          <dd className="text-[10px] leading-[1.35] text-doc-ink">
            {campo.valor ?? (
              <span className="block h-[14px] border-b border-doc-rule" />
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Bloco de campo aberto (defeito relatado, análise técnica).
 *
 * Fundo cinza sem borda, cantos retos — a mesma pílula cinza da folha de
 * orçamento. Borda tracejada foi descartada de propósito: ela grita
 * "formulário", e o laudo é um documento de parecer.
 */
export function OpenField({
  linhas = 3,
  texto,
  className,
}: {
  /** Altura em linhas quando vazio, para preenchimento manual. */
  linhas?: number;
  texto?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("bg-doc-row px-3 py-2", className)}
      style={{ minHeight: `${linhas * 18}px` }}
    >
      {texto && (
        <p className="whitespace-pre-line text-[10px] leading-[1.35] text-doc-ink">
          {texto}
        </p>
      )}
    </div>
  );
}
