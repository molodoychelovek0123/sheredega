import { BaseSectionProps } from "../../../../shared_components/blocks/Sheredega/constants";

export type FourImageShowcaseProps = {
  images?: { src?: string; alt?: string }[];
  container?: boolean;
} & Omit<BaseSectionProps, 'grid'>