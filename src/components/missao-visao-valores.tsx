import { Reveal } from "@/components/reveal";
import { SectionBadge } from "@/components/section-badge";
import type { Homepage } from "@/lib/sanity";

type Props = {
  data?: Homepage["missaoVisaoValores"] | null;
};

const FALLBACK_ITEMS = [
  {
    label: "Missão",
    text: "Ajudar o investidor a realizar seus sonhos, por meio do conhecimento e com segurança, conectado ao seu propósito.",
  },
  {
    label: "Visão",
    text: "Se consolidar como um grupo financeiro de excelência no Nordeste até 2029.",
  },
  {
    label: "Valores",
    text: "Fazer a Coisa Certa; Foco do Cliente; Coração Aprendiz; Ambiente; Ambição.",
  },
];

export function MissaoVisaoValores({ data }: Props) {
  const items =
    data?.items && data.items.length > 0
      ? data.items.map((i) => ({
          label: i.label || "",
          text: i.text || "",
        }))
      : FALLBACK_ITEMS;

  return (
    <section
      className="relative overflow-hidden py-10 md:py-10 lg:py-20"
      style={{ background: "#FFFFFF" }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {items.map((item, idx) => (
            <Reveal key={item.label || idx} delay={idx * 120}>
              <div className="h-full rounded-3xl border border-ink-hairline p-8 md:p-10">
                <SectionBadge>{item.label}</SectionBadge>
                {item.label === "Valores" && item.text.includes(";") ? (
                  <ul className="mt-5 flex list-disc flex-col gap-1.5 pl-5 font-sans text-base leading-snug text-ink-muted marker:text-accent md:text-lg">
                    {item.text.split(";").map((v) => (
                      <li key={v.trim()}>{v.trim()}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-5 font-sans text-lg leading-relaxed text-ink-muted md:text-xl">
                    {item.text}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
