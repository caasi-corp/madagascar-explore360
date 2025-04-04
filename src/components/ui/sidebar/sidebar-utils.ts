
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add default styles for the sidebar
export const sidebarStyle = {
  width: "16rem",
  widthMobile: "18rem",
  widthIcon: "3rem",
}

// Utility function to get sidebar width based on state
export function getSidebarWidth(state: "expanded" | "collapsed", isMobile: boolean) {
  if (isMobile) {
    return sidebarStyle.widthMobile
  }
  
  return state === "expanded" ? sidebarStyle.width : sidebarStyle.widthIcon
}

// Utility function to get sidebar item state classes
export function getSidebarItemClasses(isActive: boolean) {
  return {
    base: "flex items-center p-2 rounded-md transition-colors",
    active: isActive 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
      : "hover:bg-sidebar-accent/50 text-sidebar-foreground",
  }
}
