/**
 * GET /api/sanity-debug — diagnóstico de drafts (apenas fora de produção estrita).
 * Remova ou proteja depois de validar.
 */
import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { createClient } from "@sanity/client";
import { shouldUseDrafts, isProductionDeploy } from "@/lib/sanity-perspective";

// @ts-expect-error route tree
export const Route = createFileRoute("/api/sanity-debug")({
  server: {
    handlers: {
      GET: async () => {
        const flag = process.env["SANITY_USE_DRAFTS"] || null;
        const vercelEnv = process.env["VERCEL_ENV"] || null;
        const hasToken = Boolean(
          process.env["SANITY_API_READ_TOKEN"] || process.env["SANITY_API_WRITE_TOKEN"],
        );
        const useDrafts = shouldUseDrafts();
        const isProd = isProductionDeploy();

        const projectId =
          process.env["SANITY_PROJECT_ID"] ||
          process.env["VITE_SANITY_PROJECT_ID"] ||
          "9io7em6p";
        const dataset =
          process.env["SANITY_DATASET"] ||
          process.env["VITE_SANITY_DATASET"] ||
          "production";
        const token =
          process.env["SANITY_API_READ_TOKEN"] || process.env["SANITY_API_WRITE_TOKEN"] || "";

        let publishedTitle: string | null = null;
        let draftsTitle: string | null = null;
        let draftsError: string | null = null;

        const query = `*[_id=="home-hero"][0]{ "title": coalesce(hero.headline, headline, title) }`;

        try {
          const published = createClient({
            projectId,
            dataset,
            apiVersion: "2025-01-01",
            useCdn: true,
            perspective: "published",
          });
          const p = await published.fetch<{ title?: string } | null>(query);
          publishedTitle = p?.title ?? null;
        } catch (e) {
          publishedTitle = "ERR: " + String(e);
        }

        if (hasToken) {
          try {
            const drafts = createClient({
              projectId,
              dataset,
              apiVersion: "2025-01-01",
              useCdn: false,
              token,
              perspective: "drafts",
            });
            const d = await drafts.fetch<{ title?: string } | null>(query);
            draftsTitle = d?.title ?? null;
          } catch (e) {
            draftsError = String((e as Error)?.message || e);
          }
        }

        return json({
          ok: true,
          env: {
            SANITY_USE_DRAFTS: flag,
            VERCEL_ENV: vercelEnv,
            hasToken,
            shouldUseDrafts: useDrafts,
            isProductionDeploy: isProd,
            projectId,
            dataset,
          },
          sample: {
            note: "home-hero headline — se draftsTitle != publishedTitle, drafts funcionam na API",
            publishedTitle,
            draftsTitle,
            draftsError,
            same: publishedTitle === draftsTitle,
          },
        });
      },
    },
  },
});
