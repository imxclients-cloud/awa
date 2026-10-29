/**
 * POST /api/leads — envia e-mail (SMTP) e opcionalmente grava no Sanity.
 *
 * Env Vercel: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
 *             LEADS_TO_EMAIL (fallback), SANITY_API_WRITE_TOKEN (opcional)
 * CMS: documento site-leads (Configurações → Leads / formulário)
 */
import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { createClient } from "@sanity/client";
import { sendMail, splitEmails, getSmtpFromEnv } from "@/lib/mail";

type LeadBody = {
  nome?: string;
  email?: string;
  telefone?: string;
  linkedin?: string;
  mensagem?: string;
  source?: string;
  website?: string;
};

type LeadsCmsConfig = {
  leadsNotifyEmail?: string;
  leadsNotifyCc?: string;
  leadsEmailSubject?: string;
  leadsFromName?: string;
  leadsSaveToSanity?: boolean;
};

/** Query em string simples — evita { } em template literal (quebra o parser do TanStack). */
const LEADS_CONFIG_QUERY =
  'coalesce(*[_id=="site-leads"][0]{leadsNotifyEmail,leadsNotifyCc,leadsEmailSubject,leadsFromName,leadsSaveToSanity},*[_type=="siteSettings"][0]{leadsNotifyEmail,leadsNotifyCc,leadsEmailSubject,leadsFromName,leadsSaveToSanity})';

function projectId() {
  return process.env["SANITY_PROJECT_ID"] || process.env["VITE_SANITY_PROJECT_ID"] || "9io7em6p";
}

function dataset() {
  return process.env["SANITY_DATASET"] || process.env["VITE_SANITY_DATASET"] || "production";
}

function readClient() {
  return createClient({
    projectId: projectId(),
    dataset: dataset(),
    apiVersion: "2024-01-01",
    useCdn: false,
  });
}

function writeClient() {
  const token = process.env["SANITY_API_WRITE_TOKEN"];
  if (!token) return null;
  return createClient({
    projectId: projectId(),
    dataset: dataset(),
    apiVersion: "2024-01-01",
    token,
    useCdn: false,
  });
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

async function fetchLeadsConfig(): Promise<LeadsCmsConfig> {
  try {
    const cfg = await readClient().fetch<LeadsCmsConfig | null>(LEADS_CONFIG_QUERY);
    return cfg || {};
  } catch (err) {
    console.warn("[leads] falha ao ler config no Sanity", err);
    return {};
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailBody(data: {
  nome: string;
  email: string;
  telefone: string;
  linkedin: string;
  mensagem: string;
  source: string;
}) {
  const lines = [
    "Nova candidatura pelo site (" + data.source + ")",
    "",
    "Nome: " + data.nome,
    "E-mail: " + data.email,
    "Telefone: " + (data.telefone || "—"),
    "LinkedIn: " + (data.linkedin || "—"),
    data.mensagem ? "Mensagem: " + data.mensagem : null,
    "",
    "Recebido em: " + new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
  ].filter(function (x) {
    return x !== null;
  });

  const text = lines.join("\n");
  const html =
    '<h2 style="font-family:sans-serif">Nova candidatura — Trabalhe conosco</h2>' +
    '<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">' +
    '<tr><td style="padding:6px 12px 6px 0;color:#666">Nome</td><td style="padding:6px 0"><strong>' +
    escapeHtml(data.nome) +
    "</strong></td></tr>" +
    '<tr><td style="padding:6px 12px 6px 0;color:#666">E-mail</td><td style="padding:6px 0"><a href="mailto:' +
    escapeHtml(data.email) +
    '">' +
    escapeHtml(data.email) +
    "</a></td></tr>" +
    '<tr><td style="padding:6px 12px 6px 0;color:#666">Telefone</td><td style="padding:6px 0">' +
    escapeHtml(data.telefone || "—") +
    "</td></tr>" +
    '<tr><td style="padding:6px 12px 6px 0;color:#666">LinkedIn</td><td style="padding:6px 0">' +
    escapeHtml(data.linkedin || "—") +
    "</td></tr>" +
    "</table>" +
    '<p style="font-family:sans-serif;font-size:12px;color:#888;margin-top:24px">Enviado automaticamente pelo site A.W.A Capital</p>';

  return { text: text, html: html };
}

// Rota registrada pelo plugin do TanStack no build (routeTree.gen.ts).
// @ts-expect-error TS2345 — id literal válido; tipo FileRoutesByPath atualiza após generate
export const Route = createFileRoute("/api/leads")({
  server: {
    handlers: {
      POST: async function ({ request }) {
        var body: LeadBody;
        try {
          body = (await request.json()) as LeadBody;
        } catch (e) {
          return json({ ok: false, message: "JSON inválido" }, { status: 400 });
        }

        if (body.website && body.website.trim() !== "") {
          return json({ ok: true });
        }

        var nome = (body.nome || "").trim();
        var email = (body.email || "").trim().toLowerCase();
        var telefone = (body.telefone || "").trim();
        var linkedin = (body.linkedin || "").trim();
        var mensagem = (body.mensagem || "").trim();
        var source = (body.source || "trabalhe-conosco").trim();

        if (!nome || nome.length < 2) {
          return json({ ok: false, message: "Informe seu nome." }, { status: 400 });
        }
        if (!email || !isValidEmail(email)) {
          return json({ ok: false, message: "E-mail inválido." }, { status: 400 });
        }

        var cms = await fetchLeadsConfig();
        var toList = splitEmails(cms.leadsNotifyEmail).length
          ? splitEmails(cms.leadsNotifyEmail)
          : splitEmails(process.env["LEADS_TO_EMAIL"]);

        if (toList.length === 0) {
          console.error("[leads] nenhum destinatário (site-leads ou LEADS_TO_EMAIL)");
          return json(
            {
              ok: false,
              message: "Destinatário não configurado. Fale conosco pelo WhatsApp.",
            },
            { status: 503 },
          );
        }

        if (!getSmtpFromEnv()) {
          console.error("[leads] SMTP não configurado nas env");
          return json(
            {
              ok: false,
              message: "Envio de e-mail indisponível no momento. Tente pelo WhatsApp.",
            },
            { status: 503 },
          );
        }

        var subjectTemplate =
          (cms.leadsEmailSubject && cms.leadsEmailSubject.trim()) ||
          "Novo lead — Trabalhe conosco | A.W.A Capital";
        var subject = subjectTemplate.replace(/\{\{\s*nome\s*\}\}/gi, nome);

        var built = buildEmailBody({
          nome: nome,
          email: email,
          telefone: telefone,
          linkedin: linkedin,
          mensagem: mensagem,
          source: source,
        });

        try {
          await sendMail({
            to: toList,
            cc: splitEmails(cms.leadsNotifyCc),
            subject: subject,
            text: built.text,
            html: built.html,
            replyTo: email,
          });
        } catch (err) {
          console.error("[leads] falha SMTP", err);
          return json(
            { ok: false, message: "Não foi possível enviar o e-mail. Tente novamente." },
            { status: 500 },
          );
        }

        var sanityId: string | null = null;
        if (cms.leadsSaveToSanity !== false) {
          var client = writeClient();
          if (!client) {
            console.warn(
              "[leads] SANITY_API_WRITE_TOKEN ausente — e-mail enviado, lead NÃO gravado no CMS",
            );
          } else {
            try {
              var doc = await client.create({
                _type: "formSubmission",
                source: source,
                nome: nome,
                email: email,
                telefone: telefone || "",
                linkedin: linkedin || "",
                mensagem: mensagem || "",
                status: "novo",
                receivedAt: new Date().toISOString(),
                userAgent: request.headers.get("user-agent") || "",
              });
              sanityId = doc._id;
              console.log("[leads] gravado no Sanity", sanityId);
            } catch (err) {
              console.error("[leads] e-mail ok, mas falhou ao salvar no Sanity", err);
              return json({
                ok: true,
                emailed: true,
                sanityId: null,
                sanityError: errorMessage(err),
              });
            }
          }
        }

        return json({ ok: true, emailed: true, sanityId: sanityId });
      },
    },
  },
});
