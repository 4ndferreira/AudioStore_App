import { useEffect, useState } from "react";

export const useMediaQuery = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1224px)");
    setIsDesktop(mediaQuery.matches);

    const handleResize = (e: { matches: boolean }) => {
      setIsDesktop(e.matches);
    };
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);
  return isDesktop;
};
