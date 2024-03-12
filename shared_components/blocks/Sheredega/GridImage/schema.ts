import { Template } from "tinacms";
import { gridSchema, gridSchemaThreeCols } from "../../../components/Grid/Schema";
import { ANIMATION_SCHEMA } from "../../../../global/constants/animations";
import { indentDefaults, indentSchema } from "../../../../global/schemas/indent";
import { customCssSchema } from "../../../../global/schemas/customCss";
import { imageSchema } from "../../../../shared_components/utils/imageDefaultSchema";


export const gridImageSchema: Template = {
  name: "gridImage",
  label: "Список изображений",
  ui: {
    previewSrc: "/blocks/grid-image.png",
    defaultItem: {
      indent: indentDefaults,
      grid: gridSchemaThreeCols
    }
  },
  fields: [
    indentSchema,
    gridSchema,
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
      fields: [...imageSchema.fields as any, {
        type: "string",
        name: "link",
        label: "Ссылка"
      }]
    },
    ANIMATION_SCHEMA,
    customCssSchema
  ]
};