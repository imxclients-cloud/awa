import { Reveal } from "@/components/reveal";
import planejamentoImg from "@/assets/selos/Planejamento_Patrimonial_light.png";

export function PlanejamentoPilar() {
  return (
    <section
      className="relative overflow-hidden py-12 md:py-14 lg:py-16"
      style={{ background: "#FFFFFF" }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <div className="border-t border-ink-hairline pt-10 md:pt-12">
          <Reveal>
            <p className="font-display text-[0.9rem] font-extrabold tracking-[0.34em] text-accent uppercase">
              Planejamento como pilar
            </p>
          </Reveal>

          <Reveal delay={120}>
            <img
              src={planejamentoImg}
              alt="Planejamento Patrimonial"
              className="mx-auto mt-10 w-full max-w-[500px]"
              loading="lazy"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
