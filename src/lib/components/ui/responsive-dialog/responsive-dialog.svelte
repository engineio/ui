<script lang="ts">
  import {
    Dialog as DialogPrimitive,
    Popover as PopoverPrimitive,
    type WithoutChildrenOrChild,
  } from "bits-ui"
  import type { Snippet } from "svelte"
  import { MediaQuery } from "svelte/reactivity"
  import {
    setResponsiveDialogContext,
    type ResponsiveDialogMode,
  } from "./context.js"

  let {
    open = $bindable(false),
    onOpenChange,
    desktop = "dialog",
    mode = "auto",
    breakpoint = 768,
    children,
  }: {
    /** Bindable. Survives the primitive swap when the viewport crosses over. */
    open?: boolean
    onOpenChange?: (open: boolean) => void
    /** What `auto` resolves to above the breakpoint. */
    desktop?: "dialog" | "popover"
    /** Pin the surface. `auto` is the point of the component; the rest are for
        demos, tests, and the odd screen that wants one shape either way. */
    mode?: "auto" | ResponsiveDialogMode
    /** Viewport width in px at and above which `auto` stops choosing `sheet`. */
    breakpoint?: number
    children: Snippet
  } = $props()

  // Rebuilt only when `breakpoint` changes. Server-side it reports false, so a
  // prerendered page renders the desktop trigger — the panel itself is closed
  // and portalled, so there is nothing to mismatch.
  const viewport = $derived(new MediaQuery(`max-width: ${breakpoint - 0.02}px`))

  const resolved = $derived<ResponsiveDialogMode>(
    mode !== "auto" ? mode : viewport.current ? "sheet" : desktop,
  )

  setResponsiveDialogContext({
    get mode() {
      return resolved
    },
    get primitive() {
      return resolved === "popover" ? "popover" : "dialog"
    },
    close() {
      open = false
      onOpenChange?.(false)
    },
  })
</script>

<!--
  Swapping the `{#if}` remounts the subtree, which is the whole point: a sheet
  and a popover are different primitives with different behaviour, and there is
  no honest way to morph one into the other. `open` lives up here, so a panel
  that is open when the viewport crosses the breakpoint stays open.
-->
{#if resolved === "popover"}
  <PopoverPrimitive.Root bind:open {onOpenChange}>
    {@render children()}
  </PopoverPrimitive.Root>
{:else}
  <DialogPrimitive.Root bind:open {onOpenChange}>
    {@render children()}
  </DialogPrimitive.Root>
{/if}
