/**
 * Server-only: home + settings.
 * Produção → sempre published.
 * Homolog → drafts se SANITY_USE_DRAFTS / cookie Presentation / query preview.
 */
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { isDraftModeFromCookieHeader } from "@/lib/draft-mode";
import { isProductionDeploy, shouldUseDrafts } from "@/lib/sanity-perspective";
import { fetchHomepage, fetchSiteSettings, type Homepage, type SiteSettings } from "@/lib/sanity";

export type HomeLoaderData = {
  homepage: Homepage | null;
  settings: SiteSettings | null;
  preview: boolean;
};

function resolvePreview(): boolean {
  if (isProductionDeploy()) return false;

  if (shouldUseDrafts()) return true;

  try {
    const req = getRequest();
    if (isDraftModeFromCookieHeader(req.headers.get("cookie"))) return true;
    const url = new URL(req.url);
    if (
      url.searchParams.has("sanity-preview-perspective") ||
      url.searchParams.has("sanity-preview") ||
      url.searchParams.get("preview") === "1"
    ) {
      return true;
    }
  } catch {
    /* loader sem request */
  }
  return false;
}

export const loadHomeData = createServerFn({ method: "GET" }).handler(
  async (): Promise<HomeLoaderData> => {
    const preview = resolvePreview();

    if (preview) {
      console.info("[home] loader preview/stega ATIVO (homolog)");
    }

    const [homepage, settings] = await Promise.all([
      fetchHomepage({ preview }),
      fetchSiteSettings({ preview }),
    ]);

    return { homepage, settings, preview };
  },
);
