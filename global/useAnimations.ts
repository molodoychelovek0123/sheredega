import { useState, useEffect, RefObject } from "react";
import cn from "@/global/utils/classnames";

export const useAnimations = (ref: RefObject<any>, type: string, speed: string, isScroll: boolean, showOnce = true) => {
  const [isVisible, setIsVisible] = useState(false);
//
  const animationClass = isVisible || isScroll ? cn(
      type && type !== "none" ? "animate__animated animate__" + type : "",
      speed && "animate__" + speed,
      isScroll ? (type.includes("half") ? "animate__half-on-scroll" : "animate__on-scroll") : "transition-all"
    ) :
    (type && type !== "none" && " animate__animated animate__fadeOut animate__faster");


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(prevState => {
          const isIntersecting = entry.isIntersecting;
          if (showOnce && !isIntersecting) {
            return prevState;
          }

          return entry.isIntersecting;
        });
      },
      {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.5 // 0 - 1: какой процент элемента виден должен быть для вызова колбэка
      }
    );

    if (ref.current && type && type !== "none") {
      observer.observe(ref.current);
    }

    // Cleanup
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [showOnce, ref]);

  return { animationClass, isVisible };
};