/**
 * POST /api/cms-backup
 * Recebe NDJSON do Studio e envia por e-mail ao destinatário dos leads.
 * CORS liberado para *.sanity.studio (backup partindo do Studio).
 *
 * Env: SMTP_*, LEADS_TO_EMAIL, CMS_BACKUP_SECRET (opcional)
 */
import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@sanity/client";
import { sendMail, splitEmails, getSmtpFromEnv } from "@/lib/mail";

const LEADS_QUERY =
  'coalesce(*[_id=="site-leads"][0]{leadsNotifyEmail,leadsNotifyCc},*[_type=="siteSettings"][0]{leadsNotifyEmail,leadsNotifyCc})';

function readClient() {
  return createClient({
    projectId: process.env["SANITY_PROJECT_ID"] || process.env["VITE_SANITY_PROJECT_ID"] || "9io7em6p",
    dataset: process.env["SANITY_DATASET"] || process.env["VITE_SANITY_DATASET"] || "production",
    apiVersion: "2024-01-01",
    useCdn: false,
  });
}

function corsHeaders(request: Request): Headers {
  const origin = request.headers.get("Origin") || "";
  const allowed =
    !origin ||
    origin.endsWith(".sanity.studio") ||
    origin.endsWith(".sanity.io") ||
    origin === "http://localhost:3333" ||
    origin.startsWith("http://localhost:");

  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", allowed ? origin || "*" : "https://grupoawa.sanity.studio");
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  headers.set("Access-Control-Max-Age", "86400");
  headers.set("Vary", "Origin");
  headers.set("Content-Type", "application/json; charset=utf-8");
  return headers;
}

function jsonRes(
  request: Request,
  body: Record<string, unknown>,
  status = 200,
): Response {
  const headers = corsHeaders(request);
  return new Response(JSON.stringify(body), { status, headers });
}

// @ts-expect-error TS2345 — rota registrada pelo plugin TanStack no build
export const Route = createFileRoute("/api/cms-backup")({
  server: {
    handlers: {
      OPTIONS: async ({ request }) => {
        return new Response(null, { status: 204, headers: corsHeaders(request) });
      },

      POST: async function ({ request }) {
        var body: { ndjson?: string; count?: number; secret?: string };
        try {
          body = await request.json();
        } catch (e) {
          return jsonRes(request, { ok: false, message: "JSON inválido" }, 400);
        }

        var expected = process.env["CMS_BACKUP_SECRET"] || "";
        if (!expected || body.secret !== expected) {
          return jsonRes(request, { ok: false, message: "Secret inválido" }, 401);
        }

        var ndjson = body.ndjson || "";
        if (!ndjson || ndjson.length < 2) {
          return jsonRes(request, { ok: false, message: "Backup vazio" }, 400);
        }

        // Vercel body limit ~4.5MB — avisa se muito grande
        if (ndjson.length > 4_000_000) {
          return jsonRes(
            request,
            {
              ok: false,
              message:
                "Backup muito grande para envio por API. Use Baixar .ndjson ou o script export-dataset.sh",
            },
            413,
          );
        }

        if (!getSmtpFromEnv()) {
          return jsonRes(
            request,
            { ok: false, message: "SMTP não configurado na Vercel" },
            503,
          );
        }

        var cms: { leadsNotifyEmail?: string; leadsNotifyCc?: string } = {};
        try {
          cms = (await readClient().fetch(LEADS_QUERY)) || {};
        } catch (e) {
          console.warn("[cms-backup] falha ao ler leads", e);
        }

        var toList = splitEmails(cms.leadsNotifyEmail).length
          ? splitEmails(cms.leadsNotifyEmail)
          : splitEmails(process.env["LEADS_TO_EMAIL"]);

        if (!toList.length) {
          return jsonRes(
            request,
            { ok: false, message: "Nenhum e-mail de destinatário configurado" },
            503,
          );
        }

        var stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
        var filename = "awa-cms-backup-" + stamp + ".ndjson";
        var count = body.count || ndjson.split("\n").filter(Boolean).length;

        try {
          await sendMail({
            to: toList,
            cc: splitEmails(cms.leadsNotifyCc),
            subject: "Backup CMS A.W.A Capital — " + stamp,
            text:
              "Backup do Sanity CMS.\n\nDocumentos: " +
              count +
              "\nArquivo: " +
              filename +
              "\n\nRestaurar: npx sanity dataset import " +
              filename +
              " production",
            html:
              "<p>Backup do Sanity CMS A.W.A Capital.</p><p><strong>" +
              count +
              "</strong> documentos.</p><p>Arquivo em anexo.</p>",
            attachments: [
              {
                filename: filename,
                content: Buffer.from(ndjson, "utf8"),
                contentType: "application/x-ndjson",
              },
            ],
          });
        } catch (err) {
          console.error("[cms-backup] SMTP", err);
          return jsonRes(
            request,
            { ok: false, message: "Falha ao enviar e-mail do backup" },
            500,
          );
        }

        return jsonRes(request, { ok: true, to: toList.join(", "), count: count });
      },
    },
  },
});
