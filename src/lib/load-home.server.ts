/**
 * Server-only: home + settings.
 * Homolog (SANITY_USE_DRAFTS=true) → drafts sempre.
 * Produção (SANITY_USE_DRAFTS=false) → published.
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
  // Flag de homolog manda
  if (shouldUseDrafts()) return true;
  // Produção estrita: nunca
  if (isProductionDeploy()) return false;

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

    console.info(
      "[home] preview=%s useDrafts=%s vercelEnv=%s flag=%s",
      preview,
      shouldUseDrafts(),
      process.env["VERCEL_ENV"] || "-",
      process.env["SANITY_USE_DRAFTS"] || "-",
    );

    const [homepage, settings] = await Promise.all([
      fetchHomepage({ preview }),
      fetchSiteSettings({ preview }),
    ]);

    return { homepage, settings, preview };
  },
);
