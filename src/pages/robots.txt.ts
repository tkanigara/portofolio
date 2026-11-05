import type { APIRoute } from "astro";
import { local } from "../utils/paths";
export const GET: APIRoute = ({ site }) =>
  new Response(
    `User-agent: *\nAllow: /\nSitemap: ${new URL(local("/sitemap.xml"), site)}\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
