import type { LegalDoc } from "@/lib/page-data.server";
import type { SiteSettings } from "@/lib/sanity";
import { buildSeoMeta, siteOrigin } from "@/lib/seo-meta";

type Defaults = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
};

/** Meta tags das páginas legais a partir do CMS (+ fallback do SEO padrão do site). */
export function legalPageHead(
  doc: LegalDoc | null | undefined,
  defaults: Defaults,
  settings?: SiteSettings | null,
  path?: string,
) {
  const origin = siteOrigin();
  const pageUrl = path ? `${origin}${path.startsWith("/") ? path : `/${path}`}` : undefined;

  return buildSeoMeta({
    defaults,
    page: (doc?.seo as Parameters<typeof buildSeoMeta>[0]["page"]) ?? null,
    site: (settings?.defaultSeo as Parameters<typeof buildSeoMeta>[0]["site"]) ?? null,
    pageUrl,
  });
}
