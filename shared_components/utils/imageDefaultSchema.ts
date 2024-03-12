import { ObjectField } from "@tinacms/schema-tools";

export type MyImageProps =
{
  src?: string | null;
  alt?: string | null;
  link?: string | null;
} | null


export const imageSchema: ObjectField = {
  type: "object",
  label: "Изображение",
  name: "image",
  fields: [
    {
      name: "src",
      label: "Изображение",
      type: "image"
    },
    {
      name: "alt",
      label: "Альтернативный текст",
      type: "string"
    }
  ]
};
export const imageSchemaDefaultValues = {
  src: "/public/uploads/slider-image-0.jpg",
  alt: "Альтернативный текст, поможет поисковикам лучше понять, что тут происходит"
}