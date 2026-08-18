import { cn } from "../../lib/cn";

/** Dados fixos da empresa. Um lugar só — todo documento lê daqui. */
export const HB_EMPRESA = {
  nome: "HB Comércio & Assistência",
  endereco: "Rua Raul Cardoso, Nº131",
  cidade: "Campos dos Goytacazes, Rio de Janeiro, 28027",
  telefone: "(22) 99861-6139",
} as const;

/**
 * Cabeçalho da folha: nome da empresa e contato, alinhados à esquerda.
 *
 * Sem logo centralizado e sem caixa em volta — o documento identifica a marca
 * pela faixa navy do topo, então repetir o peso aqui competiria com o título.
 */
export function DocHeader({ className }: { className?: string }) {
  return (
    <header className={cn("flex flex-col gap-1", className)}>
      <p className="text-[17px] font-normal leading-tight text-doc-navy-soft">
        {HB_EMPRESA.nome}
      </p>
      <div className="text-[9px] leading-[1.35] text-doc-slate">
        <p>{HB_EMPRESA.endereco}</p>
        <p>{HB_EMPRESA.cidade}</p>
        <p>{HB_EMPRESA.telefone}</p>
      </div>
    </header>
  );
}
