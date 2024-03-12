import React from "react";
import { Template } from "tinacms";


export const mapSchema: Template = {
  name: "map",
  label: "Карта",
  ui: {
    previewSrc: "/blocks/map.jpg"
  },
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