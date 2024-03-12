import { Template } from "tinacms";
import { indentDefaults, indentSchema } from "../../../../global/schemas/indent";
import { customCssSchema } from "../../../../global/schemas/customCss";
import { imageSchema } from "../../../../shared_components/utils/imageDefaultSchema";
import { ANIMATION_SCHEMA } from "../../../../global/constants/animations";


export const fourImageShowcaseSchema: Template = {
  name: "fourImageShowcase",
  label: "4 изображения",
  ui: {
    previewSrc: "/blocks/four-image-showcase.jpg",
    defaultItem: {
      container: true,
      indent: indentDefaults,
      images: [
        {
          alt: "Изображение",
          src: "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        }
      ]
    }
  },
  fields: [
    {
      type: "boolean",
      name: "container",
      label: "Использовать контейнер?"
    },
    indentSchema,
    {
      type: "object",
      name: "images",
      label: "Изображения",
      list: true,
      ui: {
        component: "group-list",
        itemProps: (item : any) => ({
          key: item.id,
          label: item.alt
        }),
        defaultItem: () => ({
          alt: "Не забудьте заполнить альтернативный текст",
          id: Math.random().toString(36).substr(2, 9)
        })
      },
      fields: imageSchema.fields as any
    },
    ANIMATION_SCHEMA,
    customCssSchema
  ]
};