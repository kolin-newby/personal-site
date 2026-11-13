import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  // Netlify serves static files, so every route is rendered at build time
  // instead of on a server.
  ssr: false,
  prerender: true
} satisfies Config;
