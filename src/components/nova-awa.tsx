import { Reveal } from "@/components/reveal";

export function NovaAwa() {
  return (
    <section id="sobre" className="relative bg-white py-16 md:py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <div className="">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-accent px-5 py-2 font-display text-[0.7rem] font-extrabold tracking-[0.06em] text-accent uppercase md:text-xs">
              Sobre nós
            </span>
          </Reveal>

          <Reveal delay={140}>
            <h2 className="mt-8 font-display text-[1.6rem] leading-[1.16] font-extrabold tracking-tight text-ink md:text-4xl">
              Somos uma assessoria em investimentos e planejamento patrimonial para pessoas,
              famílias e empresários que querem proteger, expandir e perpetuar seu patrimônio.
            </h2>
          </Reveal>

          <Reveal delay={260}>
            <p className="mt-6 max-w-[680px] font-sans text-base leading-relaxed text-ink-muted md:text-lg">
              A A.W.A Capital nasce da evolução de uma trajetória construída com confiança,
              conhecimento e foco no cliente. 
            </p>
            <p className="mt-4 max-w-[680px] font-sans text-base leading-relaxed text-ink-muted md:text-lg">
              Criada pelo ex-camelô, Nazareno Lima, a A.W.A Capital carrega a essência da mentalidade transformadora do seu fundador em seu DNA. É esse o espírito edificador, que buscamos transmitir a todos os nossos clientes através dos nossos profissionais.
            </p>
            <p className="mt-4 max-w-[680px] font-sans text-base leading-relaxed text-ink-muted md:text-lg">
              Agora, mais do que Finanças e Investimentos.
              Expandimos nossa atuação para oferecer soluções mais completas a Famílias e Empresas também nas esferas de Sucessão Patrimonial, Gestão de Risco e Eficiência Tributária.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
