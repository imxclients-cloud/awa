import {
  ArrowLeftRight, Building2, Car, Coins, CreditCard, Globe, HandCoins, Landmark,
  PiggyBank, Shield, ShieldCheck, Umbrella, Wallet, Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/** Chaves gravadas no CMS (campo "icone" do serviço) → componente do ícone. */
const MAPA: Record<string, LucideIcon> = {
  Shield, ShieldCheck, Car, ArrowLeftRight, CreditCard, HandCoins, Coins,
  Landmark, Building2, Globe, Umbrella, Zap, Wallet, PiggyBank,
};

/** Ícone do próprio item. Sem valor no CMS, usa o escudo como padrão. */
export function iconeDoServico(nome?: string | null): LucideIcon {
  return (nome && MAPA[nome]) || Shield;
}
