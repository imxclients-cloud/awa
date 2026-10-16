/**
 * Contatos oficiais da A.W.A Capital.
 *
 * WHATSAPP_ESPECIALISTA -> usado em todos os CTAs "Falar com um Especialista"
 * (Hero, header, seções, CTA final, WhatsApp flutuante).
 *
 * WHATSAPP_EXPANSAO -> usado apenas na seção "Trabalhe conosco", para contato
 * direto com o time de Expansão.
 */

const MENSAGEM_ESPECIALISTA =
  "Olá, vim do site e gostaria de falar com um especialista sobre os serviços da A.W.A Capital.";

export const TELEFONE_ESPECIALISTA = "5598981145929";
export const TELEFONE_EXPANSAO = "5598999672335";

export const WHATSAPP_ESPECIALISTA = `https://wa.me/${TELEFONE_ESPECIALISTA}?text=${encodeURIComponent(
  MENSAGEM_ESPECIALISTA,
)}`;

export function whatsappExpansao(mensagem: string) {
  return `https://wa.me/${TELEFONE_EXPANSAO}?text=${encodeURIComponent(mensagem)}`;
}
