import { Sheet } from "./Sheet";
import { DocHeader } from "./DocHeader";
import { DocTitle } from "./DocTitle";
import { SectionLabel, FieldGrid, OpenField } from "./FieldGrid";
import { ItemTable } from "./ItemTable";
import { Verdict, SignatureRow } from "./Verdict";

/**
 * Laudo técnico completo — a composição de referência da papelaria HB.
 *
 * Ordem das seções segue o caminho que o leitor percorre: quem é a empresa →
 * que documento é este → de quem é o aparelho → qual o aparelho → o que o
 * cliente reclamou → o que o técnico achou → a prova (testes/peças) → o veredito
 * → as ressalvas → as assinaturas. Trocar essa ordem faz o parecer aparecer
 * antes da evidência, que é exatamente o que um laudo não pode fazer.
 *
 * Valores omitidos renderizam campo em branco: a folha é impressa e preenchida
 * à mão na bancada tão frequentemente quanto é preenchida antes de imprimir.
 */
export function LaudoTecnico({
  numero,
  data,
  cliente,
  equipamento,
  defeitoRelatado,
  analiseTecnica,
  testes,
  pecas,
  parecer,
  parecerDetalhe,
  garantia,
}: {
  numero?: string;
  data: string;
  cliente?: Partial<
    Record<"nome" | "telefone" | "documento" | "entrada", string>
  >;
  equipamento?: Partial<
    Record<"tipo" | "modelo" | "serie" | "acessorios", string>
  >;
  defeitoRelatado?: string;
  analiseTecnica?: string;
  testes?: Array<Record<string, string>>;
  pecas?: Array<Record<string, string>>;
  parecer?: string;
  parecerDetalhe?: string;
  garantia?: string;
}) {
  return (
    <Sheet>
      <DocHeader className="mb-8" />

      <DocTitle
        titulo="Laudo Técnico"
        numero={numero ? `Laudo Nº ${numero}` : undefined}
        data={data}
        nota="Este laudo descreve o estado do equipamento na data da análise. Alterações posteriores por terceiros invalidam o parecer."
        className="mb-5"
      />

      <div className="flex flex-col gap-5">
        <section className="flex flex-col gap-2">
          <SectionLabel>Dados do cliente</SectionLabel>
          <FieldGrid
            campos={[
              { rotulo: "Nome", valor: cliente?.nome },
              { rotulo: "Telefone", valor: cliente?.telefone },
              { rotulo: "Documento", valor: cliente?.documento },
              { rotulo: "Data de entrada", valor: cliente?.entrada },
            ]}
          />
        </section>

        <section className="flex flex-col gap-2">
          <SectionLabel>Identificação do equipamento</SectionLabel>
          <FieldGrid
            campos={[
              { rotulo: "Tipo", valor: equipamento?.tipo },
              { rotulo: "Marca / Modelo", valor: equipamento?.modelo },
              { rotulo: "Nº de série", valor: equipamento?.serie },
              { rotulo: "Acessórios recebidos", valor: equipamento?.acessorios },
            ]}
          />
        </section>

        <section className="flex flex-col gap-2">
          <SectionLabel>Defeito relatado pelo cliente</SectionLabel>
          <OpenField linhas={2} texto={defeitoRelatado} />
        </section>

        <section className="flex flex-col gap-2">
          <SectionLabel>Análise técnica</SectionLabel>
          <OpenField linhas={4} texto={analiseTecnica} />
        </section>

        {testes && testes.length > 0 && (
          <section className="flex flex-col gap-2">
            <SectionLabel>Testes realizados</SectionLabel>
            <ItemTable
              colunas={[
                { chave: "teste", titulo: "Teste" },
                { chave: "resultado", titulo: "Resultado", destaque: true },
                { chave: "observacao", titulo: "Observação" },
              ]}
              linhas={testes}
            />
          </section>
        )}

        {pecas && pecas.length > 0 && (
          <section className="flex flex-col gap-2">
            <SectionLabel>Componentes avaliados</SectionLabel>
            <ItemTable
              colunas={[
                { chave: "componente", titulo: "Componente" },
                { chave: "estado", titulo: "Estado" },
                { chave: "acao", titulo: "Ação recomendada", destaque: true },
              ]}
              linhas={pecas}
            />
          </section>
        )}

        <section className="flex flex-col gap-2">
          <SectionLabel>Conclusão / Parecer</SectionLabel>
          <Verdict parecer={parecer ?? "—"} detalhe={parecerDetalhe} />
        </section>
      </div>

      {/* mt-auto empurra garantia e assinaturas pro pé da folha, independente
          de quantas seções o laudo preencheu. */}
      <div className="mt-auto flex flex-col gap-8 pt-8">
        {garantia && (
          <p className="text-[9px] leading-[1.35] text-doc-slate">{garantia}</p>
        )}
        <SignatureRow />
      </div>
    </Sheet>
  );
}
