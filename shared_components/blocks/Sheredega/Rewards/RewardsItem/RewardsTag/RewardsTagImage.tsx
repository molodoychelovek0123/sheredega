import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";

export const RewardsTagImage = ({ image, alt }: { image: string, alt: string }) => {
  const SPRING_CONFIG = { damping: 500, stiffness: 2000 };
  const maxDistancePercentage = 5;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const ref = useRef<HTMLImageElement>(null);
  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);
  const springScale = useSpring(scale, SPRING_CONFIG);

  useEffect(() => {
    const calculateDistance = (e: MouseEvent) => {

      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        x.set(distanceX * (maxDistancePercentage / 100));
        y.set(distanceY * (maxDistancePercentage / 100));
      }
    };

    if (ref.current) {
      ref.current?.addEventListener("mousemove", calculateDistance);
      ref.current?.addEventListener("mouseenter", () => {
        scale.set(1.5);
      });
      ref.current?.addEventListener("mouseleave", () => {
        scale.set(1);
        x.set(0);
        y.set(0);
      });
    }

    return () => {
      ref.current?.removeEventListener("mousemove", calculateDistance);
    };
  }, [ref]);

  if (image && alt) {
    return <motion.img
      className="absolute top-0 right-0 bottom-0 left-0 w-full h-full opacity-0 transition-opacity duration-500 object-cover "
      src={image} alt={alt} ref={ref} style={{
      x: springX,
      y: springY,
      scale: springScale
    }} />;
  }
  return null;
};
