/**
 * Utility functions for responsive design
 */

// Screen size breakpoints (matching Tailwind's defaults)
export const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  }
  
  /**
   * Determines if the current screen size is mobile
   * @param {number} width - Current window width
   * @returns {boolean} - True if mobile size
   */
  export const isMobileScreen = (width) => {
    return width < breakpoints.md
  }
  
  /**
   * Determines if the current screen size is tablet
   * @param {number} width - Current window width
   * @returns {boolean} - True if tablet size
   */
  export const isTabletScreen = (width) => {
    return width >= breakpoints.md && width < breakpoints.lg
  }
  
  /**
   * Determines if the current screen size is desktop
   * @param {number} width - Current window width
   * @returns {boolean} - True if desktop size
   */
  export const isDesktopScreen = (width) => {
    return width >= breakpoints.lg
  }
  
  /**
   * Returns the current device type based on screen width
   * @param {number} width - Current window width
   * @returns {string} - 'mobile', 'tablet', or 'desktop'
   */
  export const getDeviceType = (width) => {
    if (isMobileScreen(width)) return "mobile"
    if (isTabletScreen(width)) return "tablet"
    return "desktop"
  }
  
  