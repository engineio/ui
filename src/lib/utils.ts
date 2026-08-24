import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
