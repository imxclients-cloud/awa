import { useEffect } from "react";

/**
 * Visual Editing + refresh do preview quando o conteúdo muda no Studio.
 */
export function VisualEditing() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let inIframe = false;
    try {
      inIframe = window.self !== window.top;
    } catch {
      inIframe = true;
    }
    const hasPreviewCookie = /(?:^|;\s*)sanity-preview=1(?:;|$)/.test(document.cookie);
    if (!inIframe && !hasPreviewCookie) return;

    let disable: (() => void) | undefined;
    let cancelled = false;
    let reloadTimer: ReturnType<typeof setTimeout> | undefined;

    const scheduleReload = () => {
      // Debounce: várias mutações seguidas → 1 reload
      if (reloadTimer) clearTimeout(reloadTimer);
      reloadTimer = setTimeout(() => {
        window.location.reload();
      }, 600);
    };

    (async () => {
      try {
        const mod = await import("@sanity/visual-editing");
        if (cancelled) return;
        disable = mod.enableVisualEditing({
          zIndex: 99999,
          // Atualiza o iframe quando o editor publica ou salva draft
          refresh: async (payload) => {
            // manual = botão refresh do Presentation; mutation = mudança no doc
            if (payload?.source === "manual") {
              scheduleReload();
              return false;
            }
            if (payload?.source === "mutation") {
              scheduleReload();
              return false;
            }
            return true;
          },
        });
        console.info("[visual-editing] conectado (iframe=%s cookie=%s)", inIframe, hasPreviewCookie);
      } catch (err) {
        console.error("[visual-editing] npm i @sanity/visual-editing", err);
      }
    })();

    return () => {
      cancelled = true;
      if (reloadTimer) clearTimeout(reloadTimer);
      try {
        disable?.();
      } catch {
        /* ignore */
      }
    };
  }, []);

  return null;
}
