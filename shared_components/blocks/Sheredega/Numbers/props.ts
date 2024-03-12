
import { BaseSectionProps } from "@/shared_components/blocks/Sheredega/constants";

export type NumberItemProps = {
  numberValue?: number| null;
  numberUnit?: string| null
  text?: string | null
  className?: string | null
}

export type NumberProps = BaseSectionProps & {
  numbers?: (NumberItemProps | null)[] | null
}