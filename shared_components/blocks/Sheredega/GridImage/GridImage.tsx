import { GridImageProps } from "@/shared_components/blocks/Sheredega/GridImage/props";
import { Container } from "@/shared_components/components/Container/container";
import { CSSProperties, useRef } from "react";
import { useAnimations } from "@/global/useAnimations";
import Grid from "@/shared_components/components/Grid/Grid";
import { tinaField } from "tinacms/dist/react";

export const GridImage = ({  grid, images, indent, uniquePath, customCss, animation }: GridImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { animationClass } = useAnimations(
    ref,
    animation?.type,
    animation?.speed,
    animation?.isScroll,
    animation?.showOnce
  );
  return (
    <Container indent={indent} uniquePath={uniquePath} customCss={customCss}>
      <Grid {...grid} ref={ref} className="gap-5">
        {images?.map((image, index) => (

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <div key={image?._tina_metadata?.name ?? index} className="relative pt-[100%]"
               data-tina-field={tinaField(image)}>
            <img src={image.src} alt={image.alt}
                 className={`${animationClass} animate__delay-1s absolute top-0 left-0 w-full h-full object-cover ${image.link ? "cursor-pointer" : ""}`}
                 style={{ "--animate-delay": `${index * 0.2}s` } as CSSProperties}
                 onClick={(image.link && typeof window !== "undefined") ? () => window.open(image.link, "_blank") : undefined} />
          </div>
        ))}
      </Grid>
    </Container>
  );
};