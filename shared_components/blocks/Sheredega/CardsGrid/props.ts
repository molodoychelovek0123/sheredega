import { BaseSectionProps } from "@/shared_components/blocks/Sheredega/constants";
import { MyImageProps } from "@/shared_components/utils/imageDefaultSchema";

export type CardGridProps = {
  cards?: ({
    text?: string| null;
    subtext?: string| null;
    image?: MyImageProps | null;
    url?: string | null;
  } | null)[] | null;
  container?: boolean | null
  "data-tina-field"?: string | null
} & BaseSectionProps