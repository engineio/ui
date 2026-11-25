/**
 * The Engine design system. Products copy this folder into their own tree
 * (scripts/copy-into.ts) and import from wherever it landed:
 *
 *     import { Button, Card, CardHeader } from "$lib/engine-ui/index.js"
 *
 * Every component is also reachable by its own module, which is what you want
 * when you only need one and would rather not pull the barrel:
 *
 *     import { Button } from "$lib/engine-ui/components/ui/button/index.js"
 *
 * The flat prefixed names below (`CardHeader`, `DialogTitle`) are the same
 * objects the subpath modules export as `Header` / `Title`. Both spellings
 * work; the prefixed ones are re-exported here because `Root`, `Content` and
 * `Title` would collide across twenty components in one namespace.
 *
 * Styles are NOT imported by this module. Import the stylesheet yourself,
 * once, from app.css:
 *
 *     @import "tailwindcss";
 *     @import "./lib/engine-ui/styles/index.css";
 */

export { cn } from "./utils.js"
export { themes, type ThemeName } from "./themes.js"
export type {
  WithElementRef,
  WithoutChild,
  WithoutChildren,
  WithoutChildrenOrChild,
} from "./utils.js"

export {
  EngineIcon,
  EngineWordmark,
  type EngineMarkVariant,
} from "./components/brand/index.js"

export {
  BentoCard,
  BentoGrid,
  Hero,
  Marquee,
  SectionHead,
  SiteBanner,
  SiteFooter,
  SiteHeader,
  StatBand,
  Tour,
  inView,
  prefersReducedMotion,
  type FooterColumn,
  type MarqueeItem,
  type NavLink,
  type Stat,
  type TourStep,
} from "./components/marketing/index.js"

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
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
  type ResponsiveDialogMode,
} from "./components/ui/responsive-dialog/index.js"

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
  Segmented,
  segmentVariants,
  type SegmentVariants,
} from "./components/ui/segmented/index.js"

export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs/index.js"

export { Textarea } from "./components/ui/textarea/index.js"

export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip/index.js"
