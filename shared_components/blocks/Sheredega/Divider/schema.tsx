import React from "react";
import { Template } from "tinacms";


export const dividerSchema: Template = {
  name: "divider",
  label: "Разделитель",
  ui: {},
  fields: [
    {
      type: "boolean",
      name: "_divider_",
      ui: {
        component: () => {
          return <h4 className="font-bold mt-4" style={{ whiteSpace: "pre-line" }}> Здесь нечего настраивать </h4>;
        }
      }
    }
  ]
};