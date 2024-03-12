import { Container } from "@/shared_components/components/Container/container";
import { tinaField } from "tinacms/dist/react";
import { CSSProperties, RefObject, useEffect, useRef } from "react";
import { BaseSectionProps } from "@/shared_components/blocks/Sheredega/constants";
import md5 from "md5";
import { MyImageProps } from "@/shared_components/utils/imageDefaultSchema";

type Props = {
  images?: (MyImageProps)[] | null;
  view?: string | null;
  aspectRatio?: "16:9" | "4:3" | "1:1" | string | null;
  gap?: number | null;
  container?: boolean | null;
} & BaseSectionProps


const innerScript = (ref: RefObject<HTMLUListElement>, gap: number, view: string) => {
  const slider = ref.current;
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  if (slider) {
    const itemWidth = (slider.querySelector(".scrolldriven-slide")?.clientWidth ?? 0) + gap;


    slider.addEventListener("pointerdown", (e) => {
      console.log(e);
      isDown = true;
      slider.classList.add("dragging");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;

    });
    slider.addEventListener("pointerleave", () => {
      isDown = false;
      slider.classList.remove("dragging");
    });
    slider.addEventListener("pointerup", () => {
      isDown = false;

      const count = Math.round(slider.scrollLeft / itemWidth);
      const sLeft = view === "1" ? itemWidth * count : itemWidth * count - (gap / 2);

      slider.scrollTo({
        left: sLeft,
        behavior: "smooth"
      });
      setTimeout(() => {
        slider.classList.remove("dragging");

        console.log(slider.scrollLeft);
      }, 500);

      console.log(count, "*", itemWidth, "=", itemWidth * count, sLeft);
    });
    slider.addEventListener("pointermove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast

      slider.scrollLeft = scrollLeft - walk;

    });
  }
};
export const ScrollDrivenSlider = ({
                                     images,
                                     view = "3",
                                     aspectRatio = "16:9",
                                     gap = 20,
                                     indent,
                                     uniquePath,
                                     customCss,
                                     container = true
                                   }: Props) => {

  if (aspectRatio !== "16:9" && aspectRatio !== "4:3" && aspectRatio !== "1:1") {
    return null;
  }

  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (ref.current) {
      innerScript(ref, gap ?? 20, view ?? "3");
    }
  }, [ref]);

  const id = `slider__${md5(`${uniquePath} + ${images?.[0]?.src}`)}`;


  const bulletIndex = view === "1" ? undefined : -1 * (Number(view) - 1);
  return (
    <Container indent={indent} uniquePath={uniquePath} customCss={customCss} hide={!container}>
      <div
        style={{ "--gap": `${gap}px`, marginRight: view !== "1" ? "calc(var(--gap) * -1)" : 0 } as CSSProperties}>
        <ul
          ref={ref}
          className={`scrolldriven-slides ${id}`}>
          {images?.map((image, index) => {

            if(!image) {
              return null;
            }
            return (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              <li key={image?._tina_metadata?.name ?? index} name={`${id}__${index}`}
                  className={`scrolldriven-slide scrolldriven-slide-${view} `}
                  data-tina-field={tinaField(image)}>
                <div className={`scrolldriven-container-${aspectRatio} relative w-full`}>
                  <img src={image?.src ?? "https://via.placeholder.com/500x500"} alt={image.alt ?? "Альтернативный текст"} draggable={false} className={`scrolldriven-image`}
                       onClick={typeof window !== "undefined" && typeof image.link === 'string' ? () => window.open(image?.link ?? "/", "_blank") : undefined} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-full h-2 justify-center items-start gap-2 inline-flex">

        {(images ?? []).slice(0, bulletIndex).map((image, index) => (
          <a
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            key={image?._tina_metadata?.name ?? index}
            className="w-2 h-2 bg-gray-800 rounded-full opacity-20 hover:opacity-80" href={`#${id}__${index}`}
            onClick={(e) => {
              e.preventDefault();
              if (ref.current) {
                ref.current.scrollTo({
                  left: index * (ref.current?.querySelector(".scrolldriven-slide")?.clientWidth ?? 0),
                  behavior: "smooth"
                });
              }
            }} />
        ))}
      </div>
    </Container>
  );
};