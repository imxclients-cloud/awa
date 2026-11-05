/**
 * Server-only: carrega dados das páginas internas (legal, assessores) e do
 * aviso de cookies. Mesma detecção de preview da home (load-home.server.ts).
 */
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { isDraftModeFromCookieHeader } from "@/lib/draft-mode";
import { getSanityClient, fetchSiteSettings, type SiteSettings } from "@/lib/sanity";

function isPreviewRequest(): boolean {
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
  codigo?: string;
  photo?: Record<string, unknown> & { alt?: string };
};

export type PageAssessores = {
  _id: string;
  badge?: string;
  roleLabel?: string;
  backLabel?: string;
  seoTitle?: string;
  seoDescription?: string;
} | null;

const LEGAL_QUERY = `*[_type == "legalPage" && slug.current == $slug][0]{
  _id, title, eyebrow, updatedAt, updatedLabel, backLabel, intro, footnote,
  seo{ title, description, keywords, ogTitle, ogDescription, ogImage, twitterCard, noIndex },
  "sections": sections[]{ _key, "id": anchor, title, "blocks": blocks[]{ _key, kind, text, items } }
}`;

const COOKIES_QUERY = `*[_id == "site-cookies"][0]{
  bannerText, manageLabel, learnMoreLabel, acceptLabel, rejectLabel,
  modalTitle, modalDescription, policyTabLabel, configTabLabel, policyText, alwaysActiveLabel,
  categories[]{ key, title, description, essential }
}`;

const ASSESSORES_QUERY = `{
  "assessores": *[_type == "teamMember" && category == "assessor"] | order(name asc){ _id, name, email, role, codigo, photo },
  "page": *[_id == "page-assessores"][0]{ _id, badge, roleLabel, backLabel, seoTitle, seoDescription }
}`;

/** Settings de cabeçalho/rodapé para as páginas internas */
export const loadPageShell = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ settings: SiteSettings | null; preview: boolean }> => {
    const preview = isPreviewRequest();
    const settings = await fetchSiteSettings({ preview });
    return { settings, preview };
  },
);

export const loadLegalPage = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => input)
  .handler(async ({ data }): Promise<{ doc: LegalDoc | null; settings: SiteSettings | null; preview: boolean }> => {
    const preview = isPreviewRequest();
    const client = getSanityClient({ preview });
    const [doc, settings] = await Promise.all([
      client.fetch<LegalDoc | null>(LEGAL_QUERY, { slug: data.slug }).catch((err) => {
        console.error("[legal] fetch failed", err);
        return null;
      }),
      fetchSiteSettings({ preview }),
    ]);
    return { doc, settings, preview };
  });

export const loadCookieConfig = createServerFn({ method: "GET" }).handler(
  async (): Promise<CookieConfig | null> => {
    const preview = isPreviewRequest();
    try {
      return await getSanityClient({ preview }).fetch<CookieConfig | null>(COOKIES_QUERY);
    } catch (err) {
      console.error("[cookies] fetch failed", err);
      return null;
    }
  },
);

export const loadAssessores = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ assessores: AssessorDoc[]; page: PageAssessores; settings: SiteSettings | null; preview: boolean }> => {
    const preview = isPreviewRequest();
    const client = getSanityClient({ preview });
    const [result, settings] = await Promise.all([
      client
        .fetch<{ assessores: AssessorDoc[]; page: PageAssessores }>(ASSESSORES_QUERY)
        .catch((err) => {
          console.error("[assessores] fetch failed", err);
          return { assessores: [], page: null };
        }),
      fetchSiteSettings({ preview }),
    ]);
    return { assessores: result.assessores ?? [], page: result.page ?? null, settings, preview };
  },
);
