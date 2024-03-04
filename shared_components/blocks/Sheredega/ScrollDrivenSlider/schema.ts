import { Template } from "tinacms";
import { gridSchema, gridSchemaDefaultValues } from "../../../components/Grid/Schema";
import { ANIMATION_SCHEMA } from "../../../../global/constants/animations";
import { indentDefaults, indentSchema } from "../../../../global/schemas/indent";
import { customCssSchema } from "../../../../global/schemas/customCss";
import { imageSchema } from "../../../../shared_components/utils/imageDefaultSchema";


export const scrollDrivenSliderSchema: Template = {
  name: "scrollDrivenSlider",
  label: "scroll слайдер",
  ui: {
    previewSrc: "/blocks/scroll-driven-scroll.jpg",
    defaultItem: {
      container: true,
      indent: indentDefaults,
      grid: gridSchemaDefaultValues,
      aspectRatio: "1:1",
      gap: 20
    }
  },
  fields: [
    {
      type: "boolean",
      name: "container",
      label: "Использовать контейнер?"
    },
    indentSchema,
    gridSchema,
    {
      type: "string",
      name: "aspectRatio",
      label: "соотношение сторон",
      options: [
        { value: "16:9", label: "16:9" },
        { value: "4:3", label: "4:3" },
        { value: "1:1", label: "1:1" }
      ]
    }, {
      type: "number",
      name: "gap",
      label: "Отступ"
    },
    {
      type: "object",
      name: "images",
      label: "Изображения",
      list: true,
      ui: {
        component: "group-list",
        itemProps: (item) => ({
          key: item.id,
          label: item.alt
        }),
        defaultItem: () => ({
          alt: "Изображение",
          id: Math.random().toString(36).substr(2, 9)
        })
      },
      fields: [...imageSchema.fields, {
        type: "string",
        name: "link",
        label: "Ссылка"
      }]
    },
    ANIMATION_SCHEMA,
    customCssSchema
  ]
};