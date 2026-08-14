import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-horizontal.svg.asset.json";

const navItems = [
  { label: "Sobre nós", href: "#sobre" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Para empresas", href: "#empresas" },
  { label: "Wealth Services", href: "#wealth-services" },
  { label: "Conteúdos", href: "#conteudos" },
  { label: "Carreira", href: "#cultura" },
  { label: "Fale conosco", href: "#contato" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
        scrolled ? "bg-glass-dark border-b border-hairline backdrop-blur-glass" : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid h-20 max-w-[1280px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 md:px-8 lg:grid-cols-[auto_1fr_auto]">
        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setOpen(true)}
          className="text-foreground lg:hidden"
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>

        <a
          href="/"
          className="flex justify-center lg:justify-start"
          aria-label="A.W.A Capital"
        >
          <img
            src={logo.url}
            alt="A.W.A Capital"
            className="h-7 w-auto brightness-0 invert md:h-8"
            width={338}
            height={52}
          />
        </a>

        <nav className="hidden items-center justify-end gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative font-sans text-sm text-foreground/85 transition-colors hover:text-foreground"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden justify-self-end lg:block">
          <a
            href="#contato"
            className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 font-sans text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
          >
            Quero falar com um especialista
          </a>
        </div>

        <span className="w-6 lg:hidden" aria-hidden />
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-glass-panel backdrop-blur-glass lg:hidden">
          <div className="flex h-20 items-center justify-between px-5">
            <img
              src={logo.url}
              alt="A.W.A Capital"
              className="h-7 w-auto brightness-0 invert"
              width={338}
              height={52}
            />
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={() => setOpen(false)}
              className="text-foreground"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 px-5 pt-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-hairline py-4 font-sans text-lg text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="p-5 pb-10">
            <a
              href="#contato"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center rounded-full bg-accent px-6 py-4 font-sans text-base font-semibold text-accent-foreground"
            >
              Quero falar com um especialista
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
