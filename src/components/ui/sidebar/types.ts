
import { VariantProps } from "class-variance-authority"
import { sidebarMenuButtonVariants } from "./sidebar-menu-button"

export type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

export type TooltipContentProps = React.ComponentProps<"div"> | string
