import { useEffect, useState } from "react";

const isSsr = () => (typeof window === "undefined" || typeof document === "undefined");
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<"down" | "up" | null>(null);

  useEffect(() => {
    if (!isSsr()) {
      let lastScrollY = window.pageYOffset;
      const updateScrollDirection = () => {
        const scrollY = window.pageYOffset;
        const direction = scrollY > lastScrollY ? "down" : "up";
        if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
          setScrollDirection(direction);
        }
        lastScrollY = scrollY > 0 ? scrollY : 0;
      };
      window.addEventListener("scroll", updateScrollDirection); // add event listener
      return () => {
        window.removeEventListener("scroll", updateScrollDirection); // clean up
      };

    }
  }, [scrollDirection]);

  return { scrollDirection };
};