import { GridProps } from "../../../components/Grid/Props";
import { TinaMarkdownContent } from "tinacms/dist/rich-text";
import { animationFieldType } from "@/global/constants/animations";
import { IndentFieldType } from "@/global/schemas/indent";
import { CustomCssTypeField } from "@/global/schemas/customCss";

export type GridTextProps = {
  block?: any;
  grid?: GridProps;
  textBlock?: {
    hideTitleOnMobile?: boolean;
    title?: string;
    body?: TinaMarkdownContent | TinaMarkdownContent[]; // tina-rte
    fontSize?: string;
    textStart?: string;
    animation?: animationFieldType,
  }
  indent?: IndentFieldType
  uniquePath?: string
  customCss?: CustomCssTypeField
}