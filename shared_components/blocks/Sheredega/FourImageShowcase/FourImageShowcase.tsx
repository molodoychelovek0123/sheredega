import { FourImageShowcaseProps } from "@/shared_components/blocks/Sheredega/FourImageShowcase/props";
import { Container } from "@/shared_components/components/Container/container";
import { CSSProperties, useRef } from "react";
import { useAnimations } from "@/global/useAnimations";
import { tinaField } from "tinacms/dist/react";

export const FourImageShowcase = ({
                                    images = [],
                                    container = true,
                                    uniquePath,
                                    customCss,
                                    indent,
                                    animation
                                  }: FourImageShowcaseProps) => {
  const ref = useRef<HTMLDivElement>();
  const { animationClass } = useAnimations(
    ref,
    animation?.type,
    animation?.speed,
    animation?.isScroll,
    animation?.showOnce
  );
  //
  return (
    <Container indent={indent} uniquePath={uniquePath} customCss={customCss} hide={!container}>
      <div className="w-full justify-start items-start four-image-showcase inline-flex flex-wrap " ref={ref}>
        {(images ?? []).map((item, index) => (
          <div key={JSON.stringify(item)}
               className={`w-full md:image-1/2 animate__delay-1s  ${animationClass}`}
               style={{ "--animate-delay": `${index * 0.2}s` } as CSSProperties}
               data-tina-field={tinaField(item)}>
            <div className="w-full pt-[62.015%] relative">
              <img className="absolute top-0 left-0 w-full h-full object-cover" src={item.src} alt={item.alt} />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};