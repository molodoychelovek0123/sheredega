import { Template } from "tinacms";
import { indentDefaults, indentSchema } from "../../../../global/schemas/indent";
import { customCssSchema } from "../../../../global/schemas/customCss";
import { imageSchema } from "../../../../shared_components/utils/imageDefaultSchema";

export const cardsGridBlockSchema: Template = {
  name: "cardsGrid",
  label: "Карточки",
  ui: {
    previewSrc: "/blocks/CardsGrid.png",
    defaultItem: {
      indent: indentDefaults
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
      name: "cards",
      label: "Карточки",
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
      fields: [
        {
          type: "string",
          label: "Текст",
          name: "text"
        },
        {
          type: "string",
          label: "Субтекст",
          name: "subtext"
        },
        {
          type: "string",
          label: "Ссылка",
          name: "url"
        },
        imageSchema
      ]
    },
    customCssSchema
  ]
};