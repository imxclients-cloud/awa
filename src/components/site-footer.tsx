import { Doc, DocExtra, clean, editAttr } from "@/lib/sanity-attr";
import { portableTextToPlain } from "@/lib/sanity";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { sanityImageUrl } from "@/lib/sanity";

import { OPEN_COOKIE_SETTINGS_EVENT } from "@/components/cookie-consent";
import { WHATSAPP_ESPECIALISTA } from "@/lib/contact";
import type { SiteSettings } from "@/lib/sanity";

/** Rotas internas das páginas institucionais/legais — linkadas somente no rodapé. */
type LegalRoute =
  | "/politica-de-privacidade"
  | "/termos-de-uso"
  | "/avisos-legais"
  | "/informacoes-regulatorias"
  | "/assessores";

type InternalRoute = "/" | LegalRoute;

type ItemFooter = {
  label: string;
  /** Rota interna do router. */
  to?: InternalRoute;
  /** Âncora dentro da rota (ex.: "sobre" → "/#sobre"). */
  hash?: string;
  /** Link externo (ex.: WhatsApp) — abre em nova aba. */
  href?: string;
  external?: boolean;
};

const linkClassName =
  "group relative inline-flex font-sans text-sm text-[rgba(225,222,205,0.7)] transition-colors duration-300 hover:text-[#FEB202]";

type LinkFooterProps = {
  href?: string | undefined;
  to?: InternalRoute | undefined;
  hash?: string | undefined;
  external?: boolean | undefined;
  children: ReactNode;
};

function LinkFooter({ href, to, hash, external, children }: LinkFooterProps) {
  const conteudo = (
    <>
      {children}
      <span
        aria-hidden
        className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
        style={{ background: "#FEB202" }}
      />
    </>
  );

  if (to) {
    return (
      <Link to={to} {...(hash ? { hash } : {})} className={linkClassName}>
        {conteudo}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={linkClassName}
    >
      {conteudo}
    </a>
  );
}

export function SiteFooter({ settings }: { settings?: SiteSettings | null } = {}) {
  const resolvedColumns =
    settings?.footerColumns && settings.footerColumns.length > 0
      ? settings.footerColumns.map((c) => ({
          titulo: c.title || "",
          links: (c.links || []).map((l) => ({
            label: l.label || "",
            to: (l.linkType === "internal" ? (l.internalPath as any) : l.linkType === "hash" ? "/" : undefined),
            hash: l.linkType === "hash" ? l.hash : undefined,
            href: l.linkType === "external" ? l.href : undefined,
            external: l.linkType === "external",
          })),
        }))
      : [];

  const copyright =
    settings?.footerCopyright?.trim() ||
    (settings?.siteName?.trim()
      ? (settings.siteName.trim().startsWith("©")
          ? settings.siteName.trim()
          : `© ${settings.siteName.trim()}`)
      : "");
  const socials = settings?.socialLinks;

  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{ background: "#232323", borderColor: "rgba(254,178,2,0.25)" }}
    >
      {/* grão fotográfico sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(225,222,205,0.05) 0.5px, transparent 0.5px), radial-gradient(rgba(225,222,205,0.035) 0.5px, transparent 0.5px)",
          backgroundSize: "3px 3px, 5px 5px",
          backgroundPosition: "0 0, 1px 2px",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 py-10 md:px-8 md:py-10 lg:py-20">
        {/* logos */}
        <div className="flex flex-wrap items-center gap-6">
          <img
            data-slot="logo-awa"
            src={sanityImageUrl(settings?.logoAwaFooter, 338)}
            alt={clean((settings?.logoAwaFooter as { alt?: string } | undefined)?.alt)}
            loading="lazy"
            width={338}
            height={52}
            className="h-7 w-auto brightness-0 invert md:h-8"
            data-sanity={editAttr(Doc.footerLogos, "logoAwa")}
          />
          <span aria-hidden className="h-8 w-px" style={{ background: "rgba(254,178,2,0.45)" }} />
          <img
            data-slot="logo-xp"
            src={sanityImageUrl(settings?.logoXpFooter, 320)}
            alt={clean((settings?.logoXpFooter as { alt?: string } | undefined)?.alt)}
            loading="lazy"
            width={1600}
            height={1600}
            className="h-8 w-auto md:h-9"
            data-sanity={editAttr(Doc.footerLogos, "logoXp")}
          />
        </div>

        {/* grade editorial de colunas */}
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-0">
          {resolvedColumns.map((c, i) => (
            <div
              key={c.titulo}
              className={`${
                i > 0 ? "border-t pt-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10" : "lg:pr-10"
              }`}
              style={{ borderColor: "rgba(225,222,205,0.1)" }}
            >
              <h3
                data-sanity={editAttr(DocExtra.footerColumns, `footerColumns[${i}].title`)}
                className="font-display text-[0.65rem] font-extrabold tracking-[0.3em] uppercase"
                style={{ color: "rgba(254,178,2,0.85)" }}
              >
                {c.titulo}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {c.links.map((l, j) => (
                  <li key={`${l.label}-${j}`}>
                    <LinkFooter href={l.href} to={l.to} hash={l.hash} external={l.external}>
                      <span data-sanity={editAttr(DocExtra.footerColumns, `footerColumns[${i}].links[${j}].label`)}>{l.label}</span>
                    </LinkFooter>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div
            className="border-t pt-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10"
            style={{ borderColor: "rgba(225,222,205,0.1)" }}
          >
            <h3
              className="font-display text-[0.65rem] font-extrabold tracking-[0.3em] uppercase"
              style={{ color: "rgba(254,178,2,0.85)" }}
            >
              <span data-sanity={editAttr(DocExtra.footerSocial, "socialTitle")}>{settings?.socialTitle}</span>
            </h3>
            <div className="mt-5 flex items-center gap-4">
              <a
                data-slot="icon-instagram"
                href="https://www.instagram.com/a.w.a.capital/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da A.W.A Capital"
                className="inline-flex size-9 items-center justify-center rounded-full border transition-colors duration-300 hover:border-accent hover:text-accent"
                style={{ borderColor: "rgba(225,222,205,0.4)", color: "rgba(225,222,205,0.7)" }}
              >
                <Instagram size={18} strokeWidth={1.5} aria-hidden />
              </a>
              <a
                href="https://www.linkedin.com/company/alphaways-xp/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn da Alphaways XP"
                className="inline-flex size-9 items-center justify-center rounded-full border transition-colors duration-300 hover:border-accent hover:text-accent"
                style={{ borderColor: "rgba(225,222,205,0.4)", color: "rgba(225,222,205,0.7)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M100.28 448H7.4V148.9h92.88zm-46.44-340a53.8 53.8 0 1 1 53.8-53.8 53.79 53.79 0 0 1-53.8 53.8zm394.1 340h-92.68V302.4c0-34.7-12.43-58.4-43.46-58.4-23.7 0-37.87 15.93-44.1 31.34-2.26 5.47-2.83 13.1-2.83 20.77V448h-92.75s1.24-267.8 0-295.1h92.71v41.8c12.33-19 34.4-46 83.61-46 60.96 0 106.63 39.77 106.63 125.29z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* disclaimers regulatórios XP */}
        <div className="mt-14 border-t pt-8" style={{ borderColor: "rgba(225,222,205,0.1)" }}>
          <p
            data-sanity={editAttr(DocExtra.footerLegal, "footerLegalText")}
            className="font-sans text-[0.7rem] leading-relaxed"
            style={{ color: "rgba(225,222,205,0.45)" }}
          >
            {portableTextToPlain(settings?.footerLegalText as any)}
          </p>
        </div>

        {/* linha final */}
        <div
          className="mt-8 flex flex-col gap-3 border-t pt-6 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "rgba(225,222,205,0.1)" }}
        >
          <p data-sanity={editAttr(DocExtra.footerLegal, "footerCopyright")} className="font-sans text-xs" style={{ color: "rgba(225,222,205,0.5)" }}>
            {copyright}
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
              className="cursor-pointer font-sans text-xs transition-colors duration-300 hover:text-accent"
              style={{ color: "rgba(225,222,205,0.5)" }}
            >
              <span data-sanity={editAttr(DocExtra.footerLegal, "cookiesLabel")}>{settings?.cookiesLabel}</span>
            </button>
            <span
              aria-hidden
              className="h-3 w-px"
              style={{ background: "rgba(225,222,205,0.2)" }}
            />
            <Link
              to="/informacoes-regulatorias"
              className="font-sans text-xs transition-colors duration-300 hover:text-accent"
              style={{ color: "rgba(225,222,205,0.5)" }}
            >
              <span data-sanity={editAttr(DocExtra.footerLegal, "regulatoryLabel")}>{settings?.regulatoryLabel}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
