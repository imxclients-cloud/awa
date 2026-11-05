import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/** Evento global para reabrir as preferências de cookies (usado pelo link do rodapé). */
export const OPEN_COOKIE_SETTINGS_EVENT = "awa:open-cookie-settings";

const STORAGE_KEY = "awa:cookie-consent";

type CategoriaId = "funcionais" | "analiticos" | "promocionais" | "preferenciais";

type Categoria = {
  id: CategoriaId;
  titulo: string;
  descricao: string;
  /** Categorias essenciais não podem ser desabilitadas pelo usuário. */
  essencial: boolean;
};

type Preferencias = Record<CategoriaId, boolean>;

const somenteEssenciais: Preferencias = {
  funcionais: true,
  analiticos: true,
  promocionais: false,
  preferenciais: false,
};

const todasAceitas: Preferencias = {
  funcionais: true,
  analiticos: true,
  promocionais: true,
  preferenciais: true,
};

const botaoBase = "font-sans text-sm font-semibold transition-colors duration-300 cursor-pointer";
const botaoPrimario = `${botaoBase} rounded-full bg-accent px-6 py-3 text-accent-foreground hover:bg-accent-hover`;
const botaoSecundario = `${botaoBase} rounded-full border px-6 py-3 text-foreground hover:bg-glass-light`;

const bordaSuave = { borderColor: "rgba(225,222,205,0.14)" };
const painelEscuro = { background: "rgba(17,17,17,0.94)", borderColor: "rgba(254,178,2,0.3)" };

import type { CookieConfig } from "@/lib/page-data.server";

export function CookieConsent({ config }: { config?: CookieConfig | null }) {
  const [visivel, setVisivel] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [aba, setAba] = useState("politica");
  const [prefs, setPrefs] = useState<Preferencias>(somenteEssenciais);

  // Exibe o aviso apenas quando ainda não há consentimento registrado.
  useEffect(() => {
    try {
      const salvo = window.localStorage.getItem(STORAGE_KEY);
      if (!salvo) {
        setVisivel(true);
        return;
      }
      setPrefs({ ...somenteEssenciais, ...(JSON.parse(salvo) as Partial<Preferencias>) });
    } catch {
      setVisivel(true);
    }
  }, []);

  // Reabertura das preferências por evento global (link no rodapé).
  useEffect(() => {
    const abrir = () => {
      setAba("config");
      setModalAberto(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, abrir);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, abrir);
  }, []);

  // Reserva espaço para o botão flutuante do WhatsApp enquanto o aviso estiver visível.
  useEffect(() => {
    const root = document.documentElement;
    if (visivel) root.style.setProperty("--cookie-banner-offset", "10rem");
    else root.style.removeProperty("--cookie-banner-offset");
    return () => {
      root.style.removeProperty("--cookie-banner-offset");
    };
  }, [visivel]);

  function salvar(valor: Preferencias) {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...valor, versao: 1, atualizadoEm: new Date().toISOString() }),
      );
    } catch {
      /* armazenamento indisponível: segue apenas com a sessão */
    }
    setPrefs(valor);
    setVisivel(false);
    setModalAberto(false);
  }

  function abrirConfiguracoes() {
    setAba("config");
    setModalAberto(true);
  }

  if (!config) return null;

  const categorias: Categoria[] = (config.categories ?? [])
    .filter((c) => c.key)
    .map((c) => ({
      id: c.key as CategoriaId,
      titulo: c.title ?? "",
      descricao: c.description ?? "",
      essencial: c.essential === true,
    }));

  return (
    <>
      {visivel && !modalAberto ? (
        <div
          role="region"
          aria-label="Aviso de cookies"
          className="fixed inset-x-0 bottom-0 z-[70] px-3 pb-3 md:px-6 md:pb-6"
        >
          <div
            className="mx-auto flex w-full max-w-[1180px] flex-col gap-5 rounded-2xl border p-5 backdrop-blur-glass md:flex-row md:items-center md:justify-between md:gap-10 md:p-7"
            style={painelEscuro}
          >
            <p
              className="font-sans text-[0.8rem] leading-relaxed md:text-sm"
              style={{ color: "rgba(225,222,205,0.8)" }}
            >
              {config.bannerText}{" "}
              <button
                type="button"
                onClick={abrirConfiguracoes}
                className="cursor-pointer font-semibold text-accent underline decoration-accent/50 underline-offset-4 transition-colors hover:text-accent-hover"
              >
                {config.manageLabel}
              </button>{" "}
              <Link
                to="/politica-de-privacidade"
                className="font-semibold text-accent underline decoration-accent/50 underline-offset-4 transition-colors hover:text-accent-hover"
              >
                {config.learnMoreLabel}
              </Link>
            </p>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => salvar(somenteEssenciais)}
                className={botaoSecundario}
                style={bordaSuave}
              >
                {config.rejectLabel}
              </button>
              <button type="button" onClick={() => salvar(todasAceitas)} className={botaoPrimario}>
                {config.acceptLabel}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent
          className="z-[80] max-h-[88vh] w-[calc(100vw-2rem)] max-w-[560px] gap-0 overflow-hidden rounded-2xl border p-0 sm:rounded-2xl"
          style={{ background: "#151515", borderColor: "rgba(225,222,205,0.14)" }}
        >
          <DialogTitle
            className="font-display border-b py-5 pr-14 pl-6 text-lg font-extrabold tracking-tight"
            style={bordaSuave}
          >
            {config.modalTitle}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {config.modalDescription}
          </DialogDescription>

          <Tabs value={aba} onValueChange={setAba} className="flex min-h-0 flex-col">
            <TabsList
              className="h-auto w-full justify-start gap-6 rounded-none border-b bg-transparent px-6"
              style={bordaSuave}
            >
              {[
                { valor: "politica", label: config.policyTabLabel ?? "" },
                { valor: "config", label: config.configTabLabel ?? "" },
              ].map((t) => (
                <TabsTrigger
                  key={t.valor}
                  value={t.valor}
                  className="font-display data-[state=active]:border-accent inline-flex w-auto rounded-none border-b-2 border-transparent px-0 py-4 text-[0.65rem] font-extrabold tracking-[0.16em] uppercase transition-colors hover:!text-foreground data-[state=active]:bg-transparent data-[state=active]:!text-foreground data-[state=active]:shadow-none"
                  style={{ color: "rgba(225,222,205,0.55)" }}
                >
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="politica" className="mt-0 flex min-h-0 flex-col">
              <div className="max-h-[40vh] overflow-y-auto px-6 py-6">
                <p
                  className="font-sans text-sm leading-relaxed"
                  style={{ color: "rgba(225,222,205,0.75)" }}
                >
                  {config.policyText}
                </p>
              </div>
              <div
                className="flex flex-col gap-3 border-t px-6 py-5 sm:flex-row sm:justify-end"
                style={bordaSuave}
              >
                <button
                  type="button"
                  onClick={() => salvar(somenteEssenciais)}
                  className={botaoSecundario}
                  style={bordaSuave}
                >
                  {config.rejectLabel}
                </button>
                <button
                  type="button"
                  onClick={() => salvar(todasAceitas)}
                  className={botaoPrimario}
                >
                  {config.acceptLabel}
                </button>
              </div>
            </TabsContent>

            <TabsContent value="config" className="mt-0 flex min-h-0 flex-col">
              <div className="max-h-[46vh] overflow-y-auto px-6 py-6">
                <div className="flex flex-col gap-7">
                  {categorias.map((c) => (
                    <div key={c.id} className="flex items-start gap-4">
                      <Checkbox
                        id={`cookie-${c.id}`}
                        checked={c.essencial ? true : prefs[c.id]}
                        disabled={c.essencial}
                        onCheckedChange={(v) => setPrefs((p) => ({ ...p, [c.id]: v === true }))}
                        className="border-accent-hairline data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground mt-1 size-5 rounded-[4px] border bg-transparent"
                      />
                      <div>
                        <label
                          htmlFor={`cookie-${c.id}`}
                          className={`font-display text-sm font-bold tracking-tight ${
                            c.essencial ? "" : "cursor-pointer"
                          }`}
                        >
                          {c.titulo}
                        </label>
                        <p
                          className="mt-2 font-sans text-[0.8rem] leading-relaxed"
                          style={{ color: "rgba(225,222,205,0.7)" }}
                        >
                          {c.descricao}
                        </p>
                        {c.essencial ? (
                          <p className="font-display text-accent mt-2 text-[0.6rem] font-extrabold tracking-[0.2em] uppercase">
                            {config.alwaysActiveLabel}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center border-t px-6 py-5" style={bordaSuave}>
                <button type="button" onClick={() => salvar(prefs)} className={botaoPrimario}>
                  Salvar Configurações
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
