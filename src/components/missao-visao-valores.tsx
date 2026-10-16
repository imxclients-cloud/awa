import { Reveal } from "@/components/reveal";

/** Valores da empresa — origem: documento de ajustes do cliente. */
const valores = [
  "Fazer a Coisa Certa",
  "Foco do Cliente",
  "Coração Aprendiz",
  "Ambiente",
  "Ambição",
];

export function MissaoVisaoValores() {
  return (
    <section
      className="relative overflow-hidden py-16 md:py-20 lg:py-24"
      style={{ background: "#FFFFFF" }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <Reveal>
            <div className="h-full rounded-3xl border border-ink-hairline p-8 md:p-10">
              <span className="font-display text-[0.7rem] font-extrabold tracking-[0.28em] text-accent uppercase">
                Missão
              </span>
              <p className="mt-5 font-sans text-lg leading-relaxed text-ink-muted md:text-xl">
                Ajudar o investidor a realizar seus sonhos, por meio do conhecimento e com
                segurança, conectado ao seu propósito.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="h-full rounded-3xl border border-ink-hairline p-8 md:p-10">
              <span className="font-display text-[0.7rem] font-extrabold tracking-[0.28em] text-accent uppercase">
                Visão
              </span>
              <p className="mt-5 font-sans text-lg leading-relaxed text-ink-muted md:text-xl">
                Se consolidar como um grupo financeiro de excelência no Nordeste até 2029.
              </p>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div className="h-full rounded-3xl border border-ink-hairline p-8 md:p-10">
              <span className="font-display text-[0.7rem] font-extrabold tracking-[0.28em] text-accent uppercase">
                Valores
              </span>
              <ul className="mt-5 flex flex-wrap gap-2">
                {valores.map((valor) => (
                  <li
                    key={valor}
                    className="inline-flex items-center rounded-full border border-accent-hairline px-4 py-2 font-sans text-sm leading-snug text-ink-muted md:text-base"
                  >
                    {valor}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
