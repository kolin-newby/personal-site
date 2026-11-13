import "./index.css";
import "./App.css";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  type ShouldRevalidateFunction
} from "react-router";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import Navbar from "@/components/navbar";
import { useHasTouch } from "@/common/use-media-query";
import { getDehydratedSiteData } from "./site-data.server";
import type { Route } from "./+types/root";

// Structured data, so search engines tie the site to its owner's other
// profiles. sameAs mirrors the links in the CMS.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://kolinnewby.dev/#website",
      name: "Kolin Newby",
      url: "https://kolinnewby.dev/",
      publisher: { "@id": "https://kolinnewby.dev/#person" }
    },
    {
      "@type": "Person",
      "@id": "https://kolinnewby.dev/#person",
      name: "Kolin Newby",
      url: "https://kolinnewby.dev/",
      jobTitle: "Software Engineer",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Denver",
        addressRegion: "CO",
        addressCountry: "US"
      },
      sameAs: [
        "https://github.com/kolin-newby",
        "https://www.linkedin.com/in/knewby/"
      ]
    }
  ]
};

export const links: Route.LinksFunction = () => [
  // Fonts load from here rather than an @import in the CSS, so the browser
  // finds them without waiting for the stylesheet first.
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
  },
  // Skill and link icons are fetched from the CMS's file host.
  {
    rel: "preconnect",
    href: "https://images.kolinnewby.dev",
    crossOrigin: "anonymous"
  },
  { rel: "icon", href: "/terminal.ico", sizes: "32x32" },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/manifest.json" }
];

// Tags shared by every page. Each page renders its own <title>, description,
// canonical link and og:title/description/url.
export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#e5e7eb" />

        {/* Link previews. Twitter falls back to the og: tags for the rest. */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kolin Newby" />
        <meta
          property="og:image"
          content="https://kolinnewby.dev/og-image.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Kolin Newby, Software Engineer, Denver, CO"
        />
        <meta name="twitter:card" content="summary_large_image" />

        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const loader = () => getDehydratedSiteData();

// The data comes from the build and react-query refetches it in the browser,
// so navigating between pages never needs the loader again.
export const shouldRevalidate: ShouldRevalidateFunction = () => false;

export default function Root({ loaderData }: Route.ComponentProps) {
  // Created per render tree rather than at module level, so prerendered paths
  // don't share one cache.
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={loaderData}>
        <Shell />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

function Shell() {
  const [navBarOpen, setNavBarOpen] = useState(false);
  const hasTouch = useHasTouch();
  const { pathname } = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Pages scroll inside this div, not the window, so ScrollRestoration
  // doesn't reach it. Start each page at the top.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div
      ref={scrollRef}
      className={
        "scrollbar-display-none relative h-dvh snap-y snap-mandatory overflow-x-hidden overflow-y-auto bg-linear-to-br from-gray-100 via-gray-200 to-gray-100"
      }
      onScroll={() => {
        if (navBarOpen) setNavBarOpen(false);
      }}
      onClick={() => {
        if (navBarOpen) setNavBarOpen(false);
      }}
    >
      <Navbar
        touch={hasTouch}
        barOpen={navBarOpen}
        setBarOpen={setNavBarOpen}
      />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
