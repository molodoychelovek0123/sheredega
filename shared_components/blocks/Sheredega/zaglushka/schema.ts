import { Template } from "tinacms";
import { imageSchema } from "../../../../shared_components/utils/imageDefaultSchema";

export const zaglushkaSchema: Template = {
  name: "zaglushka",
  label: "Заглушка - изображение",
  ui: {
    previewSrc: "/blocks/zaglushka.jpg",
    defaultItem: {
      container: true
    }
  },
  fields: [
    {
      type: "boolean",
      name: "container",
      label: "Использовать контейнер?"
    },
    imageSchema
  ]
};

export const fullWidthImageSchema: Template = {
  name: "fullWidthImage",
  label: "Изображение во всю ширину",
  ui: {
    previewSrc: "/blocks/fullwidthimage.jpg",
    defaultItem: {
      image: {
        src: "/blocks/fullwidthimage.jpg",
        alt: "Не забывайте заполнять альтернативный текст"
      },
      container: false
    }
  },
  fields: [
    {
      type: "boolean",
      name: "container",
      label: "Использовать контейнер?"
    },
    imageSchema
  ]
};