import { BaseSectionProps } from "../../../../shared_components/blocks/Sheredega/constants";
import { MyImageProps } from "@/shared_components/utils/imageDefaultSchema";

export type FourImageShowcaseProps = {
  images?: MyImageProps[] | null;
  container?: boolean| null;
} & Omit<BaseSectionProps, 'grid'>