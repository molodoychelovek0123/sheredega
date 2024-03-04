import Image from "next/image";
import { Container } from "@/shared_components/components/Container/container";

export const Zaglushka = ({
                            image, container = true,
                            uniquePath
                          }: {
  image?: {
    src?: string,
    alt?: string,
  };
  container?: boolean
  uniquePath?: string,
}) => {
  const { src = "/blocks/zaglushka.jpg", alt } = image ?? {};
  if (container) {
    return (
      <Container uniquePath={uniquePath}>
        <Image className="w-full object-contain" src={src} width={1920} height={1080} alt={alt} />
      </Container>
    );
  } else {

    return (
      <Image className="w-full object-contain" src={src} width={1920} height={1080} alt={alt} />
    );
  }
};