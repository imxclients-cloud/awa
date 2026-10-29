/**
 * Server-only: detecta draft/preview e busca home + settings com stega.
 * Usado via createServerFn para não vazar imports de /server no client bundle.
 */
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { isDraftModeFromCookieHeader } from "@/lib/draft-mode";
import { fetchHomepage, fetchSiteSettings, type Homepage, type SiteSettings } from "@/lib/sanity";

export type HomeLoaderData = {
  homepage: Homepage | null;
  settings: SiteSettings | null;
  preview: boolean;
};

export const loadHomeData = createServerFn({ method: "GET" }).handler(
  async (): Promise<HomeLoaderData> => {
    let preview = false;
    try {
      const req = getRequest();
      const cookie = req.headers.get("cookie");
      preview = isDraftModeFromCookieHeader(cookie);
      try {
        const url = new URL(req.url);
        if (
          url.searchParams.has("sanity-preview-perspective") ||
          url.searchParams.has("sanity-preview") ||
          url.searchParams.get("preview") === "1"
        ) {
          preview = true;
        }
      } catch {
        /* ignore */
      }
    } catch {
      preview = false;
    }

    if (preview) {
      console.info("[home] loader preview/stega ATIVO");
    }

    const [homepage, settings] = await Promise.all([
      fetchHomepage({ preview }),
      fetchSiteSettings({ preview }),
    ]);

    return { homepage, settings, preview };
  },
);
