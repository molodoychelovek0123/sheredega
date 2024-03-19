import { GridProps } from "../../../components/Grid/Props";
import { TinaMarkdownContent } from "tinacms/dist/rich-text";
import { animationFieldType } from "@/global/constants/animations";
import { IndentFieldType } from "@/global/schemas/indent";
import { CustomCssTypeField } from "@/global/schemas/customCss";
import { ReactNode } from "react";

export type GridTextProps = {
  block?: any| null;
  grid?: GridProps| null;
  id?: string;
  textBlock?: {
    hideTitleOnMobile?: boolean| null;
    title?: string| null;
    body?: TinaMarkdownContent | TinaMarkdownContent[]| null; // tina-rte
    fontSize?: string| null;
    textStart?: string| null;
    animation?: animationFieldType| null,
  } | null
  indent?: IndentFieldType| null
  uniquePath?: string;
  customCss?: CustomCssTypeField| null
  customComponent?: ReactNode;
}