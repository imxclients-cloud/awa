import { Reveal } from "@/components/reveal";

export function NovaAwa() {
  return (
    <section id="sobre" className="relative bg-white py-16 md:py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <div className="max-w-[820px]">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-accent px-5 py-2 font-display text-[0.7rem] font-extrabold tracking-[0.06em] text-accent uppercase md:text-xs">
              Uma nova marca. Uma visão ainda mais ampla.
            </span>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-8 max-w-[680px] font-sans text-base leading-relaxed text-ink md:text-lg">
              A A.W.A Capital nasce da evolução de uma trajetória construída com confiança,
              conhecimento e foco no cliente.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <p className="mt-6 max-w-[680px] font-sans text-base leading-relaxed text-ink-muted md:text-lg">
              Criada pelo e ex-camelô, Nazareno Lima, a A.W.A Capital carrega a essência da
              mentalidade transformadora do seu fundador em seu DNA. É esse o espírito edificador,
              que buscamos transmitir a todos os nossos clientes através dos nossos profissionais.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <h3 className="mt-12 font-display text-[1.5rem] leading-[1.12] font-extrabold tracking-tight text-ink md:text-3xl">
              Agora, mais do que Finanças e Investimentos.
            </h3>
          </Reveal>

          <Reveal delay={380}>
            <p className="mt-6 max-w-[680px] font-sans text-base leading-relaxed text-ink-muted md:text-lg">
              Expandimos nossa atuação para oferecer soluções mais completas a Famílias e Empresas
              também nas esferas de Sucessão Patrimonial, Gestão de Risco e Eficiência Tributária.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
