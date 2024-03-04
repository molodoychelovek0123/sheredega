import { gridSchema, gridSchemaDefaultValues } from "../../../components/Grid/Schema";
import { Template } from "tinacms";
import { ANIMATION_SCHEMA } from "../../../../global/constants/animations";
import { indentDefaults, indentSchema } from "../../../../global/schemas/indent";
import { customCssSchema } from "../../../../global/schemas/customCss";


export const numbersBlockSchema: Template = {
  name: "numbers",
  label: "Числа",
  ui: {
    previewSrc: "/blocks/grid-numbers.png",
    defaultItem: {
      indent: indentDefaults,
      grid: gridSchemaDefaultValues
    }
  },
  fields: [
    indentSchema,
    gridSchema,
    {
      type: "object",
      name: "numbers",
      label: "Блоки",
      list: true,
      ui: {
        component: "group-list",
        itemProps: (item) => ({
          key: item.id,
          label: item.number
        }),
        defaultItem: () => ({
          number: 0,
          id: Math.random().toString(36).substr(2, 9)
        })
      },
      fields: [
        {
          type: "number",
          name: "numberValue",
          label: "Число"
        },
        {
          type: "string",
          name: "numberUnit",
          label: "Единица измерения"
        },
        {
          type: "string",
          name: "text",
          label: "Текст"
        }
      ]
    },
    ANIMATION_SCHEMA,

    customCssSchema
  ]
};