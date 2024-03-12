import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";
import { tinaField } from "tinacms/dist/react";
import React from "react";

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

const ParallaxContainer = ({ children, baseVelocity = 100 }: ParallaxProps) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  /**
   * The number of times to repeat the child text should be dynamically calculated
   * based on the size of the text and viewport. Likewise, the x motion value is
   * currently wrapped between -20 and -45% - this 25% is derived from the fact
   * we have four children (100% / 4). This would also want deriving from the
   * dynamically generated number of children.
   */
  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  );
};

const LogoContainer = ({ src, alt, "data-tina-field": dataTinaField }: {
  src: string,
  alt: string,
  "data-tina-field"?: string
}) => {
  return (
    <div
      key={dataTinaField}
      className="w-[165px] h-[165px] md:w-[220px] md:h-[220px] lg:w-[330px] lg:h-[330px] px-6 border border-neutral-200 flex-col justify-center items-center inline-flex relative overflow-hidden"
      data-tina-field={dataTinaField}>
      <div
        className="w-[330px] h-[330px] a-centered pointer-events-none flex-col justify-center items-center inline-flex px-6 ">
        <img className="max-w-full max-h-full scale-50 md:scale-70 lg:scale-100" src={src} alt={alt} />
      </div>
    </div>
  );
};
type image = {
  src?: string | null,
  alt?: string | null;
}
type Props = {
  logosFirst: (image | null)[] | null;
  logosSecond: (image | null)[] | null;
  baseVelocity: number | null;
}
export const LogoMarquee = ({ logosFirst, logosSecond, baseVelocity = 1 }: Props) => {

  return (
    <section>
      <ParallaxContainer baseVelocity={(baseVelocity ?? 1) * -1}>
        {(logosFirst ?? []).map(item => (
          <React.Fragment key={tinaField(item ?? {})}>
            {item?.src  && <LogoContainer src={item.src} alt={item?.alt ?? "Кто-то забыл заполнить меня"} data-tina-field={tinaField(item)} />}
          </React.Fragment>
        ))}

      </ParallaxContainer>
      <ParallaxContainer baseVelocity={(baseVelocity ?? 1)}>


        {(logosSecond ?? []).map(item => (
          <React.Fragment key={tinaField(item ?? {})}>
            {item?.src && <LogoContainer src={item.src} alt={item?.alt ?? "Кто-то забыл заполнить меня"} data-tina-field={tinaField(item)} />}
          </React.Fragment>
        ))}

      </ParallaxContainer>
    </section>
  );
};