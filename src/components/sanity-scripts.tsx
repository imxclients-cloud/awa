import { useEffect } from "react";
import type { SiteSettings } from "@/lib/sanity";

type ScriptItem = NonNullable<SiteSettings["headScripts"]>[number];

type Props = {
  scripts?: SiteSettings["headScripts"] | null;
};

function resolveTarget(position?: string): HTMLElement {
  if (typeof document === "undefined") return null as unknown as HTMLElement;
  switch (position) {
    case "head_start":
    case "head_end":
      return document.head;
    case "body_start":
      return document.body;
    case "body_end":
    default:
      return document.body;
  }
}

/** Reexecuta nós <script> (innerHTML não roda script). */
function injectNode(node: ChildNode, parent: HTMLElement, atStart: boolean) {
  if (node.nodeName === "SCRIPT") {
    const src = node as HTMLScriptElement;
    const el = document.createElement("script");
    for (const attr of Array.from(src.attributes)) {
      el.setAttribute(attr.name, attr.value);
    }
    if (src.textContent) el.text = src.textContent;
    if (atStart && parent.firstChild) {
      parent.insertBefore(el, parent.firstChild);
    } else {
      parent.appendChild(el);
    }
    return el;
  }
  const clone = node.cloneNode(true);
  if (atStart && parent.firstChild) {
    parent.insertBefore(clone, parent.firstChild);
  } else {
    parent.appendChild(clone);
  }
  return clone;
}

/**
 * Injeta snippets cadastrados em Configurações → Scripts / códigos.
 * Roda no cliente (analytics, pixels, tags).
 */
export function SanityScripts({ scripts }: Props) {
  useEffect(() => {
    if (!scripts?.length) return;

    const injected: Element[] = [];

    for (const item of scripts as ScriptItem[]) {
      if (!item?.code?.trim()) continue;
      if (item.enabled === false) continue;

      const atStart =
        item.position === "head_start" || item.position === "body_start";
      const parent = resolveTarget(item.position);
      if (!parent) continue;

      const wrap = document.createElement("div");
      wrap.innerHTML = item.code.trim();

      // Se colaram JS puro sem <script>, envolve
      if (
        wrap.childNodes.length === 1 &&
        wrap.firstChild?.nodeType === Node.TEXT_NODE
      ) {
        const el = document.createElement("script");
        el.text = item.code.trim();
        if (atStart && parent.firstChild) parent.insertBefore(el, parent.firstChild);
        else parent.appendChild(el);
        injected.push(el);
        continue;
      }

      Array.from(wrap.childNodes).forEach((node) => {
        const el = injectNode(node, parent, atStart);
        if (el instanceof Element) injected.push(el);
      });
    }

    return () => {
      injected.forEach((el) => {
        try {
          el.remove();
        } catch {
          /* ignore */
        }
      });
    };
  }, [scripts]);

  return null;
}
