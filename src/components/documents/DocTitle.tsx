import { cn } from "../../lib/cn";

/**
 * Título do documento + linha de status.
 *
 * O magenta da data é o primeiro dos dois usos permitidos por página (o outro é
 * o valor final / veredicto). Ele existe pra dar um ponto de fixação do olho
 * logo abaixo do título; se aparecesse uma terceira vez, viraria ruído e o
 * leitor pararia de saber onde olhar.
 *
 * `numero` fica em cinza ao lado do título: é dado de arquivo, não de leitura.
 */
export function DocTitle({
  titulo,
  numero,
  data,
  nota,
  className,
}: {
  titulo: string;
  numero?: string;
  /** Já formatada (ex.: "08/06/2026") — o componente não formata data. */
  data: string;
  /** Aviso legal miúdo em vermelho (validade, ressalvas). */
  nota?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-baseline gap-3">
        <h1 className="font-display text-[32px] font-extrabold leading-[1.1] text-doc-navy">
          {titulo}
        </h1>
        {numero && (
          <span className="text-[11px] text-doc-slate">{numero}</span>
        )}
      </div>
      <p className="text-[12px] font-bold leading-tight text-doc-accent">
        Emitido em {data}
      </p>
      {nota && (
        <p className="text-[7.5px] leading-[1.35] text-doc-warn">{nota}</p>
      )}
    </div>
  );
}
