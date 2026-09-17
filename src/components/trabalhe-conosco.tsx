import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/reveal";
import { whatsappExpansao } from "@/lib/contact";

export function TrabalheConosco() {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", linkedin: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mensagem = `Olá, quero fazer parte da A.W.A!\nNome: ${form.nome}\nE-mail: ${form.email}\nTelefone: ${form.telefone}\nLinkedIn: ${form.linkedin}`;
    window.open(whatsappExpansao(mensagem), "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="trabalhe-conosco"
      className="relative overflow-hidden bg-surface-light py-16 md:py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Reveal>
              <span className="font-display text-[0.7rem] font-extrabold tracking-[0.34em] text-accent uppercase">
                Trabalhe conosco
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-display text-[1.75rem] leading-[1.1] font-extrabold tracking-tight text-ink md:text-4xl lg:text-[2.4rem]">
                Quero fazer parte da A.W.A.
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-ink-muted md:text-lg">
                Fale diretamente com o nosso time de Expansão pelo WhatsApp, ou deixe seus dados
                que entraremos em contato.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <a
                href={whatsappExpansao(
                  "Olá, gostaria de falar com o time de Expansão da A.W.A Capital.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center rounded-full border border-accent-hairline px-6 py-3.5 font-sans text-sm font-semibold text-ink transition-colors hover:bg-accent/10"
              >
                Falar com o time de Expansão — (98) 99967-2335
              </a>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-ink-hairline bg-white p-7 md:p-9"
            >
              <div className="grid gap-5">
                <label className="flex flex-col gap-1.5">
                  <span className="font-sans text-sm font-medium text-ink">Nome</span>
                  <input
                    required
                    value={form.nome}
                    onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                    className="rounded-xl border border-ink-hairline px-4 py-2.5 font-sans text-sm text-ink outline-none focus:border-accent"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-sans text-sm font-medium text-ink">E-mail</span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="rounded-xl border border-ink-hairline px-4 py-2.5 font-sans text-sm text-ink outline-none focus:border-accent"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-sans text-sm font-medium text-ink">Telefone</span>
                  <input
                    required
                    value={form.telefone}
                    onChange={(e) => setForm((f) => ({ ...f, telefone: e.target.value }))}
                    className="rounded-xl border border-ink-hairline px-4 py-2.5 font-sans text-sm text-ink outline-none focus:border-accent"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-sans text-sm font-medium text-ink">LinkedIn</span>
                  <input
                    value={form.linkedin}
                    onChange={(e) => setForm((f) => ({ ...f, linkedin: e.target.value }))}
                    className="rounded-xl border border-ink-hairline px-4 py-2.5 font-sans text-sm text-ink outline-none focus:border-accent"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center rounded-full px-7 py-3.5 font-sans text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ background: "#FEB202", color: "#232323" }}
                >
                  Quero fazer parte da A.W.A
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
