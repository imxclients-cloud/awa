import { Reveal } from "@/components/reveal";
import { SectionBadge } from "@/components/section-badge";
import type { Homepage } from "@/lib/sanity";
import { clean } from "@/lib/sanity-attr";

type Props = {
  data?: Homepage["missaoVisaoValores"] | null;
};

const FALLBACK_ITEMS = [
  {
    label: "Missão",
    text: "Ajudar o investidor a realizar seus sonhos, por meio do conhecimento e com segurança, conectado ao seu propósito.",
    bullets: [] as string[],
  },
  {
    label: "Visão",
    text: "Se consolidar como um grupo financeiro de excelência no Nordeste até 2029.",
    bullets: [] as string[],
  },
  {
    label: "Valores",
    text: "",
    bullets: [
      "Fazer a Coisa Certa",
      "Foco do Cliente",
      "Coração Aprendiz",
      "Ambiente",
      "Ambição.",
    ],
  },
];

function listFromItem(item: { text?: string; bullets?: string[] | null }): string[] {
  if (item.bullets && item.bullets.length > 0) {
    return item.bullets.map((b) => clean(b)).filter(Boolean);
  }
  const text = clean(item.text || "");
  if (text.includes(";")) {
    return text
      .split(";")
      .map((v) => v.trim())
      .filter(Boolean);
  }
  return [];
}

export function MissaoVisaoValores({ data }: Props) {
  const items =
    data?.items && data.items.length > 0
      ? data.items.map((i) => ({
          label: i.label || "",
          text: i.text || "",
          bullets: i.bullets || [],
        }))
      : FALLBACK_ITEMS;

  return (
    <section
      className="relative overflow-hidden py-10 md:py-10 lg:py-20"
      style={{ background: "#FFFFFF" }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {items.map((item, idx) => {
            const label = clean(item.label);
            const bullets = listFromItem(item);
            const asList = bullets.length > 1 || (label.toLowerCase() === "valores" && bullets.length > 0);

            return (
              <Reveal key={label || idx} delay={idx * 120}>
                <div className="h-full rounded-3xl border border-ink-hairline p-8 md:p-10">
                  <SectionBadge>{item.label}</SectionBadge>
                  {asList ? (
                    <ul className="mt-5 flex list-disc flex-col gap-1.5 pl-5 font-sans text-base leading-snug text-ink-muted marker:text-accent md:text-lg">
                      {bullets.map((v, i) => (
                        <li key={`${i}-${v}`}>{v}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-5 font-sans text-lg leading-relaxed text-ink-muted md:text-xl">
                      {item.text}
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
