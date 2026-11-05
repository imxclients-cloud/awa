/**
 * Helpers de Visual Editing (Presentation).
 *
 * - editAttr: gera data-sanity para QUALQUER campo, mesmo vazio.
 *   Sem atributo não há overlay clicável, então o atributo é sempre emitido.
 * - clean: remove a codificação stega de strings usadas em atributos
 *   (id, href, alt, src, aria-*). Sem isso, âncoras e alt quebram no draft.
 */
import { createDataAttribute, type CreateDataAttributeProps } from "@sanity/visual-editing";
import { stegaClean } from "@sanity/client/stega";

export type DocRef = { id: string; type: string };

export function editAttr(doc: DocRef, path: string): string | undefined {
  try {
    const base: CreateDataAttributeProps = { id: doc.id, type: doc.type, path };
    return createDataAttribute(base).toString();
  } catch {
    return undefined;
  }
}

export function clean(value?: string | null): string {
  if (!value) return "";
  return stegaClean(value);
}

/** Singletons da home (espelham structure.ts e schemaTypes/documents/homeSections.ts) */
export const Doc = {
  header: { id: "site-header", type: "siteHeader" },
  footerLogos: { id: "site-footer-logos", type: "siteFooterLogos" },
  contact: { id: "site-contact", type: "siteContact" },
  hero: { id: "home-hero", type: "homeHero" },
  sobre: { id: "home-sobre", type: "homeSobre" },
  estrutura: { id: "home-estrutura", type: "homeEstrutura" },
  diretoria: { id: "home-diretoria", type: "homeDiretoria" },
  especialistas: { id: "home-especialistas", type: "homeEspecialistas" },
  provas: { id: "home-provas", type: "homeProvas" },
  investimentos: { id: "home-investimentos", type: "homeInvestimentos" },
  solucoes: { id: "home-solucoes", type: "homeSolucoes" },
  trabalhe: { id: "home-trabalhe", type: "homeTrabalhe" },
  frases: { id: "home-frases", type: "homeFrases" },
} as const;

/** Compatibilidade com imports antigos */
export const sanityAttr = (id: string, type: string, path: string) => editAttr({ id, type }, path);

/** Docs extras usados pelo rodapé e pelas seções de equipe/soluções */
export const DocExtra = {
  footerColumns: { id: "site-footer-columns", type: "siteFooterColumns" },
  footerLegal: { id: "site-footer-legal", type: "siteFooterLegal" },
  footerSocial: { id: "site-footer-social", type: "siteFooterSocial" },
} as const;

/** Singletons e documentos das páginas internas */
export const DocPages = {
  siteCookies: { id: "site-cookies", type: "siteCookies" },
  pageAssessores: { id: "page-assessores", type: "pageAssessores" },
} as const;
