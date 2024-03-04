import { gridSchema, gridSchemaDefaultValues } from "../../../components/Grid/Schema";
import { Template } from "tinacms";
import { UIField } from "@tinacms/schema-tools/dist/types";
import { ANIMATION_SCHEMA } from "../../../../global/constants/animations";
import { indentDefaults, indentSchema } from "../../../../global/schemas/indent";
import { customCssSchema } from "../../../../global/schemas/customCss";
import { richTextField } from "../../../../global/schemas/richTextFieldSchema";


export const gridTextBlockSchema: Template = {
  name: "gridText",
  label: "Текстовый блок с гридом",
  ui: {
    previewSrc: "/blocks/grid-text-section.png",
    defaultItem: {
      indent: indentDefaults,
      grid: gridSchemaDefaultValues,
      textBlock: {
        textStart: "3"
      }

    }
  },
  fields: [
    indentSchema,
    gridSchema,
    {
      type: "object",
      label: "Текстовый блок",
      name: "textBlock",
      fields: [
        {
          type: "string",
          label: "Заголовок",
          name: "title",
          ui: {
            validate: (value) => {
              const lengthOfTitle = value?.length || 0;
              if (lengthOfTitle > 20) {
                return "Заголовок не должен превышать 20 символов";
              }
            }
          }
        },
        {
          type: "boolean",
          name: "hideTitleOnMobile",
          label: "Скрыть заголовок на мобильных устройствах"
        },
        richTextField,
        {
          type: "string",
          label: "Размер текста",
          name: "fontSize",
          options: [
            { value: "30", label: "Маленький" },
            { value: "40", label: "Большой" }
          ]
        },
        {
          type: "string",
          label: "Отступ слева (в колонках)",
          name: "textStart",
          description: "Укажите на сколько колонок сдвинуть текстовый блок ",
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

        ANIMATION_SCHEMA
      ]
    },
    customCssSchema
  ]
};