import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiProxyTarget = env.API_PROXY_TARGET || "http://localhost:3000";

  return {
    plugins: [tailwindcss(), reactRouter()],
    resolve: {
      alias: {
        "@": `${import.meta.dirname}/src`
      }
    },
    server: {
      proxy: {
        "/api": {
          target: apiProxyTarget,
          changeOrigin: true
        }
      }
    }
  };
});
