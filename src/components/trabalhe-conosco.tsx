import { Doc, clean, editAttr } from "@/lib/sanity-attr";
import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/reveal";
import { SectionBadge } from "@/components/section-badge";
import { TELEFONE_EXPANSAO } from "@/lib/contact";
import {
  buildWhatsappUrl,
  resolveCtaHref,
  type Homepage,
  type SiteSettings,
} from "@/lib/sanity";
import { isValidPhoneBr, maskPhoneBr } from "@/lib/phone-br";

type Props = {
  data?: Homepage["trabalheConosco"] | null;
  settings?: SiteSettings | null;
};

type Status = "idle" | "sending" | "success" | "error";

const FALLBACK_MSG_EXPANSAO =
  "Olá, gostaria de falar com o time de Expansão da A.W.A Capital.";

export function TrabalheConosco({ data, settings }: Props) {
  // Destino do botão lateral: respeita "Para onde o botão leva" do CMS
  const ctaHref = resolveCtaHref(data?.cta, settings, {
    defaultAction: "whatsapp_expansao",
    fallbackPhone: TELEFONE_EXPANSAO,
    fallbackMessage: FALLBACK_MSG_EXPANSAO,
  });
  const ctaIsExternal = /^https?:\/\//i.test(ctaHref);

  const waExpansao = (customMessage?: string) =>
    buildWhatsappUrl(
      settings?.phoneExpansao,
      customMessage ?? settings?.messageExpansao,
      TELEFONE_EXPANSAO,
      FALLBACK_MSG_EXPANSAO,
    );
  const sectionId = clean(data?.sectionId);
  const badge = data?.badge?.trim() ?? "";
  const title = data?.title?.trim() ?? "";
  const subtitle = data?.subtitle?.trim() ?? "";

  const formTitle = data?.formTitle?.trim() ?? "";
  const labelNome = data?.labelNome?.trim() ?? "";
  const placeholderNome = data?.placeholderNome?.trim() ?? "";
  const labelEmail = data?.labelEmail?.trim() ?? "";
  const placeholderEmail = data?.placeholderEmail?.trim() ?? "";
  const labelTelefone = data?.labelTelefone?.trim() ?? "";
  const placeholderTelefone = data?.placeholderTelefone?.trim() ?? "";
  const labelLinkedin = data?.labelLinkedin?.trim() ?? "";
  const placeholderLinkedin = data?.placeholderLinkedin?.trim() ?? "";
  const submitLabel = data?.submitLabel?.trim() ?? "";
  const successMessage = data?.successMessage?.trim() ?? "";
  const alsoOpenWhatsapp = data?.alsoOpenWhatsapp === true;

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

    setErrorMsg("");

    if (!form.nome.trim() || form.nome.trim().length < 2) {
      setStatus("error");
      setErrorMsg("Informe seu nome completo.");
      return;
    }
    if (!/[^\s@]+@[^\s@]+\.[^\s@]+/.test(form.email.trim())) {
      setStatus("error");
      setErrorMsg("Informe um e-mail válido.");
      return;
    }
    if (!isValidPhoneBr(form.telefone)) {
      setStatus("error");
      setErrorMsg("Informe um telefone válido com DDD. Ex.: (11) 98765-4321");
      return;
    }

    setStatus("sending");

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
        window.open(waExpansao(mensagem), "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Não foi possível enviar.");
    }
  };

  return (
    <section
      id={sectionId || undefined}
      className="relative overflow-hidden bg-surface-light py-10 md:py-10 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Reveal className="flex justify-center lg:justify-start">
              <SectionBadge data-sanity={editAttr(Doc.trabalhe, "trabalheConosco.badge")}>{badge}</SectionBadge>
            </Reveal>
            <Reveal delay={100}>
              <h2 data-sanity={editAttr(Doc.trabalhe, "trabalheConosco.title")} className="mt-6 font-display text-[1.75rem] leading-[1.1] font-extrabold tracking-tight text-ink md:text-4xl lg:text-[2.4rem]">
                {title}
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p data-sanity={editAttr(Doc.trabalhe, "trabalheConosco.subtitle")} className="mt-6 max-w-md font-sans text-base leading-relaxed text-ink-muted md:text-lg">
                {subtitle}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <a
                href={ctaHref}
                {...(ctaIsExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="mt-8 inline-flex items-center justify-center rounded-full border border-accent px-6 py-3.5 font-sans text-sm font-semibold text-ink transition-colors hover:bg-accent/10"
              >
                <span data-sanity={editAttr(Doc.trabalhe, "trabalheConosco.cta.label")}>{data?.cta?.label?.trim() ?? ""}</span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-ink-hairline bg-white p-6 shadow-sm md:p-8"
              noValidate
            >
              <h3 data-sanity={editAttr(Doc.trabalhe, "trabalheConosco.formTitle")} className="font-display text-lg font-extrabold tracking-tight text-ink md:text-xl">
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
                    <span data-sanity={editAttr(Doc.trabalhe, "trabalheConosco.labelNome")}>{labelNome}</span>
                  </span>
                  <input
                    required
                    value={form.nome}
                    onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                    placeholder={placeholderNome} data-sanity={editAttr(Doc.trabalhe, "trabalheConosco.placeholderNome")}
                    className="rounded-xl border border-ink-hairline bg-white px-4 py-3 font-sans text-sm text-ink outline-none focus:border-accent"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-left">
                  <span className="font-sans text-xs font-semibold tracking-wide text-ink uppercase">
                    <span data-sanity={editAttr(Doc.trabalhe, "trabalheConosco.labelEmail")}>{labelEmail}</span>
                  </span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder={placeholderEmail} data-sanity={editAttr(Doc.trabalhe, "trabalheConosco.placeholderEmail")}
                    className="rounded-xl border border-ink-hairline bg-white px-4 py-3 font-sans text-sm text-ink outline-none focus:border-accent"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-left">
                  <span className="font-sans text-xs font-semibold tracking-wide text-ink uppercase">
                    <span data-sanity={editAttr(Doc.trabalhe, "trabalheConosco.labelTelefone")}>{labelTelefone}</span>
                  </span>
                  <input
                    type="tel"
                    name="telefone"
                    value={form.telefone}
                    onChange={(e) => setForm((f) => ({ ...f, telefone: maskPhoneBr(e.target.value) }))}
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={16}
                    placeholder={placeholderTelefone} data-sanity={editAttr(Doc.trabalhe, "trabalheConosco.placeholderTelefone")}
                    className="rounded-xl border border-ink-hairline bg-white px-4 py-3 font-sans text-sm text-ink outline-none focus:border-accent"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-left">
                  <span className="font-sans text-xs font-semibold tracking-wide text-ink uppercase">
                    <span data-sanity={editAttr(Doc.trabalhe, "trabalheConosco.labelLinkedin")}>{labelLinkedin}</span>
                  </span>
                  <input
                    value={form.linkedin}
                    onChange={(e) => setForm((f) => ({ ...f, linkedin: e.target.value }))}
                    placeholder={placeholderLinkedin} data-sanity={editAttr(Doc.trabalhe, "trabalheConosco.placeholderLinkedin")}
                    className="rounded-xl border border-ink-hairline bg-white px-4 py-3 font-sans text-sm text-ink outline-none focus:border-accent"
                  />
                </label>

                {status === "success" ? (
                  <p className="mt-2 font-sans text-sm font-medium text-green-700" role="status">
                    <span data-sanity={editAttr(Doc.trabalhe, "trabalheConosco.successMessage")}>{successMessage}</span>
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
                  {status === "sending" ? "Enviando…" : <span data-sanity={editAttr(Doc.trabalhe, "trabalheConosco.submitLabel")}>{submitLabel}</span>}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
