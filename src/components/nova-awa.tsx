import { Reveal } from "@/components/reveal";

export function NovaAwa() {
  return (
    <section id="sobre" className="relative bg-background py-16 md:py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <div className="max-w-[820px]">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-accent px-5 py-2 font-display text-[0.7rem] font-extrabold tracking-[0.06em] text-accent uppercase md:text-xs">
              Uma nova marca. Uma visão ainda mais ampla.
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-8 font-display text-[2rem] leading-[1.08] font-extrabold tracking-tight text-foreground md:text-5xl lg:text-[3.25rem]">
              Agora, mais do que investimentos.
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-8 max-w-[640px] font-sans text-base leading-relaxed text-foreground md:text-lg">
              A A.W.A Capital nasce da evolução de uma trajetória construída com confiança,
              conhecimento e foco no cliente.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <p className="mt-6 max-w-[680px] font-sans text-base leading-relaxed text-foreground/55 md:text-lg">
              Expandimos nossa atuação para oferecer soluções financeiras mais completas para
              pessoas, famílias e empresas, preservando o que sempre fez parte da nossa essência:
              proximidade, segurança e compromisso com cada objetivo.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-10">
              <a
                href="#solucoes"
                className="inline-flex items-center rounded-full border border-hairline bg-glass-light px-7 py-3.5 font-sans text-sm font-semibold text-foreground backdrop-blur-glass transition-colors hover:border-accent hover:text-accent md:text-base"
              >
                Conheça a A.W.A Capital
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
