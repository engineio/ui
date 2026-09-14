import agents from "../../../AGENTS.md?raw"

// The agent reference, served as a file at /AGENTS.md so a tool that has
// nothing installed yet can fetch the same rules the package ships. Vite's
// `?raw` inlines the repo's AGENTS.md at build time, which keeps this a
// prerendered static file with no copy to drift.
export const prerender = true

export function GET() {
  return new Response(agents, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
