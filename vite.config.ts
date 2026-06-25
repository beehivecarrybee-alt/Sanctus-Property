// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro: {
    // Deploy target = Vercel (Node serverless functions, NOT edge).
    // The Lovable wrapper defaults to the "cloudflare" (edge) preset when
    // NITRO_PRESET is unset — edge runtimes can't run nodemailer/SMTP, so we
    // pin "vercel" here. Override via NITRO_PRESET env if ever needed.
    preset: process.env.NITRO_PRESET || "vercel",
  },
});
