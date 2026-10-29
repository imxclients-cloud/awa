import nodemailer from "nodemailer";

export type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
};

/** Lê SMTP apenas de variáveis de ambiente (nunca do CMS). */
export function getSmtpFromEnv(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const from = (process.env.SMTP_FROM || process.env.SMTP_USER || "").trim();
  if (!host || !user || !pass || !from) return null;

  const port = Number(process.env.SMTP_PORT || "587");
  const secure =
    process.env.SMTP_SECURE === "true" || port === 465;

  return { host, port, secure, user, pass, from };
}

export async function sendMail(opts: {
  to: string | string[];
  cc?: string | string[];
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}) {
  const smtp = getSmtpFromEnv();
  if (!smtp) {
    throw new Error(
      "SMTP não configurado. Defina SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS e SMTP_FROM na Vercel.",
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: {
      user: smtp.user,
      pass: smtp.pass,
    },
  });

  const info = await transporter.sendMail({
    from: smtp.from,
    to: opts.to,
    cc: opts.cc,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
    replyTo: opts.replyTo,
  });

  return info;
}

export function splitEmails(value?: string | null): string[] {
  if (!value?.trim()) return [];
  return value
    .split(/[,;]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}
