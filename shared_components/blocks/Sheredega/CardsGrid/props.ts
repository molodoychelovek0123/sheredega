import { BaseSectionProps } from "@/shared_components/blocks/Sheredega/constants";

export type CardGridProps = {
  cards?: {
    text?: string;
    subtext?: string;
    image?: {
      src?: string
    }
    url?: string;
  }[];
  container?: boolean
} & BaseSectionProps