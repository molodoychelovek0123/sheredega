import Image from "next/image";
import { Container } from "@/shared_components/components/Container/container";
import { MyImageProps } from "@/shared_components/utils/imageDefaultSchema";

export const Zaglushka = ({
                            image, container = true,
                            uniquePath
                          }: {
  image?: MyImageProps | null;
  container?: boolean | null
  uniquePath?: string ,
}) => {
  const { src = "/blocks/zaglushka.jpg", alt } = image ?? {};
  if(src) {
    if (container) {
      return (
        <Container uniquePath={uniquePath}>
          <Image className="w-full object-contain" src={src} width={1920} height={1080} alt={alt ?? ""} />
        </Container>
      );
    } else {

      return (
        <Image className="w-full object-contain" src={src} width={1920} height={1080} alt={alt ?? ""} />
      );
    }
  }
  return null
};