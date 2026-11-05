import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.timurkanigara.my.id",
  output: "static",
  trailingSlash: "always",
  devToolbar: { enabled: false },
});
