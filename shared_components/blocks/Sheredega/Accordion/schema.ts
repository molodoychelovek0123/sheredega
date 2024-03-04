import { Template } from "tinacms";
import { indentDefaults, indentSchema } from "../../../../global/schemas/indent";
import { customCssSchema } from "../../../../global/schemas/customCss";
import { richTextField } from "../../../../global/schemas/richTextFieldSchema";


export const accordionSchema: Template = {
  name: "accordion",
  label: "Аккордион",
  ui: {
    previewSrc: "/blocks/accordion.png",
    defaultItem: {
      indent: indentDefaults,
    }
  },
  fields: [
    indentSchema,
    {
      type: "object",
      name: "collapses",
      label: "Объекты",
      list: true,
      ui: {
        component: "group-list",
        itemProps: (item) => ({
          key: item.id,
          label: item.title
        }),
        defaultItem: () => ({
          title: "Заголовок",
          text: "Текст",
          id: Math.random().toString(36).substr(2, 9)
        })
      },
      fields: [
        {
          type: "string",
          name: "title",
          label: "Заголовок"
        },
        richTextField
      ]
    },
    customCssSchema
  ]
};