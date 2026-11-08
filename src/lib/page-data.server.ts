/**
 * Server-only: carrega dados das páginas internas (legal, assessores) e do
 * aviso de cookies. Mesma detecção de preview da home (load-home.server.ts).
 */
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { isDraftModeFromCookieHeader } from "@/lib/draft-mode";
import { getSanityClient, fetchSiteSettings, type SiteSettings } from "@/lib/sanity";
import { isProductionDeploy, shouldUseDrafts } from "@/lib/sanity-perspective";

function isPreviewRequest(): boolean {
  if (shouldUseDrafts()) return true;
  if (isProductionDeploy()) return false;
  try {
    const req = getRequest();
    if (isDraftModeFromCookieHeader(req.headers.get("cookie"))) return true;
    const url = new URL(req.url);
    return (
      url.searchParams.has("sanity-preview-perspective") ||
      url.searchParams.has("sanity-preview") ||
      url.searchParams.get("preview") === "1"
    );
  } catch {
    return false;
  }
}

export type LegalBlock = { _key: string; kind?: "p" | "list"; text?: string; items?: string[] };
export type LegalSection = { _key: string; id?: string; title?: string; blocks?: LegalBlock[] };
export type LegalSeo = {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: Record<string, unknown> | null;
  twitterCard?: string;
  noIndex?: boolean;
};

export type LegalDoc = {
  _id: string;
  title?: string;
  eyebrow?: string;
  updatedAt?: string;
  updatedLabel?: string;
  backLabel?: string;
  intro?: string;
  footnote?: string;
  sections?: LegalSection[];
  seo?: LegalSeo;
};

export type CookieConfig = {
  bannerText?: string;
  manageLabel?: string;
  learnMoreLabel?: string;
  acceptLabel?: string;
  rejectLabel?: string;
  modalTitle?: string;
  modalDescription?: string;
  policyTabLabel?: string;
  configTabLabel?: string;
  policyText?: string;
  alwaysActiveLabel?: string;
  categories?: Array<{ key?: string; title?: string; description?: string; essential?: boolean }>;
};

export type AssessorDoc = {
  _id: string;
  name?: string;
  email?: string;
  role?: string;
  bio?: string;
  codigo?: string;
  unidade?: string;
  photo?: Record<string, unknown> & { alt?: string };
};

export type PageAssessores = {
  _id: string;
  badge?: string;
  backLabel?: string;
  seoTitle?: string;
  seoDescription?: string;
};

const LEGAL_QUERY = `*[_type=="legalPage" && slug.current==$slug][0]{
  _id,
  title,
  eyebrow,
  updatedAt,
  updatedLabel,
  backLabel,
  intro,
  footnote,
  sections[]{
    _key,
    id,
    title,
    blocks[]{
      _key,
      kind,
      text,
      items
    }
  },
  seo{
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    twitterCard,
    noIndex
  }
}`;

const ASSESSORES_QUERY = `{
  "assessores": *[_type=="teamMember" && category=="assessor"] | order(unidade asc, name asc) {
    _id,
    name,
    email,
    role,
    bio,
    codigo,
    unidade,
    photo
  },
  "page": *[_id=="page-assessores"][0]{
    _id,
    badge,
    backLabel,
    seoTitle,
    seoDescription
  }
}`;

const COOKIES_QUERY = `*[_id=="site-cookies"][0]{
  bannerText,
  manageLabel,
  learnMoreLabel,
  acceptLabel,
  rejectLabel,
  modalTitle,
  modalDescription,
  policyTabLabel,
  configTabLabel,
  policyText,
  alwaysActiveLabel,
  categories[]{ key, title, description, essential }
}`;

export const loadCookieConfig = createServerFn({ method: "GET" }).handler(
  async (): Promise<CookieConfig | null> => {
    const preview = isPreviewRequest();
    try {
      return await getSanityClient({ preview }).fetch<CookieConfig | null>(COOKIES_QUERY);
    } catch (err) {
      console.error("[page-data] cookies", err);
      return null;
    }
  },
);

export const loadLegalPage = createServerFn({ method: "GET" }).handler(
  async (ctx): Promise<{ doc: LegalDoc | null; settings: SiteSettings | null; preview: boolean }> => {
    const data = (ctx as { data?: { slug?: string } }).data ?? { slug: "" };
    const slug = data.slug || "";
    const preview = isPreviewRequest();
    const client = getSanityClient({ preview });
    try {
      const [doc, settings] = await Promise.all([
        client.fetch<LegalDoc | null>(LEGAL_QUERY, { slug }),
        fetchSiteSettings({ preview }),
      ]);
      return { doc, settings, preview };
    } catch (err) {
      console.error("[page-data] legal", slug, err);
      return { doc: null, settings: null, preview };
    }
  },
);

export const loadAssessores = createServerFn({ method: "GET" }).handler(
  async (): Promise<{
    assessores: AssessorDoc[];
    page: PageAssessores | null;
    settings: SiteSettings | null;
    preview: boolean;
  }> => {
    const preview = isPreviewRequest();
    const client = getSanityClient({ preview });
    try {
      const [bundle, settings] = await Promise.all([
        client.fetch<{ assessores: AssessorDoc[]; page: PageAssessores | null }>(ASSESSORES_QUERY),
        fetchSiteSettings({ preview }),
      ]);
      return {
        assessores: bundle?.assessores ?? [],
        page: bundle?.page ?? null,
        settings,
        preview,
      };
    } catch (err) {
      console.error("[page-data] assessores", err);
      return { assessores: [], page: null, settings: null, preview };
    }
  },
);
