import { Template } from "tinacms";
import { ANIMATION_SCHEMA } from "../../../../global/constants/animations";
import { indentDefaults, indentSchema } from "../../../../global/schemas/indent";
import { customCssSchema } from "../../../../global/schemas/customCss";
import { gridSchema, gridSchemaDefaultValues } from "../../../components/Grid/Schema";
import { UIField } from "@tinacms/schema-tools/dist/types";


export const publicationListSchema: Template = {
  name: "publicationList",
  label: "Публикации",
  ui: {
    defaultItem: {
      indent: indentDefaults,
      grid: gridSchemaDefaultValues,
      componentStart: "3",
      fontSize: "22"
    }
  },
  fields: [
    gridSchema,
    {
      type: "string",
      name: "blockTitle",
      label: "Заголовок"
    },
    {
      type: "string",
      label: "Размер текста",
      name: "fontSize",
      options: [
        { value: "22", label: "Маленький" },
        { value: "30", label: "Средний" },
        { value: "40", label: "Большой" }
      ]
    },
    {
      type: "string",
      label: "Отступ слева (в колонках)",
      name: "componentStart",
      description: "Укажите на сколько колонок сдвинуть правый блок",
      options: [
        { value: "1", label: "0" },
        { value: "2", label: "1" },
        { value: "3", label: "2" }
      ],
      ui: {
        component: "radio-group",
        direction: "horizontal"
      } as UIField<string, false>
    },
    {
      type: "object",
      name: "items",
      label: "Публикации",
      list: true,
      ui: {
        component: "group-list",
        itemProps: (item: any) => ({
          key: item.title + item.content,
          label: item.title
        }),
        defaultItem: () => ({
          title: Math.random().toString(36).substr(2, 30) + "Magazine",
          content: "Название публикации"
        })
      },

      fields: [
        {
          type: "string",
          name: "title",
          label: "Заголовок"
        },
        {
          type: "string",
          name: "content",
          label: "Контент",
          ui: {
            component: "textarea"
          }
        },
        {
          type: "string",
          name: "link",
          label: "Ссылка",
        },
      ]
    },
    indentSchema,

    ANIMATION_SCHEMA,
    customCssSchema
  ]
};