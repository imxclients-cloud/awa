import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId =
  (typeof import.meta !== "undefined" &&
    (import.meta as ImportMeta & { env?: Record<string, string> }).env?.VITE_SANITY_PROJECT_ID) ||
  process.env.VITE_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  "9io7em6p";

const dataset =
  (typeof import.meta !== "undefined" &&
    (import.meta as ImportMeta & { env?: Record<string, string> }).env?.VITE_SANITY_DATASET) ||
  process.env.VITE_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  "production";

export const sanityClient: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false, // dados sempre frescos após publish no Studio
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/** URL de imagem Sanity ou undefined */
export function sanityImageUrl(
  image: SanityImageSource | null | undefined,
  width?: number,
): string | undefined {
  if (!image) return undefined;
  try {
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
  action?: "whatsapp_especialista" | "whatsapp_expansao" | "custom";
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
  email?: string;
  leadsNotifyEmail?: string;
  leadsNotifyCc?: string;
  leadsEmailSubject?: string;
  leadsFromName?: string;
  leadsSaveToSanity?: boolean;
  addresses?: Array<{ city?: string; label?: string; address?: string; mapsUrl?: string }>;
  socialLinks?: Array<{ network?: string; label?: string; url?: string }>;
};

export type Homepage = {
  seo?: SanitySeo;
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
  };
  missaoVisaoValores?: {
    badge?: string;
    title?: string;
    items?: Array<{ label?: string; text?: string }>;
  };
  grupoAwa?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    pillars?: Array<{ name?: string; description?: string }>;
    diagramImage?: SanityImageSource & { alt?: string };
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
    stats?: Array<{ value?: string; label?: string; suffix?: string }>;
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
    highlights?: Array<{ title?: string; text?: string }>;
  };
  wealthServices?: {
    sectionId?: string;
    badge?: string;
    title?: string;
    subtitle?: string;
    services?: Array<{ title?: string; description?: string }>;
    cta?: SanityCta;
  };
  empresas?: {
    sectionId?: string;
    badge?: string;
    title?: string;
    subtitle?: string;
    services?: Array<{ title?: string; description?: string }>;
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

export const HOMEPAGE_QUERY = `*[_type == "homepage"][0]{
  seo{ ..., ogImage },
  hero{
    headline,
    backgroundImage,
    sideImage,
    cta
  },
  fundador{
    badge, name, title, body, photo, podcastVideoId, podcastTitle
  },
  missaoVisaoValores{
    badge, title,
    items[]{ label, text }
  },
  grupoAwa{
    badge, title, subtitle,
    pillars[]{ name, description },
    diagramImage
  },
  diretoria{
    badge, title, subtitle,
    members[]->{ _id, name, role, bio, photo, category, order }
  },
  especialistas{
    badge, title, subtitle,
    members[]->{ _id, name, role, bio, photo, category, order }
  },
  provas{
    badge, title, subtitle,
    stats[]{ value, label, suffix }
  },
  premios{
    badge, title, subtitle,
    awards[]{ title, year, description, image }
  },
  parceriaXp{
    sectionId, badge, title, subtitle, body, logo, cta,
    highlights[]{ title, text }
  },
  wealthServices{
    sectionId, badge, title, subtitle,
    services[]{ title, description },
    cta
  },
  empresas{
    sectionId, badge, title, subtitle,
    services[]{ title, description },
    cta
  },
  trabalheConosco{
    sectionId, badge, title, subtitle, body, image, cta,
    formTitle, labelNome, placeholderNome, labelEmail, placeholderEmail,
    labelTelefone, placeholderTelefone, labelLinkedin, placeholderLinkedin,
    submitLabel, successMessage, alsoOpenWhatsapp
  },
  frasesTransicao[]{ text }
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteName,
  logo,
  logoLight,
  defaultSeo{ ..., ogImage },
  headScripts[]{ label, enabled, position, code },
  mainNav[]{ label, linkType, hash, internalPath, href, openInNewTab },
  headerCta,
  footerColumns[]{ title, links[]{ label, linkType, hash, internalPath, href, openInNewTab } },
  footerLegalText,
  footerCopyright,
  footerLegalLinks[]{ label, linkType, hash, internalPath, href, openInNewTab },
  phoneEspecialista,
  messageEspecialista,
  phoneExpansao,
  messageExpansao,
  email,
  leadsNotifyEmail,
  leadsNotifyCc,
  leadsEmailSubject,
  leadsFromName,
  leadsSaveToSanity,
  addresses[]{ city, label, address, mapsUrl },
  socialLinks[]{ network, label, url }
}`;

export async function fetchHomepage(): Promise<Homepage | null> {
  try {
    return await sanityClient.fetch<Homepage | null>(HOMEPAGE_QUERY);
  } catch (err) {
    console.error("[sanity] homepage fetch failed", err);
    return null;
  }
}

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await sanityClient.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
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
