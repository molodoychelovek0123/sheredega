import type { Collection } from "tinacms";
import { ColorPickerInput } from "../fields/color";

const Global: Collection = {
  label: "Глобальные настройки",
  name: "global",
  path: "content/global",
  format: "json",
  ui: {
    global: true
  },
  fields: [
    {
      type: "object",
      label: "Хедер",
      name: "header",
      fields: [
        {
          type: "image",
          label: "Логотип",
          name: "logo"
        },
        {
          type: "string",
          label: "Название компании",
          name: "name"
        },
        {
          type: "object",
          label: "Ссылки",
          name: "nav",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
            defaultItem: {
              href: "home",
              label: "Home"
            }
          },
          fields: [
            {
              type: "string",
              label: "Ссылка",
              name: "href"
            },
            {
              type: "string",
              label: "Текст ссылки",
              name: "label"
            }
          ]
        },
        {
          type: "object",
          label: "Содержание меню",
          name: "menu",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
            defaultItem: {
              title: "Главная",
            }
          },
          fields: [
            {
              type: "string",
              label: "Заголовок",
              name: "title"
            },
            {
              type: "string",
              label: "Ссылка на заголовке",
              name: "href"
            },
            {
              type: "object",
              label: "Ссылки",
              name: "items",
              list: true,
              ui: {
                itemProps: (item) => {
                  return { label: item?.label };
                },
                defaultItem: {
                  href: "home",
                  label: "Home"
                }
              },
              fields: [
                {
                  type: "string",
                  label: "Ссылка",
                  name: "href"
                },
                {
                  type: "string",
                  label: "Текст ссылки",
                  name: "label"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "object",
      label: "Footer",
      name: "footer",
      fields: [
        {
          type: "string",
          label: "Color",
          name: "color",
          options: [
            { label: "Default", value: "default" },
            { label: "Primary", value: "primary" }
          ]
        },
        {
          type: "object",
          label: "Social Links",
          name: "social",
          fields: [
            {
              type: "string",
              label: "Facebook",
              name: "facebook"
            },
            {
              type: "string",
              label: "Twitter",
              name: "twitter"
            },
            {
              type: "string",
              label: "Instagram",
              name: "instagram"
            },
            {
              type: "string",
              label: "Github",
              name: "github"
            }
          ]
        }
      ]
    },
    {
      type: "object",
      label: "Theme",
      name: "theme",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fields: [
        {
          type: "string",
          label: "Primary Color",
          name: "color",
          ui: {
            component: ColorPickerInput
          }
        },
        {
          type: "string",
          name: "font",
          label: "Font Family",
          options: [
            {
              label: "System Sans",
              value: "sans"
            },
            {
              label: "Nunito",
              value: "nunito"
            },
            {
              label: "Lato",
              value: "lato"
            }
          ]
        },
        {
          type: "string",
          name: "darkMode",
          label: "Dark Mode",
          options: [
            {
              label: "System",
              value: "system"
            },
            {
              label: "Light",
              value: "light"
            },
            {
              label: "Dark",
              value: "dark"
            }
          ]
        }
      ]
    }
  ]
};

export default Global;
