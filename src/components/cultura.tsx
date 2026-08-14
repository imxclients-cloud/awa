import { Reveal } from "@/components/reveal";

const principios = [
  { nome: "Fazer a coisa certa", pos: "lg:translate-y-0" },
  { nome: "Foco no cliente", pos: "lg:-translate-y-6" },
  { nome: "Coração aprendiz", pos: "lg:-translate-y-10" },
  { nome: "Ambiente", pos: "lg:-translate-y-6" },
  { nome: "Ambição", pos: "lg:translate-y-0" },
];

export function Cultura() {
  return (
    <section
      id="cultura"
      className="relative overflow-hidden py-16 md:py-20 lg:py-28"
      style={{ background: "#FFFFFF" }}
    >
      {/* grão de papel/linho */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(35,35,35,0.035) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(35,35,35,0.03) 0 1px, transparent 1px 3px)",
        }}
      />
      {/* brilho quente central */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(48% 42% at 50% 38%, rgba(254,178,2,0.14) 0%, rgba(254,178,2,0.05) 45%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[880px] flex-col items-center px-5 text-center md:px-8">
        <Reveal>
          <span className="font-display text-[0.7rem] font-extrabold tracking-[0.34em] text-accent uppercase">
            Nosso jeito de fazer
          </span>
        </Reveal>
        <Reveal delay={110}>
          <h2
            className="mt-6 font-display text-[1.8rem] leading-[1.12] font-extrabold tracking-tight md:text-4xl lg:text-[2.7rem]"
            style={{ color: "#232323" }}
          >
            Crescer com o cliente.
            <br />
            Prosperar com propósito.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p
            className="mt-7 max-w-[620px] font-sans text-base leading-relaxed md:text-lg"
            style={{ color: "rgba(35,35,35,0.8)" }}
          >
            Acreditamos que vender é ajudar. Por isso, construímos relações baseadas em conhecimento,
            transparência, proximidade e compromisso com decisões que possam gerar valor no longo
            prazo.
          </p>
        </Reveal>
        <Reveal delay={280}>
          <p
            className="mt-12 font-sans text-sm md:text-base"
            style={{ color: "rgba(35,35,35,0.5)" }}
          >
            Nossa cultura é guiada por cinco princípios:
          </p>
        </Reveal>

        {/* arranjo em arco / não-linear */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:mt-10 md:gap-4">
          {principios.map((p, i) => (
            <Reveal
              key={p.nome}
              delay={340 + i * 150}
              className={`${p.pos} ${i % 2 === 0 ? "translate-y-1.5" : "-translate-y-1.5"} transition-transform`}
            >
              <span
                className="inline-flex cursor-default items-center rounded-full border px-5 py-2.5 font-sans text-sm font-medium transition-colors duration-300 md:px-6 md:py-3"
                style={{
                  borderColor: "rgba(254,178,2,0.55)",
                  color: "#232323",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(254,178,2,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {p.nome}
              </span>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
