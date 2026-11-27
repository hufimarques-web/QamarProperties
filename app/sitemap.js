import { SITE_URL } from "@/lib/site";

export default function sitemap() {
  const now = new Date();
  return [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/oportunidades", priority: 0.8, changeFrequency: "weekly" },
    { path: "/perguntas-frequentes", priority: 0.7, changeFrequency: "monthly" },
    { path: "/depoimentos", priority: 0.6, changeFrequency: "monthly" },
    { path: "/oportunidade", priority: 0.5, changeFrequency: "monthly" },
    { path: "/equipe", priority: 0.5, changeFrequency: "monthly" },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
