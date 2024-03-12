import { Template } from "tinacms";
import { imageSchema, imageSchemaDefaultValues } from "../../../utils/imageDefaultSchema";
import { titleSchema, titleSchemaDefaultValues } from "../../../components/Title/Title";
import { ObjectField } from "@tinacms/schema-tools";

export const logosSchema: Template = {
  name: "logos",
  label: "Бегущие логотипы",
  ui: {
    previewSrc: "/blocks/logos.jpg",
    defaultItem:{
      baseVelocity: 1,
    }
  },
  fields: [
    {
      type: "number",
      name: "baseVelocity",
      label: "Скорость",
      description: "Скорость движения логотипов, можете использовать дробные числа",
    },
    {
      type: "object",
      name: "logosFirst",
      label: "Первая группа",
      list: true,
      ui: {
        component: "group-list",
        itemProps: (item : any) => ({
          key: item.id,
          label: item.alt,
        }),
        defaultItem: () => ({
          alt: 'Изображение',
          id: Math.random().toString(36).substr(2, 9),
        }),
      },
      fields: imageSchema.fields as any
    },
    {
      type: "object",
      name: "logosSecond",
      label: "Вторая группа",
      list: true,
      ui: {
        component: "group-list",
        itemProps: (item : any) => ({
          key: item.id,
          label: item.alt,
        }),
        defaultItem: () => ({
          alt: 'Изображение',
          id: Math.random().toString(36).substr(2, 9),
        }),
      },
      fields: imageSchema.fields as any
    },
  ]
};