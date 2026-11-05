/**
 * Dataset único (production):
 * - Homologação → drafts (previewDrafts) quando SANITY_USE_DRAFTS=true
 * - Produção    → sempre published
 */

export function isProductionDeploy(): boolean {
  return process.env["VERCEL_ENV"] === "production";
}

/**
 * Homolog / preview Vercel / flag explícita → pode usar drafts.
 * Produção nunca retorna true.
 */
export function shouldUseDrafts(): boolean {
  if (isProductionDeploy()) return false;
  if (process.env["SANITY_USE_DRAFTS"] === "true") return true;
  if (process.env["SANITY_USE_DRAFTS"] === "false") return false;
  if (process.env["VERCEL_ENV"] === "preview") return true;
  if (
    process.env["NODE_ENV"] !== "production" &&
    (process.env["SANITY_API_READ_TOKEN"] || process.env["SANITY_API_WRITE_TOKEN"])
  ) {
    return true;
  }
  return false;
}
