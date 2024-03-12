import { BaseSectionProps } from "@/shared_components/blocks/Sheredega/constants";
import { CollapseProps } from "@/shared_components/blocks/Sheredega/Accordion/Collapse/props";

export type AccordionProps = {
  block?: any| null;
  collapses?: (CollapseProps | null)[]| null;
} & BaseSectionProps