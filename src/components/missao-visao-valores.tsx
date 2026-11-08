import { Reveal } from "@/components/reveal";
import { SectionBadge } from "@/components/section-badge";
import type { Homepage } from "@/lib/sanity";
import { Doc, clean, editAttr } from "@/lib/sanity-attr";

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

function itemPath(item: { _key?: string }, idx: number, field: string): string {
  if (item._key) return `missaoVisaoValores.items[_key=="${item._key}"].${field}`;
  return `missaoVisaoValores.items[${idx}].${field}`;
}

export function MissaoVisaoValores({ data }: Props) {
  const fromCms = Boolean(data?.items && data.items.length > 0);
  const items =
    fromCms && data?.items
      ? data.items.map((i) => ({
          _key: i._key,
          label: i.label || "",
          text: i.text || "",
          bullets: i.bullets || [],
        }))
      : FALLBACK_ITEMS.map((i) => ({ ...i, _key: undefined as string | undefined }));

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
            const asList =
              bullets.length > 1 || (label.toLowerCase() === "valores" && bullets.length > 0);
            const labelAttr = fromCms ? editAttr(Doc.sobre, itemPath(item, idx, "label")) : undefined;
            const textAttr = fromCms ? editAttr(Doc.sobre, itemPath(item, idx, "text")) : undefined;

            return (
              <Reveal key={item._key || label || idx} delay={idx * 120}>
                <div className="h-full rounded-3xl border border-ink-hairline p-8 md:p-10">
                  <SectionBadge data-sanity={labelAttr}>{item.label}</SectionBadge>
                  {asList ? (
                    <ul className="mt-5 flex list-disc flex-col gap-1.5 pl-5 font-sans text-base leading-snug text-ink-muted marker:text-accent md:text-lg">
                      {bullets.map((v, i) => {
                        const bulletAttr = fromCms
                          ? editAttr(Doc.sobre, itemPath(item, idx, `bullets[${i}]`))
                          : undefined;
                        return (
                          <li key={`${i}-${v}`} data-sanity={bulletAttr}>
                            {v}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p
                      data-sanity={textAttr}
                      className="mt-5 font-sans text-lg leading-relaxed text-ink-muted md:text-xl"
                    >
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
