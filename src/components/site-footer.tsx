import type { ReactNode } from "react";
import awaLogo from "@/assets/logo-horizontal.svg.asset.json";
import { WHATSAPP_ESPECIALISTA } from "@/lib/contact";

const colunas = [
  {
    titulo: "Institucional",
    links: [
      { label: "Sobre nós", href: "#sobre" },
      { label: "Investimentos", href: "#investimentos" },
      { label: "Soluções para Famílias", href: "#familias" },
      { label: "Soluções para Empresas", href: "#empresas" },
      { label: "Trabalhe conosco", href: "#trabalhe-conosco" },
      { label: "Falar com um Especialista", href: WHATSAPP_ESPECIALISTA, external: true },
    ],
  },
  {
    titulo: "Legal",
    links: [
      { label: "Política de Privacidade", href: "#" },
      { label: "Termos de Uso", href: "#" },
      { label: "Avisos legais", href: "#" },
      { label: "Informações regulatórias", href: "#" },
    ],
  },
];

function LinkFooter({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group relative inline-flex font-sans text-sm transition-colors duration-300"
      style={{ color: "rgba(225,222,205,0.7)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#FEB202";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "rgba(225,222,205,0.7)";
      }}
    >
      {children}
      <span
        aria-hidden
        className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
        style={{ background: "#FEB202" }}
      />
    </a>
  );
}

export function SiteFooter() {
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

      <div className="relative mx-auto w-full max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
        {/* logos */}
        <div className="flex flex-wrap items-center gap-6">
          <img
            data-slot="logo-awa"
            src={awaLogo.url}
            alt="A.W.A Capital"
            loading="lazy"
            width={338}
            height={52}
            className="h-7 w-auto brightness-0 invert md:h-8"
          />
          <span aria-hidden className="h-8 w-px" style={{ background: "rgba(254,178,2,0.45)" }} />
          <span
            data-slot="logo-xp"
            aria-label="XP Investimentos"
            className="font-display text-sm font-extrabold tracking-[0.2em] uppercase"
            style={{ color: "rgba(225,222,205,0.7)" }}
          >
            XP Investimentos
          </span>
        </div>

        {/* grade editorial de colunas */}
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-0">
          {colunas.map((c, i) => (
            <div
              key={c.titulo}
              className={`${
                i > 0
                  ? "border-t pt-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10"
                  : "lg:pr-10"
              }`}
              style={{ borderColor: "rgba(225,222,205,0.1)" }}
            >
              <h3
                className="font-display text-[0.65rem] font-extrabold tracking-[0.3em] uppercase"
                style={{ color: "rgba(254,178,2,0.85)" }}
              >
                {c.titulo}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <LinkFooter href={l.href} external={l.external}>
                      {l.label}
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
              Redes sociais
            </h3>
            <div className="mt-5 flex items-center gap-4">
              <span
                data-slot="icon-instagram"
                aria-label="Instagram"
                className="inline-block h-4 w-4 rounded-[4px] border"
                style={{ borderColor: "rgba(225,222,205,0.4)" }}
              />
              <span
                data-slot="icon-linkedin"
                aria-label="LinkedIn"
                className="inline-block h-4 w-4 rounded-[4px] border"
                style={{ borderColor: "rgba(225,222,205,0.4)" }}
              />
            </div>
          </div>
        </div>

        {/* disclaimers regulatórios XP */}
        <div
          className="mt-14 border-t pt-8"
          style={{ borderColor: "rgba(225,222,205,0.1)" }}
        >
          <p
            className="max-w-4xl font-sans text-[0.7rem] leading-relaxed"
            style={{ color: "rgba(225,222,205,0.45)" }}
          >
            A A.W.A Capital é um escritório de agentes autônomos de investimento credenciado à XP
            Investimentos CCTVM S.A. Este material tem caráter meramente informativo e não deve ser
            considerado como oferta, recomendação ou análise de investimento. Rentabilidade passada
            não representa garantia de rentabilidade futura. Antes de investir, consulte um
            especialista e leia atentamente o material informativo dos produtos indicados. [Texto de
            disclaimer regulatório a ser substituído pelo conteúdo jurídico do site anterior,
            conforme exigências da XP.]
          </p>
        </div>

        {/* linha final */}
        <div
          className="mt-8 flex flex-col gap-3 border-t pt-6 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "rgba(225,222,205,0.1)" }}
        >
          <p className="font-sans text-xs" style={{ color: "rgba(225,222,205,0.5)" }}>
            © A.W.A Capital
          </p>
          <p className="font-sans text-xs" style={{ color: "rgba(225,222,205,0.5)" }}>
            Informações regulatórias
          </p>
        </div>
      </div>
    </footer>
  );
}
