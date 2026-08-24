/**
 * @engineio/ui — the Engine design system.
 *
 *     import { Button, Card, CardHeader } from "@engineio/ui"
 *
 * Every component is also reachable by subpath, which is what you want when
 * you only need one and would rather not pull the barrel:
 *
 *     import { Button } from "@engineio/ui/components/ui/button"
 *
 * The flat prefixed names below (`CardHeader`, `DialogTitle`) are the same
 * objects the subpath modules export as `Header` / `Title`. Both spellings
 * work; the prefixed ones are re-exported here because `Root`, `Content` and
 * `Title` would collide across twenty components in one namespace.
 *
 * Styles are NOT imported by this module — CSS in a package entry point would
 * force it on every consumer and break tree-shaking. Import the stylesheet
 * yourself, once, and add the `@source` line:
 *
 *     @import "tailwindcss";
 *     @import "@engineio/ui/styles";
 *     @source "../node_modules/@engineio/ui/dist";
 */

export { cn } from "./utils.js"
export type {
  WithElementRef,
  WithoutChild,
  WithoutChildren,
  WithoutChildrenOrChild,
} from "./utils.js"

export {
  Alert,
  AlertDescription,
  AlertTitle,
  alertVariants,
  type AlertVariant,
} from "./components/ui/alert/index.js"

export {
  Badge,
  badgeVariants,
  type BadgeVariant,
} from "./components/ui/badge/index.js"

export {
  Button,
  buttonVariants,
  type ButtonProps,
  type ButtonSize,
  type ButtonVariant,
} from "./components/ui/button/index.js"

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card/index.js"

export { Checkbox } from "./components/ui/checkbox/index.js"

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog/index.js"

export { Input } from "./components/ui/input/index.js"
export { Label } from "./components/ui/label/index.js"

export {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover/index.js"

export { Progress } from "./components/ui/progress/index.js"

export {
  RadioGroup,
  RadioGroupItem,
} from "./components/ui/radio-group/index.js"

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupHeading,
  SelectItem,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
} from "./components/ui/select/index.js"

export { Separator } from "./components/ui/separator/index.js"
export { Skeleton } from "./components/ui/skeleton/index.js"
export { Switch } from "./components/ui/switch/index.js"

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table/index.js"

export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs/index.js"

export { Tag, tagVariants, type TagVariant } from "./components/ui/tag/index.js"
export { Textarea } from "./components/ui/textarea/index.js"

export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip/index.js"
