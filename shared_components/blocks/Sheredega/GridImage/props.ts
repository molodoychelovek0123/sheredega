import { BaseSectionProps } from "@/shared_components/blocks/Sheredega/constants";
import { MyImageProps } from "@/shared_components/utils/imageDefaultSchema";

export type GridImageProps = {
  block?: any | null;
  images?: (MyImageProps)[]
    | null;
} & BaseSectionProps