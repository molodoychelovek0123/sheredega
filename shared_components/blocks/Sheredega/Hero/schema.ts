import { Template } from "tinacms";
import { imageSchema, imageSchemaDefaultValues } from "../../../utils/imageDefaultSchema";
import { titleSchema, titleSchemaDefaultValues } from "../../../components/Title/Title";

export const HeroBlockSchema: Template = {
  name: "sheredegaHero",
  label: "Главный блок",
  ui: {
    previewSrc: "/blocks/sheredega-hero.jpg",
    defaultItem: {
      image: imageSchemaDefaultValues,
      title: titleSchemaDefaultValues
    }
  },
  fields: [
    {
      type: "object",
      name: "images",
      label: "Изображения",
      list: true,
      ui: {
        component: "group-list",
        itemProps: (item: any) => ({
          key: item.id,
          label: item.alt
        }),
        defaultItem: () => ({
          alt: "Изображение",
          id: Math.random().toString(36).substr(2, 9)
        })
      },
      fields: imageSchema.fields as any
    },
    titleSchema,
    {
      type: "boolean",
      name: "tint",
      label: "Включить затемнение"
    }
  ]
};