import { Reveal } from "@/components/reveal";
import seloImagem from "@/assets/selos/imagem (32).png";

const selos = [
  { titulo: "S20", texto: "2020: 20 melhores escritórios XP do Brasil com até 2 anos de vida" },
  { titulo: "Melhor do Nordeste", texto: "2021: Selo de melhor escritório do Nordeste" },
  { titulo: "Governança", texto: "2024 e 2025: Conquista do Selo de Governança e Integridade XP" },
  { titulo: "Mesa de RV", texto: "2022: Mesa de Renda Variável entre as 15 melhores do Brasil" },
  { titulo: "Expansão", texto: "2023: 13º escritório XP que mais cresce no Brasil" },
  { titulo: "Satisfação", texto: "2025: Conquista do Selo NPS XP" },
];

export function Premios() {
  return (
    <section className="relative overflow-hidden bg-surface-light py-16 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <Reveal>
          <span className="font-display text-[0.7rem] font-extrabold tracking-[0.34em] text-accent uppercase">
            Mural de conquistas
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-5 max-w-2xl font-display text-[1.6rem] leading-[1.14] font-extrabold tracking-tight text-ink md:text-3xl lg:text-[2.2rem]">
            Selos e prêmios que marcam nossa trajetória.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {selos.map((s, i) => (
            <Reveal key={s.titulo} delay={140 + i * 90}>
              <div className="flex h-full flex-col items-center rounded-2xl border border-ink-hairline bg-white p-8 text-center">
                <img
                  src={seloImagem}
                  alt=""
                  aria-hidden
                  className="h-28 w-28 object-contain"
                  loading="lazy"
                />
                <h3 className="mt-6 font-display text-base font-bold text-ink">{s.titulo}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ink-muted">{s.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
