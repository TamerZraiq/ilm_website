// TODO: replace with the centre's real WhatsApp number (international format, digits only).
export const WHATSAPP_NUMBER = "970000000000";

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
