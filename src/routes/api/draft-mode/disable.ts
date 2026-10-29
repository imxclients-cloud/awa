import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/draft-mode/disable")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const redirectTo = url.searchParams.get("redirect") || "/";
        const isProd = process.env["NODE_ENV"] === "production";
        const base = ["Path=/", "SameSite=None", "Max-Age=0", isProd ? "Secure" : ""].filter(Boolean);

        const headers = new Headers();
        headers.set("Location", redirectTo.startsWith("/") ? redirectTo : "/");
        headers.append("Set-Cookie", ["sanity-draft-mode=", "HttpOnly", ...base].join("; "));
        headers.append("Set-Cookie", ["sanity-preview=", ...base].join("; "));

        return new Response(null, { status: 307, headers });
      },
    },
  },
});
