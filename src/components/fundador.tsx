import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { SectionBadge } from "@/components/section-badge";
import fotoNazareno from "@/assets/Naza 2.jpeg";
import {
  portableTextToPlain,
  sanityImageUrl,
  type Homepage,
} from "@/lib/sanity";

type Props = {
  data?: Homepage["fundador"] | null;
};

const FALLBACK_BODY =
  "Ex-camelô, Nazareno Lima construiu a A.W.A Capital a partir de uma trajetória marcada por superação e reinvenção. Esse espírito transformador de prosperidade e realização de sonhos é o que buscamos desenvolver em todos os nossos clientes.";

export function Fundador({ data }: Props) {
  const [videoStarted, setVideoStarted] = useState(false);

  const badge = data?.badge?.trim() || "Sobre nós";
  const name = data?.name?.trim() || "Nazareno Lima";
  const title = data?.title?.trim() || "Conheça o nosso CEO e Fundador";
  const body = portableTextToPlain(data?.body) || FALLBACK_BODY;
  const photoSrc = sanityImageUrl(data?.photo, 840) || fotoNazareno;
  const photoAlt =
    (data?.photo as { alt?: string } | undefined)?.alt ||
    `Foto de ${name}, CEO e Fundador da A.W.A Capital`;
  const videoId = data?.podcastVideoId?.trim() || "bd1KNDiwY-I";
  const podcastTitle = data?.podcastTitle?.trim() || "Vídeo do podcast com Raony";

  return (
    <section
      id="sobre"
      className="relative overflow-hidden bg-surface-light py-10 md:py-10 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 text-center md:px-8">
        <Reveal>
          <SectionBadge>{badge}</SectionBadge>
        </Reveal>
      </div>

      <div className="mt-10 mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          <Reveal>
            <div className="mx-auto w-full max-w-[420px]">
              <div
                className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-ink-hairline bg-glass-on-light"
                data-slot="foto-nazareno-lima"
              >
                <img
                  src={photoSrc}
                  alt={photoAlt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <p className="mt-4 text-center font-display text-lg font-extrabold tracking-tight text-ink">
                {name}
              </p>
            </div>
          </Reveal>

          <div className="text-center lg:text-left">
            <Reveal delay={160}>
              <h3 className="mt-5 font-display text-[1.6rem] leading-[1.14] font-extrabold tracking-tight text-ink md:text-3xl">
                {title}
              </h3>
            </Reveal>
            <Reveal delay={220}>
              <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-ink-muted md:text-lg lg:mx-0 whitespace-pre-line">
                {body}
              </p>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-8 flex justify-center lg:justify-start">
                <div
                  className="relative aspect-video w-full max-w-md overflow-hidden rounded-2xl border border-ink-hairline bg-ink/5"
                  data-slot="video-podcast-raony"
                  aria-label={podcastTitle}
                >
                  {videoStarted ? (
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                      title={podcastTitle}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setVideoStarted(true)}
                      className="group absolute inset-0 h-full w-full cursor-pointer"
                      aria-label={`Reproduzir ${podcastTitle}`}
                    >
                      <img
                        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                        alt={`Capa: ${podcastTitle}`}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-ink/25 transition-colors group-hover:bg-ink/35">
                        <span className="flex h-14 w-20 items-center justify-center rounded-xl bg-red-600 shadow-lg transition-transform group-hover:scale-110">
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-7 w-7 text-white"
                            aria-hidden="true"
                          >
                            <path d="M8 5.14v14l11-7-11-7z" />
                          </svg>
                        </span>
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
