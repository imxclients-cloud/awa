/** Cookie legível pelo JS (setado em /api/draft-mode/enable) */
export const PREVIEW_COOKIE = "sanity-preview";
export const DRAFT_COOKIE = "sanity-draft-mode";

export function isDraftModeFromCookieHeader(cookieHeader: string | null | undefined): boolean {
  if (!cookieHeader) return false;
  return (
    /(?:^|;\s*)sanity-draft-mode=1(?:;|$)/.test(cookieHeader) ||
    /(?:^|;\s*)sanity-preview=1(?:;|$)/.test(cookieHeader)
  );
}

/** Browser: cookie não-HttpOnly ou iframe do Studio */
export function isDraftModeBrowser(): boolean {
  if (typeof document === "undefined") return false;
  if (/(?:^|;\s*)sanity-preview=1(?:;|$)/.test(document.cookie)) return true;
  try {
    if (window.self !== window.top) return true; // dentro do iframe do Presentation
  } catch {
    return true; // cross-origin iframe
  }
  return false;
}
