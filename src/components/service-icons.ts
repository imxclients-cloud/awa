import {
  ArrowLeftRight, Building2, Car, Coins, CreditCard, Globe, HandCoins, Landmark,
  PiggyBank, Shield, ShieldCheck, Umbrella, Wallet, Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { sanityImageUrl } from "@/lib/sanity";

/** Chaves gravadas no CMS (campo "icone" do serviço) → componente do ícone. */
const MAPA: Record<string, LucideIcon> = {
  Shield, ShieldCheck, Car, ArrowLeftRight, CreditCard, HandCoins, Coins,
  Landmark, Building2, Globe, Umbrella, Zap, Wallet, PiggyBank,
};

const REGRAS_TITULO: Array<[RegExp, string]> = [
  [/seguro.*vida/i, "Umbrella"],
  [/seguro/i, "Shield"],
  [/cons[oó]rc/i, "Car"],
  [/c[aâ]mbio/i, "ArrowLeftRight"],
  [/conta digital|cart[aã]o/i, "CreditCard"],
  [/cr[eé]dito|financiamento/i, "HandCoins"],
  [/precat[oó]rio/i, "Landmark"],
  [/holding/i, "Building2"],
  [/offshore/i, "Globe"],
  [/restitui/i, "Coins"],
  [/energia/i, "Zap"],
  [/fluxo de caixa/i, "Wallet"],
  [/planejamento/i, "PiggyBank"],
  [/investimento/i, "Wallet"],
];

function porTitulo(titulo?: string | null): LucideIcon | null {
  if (!titulo) return null;
  const n = titulo.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  for (const [re, key] of REGRAS_TITULO) {
    if (re.test(n)) return MAPA[key] ?? null;
  }
  return null;
}

/**
 * Ícone do serviço.
 * 1) Usa o valor do CMS (`icone`) quando válido.
 * 2) Se vazio/inválido, infere pelo título (evita todos com o mesmo escudo).
 * 3) Fallback final: Shield.
 */
export function iconeDoServico(nome?: string | null, titulo?: string | null): LucideIcon {
  if (nome && MAPA[nome]) return MAPA[nome];
  return porTitulo(titulo) || Shield;
}


/** URL do ícone enviado no CMS (biblioteca), se houver. */
export function urlIconeServico(iconRef?: { image?: unknown } | null): string | undefined {
  if (!iconRef?.image) return undefined;
  return sanityImageUrl(iconRef.image as Parameters<typeof sanityImageUrl>[0], 128);
}
