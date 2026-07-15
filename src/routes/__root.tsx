import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";

import { GlitterCursor } from "../components/ui/GlitterCursor";
import { PwaPrompts } from "../components/pwa/PwaPrompts";
import { SITE_URL, localBusinessJsonLd, websiteJsonLd, jsonLd } from "../lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    console.error("[Root Error Boundary]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    // To verify in Google Search Console via meta tag, add here:
    // { name: "google-site-verification", content: "<token>" }
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sanctus Property OPC Pvt Ltd | Construction & Real Estate Company in Coimbatore" },
      { name: "description", content: "Trusted construction & real-estate company in Coimbatore, Tamil Nadu — residential & commercial construction, approved plots, ready-to-move & resale villas, and electrical & plumbing services." },
      { name: "keywords", content: "construction company in Coimbatore, best construction company in Coimbatore, real estate company in Coimbatore, best real estate in Coimbatore, builders in Coimbatore, residential construction Coimbatore, commercial construction Coimbatore, plots in Coimbatore, villas in Coimbatore, ready to move villas Coimbatore, resale villas Coimbatore, electrical and plumbing Coimbatore, Sanctus Property" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: "Sanctus Property OPC Pvt Ltd" },
      { property: "og:title", content: "Sanctus Property OPC Pvt Ltd | Construction & Real Estate Company in Coimbatore" },
      { property: "og:description", content: "Trusted construction & real-estate company in Coimbatore, Tamil Nadu — residential & commercial construction, approved plots, ready-to-move & resale villas, and electrical & plumbing services." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:site_name", content: "Sanctus Property" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:image", content: SITE_URL + "/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Sanctus Property — construction & real estate in Coimbatore" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sanctus Property OPC Pvt Ltd | Construction & Real Estate Company in Coimbatore" },
      { name: "twitter:description", content: "Trusted construction & real-estate company in Coimbatore, Tamil Nadu — residential & commercial construction, approved plots, ready-to-move & resale villas, and electrical & plumbing services." },
      { name: "twitter:image", content: SITE_URL + "/og-image.jpg" },
      { name: "geo.region", content: "IN-TN" },
      { name: "geo.placename", content: "Coimbatore" },
      { name: "geo.position", content: "11.0168;76.9558" },
      { name: "ICBM", content: "11.0168, 76.9558" },
      { name: "theme-color", content: "#17130F" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "Sanctus Property" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48x48.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
    scripts: [
      { type: "application/ld+json", children: jsonLd(localBusinessJsonLd) },
      { type: "application/ld+json", children: jsonLd(websiteJsonLd) },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <GlitterCursor />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <PwaPrompts />
    </QueryClientProvider>
  );
}
