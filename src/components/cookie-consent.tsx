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

const categorias: Categoria[] = [
  {
    id: "funcionais",
    titulo: "Cookies Funcionais",
    descricao:
      "Estes cookies são essenciais e estritamente necessários para o funcionamento dos nossos websites da melhor forma possível. Estes são armazenados temporariamente contendo dados como informações de login, e são cookies de sessão que expiram assim que o navegador é encerrado. Essa categoria não pode ser desabilitada, no entanto, caso tenha interesse, é possível realizar configurações de bloqueio através de seu navegador, mas isso pode afetar sua experiência e o funcionamento de nosso site.",
    essencial: true,
  },
  {
    id: "analiticos",
    titulo: "Cookies Analíticos",
    descricao:
      "São cookies de monitoramento do desempenho, viabilizando a análise de padrões do comportamento dos visitantes e de uso dos recursos. Esse é um tratamento de dados não invasivo, com uso de dados anonimizados para estabelecer métricas de visualizações e interações com recursos do website, por exemplo. Uma vez que essa informação não pode ser usada para sua identificação, não contêm informação pessoal (como Nome e Endereço de E-mail), e é apenas utilizada para fins estatísticos, definimos que essa categoria não pode ser desabilitada. No entanto, caso tenha interesse, é possível realizar configurações de bloqueio diretamente através de seu navegador, mas isso pode afetar sua experiência e o funcionamento de nosso site.",
    essencial: true,
  },
  {
    id: "promocionais",
    titulo: "Cookies Promocionais",
    descricao:
      "Estes cookies são utilizados para identificar e apresentar publicidade relevante para o usuário durante sua navegação, de acordo com seus interesses. Podem ser utilizados cookies de terceiros (como Google, Meta, Bytedance, Hightouch, e Hotjar).",
    essencial: false,
  },
  {
    id: "preferenciais",
    titulo: "Cookies Preferenciais",
    descricao:
      "São cookies que possibilitam um website lembrar informações que alteram o comportamento ou aspeto visual deste, como idioma preferido ou a região onde está, por exemplo.",
    essencial: false,
  },
];

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

export function CookieConsent() {
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
              Clicando em “Aceitar Cookies”, você concorda com o armazenamento destes para melhoria
              na sua navegação pelo site. Se clicar em “Rejeitar Cookies”, os dados que não forem
              estritamente necessários serão desativados.{" "}
              <button
                type="button"
                onClick={abrirConfiguracoes}
                className="cursor-pointer font-semibold text-accent underline decoration-accent/50 underline-offset-4 transition-colors hover:text-accent-hover"
              >
                Gerenciar
              </button>{" "}
              ou{" "}
              <Link
                to="/politica-de-privacidade"
                className="font-semibold text-accent underline decoration-accent/50 underline-offset-4 transition-colors hover:text-accent-hover"
              >
                Saiba mais
              </Link>
              .
            </p>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => salvar(somenteEssenciais)}
                className={botaoSecundario}
                style={bordaSuave}
              >
                Rejeitar Cookies
              </button>
              <button type="button" onClick={() => salvar(todasAceitas)} className={botaoPrimario}>
                Aceitar Cookies
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
            Configure seus cookies
          </DialogTitle>
          <DialogDescription className="sr-only">
            Gerencie as categorias de cookies utilizadas no site da A.W.A Capital.
          </DialogDescription>

          <Tabs value={aba} onValueChange={setAba} className="flex min-h-0 flex-col">
            <TabsList
              className="h-auto w-full justify-start gap-6 rounded-none border-b bg-transparent px-6"
              style={bordaSuave}
            >
              {[
                { valor: "politica", label: "Nossa política de cookies" },
                { valor: "config", label: "Mude sua configuração" },
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
                  Utilizamos cookies para garantir que será proporcionada a melhor experiência
                  enquanto visita o nosso website. Alguns dos cookies são necessários para fornecer
                  funcionalidades essenciais, como sessões de login e análise anonimizada de
                  desempenho, e não podem ser desativados. Outros cookies são coletados para
                  melhorar a sua experiência através de conteúdo personalizado, funcionalidades nas
                  redes sociais e preferências no uso do site. Estes cookies podem também incluir
                  cookies de terceiros, os quais podem monitorar a navegação e são configuráveis no
                  próprio navegador ou então através das plataformas destes terceiros. Importante:
                  você pode alterar as configurações de cookies a qualquer momento. Saiba mais
                  detalhes acessando a nossa{" "}
                  <Link
                    to="/politica-de-privacidade"
                    className="text-accent decoration-accent/50 hover:text-accent-hover font-semibold underline underline-offset-4 transition-colors"
                  >
                    política de privacidade
                  </Link>
                  .
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
                  Rejeitar Cookies
                </button>
                <button
                  type="button"
                  onClick={() => salvar(todasAceitas)}
                  className={botaoPrimario}
                >
                  Aceitar Cookies
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
                            Sempre ativo
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
