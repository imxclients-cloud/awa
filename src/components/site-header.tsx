import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-horizontal.svg.asset.json";
import { WHATSAPP_ESPECIALISTA } from "@/lib/contact";

/** Âncoras da página inicial — navegam para "/" e rolam até a seção correspondente. */
const navItems = [
  { label: "Sobre nós", to: "/", hash: "sobre" },
  { label: "Investimentos", to: "/", hash: "investimentos" },
  { label: "Método", to: "/", hash: "cultura" },
  { label: "Soluções para Famílias", to: "/", hash: "familias" },
  { label: "Soluções para Empresas", to: "/", hash: "empresas" },
  { label: "Trabalhe conosco", to: "/", hash: "trabalhe-conosco" },
] as const;

export function SiteHeader({ variant = "dark" }: { variant?: "dark" | "light" } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isLight = variant === "light";

  const logoClass = isLight ? "h-7 w-auto md:h-8" : "h-7 w-auto brightness-0 invert md:h-8";
  const navLinkClass = isLight
    ? "group relative font-sans text-sm text-ink/80 transition-colors hover:text-ink"
    : "group relative font-sans text-sm text-foreground/85 transition-colors hover:text-foreground";
  const scrolledClass = isLight
    ? "bg-white/85 border-b border-ink-hairline backdrop-blur-glass"
    : "bg-glass-dark border-b border-hairline backdrop-blur-glass";
  const overlayClass = isLight ? "bg-white" : "bg-background";
  const overlayTextClass = isLight ? "text-ink" : "text-foreground";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? scrolledClass : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid h-20 max-w-[1280px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 md:px-8 lg:grid-cols-[auto_1fr_auto]">
        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setOpen(true)}
          className={`${overlayTextClass} lg:hidden`}
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>

        <Link to="/" className="flex justify-center lg:justify-start" aria-label="A.W.A Capital">
          <img src={logo.url} alt="A.W.A Capital" className={logoClass} width={338} height={52} />
        </Link>

        <nav className="hidden items-center justify-end gap-6 lg:flex">
          {navItems.map((item) => (
            <Link key={item.label} to={item.to} hash={item.hash} className={navLinkClass}>
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden justify-self-end lg:block">
          <a
            href={WHATSAPP_ESPECIALISTA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 font-sans text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
          >
            Falar com um Especialista
          </a>
        </div>

        <span className="w-6 lg:hidden" aria-hidden />
      </div>

      {open &&
        createPortal(
          <div className={`fixed inset-0 z-[100] flex flex-col ${overlayClass} lg:hidden`}>
            <div
              className={`flex h-20 shrink-0 items-center justify-between border-b px-5 ${
                isLight ? "border-ink-hairline" : "border-hairline"
              }`}
            >
              <img
                src={logo.url}
                alt="A.W.A Capital"
                className={isLight ? "h-7 w-auto" : "h-7 w-auto brightness-0 invert"}
                width={338}
                height={52}
              />
              <button
                type="button"
                aria-label="Fechar menu"
                onClick={() => setOpen(false)}
                className={overlayTextClass}
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 pt-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  hash={item.hash}
                  onClick={() => setOpen(false)}
                  className={`shrink-0 border-b py-4 font-sans text-lg ${
                    isLight ? "border-ink-hairline text-ink" : "border-hairline text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="shrink-0 p-5 pb-10">
              <a
                href={WHATSAPP_ESPECIALISTA}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-accent px-6 py-4 font-sans text-base font-semibold text-accent-foreground"
              >
                Falar com um Especialista
              </a>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
}
