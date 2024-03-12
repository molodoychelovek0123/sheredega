import { Template } from "tinacms";
import { ANIMATION_SCHEMA } from "../../../../global/constants/animations";
import { indentDefaults, indentSchema } from "../../../../global/schemas/indent";
import { customCssSchema } from "../../../../global/schemas/customCss";

export const defaultTextContent = "Пишите нам по любым вопросам или просто познакомиться"

export const contactsSchema: Template = {
  name: "contacts",
  label: "Контакты",
  ui: {
    previewSrc: "/blocks/contacts.png",
    defaultItem: {
      textContent: defaultTextContent,
      indent: indentDefaults,
      tgLinkText: "Блог в телеграм",
    }
  },
  fields: [
    {
      type: "string",
      name: "textContent",
      label: "Текст"
    },
    {
      type: "string",
      name: "baseEmail",
      label: "Емейл"
    },
    {
      type: "string",
      name: "phone",
      label: "Телефон"
    },
    {
      type: "string",
      name: "companyName",
      label: "Название организации"
    },
    {
      type: "string",
      name: "secondaryEmailTitle",
      label: "Заголовок второго емейла"
    },

    {
      type: "string",
      name: "secondaryEmail",
      label: "Второй емейл"
    },
    {

      type: "string",
      name: "tgLinkText",
      label: "Текст ссылки в Телеграм"
    },
    {

      type: "string",
      name: "tgLink",
      label: "Ссылка в Телеграм"
    },
    indentSchema,

    ANIMATION_SCHEMA,
    customCssSchema
  ]
};