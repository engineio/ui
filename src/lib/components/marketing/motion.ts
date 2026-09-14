import type { Attachment } from "svelte/attachments"

/**
 * Tell a component when it is on screen, so its motion can wait.
 *
 * Every animated block on a landing page is gated on visibility — a mock that
 * plays its whole scene while it is still below the fold has nothing left to
 * show when the reader arrives. This is the one IntersectionObserver the
 * marketing components share, written as an attachment so a consumer's own
 * blocks can use the same gate:
 *
 *     <div {@attach inView((v) => (live = v))} class:live>
 *
 * `threshold` is the fraction of the element that has to be visible before it
 * counts. The components use 0.2 to 0.35 — enough that the block is genuinely
 * in view, not clipped at the bottom edge. `once` disconnects after the first
 * sighting, for scenes that should play once and then stay played (the bento,
 * the stat count-up) rather than pause and resume (the tour).
 */
export function inView(
  onChange: (visible: boolean) => void,
  { threshold = 0.25, once = false }: { threshold?: number; once?: boolean } = {},
): Attachment<Element> {
  return (node) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry?.isIntersecting ?? false
        onChange(visible)
        if (visible && once) observer.disconnect()
      },
      { threshold },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }
}

/**
 * Whether the reader has asked for reduced motion. False during prerender.
 *
 * The CSS side is handled by the base layer and the marketing utilities; this
 * is for the JS side — a Tween's duration, a setInterval that should not
 * start, a Svelte transition's `duration`. Read it inside an effect or a
 * handler, not at module scope.
 */
export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}
