/** Máscara e validação de telefone BR (fix / celular). */

export function onlyDigits(value: string): string {
  return (value || "").replace(/\D/g, "");
}

/** (11) 99999-9999 ou (11) 9999-9999 */
export function maskPhoneBr(value: string): string {
  const d = onlyDigits(value).slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) {
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  }
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/**
 * Aceita 10 dígitos (fix) ou 11 (celular com 9).
 * DDD 11–99.
 */
export function isValidPhoneBr(value: string): boolean {
  const d = onlyDigits(value);
  if (d.length !== 10 && d.length !== 11) return false;
  const ddd = Number(d.slice(0, 2));
  if (ddd < 11 || ddd > 99) return false;
  if (d.length === 11 && d[2] !== "9") return false;
  return true;
}
