/**
 * Webhook Sanity → rebuild na Vercel
 * Path no site: /api/revalidate
 */
import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

function getSecret(request: Request) {
  const url = new URL(request.url);
  return (
    url.searchParams.get("secret") ||
    request.headers.get("x-sanity-webhook-secret") ||
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "")
  );
}

function isAuthorized(request: Request) {
  const expected = process.env.SANITY_REVALIDATE_SECRET;
  if (!expected) {
    console.error("[revalidate] SANITY_REVALIDATE_SECRET não configurado");
    return false;
  }
  return getSecret(request) === expected;
}

async function triggerDeployHook() {
  const hook = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!hook) {
    return { triggered: false as const, detail: "VERCEL_DEPLOY_HOOK_URL não configurado" };
  }
  const res = await fetch(hook, { method: "POST" });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Deploy Hook falhou (${res.status}): ${text}`);
  }
  return { triggered: true as const };
}

export const Route = createFileRoute("/api/revalidate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isAuthorized(request)) {
          return json({ ok: false, message: "Unauthorized" }, { status: 401 });
        }

        let type: string | undefined;
        let id: string | undefined;
        try {
          const body = (await request.json()) as { _type?: string; _id?: string };
          type = body._type;
          id = body._id;
        } catch {
          // body vazio ok
        }

        try {
          const deploy = await triggerDeployHook();
          return json({
            ok: true,
            type: type ?? null,
            id: id ?? null,
            deployHook: deploy,
            at: new Date().toISOString(),
          });
        } catch (err) {
          console.error("[revalidate]", err);
          return json(
            {
              ok: false,
              message: err instanceof Error ? err.message : "Erro ao revalidar",
            },
            { status: 500 },
          );
        }
      },

      GET: async ({ request }) => {
        if (!isAuthorized(request)) {
          return json({ ok: false, message: "Unauthorized" }, { status: 401 });
        }
        return json({
          ok: true,
          message: "Endpoint de revalidação ativo. Use POST com o webhook do Sanity.",
        });
      },
    },
  },
});
