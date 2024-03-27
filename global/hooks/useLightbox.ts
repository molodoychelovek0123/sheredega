import { useEffect, useState } from "react";

export type LightBoxImage = { src: string, alt: string }[]
export const useLightbox = (images: LightBoxImage) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const onNext = () => {
    setCurrentIndex(prev => prev + 1 < images.length ? prev + 1 : prev);
  };

  const onPrev = () => {
    setCurrentIndex(prev => prev - 1 >= 0 ? prev - 1 : prev);
  };

  useEffect(() => {
    if(typeof document !== 'undefined') {
      if(isOpen) {
        document.querySelector("body")?.classList.add("lightbox-open");
      }

      if(!isOpen) {
        document.querySelector("body")?.classList.remove("lightbox-open");
      }
    }
  }, [isOpen]);


  return {
    isOpen, setIsOpen,
    setCurrentIndex,
    currentIndex,
    onNext,
    onPrev,
    images
  };
};