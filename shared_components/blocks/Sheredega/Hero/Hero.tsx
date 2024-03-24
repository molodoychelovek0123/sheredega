import * as React from "react";
import { Container } from "../../../components/Container/container";
import { Section } from "../../../components/Section/section";
import { tinaField } from "tinacms/dist/react";
import { HeroProps } from "./props";
import { Title } from "../../../components/Title/Title";
import { useEffect, useState } from "react";

export const Hero = ({ block, images, title }: HeroProps) => {
  const { heading } = title ?? {};
  const [active, setActive] = useState(0);
  const imageTotal = (images?.length ?? 0);
  useEffect(() => {
    if (imageTotal > 0) {
      const timer = setInterval(() => {
        setActive(prevState => {
          if (prevState + 1 >= imageTotal) {
            return 0;
          }
          return prevState + 1;
        });
      }, 5000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [imageTotal]);


  return (
    <Section className="relative pb-15 h-hero-fullscreen overflow-x-hidden">
      <div className="image-container absolute top-0 left-0 w-full h-full">
        {(images ?? []).map((item, index) =>
          (
            <img key={index}
                 className={`image-container absolute top-0 left-0 w-full h-full transition-opacity duration-500 object-cover ${index !== active ? "opacity-0" : "opacity-100"}`}
                 src={item?.src ?? "https://via.placeholder.com/1920x1080"}
                 alt={item?.alt ?? "Альтернативный текст"} />

          )
        )}
      </div>
      <Container
        size="large"
        className="relative h-full w-full"
      >
        <Title size={title?.size ?? "100"} seoSize={title?.seoSize ?? "1"} color={title?.color ?? "black"}
               data-tina-field={tinaField(block, "title")}
               className={"mt-auto absolute bottom-0"}
        > {heading} </Title>

      </Container>
    </Section>
  );
};

