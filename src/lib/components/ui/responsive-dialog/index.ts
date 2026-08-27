import Root from "./responsive-dialog.svelte"
import Close from "./responsive-dialog-close.svelte"
import Content from "./responsive-dialog-content.svelte"
import Description from "./responsive-dialog-description.svelte"
import Footer from "./responsive-dialog-footer.svelte"
import Header from "./responsive-dialog-header.svelte"
import Title from "./responsive-dialog-title.svelte"
import Trigger from "./responsive-dialog-trigger.svelte"

export type { ResponsiveDialogMode } from "./context.js"

export {
  Root,
  Close,
  Content,
  Description,
  Footer,
  Header,
  Title,
  Trigger,
  //
  Root as ResponsiveDialog,
  Close as ResponsiveDialogClose,
  Content as ResponsiveDialogContent,
  Description as ResponsiveDialogDescription,
  Footer as ResponsiveDialogFooter,
  Header as ResponsiveDialogHeader,
  Title as ResponsiveDialogTitle,
  Trigger as ResponsiveDialogTrigger,
}
