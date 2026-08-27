<script lang="ts">
  import { cn } from "$lib/utils.js"
  import X from "@lucide/svelte/icons/x"
  import {
    Dialog as DialogPrimitive,
    Popover as PopoverPrimitive,
    type WithoutChildrenOrChild,
  } from "bits-ui"
  import type { Snippet } from "svelte"
  import { getResponsiveDialogContext } from "./context.js"

  let {
    ref = $bindable(null),
    class: className,
    overlayClass,
    portalProps,
    showClose,
    swipeToClose = true,
    align = "center",
    side = "bottom",
    sideOffset = 8,
    children,
    ...restProps
  }: WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
    portalProps?: DialogPrimitive.PortalProps
    /** Scrim class, `dialog` and `sheet` only. */
    overlayClass?: string
    /** Defaults to true on a dialog and a sheet, false on a popover — a
        popover dismisses by clicking away and a close button on one reads as
        a modal that forgot to trap focus. */
    showClose?: boolean
    /** Drag the sheet's handle down to dismiss. Ignored off the sheet. */
    swipeToClose?: boolean
    /** Popover placement. Ignored off the popover. */
    align?: PopoverPrimitive.ContentProps["align"]
    side?: PopoverPrimitive.ContentProps["side"]
    sideOffset?: number
    children: Snippet
  } = $props()

  const context = getResponsiveDialogContext()
  const withClose = $derived(showClose ?? context.mode !== "popover")

  // The rest props are typed against Dialog's content, which is the common
  // case. Popover's differs in exactly one place — it narrows `dir` to its own
  // `Direction` union where the HTML attribute also permits `null` — so the
  // spread needs a cast rather than a second props type nobody would read.
  const popoverRestProps = $derived(
    restProps as unknown as PopoverPrimitive.ContentProps,
  )

  const overlayClasses = $derived(
    cn(
      "fixed inset-0 z-50 bg-grey-950/72 backdrop-blur-[18px] data-[state=open]:animate-overlay-in data-[state=closed]:animate-overlay-out",
      overlayClass,
    ),
  )

  const sheetClasses =
    "fixed inset-x-0 bottom-0 z-50 flex max-h-[85svh] flex-col overflow-hidden rounded-t-frame border-t-[1.5px] border-grey-600 bg-card text-card-foreground shadow-modal outline-none data-[state=open]:animate-sheet-in data-[state=closed]:animate-sheet-out"

  const dialogClasses =
    "fixed top-1/2 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col gap-5 rounded-card border-[1.5px] border-grey-600 bg-card p-7 text-card-foreground shadow-modal outline-none data-[state=open]:animate-dialog-in data-[state=closed]:animate-dialog-out"

  // No panel shadow: that is reserved for product chrome.
  const popoverClasses =
    "z-50 flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-4 rounded-card-inner border border-grey-600 bg-popover p-5 text-popover-foreground outline-none data-[state=open]:animate-popover-in data-[state=closed]:animate-popover-out"

  const closeClasses =
    "inline-flex size-9 items-center justify-center rounded-control text-grey-300 transition-colors duration-140 ease-brand hover:bg-grey-800 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:pointer-events-none"

  /*
    Drag to dismiss, and only from the handle.

    Starting the gesture anywhere on the panel means arbitrating between the
    drag and the body's own scroll on every pointer move, which is where sheet
    implementations go wrong on iOS. Confining it to a 44px strip that scrolls
    nothing removes the conflict rather than resolving it, and leaves the
    scroll region behaving like a scroll region.
  */
  let dragging = false
  let startY = 0
  let offset = 0

  function beginDrag(event: PointerEvent) {
    if (!swipeToClose || context.mode !== "sheet" || event.button !== 0) return
    // The close button lives in the strip. Let it be a button.
    if ((event.target as HTMLElement | null)?.closest("button")) return

    dragging = true
    startY = event.clientY
    offset = 0
    ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
    if (ref) ref.style.transition = "none"
  }

  function moveDrag(event: PointerEvent) {
    if (!dragging || !ref) return
    // Downwards, one to one, no overshoot above the resting position. Rubber
    // banding reads as a spring, and the system's motion is mechanical.
    offset = Math.max(0, event.clientY - startY)
    ref.style.translate = `0 ${offset}px`
  }

  function endDrag(event: PointerEvent) {
    if (!dragging || !ref) return
    dragging = false
    releaseCapture(event)

    const height = ref.getBoundingClientRect().height
    if (offset > Math.min(128, height * 0.3)) {
      // The exit keyframe animates `transform` while the drag sits on
      // `translate`, so the sheet carries on from wherever the thumb left it
      // instead of snapping back to rest for a frame first.
      context.close()
    } else {
      ref.style.transition = "translate 140ms var(--ease-brand)"
      ref.style.translate = "0px"
    }
    offset = 0
  }

  function cancelDrag(event: PointerEvent) {
    if (!dragging || !ref) return
    dragging = false
    releaseCapture(event)
    ref.style.transition = "translate 140ms var(--ease-brand)"
    ref.style.translate = "0px"
    offset = 0
  }

  function releaseCapture(event: PointerEvent) {
    const strip = event.currentTarget as HTMLElement
    if (strip.hasPointerCapture(event.pointerId)) {
      strip.releasePointerCapture(event.pointerId)
    }
  }
</script>

{#snippet closeButton(extraClass: string)}
  <DialogPrimitive.Close class={cn(closeClasses, extraClass)}>
    <X class="size-4" />
    <span class="sr-only">Close</span>
  </DialogPrimitive.Close>
{/snippet}

{#if context.primitive === "popover"}
  <PopoverPrimitive.Portal {...portalProps}>
    <PopoverPrimitive.Content
      bind:ref
      {align}
      {side}
      {sideOffset}
      class={cn(popoverClasses, className)}
      {...popoverRestProps}
    >
      {@render children()}
      {#if withClose}
        <PopoverPrimitive.Close class={cn(closeClasses, "absolute top-2 right-2")}>
          <X class="size-4" />
          <span class="sr-only">Close</span>
        </PopoverPrimitive.Close>
      {/if}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
{:else}
  <DialogPrimitive.Portal {...portalProps}>
    <DialogPrimitive.Overlay class={overlayClasses} />

    {#if context.mode === "sheet"}
      <DialogPrimitive.Content
        bind:ref
        class={cn(sheetClasses, className)}
        {...restProps}
      >
        <div
          role="presentation"
          class="relative flex h-11 shrink-0 touch-none items-center justify-center select-none"
          onpointerdown={beginDrag}
          onpointermove={moveDrag}
          onpointerup={endDrag}
          onpointercancel={cancelDrag}
        >
          <span
            aria-hidden="true"
            class="h-1 w-9 rounded-control bg-grey-500"
          ></span>
          {#if withClose}
            {@render closeButton("absolute top-1/2 right-3 -translate-y-1/2")}
          {/if}
        </div>

        <!-- The whole body scrolls, header included. A sticky header inside a
             sheet buys back very little and costs a second scroll context. -->
        <div
          class="flex min-h-0 flex-col gap-5 overflow-y-auto px-6 pt-1 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
        >
          {@render children()}
        </div>
      </DialogPrimitive.Content>
    {:else}
      <DialogPrimitive.Content
        bind:ref
        class={cn(dialogClasses, className)}
        {...restProps}
      >
        {@render children()}
        {#if withClose}
          {@render closeButton("absolute top-4 right-4")}
        {/if}
      </DialogPrimitive.Content>
    {/if}
  </DialogPrimitive.Portal>
{/if}
