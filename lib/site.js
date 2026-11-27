// Dados do site usados no SEO. Atualizar quando houver domínio, AMI e morada.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://qamarproperties.pt").replace(/\/$/, "");

export const SITE = {
  name: "Qamar Properties",
  shortDescription:
    "Venda a sua casa na Região de Aveiro com valor líquido: diz quanto quer receber e vendemos em 60 dias, sem comissão a somar.",
  phone: "+351967708397",
  phoneDisplay: "+351 967 708 397",
  areaServed: ["Aveiro", "Ílhavo", "Esgueira", "Aradas", "Gafanha da Nazaré", "Região de Aveiro"],
  // TODO: preencher quando existirem
  ami: "", // n.º de licença AMI
  email: "",
  sameAs: [], // links de Instagram, Facebook, LinkedIn
};
