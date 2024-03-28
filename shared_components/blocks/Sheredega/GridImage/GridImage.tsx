import { GridImageProps } from "@/shared_components/blocks/Sheredega/GridImage/props";
import { Container } from "@/shared_components/components/Container/container";
import { CSSProperties, useRef } from "react";
import { useAnimations } from "@/global/useAnimations";
import Grid from "@/shared_components/components/Grid/Grid";
import { tinaField } from "tinacms/dist/react";
import React from "react";
import { LightBoxImage, useLightbox } from "@/global/hooks/useLightbox";
import Lightbox from "react-spring-lightbox";
import { ArrowButton } from "@/components/ArrowButton";
import { CloseButton } from "@/components/CloseButton";

export const GridImage = ({ grid, images, indent, uniquePath, customCss, animation }: GridImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { animationClass } = useAnimations(
    ref,
    animation?.type,
    animation?.speed,
    animation?.isScroll,
    animation?.showOnce
  );

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
      <Container indent={indent} uniquePath={uniquePath} customCss={customCss}>
        <Grid {...grid} ref={ref} className="gap-5">
          {filteredImages?.map((image, index) => (

            <React.Fragment key={`${image}-${index}`}>
              {image &&
                <div key={JSON.stringify(image)} className="relative pt-[100%]"
                     data-tina-field={tinaField(image)}>
                  <img src={image?.src ?? "https://via.placeholder.com/450x450"} alt={image?.alt ?? ""}
                       className={`${animationClass} animate__delay-1s absolute top-0 left-0 w-full h-full object-cover cursor-pointer`}
                       style={{ "--animate-delay": `${index * 0.2}s` } as CSSProperties}
                       onClick={() => {
                         setIsOpen(true);
                         setCurrentIndex(index);
                       }}
                    // onClick={(image.link && typeof window !== "undefined") && image.link ? () => window.open(image?.link ?? "/", "_blank") : undefined}

                  />
                </div>
              }
            </React.Fragment>
          ))}
        </Grid>
      </Container>
    </>
  );
};