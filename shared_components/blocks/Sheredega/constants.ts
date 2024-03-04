import { GridProps } from "@/shared_components/components/Grid/Props";
import { IndentFieldType } from "@/global/schemas/indent";
import { CustomCssTypeField } from "@/global/schemas/customCss";
import { animationFieldType } from "@/global/constants/animations";

// По какой-то причине не используется в GridText
export type BaseSectionProps = {
  grid?: GridProps;
  indent?: IndentFieldType;
  uniquePath?: string;
  customCss?: CustomCssTypeField;
  animation?: animationFieldType,
}