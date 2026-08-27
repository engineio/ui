import { getContext, setContext } from "svelte"

/**
 * Which surface the component is currently wearing.
 *
 * `sheet` and `dialog` are both the bits-ui Dialog primitive — same focus
 * trap, same scroll lock, same Escape and outside-click behaviour, laid out
 * differently. `popover` is a genuinely different primitive: anchored, not
 * modal, and with no focus trap.
 */
export type ResponsiveDialogMode = "sheet" | "dialog" | "popover"

export type ResponsiveDialogContext = {
  /** The resolved surface for the current viewport. */
  readonly mode: ResponsiveDialogMode
  /** The bits-ui primitive `mode` maps onto. */
  readonly primitive: "dialog" | "popover"
  /** Close from a part that has no primitive Close to hand — the sheet's drag. */
  close: () => void
}

const KEY = Symbol("engine.responsive-dialog")

export function setResponsiveDialogContext(context: ResponsiveDialogContext) {
  return setContext(KEY, context)
}

export function getResponsiveDialogContext(): ResponsiveDialogContext {
  const context = getContext<ResponsiveDialogContext | undefined>(KEY)
  if (!context) {
    throw new Error(
      "ResponsiveDialog parts must be used inside <ResponsiveDialog>.",
    )
  }
  return context
}
