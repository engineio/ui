declare global {
  /**
   * The release this build came from — injected by `define` in
   * vite.config.ts. "dev" for a local `bun run dev`; the latest git tag in the
   * Pages build. It cannot come from package.json: that is the placeholder
   * `0.0.0-development`, because semantic-release owns the real version and
   * never commits it back.
   *
   * Declared inside `declare global` on purpose. This file has an `export`, so
   * it is a module — a bare top-level `declare const` would be scoped to the
   * module and invisible to the rest of the app.
   */
  const __DS_VERSION__: string

  namespace App {}
}

export {}
