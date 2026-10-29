import { Reveal } from "@/components/reveal";
import { SectionBadge } from "@/components/section-badge";
import { diretoria } from "@/lib/diretoria";
import { sanityImageUrl, type Homepage } from "@/lib/sanity";

type Props = {
  data?: Homepage["diretoria"] | null;
};

const normalizeName = (nome: string) =>
  nome
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const fotoLocalPorNome = new Map(
  diretoria.map((p) => [normalizeName(p.nome), p.foto as string]),
);

function resolveFoto(
  nome: string,
  sanityPhoto: Parameters<typeof sanityImageUrl>[0] | undefined,
): string {
  const fromSanity = sanityImageUrl(sanityPhoto, 713);
  if (fromSanity) return fromSanity;

  const local = fotoLocalPorNome.get(normalizeName(nome));
  if (local) return local;

  const parts = normalizeName(nome).split(" ").filter(Boolean);
  if (parts.length >= 2) {
    for (const [key, val] of fotoLocalPorNome) {
      const kp = key.split(" ");
      if (kp[0] === parts[0] && kp[kp.length - 1] === parts[parts.length - 1]) {
        return val;
      }
    }
  }
  return "";
}

export function Diretores({ data }: Props) {
  const badge = data?.badge?.trim() || "Nossa equipe";
  const title = data?.title?.trim() || "Diretoria";

  const members =
    data?.members && data.members.length > 0
      ? data.members.map((m) => ({
          nome: m.name || "",
          cargo: m.role || "",
          bio: m.bio || "",
          foto: resolveFoto(m.name || "", m.photo),
        }))
      : diretoria.map((p) => ({
          nome: p.nome,
          cargo: p.cargo,
          bio: p.bio,
          foto: p.foto,
        }));

  return (
    <section className="relative overflow-hidden bg-white py-10 md:py-10 lg:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 text-center md:px-8">
        <Reveal className="flex justify-center">
          <SectionBadge>{badge}</SectionBadge>
        </Reveal>

        <div className="mt-12 text-left">
          <Reveal delay={140}>
            <h3 className="font-display text-sm font-bold tracking-wide text-ink uppercase">
              {title}
            </h3>
          </Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((p, i) => (
              <Reveal key={p.nome || i} delay={180 + i * 90} className="h-full">
                <article
                  data-slot={`profissional-diretoria-${i + 1}`}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink-hairline bg-white"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-glass-on-light">
                    {p.foto ? (
                      <img
                        src={p.foto}
                        alt={`Foto de ${p.nome}, ${p.cargo} da A.W.A Capital`}
                        loading="lazy"
                        width={713}
                        height={713}
                        className="absolute inset-0 h-full w-full object-cover object-top"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-display text-base leading-snug font-bold text-ink">{p.nome}</p>
                    <p className="mt-1 font-display text-sm font-extrabold tracking-[0.1em] text-accent uppercase">
                      {p.cargo}
                    </p>
                    {p.bio ? (
                      <p className="mt-3 font-sans text-sm leading-relaxed text-ink-muted">{p.bio}</p>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
