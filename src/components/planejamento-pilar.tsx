import { Reveal } from "@/components/reveal";
import { SectionBadge } from "@/components/section-badge";

export function PlanejamentoPilar() {
  return (
    <section
      className="relative overflow-hidden py-10 md:py-10 lg:py-20"
      style={{ background: "#FFFFFF" }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <div className="border-t border-ink-hairline pt-10 md:pt-12">
          <Reveal className="flex justify-center">
            <SectionBadge>Planejamento como pilar</SectionBadge>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
