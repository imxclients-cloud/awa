import { Reveal } from "@/components/reveal";

export function NovaAwa() {
  return (
    <section id="sobre" className="relative bg-white py-10 md:py-12 lg:py-14">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        {/* "Sobre nós" enxuto: somente o selo, seguindo direto para o fundador e o vídeo */}
        <Reveal>
          <span className="inline-flex items-center rounded-full border border-accent px-5 py-2 font-display text-[0.7rem] font-extrabold tracking-[0.06em] text-accent uppercase md:text-xs">
            Sobre nós
          </span>
        </Reveal>
      </div>
    </section>
  );
}
