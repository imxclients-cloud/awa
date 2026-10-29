import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/reveal";
import { SectionBadge } from "@/components/section-badge";
import { whatsappExpansao } from "@/lib/contact";
import type { Homepage } from "@/lib/sanity";

type Props = { data?: Homepage["trabalheConosco"] | null };

type Status = "idle" | "sending" | "success" | "error";

export function TrabalheConosco({ data }: Props) {
  const sectionId = data?.sectionId || "trabalhe-conosco";
  const badge = data?.badge?.trim() || "Trabalhe conosco";
  const title = data?.title?.trim() || "Quero fazer parte da A.W.A.";
  const subtitle =
    data?.subtitle?.trim() ||
    "Fale diretamente com o nosso time de Expansão pelo WhatsApp, ou deixe seus dados que entraremos em contato.";

  const formTitle = data?.formTitle?.trim() || "Envie seus dados";
  const labelNome = data?.labelNome?.trim() || "Nome";
  const placeholderNome = data?.placeholderNome?.trim() || "Seu nome completo";
  const labelEmail = data?.labelEmail?.trim() || "E-mail";
  const placeholderEmail = data?.placeholderEmail?.trim() || "seu@email.com";
  const labelTelefone = data?.labelTelefone?.trim() || "Telefone";
  const placeholderTelefone = data?.placeholderTelefone?.trim() || "(98) 99999-9999";
  const labelLinkedin = data?.labelLinkedin?.trim() || "LinkedIn";
  const placeholderLinkedin = data?.placeholderLinkedin?.trim() || "linkedin.com/in/seu-perfil";
  const submitLabel = data?.submitLabel?.trim() || "Quero fazer parte da A.W.A";
  const successMessage =
    data?.successMessage?.trim() || "Recebemos seus dados! Em breve entraremos em contato.";
  const alsoOpenWhatsapp = data?.alsoOpenWhatsapp !== false;

  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    linkedin: "",
    website: "", // honeypot
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          telefone: form.telefone,
          linkedin: form.linkedin,
          source: "trabalhe-conosco",
          website: form.website,
        }),
      });

      const payload = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
      };

      if (!res.ok || !payload.ok) {
        throw new Error(payload.message || "Falha ao enviar");
      }

      setStatus("success");
      setForm({ nome: "", email: "", telefone: "", linkedin: "", website: "" });

      if (alsoOpenWhatsapp) {
        const mensagem = `Olá, quero fazer parte da A.W.A!\nNome: ${form.nome}\nE-mail: ${form.email}\nTelefone: ${form.telefone}\nLinkedIn: ${form.linkedin}`;
        window.open(whatsappExpansao(mensagem), "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Não foi possível enviar.");
    }
  };

  return (
    <section
      id={sectionId}
      className="relative overflow-hidden bg-surface-light py-10 md:py-10 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Reveal className="flex justify-center lg:justify-start">
              <SectionBadge>{badge}</SectionBadge>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-display text-[1.75rem] leading-[1.1] font-extrabold tracking-tight text-ink md:text-4xl lg:text-[2.4rem]">
                {title}
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-ink-muted md:text-lg">
                {subtitle}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <a
                href={whatsappExpansao(
                  "Olá, gostaria de falar com o time de Expansão da A.W.A Capital.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center rounded-full border border-accent px-6 py-3.5 font-sans text-sm font-semibold text-ink transition-colors hover:bg-accent/10"
              >
                {data?.cta?.label?.trim() || "Falar com o time de Expansão — (98) 99967-2335"}
              </a>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-ink-hairline bg-white p-6 shadow-sm md:p-8"
              noValidate
            >
              <h3 className="font-display text-lg font-extrabold tracking-tight text-ink md:text-xl">
                {formTitle}
              </h3>

              {/* honeypot — oculto */}
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              <div className="mt-6 flex flex-col gap-4">
                <label className="flex flex-col gap-1.5 text-left">
                  <span className="font-sans text-xs font-semibold tracking-wide text-ink uppercase">
                    {labelNome}
                  </span>
                  <input
                    required
                    value={form.nome}
                    onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                    placeholder={placeholderNome}
                    className="rounded-xl border border-ink-hairline bg-white px-4 py-3 font-sans text-sm text-ink outline-none focus:border-accent"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-left">
                  <span className="font-sans text-xs font-semibold tracking-wide text-ink uppercase">
                    {labelEmail}
                  </span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder={placeholderEmail}
                    className="rounded-xl border border-ink-hairline bg-white px-4 py-3 font-sans text-sm text-ink outline-none focus:border-accent"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-left">
                  <span className="font-sans text-xs font-semibold tracking-wide text-ink uppercase">
                    {labelTelefone}
                  </span>
                  <input
                    value={form.telefone}
                    onChange={(e) => setForm((f) => ({ ...f, telefone: e.target.value }))}
                    placeholder={placeholderTelefone}
                    className="rounded-xl border border-ink-hairline bg-white px-4 py-3 font-sans text-sm text-ink outline-none focus:border-accent"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-left">
                  <span className="font-sans text-xs font-semibold tracking-wide text-ink uppercase">
                    {labelLinkedin}
                  </span>
                  <input
                    value={form.linkedin}
                    onChange={(e) => setForm((f) => ({ ...f, linkedin: e.target.value }))}
                    placeholder={placeholderLinkedin}
                    className="rounded-xl border border-ink-hairline bg-white px-4 py-3 font-sans text-sm text-ink outline-none focus:border-accent"
                  />
                </label>

                {status === "success" ? (
                  <p className="mt-2 font-sans text-sm font-medium text-green-700" role="status">
                    {successMessage}
                  </p>
                ) : null}
                {status === "error" ? (
                  <p className="mt-2 font-sans text-sm font-medium text-red-600" role="alert">
                    {errorMsg}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 inline-flex items-center justify-center rounded-full px-7 py-3.5 font-sans text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
                  style={{ background: "#232323" }}
                >
                  {status === "sending" ? "Enviando…" : submitLabel}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
