import { BaseSectionProps } from "@/shared_components/blocks/Sheredega/constants";

export type GridImageProps = {
  block?: any;
  images?: ({
    src?: string;
    alt?: string;
  } & { link?: string })[];
} & BaseSectionProps