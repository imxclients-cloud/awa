import { createClient, type SanityClient } from "@sanity/client";
import { isProductionDeploy, shouldUseDrafts } from "@/lib/sanity-perspective";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId =
  (typeof import.meta !== "undefined" &&
    (import.meta as ImportMeta & { env?: Record<string, string> }).env?.VITE_SANITY_PROJECT_ID) ||
  process.env["VITE_SANITY_PROJECT_ID"] ||
  process.env["SANITY_PROJECT_ID"] ||
  "9io7em6p";

const dataset =
  (typeof import.meta !== "undefined" &&
    (import.meta as ImportMeta & { env?: Record<string, string> }).env?.VITE_SANITY_DATASET) ||
  process.env["VITE_SANITY_DATASET"] ||
  process.env["SANITY_DATASET"] ||
  "production";

/** Cliente de produção / default: só documentos publicados. */
export const sanityClient: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: true,
  perspective: "published",
});

const studioUrl =
  (typeof import.meta !== "undefined" &&
    (import.meta as ImportMeta & { env?: Record<string, string> }).env?.["VITE_SANITY_STUDIO_URL"]) ||
  process.env["VITE_SANITY_STUDIO_URL"] ||
  "https://grupoawa.sanity.studio";

/**
 * Homolog: SANITY_USE_DRAFTS=true → previewDrafts (+ token).
 * Produção: SANITY_USE_DRAFTS=false → published.
 * opts.preview força preview só se não estiver em modo produção estrito.
 */
export function getSanityClient(opts?: { preview?: boolean }): SanityClient {
  const useDrafts =
    shouldUseDrafts() || (opts?.preview === true && !isProductionDeploy());

  if (!useDrafts) {
    return sanityClient;
  }

  const token =
    process.env["SANITY_API_READ_TOKEN"] ||
    process.env["SANITY_API_WRITE_TOKEN"] ||
    process.env["SANITY_READ_TOKEN"] ||
    process.env["SANITY_TOKEN"] ||
    "";
  if (!token) {
    console.warn(
      "[sanity] drafts pedidos mas TOKEN ausente — usando published. " +
        "Na Vercel: SANITY_API_READ_TOKEN com ambiente Preview marcado + Redeploy.",
    );
    return sanityClient;
  }

  // @sanity/client v7+: perspective "drafts" (antes "previewDrafts")
  console.info("[sanity] client perspective=drafts ATIVO");
  return createClient({
    projectId,
    dataset,
    apiVersion: "2025-01-01",
    useCdn: false,
    token,
    perspective: "drafts",
    stega: {
      enabled: true,
      studioUrl,
    },
  });
}


const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/** URL de imagem Sanity ou undefined */
export function sanityImageUrl(
  image: SanityImageSource | null | undefined,
  width?: number,
): string | undefined {
  if (!image) return undefined;
  // Objeto sem arquivo (ex.: só alt, vindo de seed) gera URL inválida: não usar
  const ref = (image as { asset?: { _ref?: string } }).asset?._ref ?? "";
  if (!ref) return undefined;
  try {
    // SVG não aceita redimensionamento/conversão de formato: usa a URL original
    if (ref.endsWith("-svg")) return urlFor(image).url();
    let img = urlFor(image);
    if (width) img = img.width(width);
    return img.auto("format").url();
  } catch {
    return undefined;
  }
}

/** Extrai texto plano de Portable Text simples */
export function portableTextToPlain(
  blocks: Array<{ children?: Array<{ text?: string }> }> | null | undefined,
): string {
  if (!blocks?.length) return "";
  return blocks
    .map((b) => (b.children ?? []).map((c) => c.text ?? "").join(""))
    .filter(Boolean)
    .join("\n\n");
}

// ——— Types (espelham o schema do Studio) ———

export type SanityLink = {
  label?: string;
  linkType?: "hash" | "internal" | "external";
  hash?: string;
  internalPath?: string;
  href?: string;
  openInNewTab?: boolean;
};

export type SanityCta = {
  label?: string;
  action?: "whatsapp_especialista" | "whatsapp_expansao" | "whatsapp_secundario" | "custom";
  whatsappMessage?: string;
  customLink?: SanityLink;
};

export type SanitySeo = {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: SanityImageSource;
  twitterCard?: string;
  noIndex?: boolean;
};

export type SanityTeamMember = {
  _id: string;
  name?: string;
  role?: string;
  bio?: string;
  photo?: SanityImageSource & { alt?: string };
  category?: string;
  order?: number;
};

export type SiteSettings = {
  siteName?: string;
  logo?: SanityImageSource & { alt?: string };
  logoLight?: SanityImageSource & { alt?: string };
  defaultSeo?: SanitySeo;
  headScripts?: Array<{
    label?: string;
    enabled?: boolean;
    position?: string;
    code?: string;
  }>;
  mainNav?: SanityLink[];
  headerCta?: SanityCta;
  footerColumns?: Array<{ title?: string; links?: SanityLink[] }>;
  footerLegalText?: Array<{ children?: Array<{ text?: string }> }>;
  footerCopyright?: string;
  footerLegalLinks?: SanityLink[];
  phoneEspecialista?: string;
  messageEspecialista?: string;
  phoneExpansao?: string;
  messageExpansao?: string;
  phoneSecundario?: string;
  messageSecundario?: string;
  email?: string;
  leadsNotifyEmail?: string;
  leadsNotifyCc?: string;
  leadsEmailSubject?: string;
  leadsFromName?: string;
  leadsSaveToSanity?: boolean;
  addresses?: Array<{ city?: string; label?: string; address?: string; mapsUrl?: string }>;
  socialLinks?: Array<{ network?: string; label?: string; url?: string }>;
  socialTitle?: string;
  cookiesLabel?: string;
  regulatoryLabel?: string;
  logoAwaFooter?: SanityImageSource & { alt?: string };
  logoXpFooter?: SanityImageSource & { alt?: string };
};

export type Homepage = {
  seo?: SanitySeo;
  sectionVisibility?: Partial<Record<string, boolean | null>>;
  hero?: {
    headline?: string;
    backgroundImage?: SanityImageSource & { alt?: string };
    sideImage?: SanityImageSource & { alt?: string };
    cta?: SanityCta;
  };
  fundador?: {
    badge?: string;
    name?: string;
    title?: string;
    body?: Array<{ children?: Array<{ text?: string }> }>;
    photo?: SanityImageSource & { alt?: string };
    podcastVideoId?: string;
    podcastTitle?: string;
    podcastCover?: SanityImageSource & { alt?: string };
  };
  missaoVisaoValores?: {
    badge?: string;
    title?: string;
    items?: Array<{ label?: string; text?: string; bullets?: string[] }>;
  };
  grupoAwa?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    pillars?: Array<{ _key?: string; name?: string; description?: string }>;
    diagramImage?: SanityImageSource & { alt?: string };
    iconImage?: SanityImageSource & { alt?: string };
  };
  diretoria?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    members?: SanityTeamMember[];
  };
  especialistas?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    members?: SanityTeamMember[];
  };
  provas?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    stats?: Array<{ prefix?: string; value?: string; label?: string; suffix?: string }>;
  };
  premios?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    awards?: Array<{
      title?: string;
      year?: string;
      description?: string;
      image?: SanityImageSource & { alt?: string };
    }>;
  };
  parceriaXp?: {
    sectionId?: string;
    badge?: string;
    title?: string;
    subtitle?: string;
    body?: Array<{ children?: Array<{ text?: string }> }>;
    logo?: SanityImageSource & { alt?: string };
    cta?: SanityCta;
    numerosXp?: string[];
    modelosTitle?: string;
    nasdaqImage?: SanityImageSource & { alt?: string };
    modelos?: Array<{ _key?: string; titulo?: string; texto?: string; destaque?: boolean; destaqueLabel?: string }>;
    highlights?: Array<{ _key?: string; title?: string; text?: string }>;
  };
  wealthServices?: {
    sectionId?: string;
    badge?: string;
    title?: string;
    subtitle?: string;
    services?: Array<{ _key?: string; title?: string; description?: string; icone?: string; iconRef?: { _id?: string; title?: string; image?: unknown } }>;
    cta?: SanityCta;
  };
  empresas?: {
    sectionId?: string;
    badge?: string;
    title?: string;
    subtitle?: string;
    services?: Array<{ _key?: string; title?: string; description?: string; icone?: string; iconRef?: { _id?: string; title?: string; image?: unknown } }>;
    cta?: SanityCta;
  };
  trabalheConosco?: {
    sectionId?: string;
    badge?: string;
    title?: string;
    subtitle?: string;
    body?: Array<{ children?: Array<{ text?: string }> }>;
    image?: SanityImageSource & { alt?: string };
    cta?: SanityCta;
    formTitle?: string;
    labelNome?: string;
    placeholderNome?: string;
    labelEmail?: string;
    placeholderEmail?: string;
    labelTelefone?: string;
    placeholderTelefone?: string;
    labelLinkedin?: string;
    placeholderLinkedin?: string;
    submitLabel?: string;
    successMessage?: string;
    alsoOpenWhatsapp?: boolean;
  };
  frasesTransicao?: Array<{ text?: string }>;
};

export const HOMEPAGE_QUERY = `{
  "seo": coalesce(
    *[_id == "home-seo"][0].seo{ title, description, keywords, ogTitle, ogDescription, ogImage, twitterCard, noIndex },
    *[_id == "site-seo"][0]{ title, description, keywords, ogTitle, ogDescription, ogImage, twitterCard, noIndex },
    *[_id == "site-seo"][0].defaultSeo,
    *[_id == "siteSettings"][0].defaultSeo
  ),
  "hero": *[_id == "home-hero"][0]{ visible, sectionId, headline, backgroundImage, sideImage },
  "fundador": *[_id == "home-sobre"][0]{ visible, "data": fundador{ badge, name, title, body, photo, podcastVideoId, podcastTitle, podcastCover } }.data,
  "missaoVisaoValores": *[_id == "home-sobre"][0].missaoVisaoValores{ items[]{ label, text, bullets } },
  "grupoAwa": *[_id == "home-estrutura"][0]{ visible, "data": grupoAwa{ badge, title, subtitle, pillars[]{ _key, name, description }, diagramImage, iconImage } }.data,
  "diretoria": *[_id == "home-diretoria"][0]{ visible, "data": diretoria{ badge, title, subtitle, members[]->{ _id, name, role, bio, photo, category, order } } }.data,
  "especialistas": *[_id == "home-especialistas"][0]{ visible, "data": especialistas{ title, members[]->{ _id, name, role, bio, photo, category, order } } }.data,
  "provas": *[_id == "home-provas"][0]{ visible, "data": provas{ badge, title, subtitle, stats[]{ prefix, value, label, suffix }, "mapImage": coalesce(mapImage, ^.mapImage) } }.data,
  "premios": *[_id == "home-provas"][0]{ visible, "data": premios{ badge, title, subtitle, awards[]{ title, year, description, image } } }.data,
  "parceriaXp": *[_id == "home-investimentos"][0]{ visible, "data": parceriaXp{ sectionId, badge, title, subtitle, body, logo, cta, numerosXp, modelosTitle, nasdaqImage, modelos[]{ _key, titulo, texto, destaque, destaqueLabel }, highlights[]{ _key, title, text } } }.data,
  "wealthServices": *[_id == "home-solucoes"][0]{ visible, "data": wealthServices{ sectionId, badge, title, subtitle, services[]{ _key, title, description, icone, iconRef->{ _id, title, image } }, cta } }.data,
  "empresas": *[_id == "home-solucoes"][0]{ visible, "data": empresas{ sectionId, badge, title, subtitle, services[]{ _key, title, description, icone, iconRef->{ _id, title, image } }, cta } }.data,
  "trabalheConosco": *[_id == "home-trabalhe"][0]{ visible, "data": trabalheConosco{
    sectionId, badge, title, subtitle, body, image,
    cta{ label, action, whatsappMessage, customLink{ label, linkType, hash, internalPath, href, openInNewTab } },
    formTitle, labelNome, placeholderNome, labelEmail, placeholderEmail,
    labelTelefone, placeholderTelefone, labelLinkedin, placeholderLinkedin,
    submitLabel, successMessage, alsoOpenWhatsapp
  } }.data,
  "frasesTransicao": *[_id == "home-frases"][0].frasesTransicao[]{ text },
  "sectionVisibility": {
    "hero": *[_id == "home-hero"][0].visible,
    "sobre": *[_id == "home-sobre"][0].visible,
    "estrutura": *[_id == "home-estrutura"][0].visible,
    "diretoria": *[_id == "home-diretoria"][0].visible,
    "especialistas": *[_id == "home-especialistas"][0].visible,
    "provas": *[_id == "home-provas"][0].visible,
    "investimentos": *[_id == "home-investimentos"][0].visible,
    "solucoes": *[_id == "home-solucoes"][0].visible,
    "trabalhe": *[_id == "home-trabalhe"][0].visible,
    "frases": *[_id == "home-frases"][0].visible
  }
}`;

export const SITE_SETTINGS_QUERY = `{
  "siteName": coalesce(*[_id == "siteSettings"][0].siteName, "A.W.A Capital"),
  "logo": *[_id == "site-header"][0].logo,
  "logoLight": *[_id == "site-header"][0].logoLight,
  "mainNav": *[_id == "site-header"][0].mainNav[]->{ label, linkType, hash, internalPath, href, openInNewTab },
  "headerCta": *[_id == "site-header"][0].headerCta,
  "footerColumns": coalesce(*[_id == "site-footer-columns"][0].footerColumns, *[_id == "site-footer"][0].footerColumns, *[_id == "siteSettings"][0].footerColumns)[]{ title, links[]{ label, linkType, hash, internalPath, href, openInNewTab } },
  "footerLegalText": coalesce(*[_id == "site-footer-legal"][0].footerLegalText, *[_id == "site-footer"][0].footerLegalText, *[_id == "siteSettings"][0].footerLegalText),
  "footerCopyright": coalesce(*[_id == "site-footer-legal"][0].footerCopyright, *[_id == "site-footer"][0].footerCopyright, *[_id == "siteSettings"][0].footerCopyright),
  "footerLegalLinks": coalesce(*[_id == "site-footer-legal"][0].footerLegalLinks, *[_id == "site-footer"][0].footerLegalLinks, *[_id == "siteSettings"][0].footerLegalLinks)[]{ label, linkType, hash, internalPath, href, openInNewTab },
  "logoAwaFooter": coalesce(*[_id == "site-footer-logos"][0].logoAwa, *[_id == "site-footer"][0].logoAwa),
  "logoXpFooter": coalesce(*[_id == "site-footer-logos"][0].logoXp, *[_id == "site-footer"][0].logoXp),
  "socialLinks": coalesce(*[_id == "site-footer-social"][0].socialLinks, *[_id == "site-footer"][0].socialLinks, *[_id == "siteSettings"][0].socialLinks)[]{ network, label, url },
  "socialTitle": *[_id == "site-footer-social"][0].socialTitle,
  "cookiesLabel": *[_id == "site-footer-legal"][0].cookiesLabel,
  "regulatoryLabel": *[_id == "site-footer-legal"][0].regulatoryLabel,
  "defaultSeo": coalesce(
    *[_id == "site-seo"][0]{ title, description, keywords, ogTitle, ogDescription, ogImage, twitterCard, noIndex },
    *[_id == "site-seo"][0].defaultSeo,
    *[_id == "siteSettings"][0].defaultSeo
  ){ ..., ogImage },
  "headScripts": coalesce(*[_id == "site-scripts"][0].headScripts, *[_id == "siteSettings"][0].headScripts)[]{ label, enabled, position, code },
  "phoneEspecialista": *[_id == "site-contact"][0].phoneEspecialista,
  "messageEspecialista": *[_id == "site-contact"][0].messageEspecialista,
  "phoneExpansao": *[_id == "site-contact"][0].phoneExpansao,
  "messageExpansao": *[_id == "site-contact"][0].messageExpansao,
  "phoneSecundario": *[_id == "site-contact"][0].phoneSecundario,
  "messageSecundario": *[_id == "site-contact"][0].messageSecundario,
  "email": *[_id == "site-contact"][0].email,
  "addresses": *[_id == "site-contact"][0].addresses[]{ city, label, address, mapsUrl },
  "leadsNotifyEmail": *[_id == "site-leads"][0].leadsNotifyEmail,
  "leadsNotifyCc": *[_id == "site-leads"][0].leadsNotifyCc,
  "leadsEmailSubject": *[_id == "site-leads"][0].leadsEmailSubject,
  "leadsFromName": *[_id == "site-leads"][0].leadsFromName,
  "leadsSaveToSanity": *[_id == "site-leads"][0].leadsSaveToSanity
}`;

export async function fetchHomepage(opts?: { preview?: boolean }): Promise<Homepage | null> {
  try {
    const client = getSanityClient({ preview: opts?.preview });
    return await client.fetch<Homepage | null>(HOMEPAGE_QUERY);
  } catch (err) {
    console.error("[sanity] homepage fetch failed", err);
    return null;
  }
}

export async function fetchSiteSettings(opts?: { preview?: boolean }): Promise<SiteSettings | null> {
  try {
    const client = getSanityClient({ preview: opts?.preview });
    return await client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
  } catch (err) {
    console.error("[sanity] siteSettings fetch failed", err);
    return null;
  }
}

/** Monta URL do WhatsApp a partir das settings ou fallback */
export function buildWhatsappUrl(
  phone: string | undefined,
  message: string | undefined,
  fallbackPhone: string,
  fallbackMessage: string,
) {
  const p = (phone || fallbackPhone).replace(/\D/g, "");
  const m = message || fallbackMessage;
  return `https://wa.me/${p}?text=${encodeURIComponent(m)}`;
}

/** Resolve href de um link (hash / internal / external) */
export function resolveLinkHref(link?: SanityLink | null): string {
  if (!link) return "#";
  if (link.linkType === "hash") return link.hash ? `#${link.hash.replace(/^#/, "")}` : "#";
  if (link.linkType === "internal") return link.internalPath || "/";
  return link.href || "#";
}

/**
 * Resolve o destino de um botão (cta) do CMS.
 * defaultAction: usado quando o CMS não definiu action (ex.: trabalhe conosco → expansao).
 */
export function resolveCtaHref(
  cta: SanityCta | null | undefined,
  settings: SiteSettings | null | undefined,
  opts?: {
    defaultAction?: SanityCta["action"];
    fallbackPhone?: string;
    fallbackMessage?: string;
  },
): string {
  const action = cta?.action || opts?.defaultAction || "whatsapp_especialista";
  const customMsg = cta?.whatsappMessage?.trim() || undefined;

  if (action === "custom") {
    return resolveLinkHref(cta?.customLink);
  }

  if (action === "whatsapp_expansao") {
    return buildWhatsappUrl(
      settings?.phoneExpansao,
      customMsg ?? settings?.messageExpansao,
      opts?.fallbackPhone || "5598999672335",
      opts?.fallbackMessage ||
        "Olá, gostaria de falar com o time de Expansão da A.W.A Capital.",
    );
  }

  if (action === "whatsapp_secundario") {
    return buildWhatsappUrl(
      settings?.phoneSecundario,
      customMsg ?? settings?.messageSecundario,
      settings?.phoneEspecialista || opts?.fallbackPhone || "5598981145929",
      customMsg || settings?.messageEspecialista || opts?.fallbackMessage || "",
    );
  }

  // whatsapp_especialista (padrão)
  return buildWhatsappUrl(
    settings?.phoneEspecialista,
    customMsg ?? settings?.messageEspecialista,
    opts?.fallbackPhone || "5598981145929",
    opts?.fallbackMessage ||
      "Olá, vim do site e gostaria de falar com um especialista sobre os serviços da A.W.A Capital.",
  );
}
