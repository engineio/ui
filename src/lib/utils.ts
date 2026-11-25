import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * tailwind-merge only resolves a conflict between two classes it can
 * classify, and it classifies by value: `mt-4` and `mt-0` are both margins,
 * but `mt-section` is a word it has never seen, so `cn("mt-section", "mt-0")`
 * used to keep both and let stylesheet order decide — which meant a caller's
 * `class="mt-0"` on SectionHead silently lost. The same held for every named
 * token this system adds: `rounded-card` against `rounded-lg`, `text-small`
 * against `text-[13px]`, `max-w-marketing` against `max-w-[920px]`.
 *
 * So the merger is told the system's own scales. Every name here is a token
 * in styles/tokens.css; add to this list when adding a token there, or the
 * new utility will not override at a call site.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: ["gutter", "section", "header", "header-sm", "anchor", "anchor-sm"],
      container: ["marketing"],
      text: ["hero", "section", "standfirst", "lead", "card-title", "stat", "small", "body", "nav"],
      radius: ["tag", "field", "card-inner", "media", "card", "frame", "control"],
      blur: ["glass"],
      shadow: ["panel", "modal"],
      ease: ["brand", "brand-out", "brand-accelerate"],
    },
  },
})

/**
 * Merge Tailwind classes, letting later ones win over conflicting earlier
 * ones. Every primitive in this package passes its own classes through `cn`
 * with the caller's `class` prop last, which is what makes
 * `<Button class="w-full" />` work without `!important`.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T
export type WithoutChildren<T> = T extends { children?: any }
  ? Omit<T, "children">
  : T
/* eslint-enable @typescript-eslint/no-explicit-any */

export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
  ref?: U | null
}

/*
  Upstream `$lib/utils.ts` in the engine repo is a grab-bag: alongside `cn` it
  carries `copyToClipboard` (which pulls in svelte-sonner), `humanFileSize`,
  `getDateFromUUIDv7`, `slugify`, `formatDate` and `jurisdictionLabel` — the
  last of which encodes iGaming domain knowledge.

  None of that belongs in a design system, and importing it here would have
  made svelte-sonner a hard dependency of every consumer. Only `cn` and the
  type helpers the primitives genuinely need are re-exported. The rest stays
  in the products, where it already lives.
*/
