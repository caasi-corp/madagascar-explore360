
"use client"

import { useEffect, useState } from "react"

// Define a breakpoint for mobile devices
const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false
  )

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return isMobile
}

// Modified useBreakpoint to return an object with isMobile and isTablet properties
export function useBreakpoint(mobileBreakpoint: number = MOBILE_BREAKPOINT, tabletBreakpoint: number = TABLET_BREAKPOINT) {
  const [screenInfo, setScreenInfo] = useState({
    isMobile: typeof window !== "undefined" ? window.innerWidth < mobileBreakpoint : false,
    isTablet: typeof window !== "undefined" ? window.innerWidth >= mobileBreakpoint && window.innerWidth < tabletBreakpoint : false
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleResize = () => {
      const width = window.innerWidth
      setScreenInfo({
        isMobile: width < mobileBreakpoint,
        isTablet: width >= mobileBreakpoint && width < tabletBreakpoint
      })
    }

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [mobileBreakpoint, tabletBreakpoint])

  return screenInfo
}
