
import * as React from "react"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : undefined
  )

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      mql.addEventListener("change", onChange)
    }
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile === undefined ? false : isMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(
    typeof window !== 'undefined' 
      ? window.innerWidth >= MOBILE_BREAKPOINT && window.innerWidth < TABLET_BREAKPOINT
      : undefined
  )

  React.useEffect(() => {
    const mqlMin = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px)`)
    const mqlMax = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      setIsTablet(
        window.innerWidth >= MOBILE_BREAKPOINT && 
        window.innerWidth < TABLET_BREAKPOINT
      )
    }
    
    if (typeof window !== 'undefined') {
      setIsTablet(
        window.innerWidth >= MOBILE_BREAKPOINT && 
        window.innerWidth < TABLET_BREAKPOINT
      )
      
      mqlMin.addEventListener("change", onChange)
      mqlMax.addEventListener("change", onChange)
    }
    
    return () => {
      mqlMin.removeEventListener("change", onChange)
      mqlMax.removeEventListener("change", onChange)
    }
  }, [])

  return isTablet === undefined ? false : isTablet
}

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState<boolean | undefined>(
    typeof window !== 'undefined' ? window.innerWidth >= TABLET_BREAKPOINT : undefined
  )

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${TABLET_BREAKPOINT}px)`)
    
    const onChange = () => {
      setIsDesktop(window.innerWidth >= TABLET_BREAKPOINT)
    }
    
    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth >= TABLET_BREAKPOINT)
      mql.addEventListener("change", onChange)
    }
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isDesktop === undefined ? false : isDesktop
}

export function useBreakpoint() {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = useIsDesktop()
  
  return { isMobile, isTablet, isDesktop }
}
