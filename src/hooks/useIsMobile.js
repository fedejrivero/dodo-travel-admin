import { useState, useEffect } from 'react';

/**
 * Custom hook that detects if the current device is a mobile device
 * based on the window's inner width.
 * 
 * @returns {boolean} Returns true if the device is considered mobile (width < 768px), false otherwise
 */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to update the isMobile state based on window width
    const checkIfMobile = () => {
      // Common breakpoint for mobile devices (matches Bootstrap's sm breakpoint)
      const mobileBreakpoint = 768;
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    // Set initial value
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
