/**
 * Dataset único (production):
 * - Homologação → SANITY_USE_DRAFTS=true (ou token presente) → perspective "drafts"
 * - Produção    → SANITY_USE_DRAFTS=false → só published
 *
 * @sanity/client v8 usa perspective: "drafts" (não mais "previewDrafts").
 */

function envFlag(name: string): string {
  return (process.env[name] || "").trim().toLowerCase();
}

function hasReadToken(): boolean {
  return Boolean(
    process.env["SANITY_API_READ_TOKEN"] || process.env["SANITY_API_WRITE_TOKEN"],
  );
}

/** Produção real: flag false, ou Vercel production sem flag true e sem intenção de draft. */
export function isProductionDeploy(): boolean {
  if (envFlag("SANITY_USE_DRAFTS") === "true") return false;
  if (envFlag("SANITY_USE_DRAFTS") === "false") return true;
  return process.env["VERCEL_ENV"] === "production";
}

/**
 * Deve ler drafts?
 * 1) SANITY_USE_DRAFTS=true → sim
 * 2) SANITY_USE_DRAFTS=false → não
 * 3) Token presente e NÃO é produção estrita → sim (homolog)
 * 4) Vercel preview → sim
 */
export function shouldUseDrafts(): boolean {
  const flag = envFlag("SANITY_USE_DRAFTS");
  if (flag === "true") return true;
  if (flag === "false") return false;

  // Sem flag explícita false: se tem token e não é produção Vercel, usa drafts
  if (hasReadToken() && process.env["VERCEL_ENV"] !== "production") return true;

  // Homolog na Vercel costuma ser VERCEL_ENV=production — se tem token E flag não é false,
  // ainda precisamos da flag true. Documentado abaixo.
  // Para homolog com VERCEL_ENV=production: defina SANITY_USE_DRAFTS=true

  if (process.env["VERCEL_ENV"] === "preview") return true;

  if (process.env["NODE_ENV"] !== "production" && hasReadToken()) return true;

  return false;
}
