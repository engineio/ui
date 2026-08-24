import adapter from "@sveltejs/adapter-static"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

/**
 * Two jobs in one config:
 *
 *   1. `svelte-package` builds `src/lib` into `dist` — the published package.
 *   2. `vite build` builds `src/routes` into `build` — the gallery, deployed
 *      to Pages so the brand team can review every primitive in a browser.
 *
 * The aliases below matter for (1), not just (2): `svelte-package` rewrites
 * aliases it can see, and it only sees the ones declared HERE. Declaring them
 * in vite.config.js or tsconfig.json instead would leave `$lib/utils.js`
 * unresolved in the published output, where `$lib` means the CONSUMER's lib.
 * `$lib` is built in; the rest are explicit so nothing depends on that.
 *
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
  preprocess: [vitePreprocess()],
  kit: {
    // Fully prerendered, so no SPA fallback — declaring one would just
    // overwrite the prerendered index.html with an empty shell.
    adapter: adapter({
      pages: "build",
      assets: "build",
      precompress: false,
      strict: true,
    }),
    alias: {
      $components: "src/lib/components",
      $styles: "src/lib/styles",
    },
    // The gallery is served from a project Pages subpath, so its own asset
    // URLs need the prefix baked in at build time. Empty for `vite dev`.
    paths: {
      base: process.env.PAGES_BASE ?? "",
    },
  },
}

export default config
