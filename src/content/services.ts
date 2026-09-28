import type { Service } from "@/types/content";

export const services: Service[] = [
  {
    slug: "exame-de-vista-em-casa",
    title: "Exame de vista em casa",
    shortDescription: "Avaliação completa da sua visão, sem sair de casa.",
    description:
      "Nossa optometrista vai até você com equipamento portátil completo para medir grau, testar a visão de perto e de longe, e recomendar as melhores lentes para o seu dia a dia.",
    icon: "exam",
  },
  {
    slug: "prova-de-armacoes",
    title: "Prova de armações no conforto do lar",
    shortDescription: "Experimente dezenas de modelos com a ajuda de um consultor.",
    description:
      "Levamos até você uma maleta com uma curadoria de armações para experimentar à vontade, com a opinião de quem entende — sem filas, sem pressa.",
    icon: "home",
  },
  {
    slug: "ajustes-e-manutencao",
    title: "Ajustes e manutenção",
    shortDescription: "Hastes, plaquetas e alinhamento — tudo no local.",
    description:
      "Seu óculos torto, apertado ou desalinhado? Fazemos o ajuste na hora, na sua casa ou no seu trabalho, sem necessidade de deixar o óculos em loja.",
    icon: "adjust",
  },
  {
    slug: "entrega-expressa",
    title: "Entrega expressa",
    shortDescription: "Óculos pronto entregue direto na sua porta.",
    description:
      "Depois de pronto, seu óculos novo chega até você com todo cuidado, já ajustado e pronto para uso.",
    icon: "delivery",
  },
  {
    slug: "suporte-pos-venda",
    title: "Suporte pós-venda",
    shortDescription: "Garantia e acompanhamento contínuo via WhatsApp.",
    description:
      "Ficou com alguma dúvida ou precisa de um reparo? Nosso suporte é feito diretamente pelo WhatsApp, com agendamento de visita quando necessário.",
    icon: "support",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
