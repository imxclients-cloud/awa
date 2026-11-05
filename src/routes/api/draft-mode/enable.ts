/**
 * Ativa draft mode para o Presentation Tool (Visual Editing).
 * Sempre redireciona para / após setar cookies legíveis pelo front.
 */
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/draft-mode/enable")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        // Produção não ativa draft mode (drafts só na homolog)
        if (process.env["VERCEL_ENV"] === "production") {
          return new Response(null, {
            status: 307,
            headers: { Location: "/" },
          });
        }

        const url = new URL(request.url);
        const redirectParam =
          url.searchParams.get("sanity-preview-pathname") ||
          url.searchParams.get("redirect") ||
          "/";

        // Cookies: um HttpOnly (servidor) + um legível pelo JS (overlays)
        const isProd = process.env["NODE_ENV"] === "production";
        const base = ["Path=/", "SameSite=None", "Max-Age=86400", isProd ? "Secure" : ""].filter(Boolean);

        const cookieServer = ["sanity-draft-mode=1", "HttpOnly", ...base].join("; ");
        const cookieClient = ["sanity-preview=1", ...base].join("; ");

        let destPath = "/";
        try {
          const dest = new URL(redirectParam, url.origin);
          destPath = dest.pathname + dest.search;
          if (!destPath.startsWith("/")) destPath = "/";
        } catch {
          destPath = "/";
        }

        // Dois Set-Cookie (API Headers permite append)
        const headers = new Headers();
        headers.append("Location", destPath);
        headers.append("Set-Cookie", cookieServer);
        headers.append("Set-Cookie", cookieClient);
        // Permite embed no Studio
        headers.set("Content-Security-Policy", "frame-ancestors 'self' https://*.sanity.studio https://*.sanity.io");

        return new Response(null, { status: 307, headers });
      },
    },
  },
});
