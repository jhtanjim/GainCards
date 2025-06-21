// src/components/Shared/ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Find the main scrollable container
    const mainContainer = document.querySelector('main.flex-1.overflow-y-auto');
    
    if (mainContainer) {
      // Scroll the main container to top
      mainContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Fallback to window scroll
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;