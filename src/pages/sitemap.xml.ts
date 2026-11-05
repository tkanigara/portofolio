import type { APIRoute } from "astro";
import { projects } from "../data/projects";
import { local } from "../utils/paths";
export const GET: APIRoute = ({ site }) => {
  const paths = [
    "/",
    "/projects/",
    "/resume/",
    ...projects.map((p) => `/projects/${p.slug}/`),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${new URL(local(path), site)}</loc></url>`).join("")}</urlset>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
