import { Template } from "tinacms";
import { ANIMATION_SCHEMA } from "../../../../global/constants/animations";
import { indentDefaults, indentSchema } from "../../../../global/schemas/indent";
import { customCssSchema } from "../../../../global/schemas/customCss";
import { gridSchema, gridSchemaDefaultValues } from "../../../components/Grid/Schema";
import { UIField } from "@tinacms/schema-tools/dist/types";
import { availableTags } from "./RewardsItem/RewardsTag/RewardsTag";
import React from "react";


export const rewardsSchema: Template = {
  name: "rewards",
  label: "Награды",
  ui: {
    previewSrc: "/blocks/rewards.jpg",
    defaultItem: {
      indent: indentDefaults,
      grid: gridSchemaDefaultValues,
      componentStart: "3",
      fontSize: "30",
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
      label: "Награды",
      list: true,
      ui: {
        component: "group-list",
        itemProps: (item : any) => ({
          key: item.mainText + item.year + item.theme,
          label: item.mainText,
        }),
        defaultItem: () => ({
          mainText: 'Заголовок',
          year: Math.random().toString(36).substr(2, 4),
          theme: "Тема",
        }),
      },

      fields: [
        {
          type: "string",
          name: "mainText",
          label: "Заголовок",
          required: true
        },
        {
          type: "string",
          name: "year",
          label: "Год",
          required: true
        },
        {
          type: "string",
          name: "theme",
          label: "Тема",
          required: true
        },
        {
          type: "string",
          name: "tags",
          label: "Теги",
          list: true,
          options:
            availableTags.map(item=> ({value: item.type, label: item.type}))
        },
        {
          type: "object",
          name: "button",
          label: "Ссылка",
          fields: [
            {
              type: "string",
              name: "text",
              label: "Текст",
            },
            {
              type: "string",
              name: "url",
              label: "Ссылка",
            },
            {
              type: "boolean",
              name: "_",
              ui: {
                component: () => {
                  return <><h4 className="font-bold mt-4" style={{ whiteSpace: "pre-line" }}> Или можете использовать загруженный файл </h4></>;
                }
              }
            },
            {
              type: "image",
              name: "src",
              label: "Загруженный файл",
            },

          ]
        }


      ]
    },
    indentSchema,

    ANIMATION_SCHEMA,
    customCssSchema
  ]
};