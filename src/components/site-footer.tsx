import awaLogo from "@/assets/logo-horizontal.svg.asset.json";

const colunas = [
  { titulo: "Institucional", links: ["Sobre a A.W.A", "Soluções", "Wealth Services", "Para empresas"] },
  { titulo: "Conteúdos", links: ["Conteúdos", "Carreira", "Contato"] },
  { titulo: "Legal", links: ["Política de privacidade", "Termos de uso", "Avisos legais"] },
  { titulo: "Mais", links: ["Redes sociais", "Informações regulatórias"] },
];

function LinkFooter({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#"
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
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
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
                  <li key={l}>
                    <LinkFooter>{l}</LinkFooter>
                  </li>
                ))}
              </ul>
              {i === 3 && (
                <div className="mt-6 flex items-center gap-4">
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
              )}
            </div>
          ))}
        </div>

        {/* linha final */}
        <div
          className="mt-14 flex flex-col gap-3 border-t pt-6 md:flex-row md:items-center md:justify-between"
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
