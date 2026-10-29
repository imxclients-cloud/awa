/**
 * Contatos oficiais da A.W.A Capital (fallback quando o Sanity não estiver disponível).
 */

const MENSAGEM_ESPECIALISTA =
  "Olá, vim do site e gostaria de falar com um especialista sobre os serviços da A.W.A Capital.";

const MENSAGEM_EXPANSAO =
  "Olá, vim do site e gostaria de falar com o time de Expansão sobre oportunidades na A.W.A Capital.";

export const TELEFONE_ESPECIALISTA = "5598981145929";
export const TELEFONE_EXPANSAO = "5598999672335";

export const WHATSAPP_ESPECIALISTA = `https://wa.me/${TELEFONE_ESPECIALISTA}?text=${encodeURIComponent(
  MENSAGEM_ESPECIALISTA,
)}`;

export function whatsappExpansao(mensagem: string = MENSAGEM_EXPANSAO) {
  return `https://wa.me/${TELEFONE_EXPANSAO}?text=${encodeURIComponent(mensagem)}`;
}

export { MENSAGEM_ESPECIALISTA, MENSAGEM_EXPANSAO };
