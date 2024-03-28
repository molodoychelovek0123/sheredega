import { FourImageShowcaseProps } from "@/shared_components/blocks/Sheredega/FourImageShowcase/props";
import { Container } from "@/shared_components/components/Container/container";
import { CSSProperties, useRef } from "react";
import { useAnimations } from "@/global/useAnimations";
import { tinaField } from "tinacms/dist/react";
import { LightBoxImage, useLightbox } from "@/global/hooks/useLightbox";
import Lightbox from "react-spring-lightbox";
import { ArrowButton } from "@/components/ArrowButton";
import { CloseButton } from "@/components/CloseButton";

export const FourImageShowcase = ({
                                    images = [],
                                    container = true,
                                    uniquePath,
                                    customCss,
                                    indent,
                                    animation
                                  }: FourImageShowcaseProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { animationClass } = useAnimations(
    ref,
    animation?.type,
    animation?.speed,
    animation?.isScroll,
    animation?.showOnce
  );
  //
  const filteredImages = (images?.filter(Boolean) ?? []) as LightBoxImage;

  const { onNext, onPrev, currentIndex, isOpen, setIsOpen, setCurrentIndex } = useLightbox(filteredImages);

  return (
    <>
      <Lightbox currentIndex={currentIndex} images={filteredImages} isOpen={isOpen} onNext={onNext} onPrev={onPrev}
                onClose={() => setIsOpen(false)}
                renderPrevButton={({ canPrev }) => (
                  <ArrowButton
                    position="left"
                    onClick={onPrev}
                    disabled={!canPrev}
                  />
                )}
                renderHeader={() => (
                  <div className="flex justify-end pointer-events-none">
                    <CloseButton onClick={() => {
                      setIsOpen(false);
                    }} />
                  </div>
                )}
                renderNextButton={({ canNext }) => (
                  <ArrowButton position="right" onClick={onNext} disabled={!canNext} />
                )}
      />
      <Container indent={indent} uniquePath={uniquePath} customCss={customCss} hide={!container}>
        <div className="w-full justify-start items-start four-image-showcase inline-flex flex-wrap " ref={ref}>
          {(filteredImages ?? []).map((item, index) => (
            <>
              {item &&
                <div key={JSON.stringify(item)}
                     className={`w-full md:image-1/2 animate__delay-1s  ${animationClass}`}
                     style={{ "--animate-delay": `${index * 0.2}s` } as CSSProperties}
                     data-tina-field={tinaField(item)}>
                  <div className="w-full pt-[62.015%] relative"
                       onClick={() => {
                         setIsOpen(true);
                         setCurrentIndex(index);
                       }}
                  >
                    <img className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
                         src={item.src ?? "https://via.placeholder.com/450x450"}
                         alt={item?.alt ?? "Альтернативный текст"} />
                  </div>
                </div>
              }
            </>
          ))}
        </div>
      </Container>
    </>
  );
};