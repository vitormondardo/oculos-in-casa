import { company } from "@/content/company";

type WhatsAppContext = {
  produto?: string;
  servico?: string;
  bairro?: string;
  message?: string;
};

/**
 * Monta a URL do WhatsApp (wa.me) com uma mensagem pré-preenchida
 * de acordo com o contexto (produto, serviço, etc).
 */
export function buildWhatsAppUrl(context: WhatsAppContext = {}): string {
  const { produto, servico, bairro, message } = context;

  let text = message;

  if (!text) {
    const parts: string[] = ["Olá! Vim pelo site da Óculos InCasa."];

    if (produto) {
      parts.push(`Tenho interesse no modelo "${produto}".`);
    }

    if (servico) {
      parts.push(`Gostaria de saber mais sobre o serviço "${servico}".`);
    }

    if (!produto && !servico) {
      parts.push("Gostaria de agendar um atendimento domiciliar.");
    }

    if (bairro) {
      parts.push(`Estou no bairro ${bairro}.`);
    }

    text = parts.join(" ");
  }

  const encoded = encodeURIComponent(text);
  return `https://wa.me/${company.whatsappNumber}?text=${encoded}`;
}
