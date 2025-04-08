
import * as React from "react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useSidebar } from "./sidebar-provider"
import {
  Button,
  buttonVariants,
} from "@/components/ui/button"
import { ChevronRight, Menu, X } from "lucide-react"

export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-14 items-center gap-2 px-3",
      "border-b border-sidebar-border",
      className
    )}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

export const SidebarHeaderItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-md px-2 py-1 text-sm transition-colors data-[state=open]:bg-transparent focus:bg-sidebar-accent focus:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      className
    )}
    {...props}
  />
))
SidebarHeaderItem.displayName = "SidebarHeaderItem"

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  showLastUpdated?: boolean
  lastUpdated?: string
}

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  SidebarContentProps
>(
  (
    { className, showLastUpdated = false, lastUpdated = "", children, ...props },
    ref
  ) => {
    const { state } = useSidebar()
    const contentHeight = showLastUpdated ? "calc(100% - 42px)" : "100%"

    return (
      <div
        ref={ref}
        className={cn("relative h-full", className)}
        style={
          {
            "--sidebar-content-height": contentHeight,
          } as React.CSSProperties
        }
        {...props}
      >
        <ScrollArea
          className="h-[--sidebar-content-height] w-full overflow-hidden"
          data-state={state}
        >
          {children}
        </ScrollArea>
        {showLastUpdated ? (
          <div className="absolute bottom-0 left-0 right-0 flex h-9 select-none items-center justify-center border-t border-sidebar-border bg-sidebar text-[10px] font-medium text-sidebar-foreground/50">
            {lastUpdated}
          </div>
        ) : null}
      </div>
    )
  }
)
SidebarContent.displayName = "SidebarContent"

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-14 items-center gap-2 px-3",
      "border-t border-sidebar-border",
      className
    )}
    data-sidebar="footer"
    {...props}
  />
))
SidebarFooter.displayName = "SidebarFooter"

export const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { state } = useSidebar()

  return (
    <div
      ref={ref}
      data-sidebar="group"
      data-state={state}
      className={cn(
        "w-full min-w-0 pt-0.5 pb-3 first:pt-3 [&:has([data-sidebar=menu-skeleton])]:pb-0",
        className
      )}
      {...props}
    />
  )
})
SidebarGroup.displayName = "SidebarGroup"

export const SidebarGroupLabel = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  const { state } = useSidebar()

  return (
    <span
      ref={ref}
      data-sidebar="group-label"
      data-state={state}
      className={cn(
        "mb-1.5 inline-block text-[0.625rem] font-medium uppercase tracking-wide text-sidebar-foreground/50 first:hidden data-[state=expanded]:first:block",
        "px-3",
        state === "collapsed" &&
          "sr-only w-0 opacity-0 data-[state=expanded]:not-sr-only data-[state=expanded]:w-auto data-[state=expanded]:opacity-100",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

export const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("space-y-1 px-3", className)}
    {...props}
  />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "inset"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const { state, isMobile, openMobile, setOpenMobile } = useSidebar()

  // Do not render the sidebar on mobile, instead render a drawer with the sidebar.
  if (isMobile) {
    return (
      <Drawer
        open={openMobile}
        onOpenChange={setOpenMobile}
        direction="left"
        closeThreshold={0.4}
        onClose={() => setOpenMobile(false)}
        shouldScaleBackground={false}
      >
        <DrawerTrigger
          asChild
          className="absolute left-4 top-3.5 flex md:hidden"
        >
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => {
              setOpenMobile(true)
            }}
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent
          className="fixed inset-y-0 left-0 w-[--sidebar-width-mobile] p-0"
        >
          <div className="flex h-svh w-full flex-col gap-0">
            <div className="flex h-14 items-center border-b border-sidebar-border px-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpenMobile(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <div
              ref={ref}
              className={cn(
                "flex h-full w-full flex-col data-[variant=inset]:mt-4 data-[variant=inset]:rounded-md data-[variant=inset]:border data-[variant=inset]:border-sidebar-border data-[variant=inset]:bg-card",
                className
              )}
              data-sidebar="root"
              data-variant={variant}
              {...props}
            />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <div
      ref={ref}
      className={cn(
        "group/sidebar-root sticky left-0 top-0 flex h-svh flex-shrink-0 flex-grow-0 data-[state=expanded]:w-[--sidebar-width] data-[state=collapsed]:w-[--sidebar-width-icon] data-[collapsible=false]:w-[--sidebar-width]",
        "transition-[width] ease-in-out",
        "flex-col",
        "shadow-sm shadow-sidebar-border",
        "z-20 hidden md:flex",
        "data-[variant=inset]:m-0 data-[variant=inset]:mt-4 data-[variant=inset]:rounded-md data-[variant=inset]:border data-[variant=inset]:border-sidebar-border data-[variant=inset]:bg-card",
        className
      )}
      data-sidebar="root"
      data-state={state}
      data-variant={variant}
      {...props}
    />
  )
})
Sidebar.displayName = "Sidebar"

export const SidebarCollapsible = React.forwardRef<
  React.ElementRef<typeof Collapsible>,
  React.ComponentProps<typeof Collapsible>
>(({ children, ...props }, ref) => {
  const [open, setOpen] = React.useState(false)
  const { state } = useSidebar()

  // If the sidebar is collapsed, we need to reset the collapsible to closed.
  React.useEffect(() => {
    if (state === "collapsed") {
      setOpen(false)
    }
  }, [state])

  return (
    <Collapsible ref={ref} open={open} onOpenChange={setOpen} {...props}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return child
        }

        if (index === 0) {
          return (
            <CollapsibleTrigger asChild>
              {React.cloneElement(child, {
                ...(child.props as any),
                children: (
                  <>
                    {child.props.children}
                    <ChevronRight
                      className={cn(
                        "ml-auto h-4 w-4 text-sidebar-foreground/50 transition-transform group-data-[collapsible=icon]:hidden",
                        open && "rotate-90"
                      )}
                    />
                  </>
                ),
              })}
            </CollapsibleTrigger>
          )
        }

        return state === "collapsed" ? null : (
          <CollapsibleContent>{child}</CollapsibleContent>
        )
      })}
    </Collapsible>
  )
})
SidebarCollapsible.displayName = "SidebarCollapsible"
