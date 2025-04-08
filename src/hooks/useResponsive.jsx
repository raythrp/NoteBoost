"use client"

import { useEffect, useState } from "react"

function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })

      // Set isMobile based on window width
      setIsMobile(window.innerWidth < 768)
    }

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return { windowSize, isMobile }
}

export default useResponsive

