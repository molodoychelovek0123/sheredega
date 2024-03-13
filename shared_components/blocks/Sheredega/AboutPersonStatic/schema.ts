import { Template } from "tinacms";
import { customCssSchema } from "../../../../global/schemas/customCss";
import { imageSchema } from "../../../../shared_components/utils/imageDefaultSchema";
import { richTextField } from "../../../../global/schemas/richTextFieldSchema";
import { ObjectField } from "@tinacms/schema-tools";

const commonFields: ObjectField['fields'] = [imageSchema,
  richTextField,
  {
    type: "string",
    label: "Имя",
    name: "personName"
  },
  {
    type: "string",
    label: "Должность",
    name: "personPosition"
  }];

export const aboutPersonStaticSchema  : Template = ({
  name: "aboutPersonStatic",
  label: "Блок «О персоне» Статический",
  ui: {
    previewSrc: "/blocks/about-person-static.png",
    defaultItem: {
      firstBlock: {
        shiftRight: 40,
        indentRight: 38
      },
      secondBlock: {
        shiftLeft: 40,
        indentLeft: 38
      }
    }
  },
  fields: [
    {
      type: "object",
      name: "firstBlock",
      label: "Первый блок",
      fields: [
        ...commonFields,
        {
          type: "number",
          label: "Смещение изображения вправо (проценты)",
          description: "Рекомендовано 40, применяется только для мобильного отображения",
          name: "shiftRight"
        },
        {
          type: "number",
          label: "Отступ текстового блока справа (проценты)",
          description: "Рекомендовано 38, применяется только для мобильного отображения",
          name: "indentRight"
        }
      ]
    },
    {
      type: "object",
      name: "secondBlock",
      label: "Второй блок",
      fields: [
        ...commonFields,
        {
          type: "number",
          label: "Смещение изображения слева (проценты)",
          description: "Рекомендовано 40, применяется только для мобильного отображения",
          name: "shiftLeft"
        },
        {
          type: "number",
          label: "Отступ текстового блока слева (проценты)",
          description: "Рекомендовано 38, применяется только для мобильного отображения",
          name: "indentLeft"
        }
      ]

    },
    customCssSchema
  ]
});

