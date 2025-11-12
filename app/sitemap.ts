import type { MetadataRoute } from "next";

const routes = [
  "/",
  "/portfolio",
  "/servicos",
  "/sobre",
  "/contato",
  "/politica-de-privacidade",
  "/termos-de-uso",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://studio-m-pearl.vercel.app";
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
  }));
}
