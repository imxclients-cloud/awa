/**
 * data-sanity para overlays em imagens e nós sem stega de texto.
 * Documentação: createDataAttribute (@sanity/visual-editing)
 */
import { createDataAttribute, type CreateDataAttributeProps } from "@sanity/visual-editing";

export function sanityAttr(
  id: string,
  type: string,
  path: string,
): string | undefined {
  try {
    const base: CreateDataAttributeProps = { id, type, path };
    return createDataAttribute(base).toString();
  } catch {
    return undefined;
  }
}

/** Singletons conhecidos do projeto A.W.A */
export const Doc = {
  header: { id: "site-header", type: "siteHeader" },
  hero: { id: "home-hero", type: "homeHero" },
  sobre: { id: "home-sobre", type: "homeSobre" },
  footerLogos: { id: "site-footer-logos", type: "siteFooterLogos" },
  contact: { id: "site-contact", type: "siteContact" },
} as const;
