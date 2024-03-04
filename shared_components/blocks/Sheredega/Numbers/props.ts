
import { BaseSectionProps } from "@/shared_components/blocks/Sheredega/constants";

export type NumberItemProps = {
  numberValue?: number;
  numberUnit?: string
  text?: string;
  className?: string;
}

export type NumberProps = BaseSectionProps & {
  numbers?: NumberItemProps[];
}