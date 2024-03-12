import { TinaMarkdownContent } from "tinacms/dist/rich-text";
import { BaseSectionProps } from "@/shared_components/blocks/Sheredega/constants";
import { MyImageProps } from "@/shared_components/utils/imageDefaultSchema";

type Block = {
  image?: MyImageProps;
  body?: TinaMarkdownContent | TinaMarkdownContent[]| null; // tina-rte
  personName?: string| null;
  personPosition?: string| null;
}

type FirstBlock = {
  shiftRight?: number| null;
  indentRight?: number| null;
} & Block;

type SecondBlock = {
  shiftLeft?: number| null;
  indentLeft?: number| null;
} & Block;

export type AboutPersonProps = {
  firstBlock?: FirstBlock| null;
  secondBlock?: SecondBlock| null;
} & BaseSectionProps