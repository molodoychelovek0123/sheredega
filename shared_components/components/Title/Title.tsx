import { createElement } from "react";
import { ObjectField } from "@tinacms/schema-tools";

type Props = {
  size?: "120" | "100" | "80" | "70" | "60" | "50" | "40" | "32" | string
  seoSize?: "1" | "2" | "3" | "4" | "5" | "6" | string
  color?: "black" | "white" | string
  lineHeight?: string;
  children?: React.ReactNode
  "data-tina-field"?: any;
  className?: string,
  isBold?: boolean;
}
export const Title = ({
                        size = "120",
                        seoSize = "1",
                        color = "black",
                        children,
                        lineHeight = "100%",
                        "data-tina-field": tinaField,
                        className,
                        isBold = true
                      }: Props) => {
  const fontColorClass: Record<Exclude<Props["color"], undefined>, string> = {
    black: "text-black",
    white: "text-white"
  };
  const sizeClass: Record<Exclude<Props["size"],undefined>, string> = {
    "120": "title-comp-120",
    "100": "title-comp-100",
    "80": "title-comp-80",
    "70": "title-comp-70",
    "60": "title-comp-60",
    "50": "title-comp-50",
    "40": "title-comp-40",
    "32": "title-comp-32"
  };
  const Title = createElement(
    `h${seoSize}`,
    {
      "data-tina-field": tinaField,
      className: `${fontColorClass[color]} ${sizeClass[size]} ${className} ${isBold && "font-bold"}`,
      style: { lineHeight }
    },
    children
  );
  return Title;
};


export const titleSize = {
  type: "string",
  label: "Размер",
  name: "size",
  options: [
    { label: "120px", value: "120" },
    { label: "100px", value: "100" },
    { label: "80px", value: "80" },
    { label: "70px", value: "70" },
    { label: "60px", value: "60" },
    { label: "50px", value: "50" },
    { label: "40px", value: "40" },
    { label: "32px", value: "32" }
  ]
};
export const titleSchema: ObjectField = {
  type: "object",
  label: "Заголовок",
  name: "title",
  fields: [
    {
      type: "string",
      label: "Заголовок",
      name: "heading"
    },
    {
      type: "string",
      label: "Цвет",
      name: "color",
      options: [
        { label: "Белый", value: "white" },
        { label: "Черный", value: "black" }
      ]
    },
    {
      type: "string",
      label: "Линейная высота (% от размера шрифта)",
      name: "lineHeight"
    },
    titleSize as any,
    {
      type: "string",
      label: "SEO Размер",
      name: "seoSize",
      options: [
        { label: "h1", value: "1" },
        { label: "h2", value: "2" },
        { label: "h3", value: "3" },
        { label: "h4", value: "4" },
        { label: "h5", value: "5" },
        { label: "h6", value: "6" }
      ]
    }
  ]
};

export const titleSchemaDefaultValues = {
  heading: "Заголовок",
  color: "black",
  size: "80",
  seoSize: "1",
  lineHeight: "100%"
};

