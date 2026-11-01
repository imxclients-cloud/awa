import { sanityImageUrl, type SanitySeo } from "@/lib/sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type SeoFields = {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: SanityImageSource | null;
  twitterCard?: string;
  noIndex?: boolean;
};

type BuildOpts = {
  /** Valores usados quando o CMS não preenche */
  defaults: {
    title: string;
    description: string;
    ogTitle?: string;
    ogDescription?: string;
    keywords?: string;
  };
  /** SEO da página (home-seo, legalPage.seo, etc.) */
  page?: SeoFields | null;
  /** SEO padrão do site (site-seo / settings.defaultSeo) */
  site?: SeoFields | null;
  /** URL absoluta da página (og:url) — ex.: https://awa-delta.vercel.app/termos-de-uso */
  pageUrl?: string;
};

/**
 * Monta meta tags Open Graph / Twitter para head() do TanStack Router.
 * WhatsApp, LinkedIn e afins exigem og:title, og:description e og:image com URL HTTPS absoluta.
 */
export function buildSeoMeta({ defaults, page, site, pageUrl }: BuildOpts) {
  const title = page?.title || site?.title || defaults.title;
  const description = page?.description || site?.description || defaults.description;
  const keywords = page?.keywords || site?.keywords || defaults.keywords;
  const ogTitle = page?.ogTitle || site?.ogTitle || page?.title || site?.title || defaults.ogTitle || defaults.title;
  const ogDescription =
    page?.ogDescription ||
    site?.ogDescription ||
    page?.description ||
    site?.description ||
    defaults.ogDescription ||
    defaults.description;
  const twitter = page?.twitterCard || site?.twitterCard || "summary_large_image";
  const noIndex = page?.noIndex || site?.noIndex;

  // Imagem de compartilhamento: página → site → nenhuma
  // 1200px de largura é o tamanho recomendado para OG (WhatsApp/LinkedIn)
  const ogImageUrl =
    sanityImageUrl(page?.ogImage, 1200) || sanityImageUrl(site?.ogImage, 1200);

  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    ...(keywords ? [{ name: "keywords", content: keywords }] : []),
    { property: "og:title", content: ogTitle },
    { property: "og:description", content: ogDescription },
    { property: "og:type", content: "website" },
    ...(pageUrl ? [{ property: "og:url", content: pageUrl }] : []),
    ...(ogImageUrl
      ? [
          { property: "og:image", content: ogImageUrl },
          { property: "og:image:width", content: "1200" },
          { property: "og:image:alt", content: ogTitle },
        ]
      : []),
    { name: "twitter:card", content: twitter },
    { name: "twitter:title", content: ogTitle },
    { name: "twitter:description", content: ogDescription },
    ...(ogImageUrl ? [{ name: "twitter:image", content: ogImageUrl }] : []),
    ...(noIndex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
  ];

  return { meta };
}

/** Base URL pública do site (para og:url absoluto). */
export function siteOrigin(): string {
  const env =
    (typeof process !== "undefined" &&
      (process.env["VITE_SITE_URL"] ||
        process.env["SITE_URL"] ||
        process.env["VERCEL_PROJECT_PRODUCTION_URL"] ||
        process.env["VERCEL_URL"])) ||
    "";
  if (!env) return "https://awa-delta.vercel.app";
  if (env.startsWith("http")) return env.replace(/\/$/, "");
  return `https://${env.replace(/\/$/, "")}`;
}
