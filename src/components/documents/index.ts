/**
 * Papelaria HB — componentes de documento impresso (A4).
 *
 * Contexto separado do site: aqui é papel branco, tokens `doc-*`, sem animação,
 * sem raio de canto, sem sombra além da pré-visualização em tela.
 */
export { Sheet } from "./Sheet";
export { DocHeader, HB_EMPRESA } from "./DocHeader";
export { DocTitle } from "./DocTitle";
export { SectionLabel, FieldGrid, OpenField } from "./FieldGrid";
export type { Campo } from "./FieldGrid";
export { ItemTable } from "./ItemTable";
export type { Coluna } from "./ItemTable";
export { Verdict, TotalsFooter, SignatureRow } from "./Verdict";
export type { LinhaValor } from "./Verdict";
export { LaudoTecnico } from "./LaudoTecnico";
