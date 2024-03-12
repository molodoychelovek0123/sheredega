import { ObjectField } from "@tinacms/schema-tools";
import React from "react";

const ui = (defaultValue?: number) => ({
  ui: {
    validate: (value: any) => {
      if (isNaN(parseFloat(value))) {
        return "Отступ должен быть числом";
      }
    },
    parse: (value : any) => {
      return parseFloat(value) ?? defaultValue ?? 0;
    },
    defaultValue: defaultValue ?? 0,
    defaultItem: defaultValue ?? 0
  }
});
export const indentSchema: ObjectField = {
  name: "indent",
  label: "Отступы",
  type: "object",
  fields: [
    {
      type: "boolean",
      name: "_1",
      ui: {
        component: () => {
          return <><h4 className="font-bold mt-4" style={{ whiteSpace: "pre-line" }}> Десктоп отступы </h4></>;
        }
      }

    },
    {
      name: "desktopTop",
      label: "Верхний отступ",
      type: "number",
      ...ui(60)
    },
    {
      type: "number",
      name: "desktopBottom",
      label: "Нижний отступ",
      ...ui(60)
    },
    {
      type: "boolean",
      name: "_2",
      ui: {
        component: () => {
          return <><h4 className="font-bold mt-4" style={{ whiteSpace: "pre-line" }}> Таблет отступы </h4></>;
        }
      }
    },
    {
      type: "number",
      name: "tabletTop",
      label: "Верхний отступ",
      ...ui(40)
    },
    {
      type: "number",
      name: "tabletBottom",
      label: "Нижний отступ",
      ...ui(40)
    },
    {
      type: "boolean",
      name: "_3",
      ui: {
        component: () => {
          return <><h4 className="font-bold mt-4" style={{ whiteSpace: "pre-line" }}> Мобильные отступы </h4></>;
        }
      }
    },
    {
      type: "number",
      name: "mobileTop",
      label: "Верхний отступ",
      ...ui(20)
    },
    {
      type: "number",
      name: "mobileBottom",
      label: "Нижний отступ",
      ...ui(20)
    }
  ]
};

export const indentDefaults: IndentFieldType = {
  desktopTop: 60,
  desktopBottom: 60,
  tabletTop: 40,
  tabletBottom: 40,
  mobileTop: 20,
  mobileBottom: 20
};

export type IndentFieldType = {
  desktopTop?: number  | null,
  desktopBottom?: number  | null,
  tabletTop?: number  | null,
  tabletBottom?: number  | null,
  mobileTop?: number  | null,
  mobileBottom?: number  | null
}