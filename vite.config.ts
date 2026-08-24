import { sveltekit } from "@sveltejs/kit/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

// The gallery's version label. It cannot come from package.json — that is the
// placeholder `0.0.0-development`, because semantic-release owns the real
// version and never commits it back (see README, Releasing). So the Pages
// workflow passes the latest tag in, and a local `bun run dev` shows "dev".
const version = process.env.DS_VERSION ?? "dev"

export default defineConfig({
  define: {
    __DS_VERSION__: JSON.stringify(version),
  },
  plugins: [tailwindcss(), sveltekit()],
  server: {
    port: 3100,
    strictPort: true,
  },
})
