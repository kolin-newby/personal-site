import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./pages/home-page.tsx"),
  route("portfolio", "./pages/portfolio-page.tsx"),
  route("content", "./pages/content-page.tsx")
] satisfies RouteConfig;
