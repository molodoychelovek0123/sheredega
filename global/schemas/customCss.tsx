import { ObjectField } from "@tinacms/schema-tools";
import React from "react";

export const customCssSchema: ObjectField = {
  name: "customCss",
  label: "Custom CSS",
  type: "object",
  fields: [
    {
      type: "boolean",
      name: "_1",
      ui: {
        component: () => {
          return <><h4 className="font-bold mt-4" style={{ whiteSpace: "pre-line" }}> Якорь </h4></>;
        }
      }
    },
    {
      type: "string",
      label: "Якорь",
      name: "anchor",
      description: "Якорь может использоваться для элементов меню внутри страницы и для прокручивания до якоря"
    },
    {
      type: "boolean",
      name: "_2",
      ui: {
        component: () => {
          return <><h4 className="font-bold mt-4" style={{ whiteSpace: "pre-line" }}> Настройка CSS </h4></>;
        }
      }
    },
    {
      type: "string",
      ui: {
        component: "textarea"
      },
      label: "Custom CSS",
      name: "data",
      description: "используйте 'selector', чтобы обратиться к текущему контейнеру"
    }
  ]
};
export type CustomCssTypeField = {
  anchor?: string | null;
  data?: string  | null;
}