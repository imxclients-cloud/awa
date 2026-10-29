/**
 * POST /api/leads — envia e-mail ao cliente (SMTP) e opcionalmente grava no Sanity.
 *
 * Variáveis na Vercel (servidor — NUNCA VITE_):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
 *   LEADS_TO_EMAIL          — fallback se o CMS não tiver e-mail configurado
 *   SANITY_API_WRITE_TOKEN  — só se quiser salvar cópia no Sanity
 *
 * No CMS (siteSettings): e-mail destinatário, CC, assunto, nome From — sem senha.
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

function readClient() {
  return createClient({
    projectId: process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || "9io7em6p",
    dataset: process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    useCdn: false,
  });
}

function writeClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) return null;
  return createClient({
    projectId: process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || "9io7em6p",
    dataset: process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    token,
    useCdn: false,
  });
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function fetchLeadsConfig(): Promise<LeadsCmsConfig> {
  try {
    const cfg = await readClient().fetch<LeadsCmsConfig | null>(
      `*[_type == "siteSettings"][0]{
        leadsNotifyEmail,
        leadsNotifyCc,
        leadsEmailSubject,
        leadsFromName,
        leadsSaveToSanity
      }`,
    );
    return cfg || {};
  } catch (err) {
    console.warn("[leads] não foi possível ler siteSettings", err);
    return {};
  }
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
    `Nova candidatura pelo site (${data.source})`,
    "",
    `Nome: ${data.nome}`,
    `E-mail: ${data.email}`,
    `Telefone: ${data.telefone || "—"}`,
    `LinkedIn: ${data.linkedin || "—"}`,
    data.mensagem ? `Mensagem: ${data.mensagem}` : null,
    "",
    `Recebido em: ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`,
  ].filter((x) => x !== null);

  const text = lines.join("\n");
  const html = `
    <h2 style="font-family:sans-serif">Nova candidatura — Trabalhe conosco</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      <tr><td style="padding:6px 12px 6px 0;color:#666">Nome</td><td style="padding:6px 0"><strong>${escapeHtml(data.nome)}</strong></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">E-mail</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Telefone</td><td style="padding:6px 0">${escapeHtml(data.telefone || "—")}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">LinkedIn</td><td style="padding:6px 0">${escapeHtml(data.linkedin || "—")}</td></tr>
    </table>
    <p style="font-family:sans-serif;font-size:12px;color:#888;margin-top:24px">Enviado automaticamente pelo site A.W.A Capital</p>
  `;
  return { text, html };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const Route = createFileRoute("/api/leads")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: LeadBody;
        try {
          body = (await request.json()) as LeadBody;
        } catch {
          return json({ ok: false, message: "JSON inválido" }, { status: 400 });
        }

        if (body.website && body.website.trim() !== "") {
          return json({ ok: true });
        }

        const nome = (body.nome || "").trim();
        const email = (body.email || "").trim().toLowerCase();
        const telefone = (body.telefone || "").trim();
        const linkedin = (body.linkedin || "").trim();
        const mensagem = (body.mensagem || "").trim();
        const source = (body.source || "trabalhe-conosco").trim();

        if (!nome || nome.length < 2) {
          return json({ ok: false, message: "Informe seu nome." }, { status: 400 });
        }
        if (!email || !isValidEmail(email)) {
          return json({ ok: false, message: "E-mail inválido." }, { status: 400 });
        }

        const cms = await fetchLeadsConfig();
        const toList = splitEmails(cms.leadsNotifyEmail).length
          ? splitEmails(cms.leadsNotifyEmail)
          : splitEmails(process.env.LEADS_TO_EMAIL);

        if (toList.length === 0) {
          console.error("[leads] nenhum e-mail destinatário (CMS leadsNotifyEmail ou LEADS_TO_EMAIL)");
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

        const subjectTemplate =
          cms.leadsEmailSubject?.trim() ||
          "Novo lead — Trabalhe conosco | A.W.A Capital";
        const subject = subjectTemplate.replace(/\{\{\s*nome\s*\}\}/gi, nome);

        const { text, html } = buildEmailBody({
          nome,
          email,
          telefone,
          linkedin,
          mensagem,
          source,
        });

        try {
          await sendMail({
            to: toList,
            cc: splitEmails(cms.leadsNotifyCc),
            subject,
            text,
            html,
            replyTo: email,
          });
        } catch (err) {
          console.error("[leads] falha SMTP", err);
          return json(
            { ok: false, message: "Não foi possível enviar o e-mail. Tente novamente." },
            { status: 500 },
          );
        }

        // Cópia no Sanity só se explicitamente habilitada (dataset costuma ser público)
        let sanityId: string | null = null;
        if (cms.leadsSaveToSanity) {
          const client = writeClient();
          if (client) {
            try {
              const doc = await client.create({
                _type: "formSubmission",
                source,
                nome,
                email,
                telefone,
                linkedin,
                mensagem,
                status: "novo",
                receivedAt: new Date().toISOString(),
                userAgent: request.headers.get("user-agent") || undefined,
              });
              sanityId = doc._id;
            } catch (err) {
              console.warn("[leads] e-mail ok, mas falhou ao salvar no Sanity", err);
            }
          }
        }

        return json({ ok: true, emailed: true, sanityId });
      },
    },
  },
});
