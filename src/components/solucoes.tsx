import { Reveal } from "@/components/reveal";

const solucoes = [
  {
    numero: "01",
    titulo: "Investimentos",
    descricao:
      "Estratégias de investimento construídas de acordo com seu perfil, seus objetivos e seu momento de vida.",
    link: "Conheça nossas soluções de investimentos.",
  },
  {
    numero: "02",
    titulo: "Wealth Services",
    descricao:
      "Planejamento patrimonial para clientes Private, com olhar integrado para proteção, sucessão, eficiência e legado.",
    link: "Conheça o Wealth Services.",
  },
  {
    numero: "03",
    titulo: "Soluções para empresas",
    descricao:
      "Estratégias financeiras para apoiar a gestão, o crescimento e as decisões de empresas em diferentes momentos.",
    link: "Conheça nossas soluções empresariais.",
  },
  {
    numero: "04",
    titulo: "Planejamento financeiro",
    descricao:
      "Clareza para organizar objetivos, tomar decisões e estruturar o futuro com mais segurança.",
    link: "Comece seu planejamento.",
  },
];

export function Solucoes() {
  return (
    <section id="solucoes" className="bg-surface-light py-16 md:py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <h2 className="font-display text-[1.8rem] leading-[1.12] font-extrabold tracking-tight text-ink md:text-4xl lg:text-[2.75rem]">
              Soluções para cada dimensão da sua vida financeira
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 font-sans text-base leading-relaxed text-ink-muted md:text-lg">
              Cada patrimônio, empresa e projeto de vida exige uma estratégia própria. Por isso,
              reunimos diferentes verticais de negócio para construir soluções personalizadas e
              integradas.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-2 lg:gap-8">
          {solucoes.map((item, i) => (
            <Reveal key={item.titulo} delay={200 + i * 110}>
              <article className="group h-full rounded-3xl border border-ink-hairline bg-glass-on-light p-7 backdrop-blur-glass transition-all duration-500 hover:-translate-y-1 hover:border-accent-hairline md:p-9">
                <span className="font-display text-sm font-extrabold tracking-[0.18em] text-accent">
                  {item.numero}
                </span>
                <h3 className="mt-5 font-display text-xl leading-tight font-bold text-ink md:text-2xl">
                  {item.titulo}
                </h3>
                <p className="mt-4 font-sans text-base leading-relaxed text-ink-muted">
                  {item.descricao}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
