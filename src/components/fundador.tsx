import { useState } from "react";
import { Reveal } from "@/components/reveal";

const PODCAST_VIDEO_ID = "bd1KNDiwY-I";

export function Fundador() {
  const [videoStarted, setVideoStarted] = useState(false);

  return (
    <section className="relative overflow-hidden bg-surface-light py-16 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          {/* foto / vídeo do podcast */}
          <Reveal>
            <div className="mx-auto w-full max-w-[420px]">
              <div
                className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-ink-hairline bg-glass-on-light"
                data-slot="foto-nazareno-lima"
                aria-label="Foto de Nazareno Lima, CEO e Fundador da A.W.A Capital"
              />
              <p className="mt-3 text-center font-sans text-xs text-ink-muted">
                Espaço reservado para foto de Nazareno Lima.
              </p>
            </div>
          </Reveal>

          {/* texto */}
          <div>
            <Reveal delay={100}>
              <span className="font-display text-[0.7rem] font-extrabold tracking-[0.34em] text-accent uppercase">
                Nosso fundador
              </span>
            </Reveal>
            <Reveal delay={160}>
              <h3 className="mt-5 font-display text-[1.6rem] leading-[1.14] font-extrabold tracking-tight text-ink md:text-3xl">
                Nazareno Lima — CEO e Fundador da A.W.A Capital
              </h3>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-ink-muted md:text-lg">
                Ex-camelô, Nazareno Lima construiu a A.W.A Capital a partir de uma trajetória
                marcada por superação e reinvenção. Essa mentalidade transformadora carrega a
                essência edificadora que a empresa busca transmitir a todos os seus clientes, por
                meio dos seus profissionais.
              </p>
            </Reveal>

            <Reveal delay={280}>
              <blockquote className="mt-8 border-l-2 border-accent pl-5 font-display text-lg leading-snug font-bold text-ink md:text-xl">
                “Meu chamado é deixar uma marca edificadora no coração das pessoas por meio do
                mercado financeiro e empresarial.”
              </blockquote>
            </Reveal>

            <Reveal delay={340}>
              <div className="mt-8">
                <div
                  className="relative aspect-video w-full max-w-md overflow-hidden rounded-2xl border border-ink-hairline bg-ink/5"
                  data-slot="video-podcast-raony"
                  aria-label="Vídeo do podcast com Raony"
                >
                  {videoStarted ? (
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={`https://www.youtube-nocookie.com/embed/${PODCAST_VIDEO_ID}?autoplay=1&rel=0`}
                      title="Vídeo do podcast com Raony"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setVideoStarted(true)}
                      className="group absolute inset-0 h-full w-full cursor-pointer"
                      aria-label="Reproduzir vídeo do podcast com Raony"
                    >
                      <img
                        src={`https://i.ytimg.com/vi/${PODCAST_VIDEO_ID}/maxresdefault.jpg`}
                        alt="Capa do vídeo do podcast com Raony"
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
