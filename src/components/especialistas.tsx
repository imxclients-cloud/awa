import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { ModalFoto } from "@/components/modal-foto";
import {
  especialistas as especialistasFallback,
  especialistaNomeAliases,
} from "@/lib/diretoria";
import { sanityImageUrl, type Homepage } from "@/lib/sanity";

type Props = {
  data?: Homepage["especialistas"] | null;
};

const iniciais = (nome: string) =>
  nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

const normalizeName = (nome: string) =>
  nome
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

/** Apenas a lista local de ESPECIALISTAS (nunca assessores). */
const fotoLocalPorNome = new Map(
  especialistasFallback
    .filter((e) => e.foto)
    .map((e) => [normalizeName(e.nome), e.foto as string]),
);

function resolveFotoLocal(nome: string): string | undefined {
  const n = normalizeName(nome);
  const aliased = especialistaNomeAliases[n] || n;
  if (fotoLocalPorNome.has(aliased)) return fotoLocalPorNome.get(aliased);
  if (fotoLocalPorNome.has(n)) return fotoLocalPorNome.get(n);

  const parts = n.split(" ").filter(Boolean);
  if (parts.length >= 2) {
    for (const [key, val] of fotoLocalPorNome) {
      const kp = key.split(" ");
      if (kp[0] === parts[0] && kp[kp.length - 1] === parts[parts.length - 1]) {
        return val;
      }
    }
  }
  return undefined;
}

function resolveFoto(
  nome: string,
  sanityPhoto: Parameters<typeof sanityImageUrl>[0] | undefined,
): string | undefined {
  const fromSanity = sanityImageUrl(sanityPhoto, 400);
  if (fromSanity) return fromSanity;
  return resolveFotoLocal(nome);
}

function imgSrc(src: string) {
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:")) {
    return src;
  }
  return encodeURI(src);
}

/**
 * Seção Especialistas da HOME.
 * Usa só os 8 especialistas (diretoria.ts) — NÃO a lista de Assessores.
 * Se o Sanity mandar membros, filtra por category !== assessor e resolve foto local.
 */
export function Especialistas({ data }: Props) {
  const [fotoAberta, setFotoAberta] = useState<{
    nome: string;
    cargo: string;
    src: string;
  } | null>(null);

  const title = data?.title?.trim() || "Especialistas";

  // Se Sanity trouxer membros válidos de especialista, usa; senão lista local fixa
  const fromCms = (data?.members ?? []).filter((m) => {
    const cat = (m.category || "").toLowerCase();
    // ignora assessores e diretoria se vierem misturados por engano
    if (cat === "assessor" || cat === "diretoria") return false;
    return Boolean(m.name);
  });

  const lista =
    fromCms.length > 0
      ? fromCms.map((m) => {
          const nome = m.name || "";
          return {
            nome,
            funcao: m.role || "",
            foto: resolveFoto(nome, m.photo),
          };
        })
      : especialistasFallback.map((e) => ({
          nome: e.nome,
          funcao: e.funcao,
          foto: e.foto,
        }));

  return (
    <>
      <section className="relative overflow-hidden bg-white py-10 md:py-10 lg:py-20">
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
          <div className="text-left">
            <Reveal delay={140}>
              <h3 className="font-display text-sm font-bold tracking-wide text-ink uppercase">
                {title}
              </h3>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {lista.map((e, i) => (
                <Reveal key={e.nome || i} delay={180 + (i % 4) * 80} className="h-full">
                  <article
                    data-slot={`especialista-${i + 1}`}
                    className="flex h-full flex-col items-center rounded-2xl border border-ink-hairline bg-white px-5 py-7 text-center cursor-pointer"
                    onClick={() =>
                      e.foto &&
                      setFotoAberta({
                        nome: e.nome,
                        cargo: e.funcao,
                        src: imgSrc(e.foto),
                      })
                    }
                  >
                    <div className="relative size-28 shrink-0 overflow-hidden rounded-full bg-glass-on-light">
                      {e.foto ? (
                        <img
                          src={imgSrc(e.foto)}
                          alt={`Foto de ${e.nome}, ${e.funcao} da A.W.A Capital`}
                          loading="lazy"
                          width={112}
                          height={112}
                          className="absolute inset-0 h-full w-full object-cover object-top"
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="flex h-full w-full items-center justify-center font-display text-xl font-extrabold text-ink-muted"
                        >
                          {iniciais(e.nome)}
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex flex-1 flex-col">
                      <p className="font-display text-base leading-snug font-bold text-ink">
                        {e.nome}
                      </p>
                      <p className="mt-1.5 font-sans text-sm leading-relaxed text-ink-muted">
                        {e.funcao}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ModalFoto foto={fotoAberta} onClose={() => setFotoAberta(null)} />
    </>
  );
}
