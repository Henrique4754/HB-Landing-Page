import { cn } from "../../lib/cn";

export type Coluna = {
  chave: string;
  titulo: string;
  /** Numéricas alinham à direita e ganham a cor âmbar de dado secundário. */
  numerica?: boolean;
  /** Marca a coluna de fecho da linha (total, ação recomendada): navy 700. */
  destaque?: boolean;
};

/**
 * Tabela de itens — serve a orçamento (descrição/qtd/preço), testes realizados
 * e peças avaliadas. Uma tabela só, colunas configuráveis.
 *
 * Regras que não se negociam: nenhuma borda vertical, filete só sob o cabeçalho,
 * zebra nas linhas pares. Grade fechada transforma a tabela num bloco visual
 * pesado e faz o olho parar em cada célula em vez de correr a linha.
 */
export function ItemTable({
  colunas,
  linhas,
  className,
}: {
  colunas: Coluna[];
  linhas: Array<Record<string, string>>;
  className?: string;
}) {
  return (
    <table className={cn("w-full border-collapse", className)}>
      <thead>
        <tr className="border-b border-doc-rule">
          {colunas.map((coluna) => (
            <th
              key={coluna.chave}
              scope="col"
              className={cn(
                "pb-1.5 text-[10px] font-bold text-doc-navy",
                coluna.numerica || coluna.destaque
                  ? "text-right"
                  : "text-left",
              )}
            >
              {coluna.titulo}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {linhas.map((linha, i) => (
          <tr key={i} className={i % 2 === 1 ? "bg-doc-row" : undefined}>
            {colunas.map((coluna) => (
              <td
                key={coluna.chave}
                className={cn(
                  "py-1.5 text-[10px] leading-[1.35]",
                  coluna.numerica && "text-right text-doc-amber",
                  coluna.destaque && "text-right font-bold text-doc-navy",
                  !coluna.numerica && !coluna.destaque && "text-doc-ink",
                )}
              >
                {linha[coluna.chave]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
