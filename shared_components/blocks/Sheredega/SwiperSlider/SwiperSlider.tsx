import { Container } from "@/shared_components/components/Container/container";
import { tinaField } from "tinacms/dist/react";
import { CSSProperties, RefObject, useEffect, useRef } from "react";
import { BaseSectionProps } from "@/shared_components/blocks/Sheredega/constants";
import md5 from "md5";
import { MyImageProps } from "@/shared_components/utils/imageDefaultSchema";
import Lightbox from "react-spring-lightbox";
import { LightBoxImage, useLightbox } from "@/global/hooks/useLightbox";
import { ArrowButton } from "@/components/ArrowButton";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";


// import required modules
import { Keyboard, Mousewheel, Pagination } from "swiper/modules";
import { CloseButton } from "@/components/CloseButton";

type Props = {
  showRightEl?: boolean | null;
  images?: (MyImageProps)[] | null;
  view?: string | null;
  aspectRatio?: "16:9" | "4:3" | "1:1" | string | null;
  gap?: number | null;
  imageContain?: boolean | null;
} & BaseSectionProps


export const SwiperSlider = ({
                               images,
                               view = "3",
                               aspectRatio = "16:9",
                               gap = 20,
                               indent,
                               uniquePath,
                               customCss,
                               showRightEl,
                               imageContain
                             }: Props) => {

  if (aspectRatio !== "16:9" && aspectRatio !== "4:3" && aspectRatio !== "1:1") {
    return null;
  }


  const id = `slider__${md5(`${uniquePath} + ${images?.[0]?.src}`)}`;

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
      <Container indent={indent} uniquePath={uniquePath} customCss={customCss}
                 className={"p-0-force"}>
        <Swiper
          id={id}
          slidesPerView={Number(view ?? "3")}

          spaceBetween={gap}
          mousewheel={true}
          draggable={true}
          grabCursor={true}
          keyboard={true}
          pagination={{
            clickable: true
          }}
          modules={[Pagination, Mousewheel, Keyboard]}
          className="sheredega-swiper-slider  px-4 md:px-6 lg:px-10"
          style={showRightEl ? { paddingRight: (gap ?? 0) + 50 } : undefined}
        >

          {filteredImages?.map((image, index) => {
            return <SwiperSlide>
              <div className={`scrolldriven-container-${aspectRatio} relative w-full`}>
                <img src={image?.src ?? "https://via.placeholder.com/500x500"}
                     alt={image.alt ?? "Альтернативный текст"} draggable={false}
                     className={`absolute top-0 left-0 w-full h-full cursor-pointer ${imageContain ? "object-contain" : "object-cover"} object-top`}
                     onClick={() => {
                       setCurrentIndex(index);
                       setIsOpen(true);
                     }}
                  // onClick={typeof window !== "undefined" && typeof image.link === "string" ? () => window.open(image?.link ?? "/", "_blank") : undefined}
                />
              </div>

            </SwiperSlide>;
          })}

        </Swiper>
      </Container>
    </>
  );
};