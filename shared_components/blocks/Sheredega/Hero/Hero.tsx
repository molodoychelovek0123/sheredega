import * as React from "react";
import { Container } from "../../../components/Container/container";
import { Section } from "../../../components/Section/section";
import { tinaField } from "tinacms/dist/react";
import { HeroProps } from "./props";
import { Title } from "../../../components/Title/Title";
import { useEffect, useState } from "react";

export const Hero = ({ block, images, title }: HeroProps) => {
  const { heading } = title;
  const [active, setActive] = useState(0);
  const imageTotal = (images?.length ?? 0);
  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prevState => {
        if (prevState + 1 >= imageTotal) {
          return 0;
        }
        return prevState + 1;
      });
    }, 5000);
    return () => {
      clearInterval(timer)
    };
  }, []);


  return (
    <Section className="relative pb-15 h-hero-fullscreen">
      <div className="image-container absolute top-0 left-0 w-full h-full">
        {(images ?? []).map((item, index) =>
          (
            <img key={index}
                 className={`image-container absolute top-0 left-0 w-full h-full transition-opacity duration-500 object-cover ${index !== active ? "opacity-0" : "opacity-100"}`}
                 src={item.src}
                 alt={item.alt} />
          )
        )}
      </div>
      <Container
        size="large"
        className="relative h-full w-full"
      >
        <Title  {...title} data-tina-field={tinaField(block, "title")}
                className={"mt-auto absolute bottom-0"}
        > {heading} </Title>

      </Container>
    </Section>
  );
};

