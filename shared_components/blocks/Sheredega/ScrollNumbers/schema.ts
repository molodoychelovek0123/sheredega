import { richTextField } from "../../../../global/schemas/richTextFieldSchema";
import { Template } from "tinacms";

export const scrollNumbersBlockSchema : Template  = {
  name: "scrollNumbersBlock",
  label: "scroll числа",
  fields: [
    {
      type: "object",
      name: "data",
      label: "Дата",
      list: true,
      ui: {
        component: "group-list",
        itemProps: (item) => ({
          key: item.id,
          label: item.text,
        }),
        defaultItem: () => ({
          text: "0+",
          id: Math.random().toString(36).substr(2, 9),
        }),
      },
      fields: [
        { type: "string", name: "text", label: "Текст" },
        { type: "string", name: "subtext", label: "Подтекст" },
      ]
    },
    {
      type: "object",
      label: "Текстовый блок",
      name: "textBlock",
      fields: [
        {
          type: "string",
          label: "Заголовок",
          name: "title",
          ui: {
            validate: (value) => {
              const lengthOfTitle = value?.length || 0;
              if (lengthOfTitle > 20) {
                return "Заголовок не должен превышать 20 символов";
              }
            }
          }
        },
        {
          type: "boolean",
          name: "hideTitleOnMobile",
          label: "Скрыть заголовок на мобильных устройствах"
        },
        richTextField,
        {
          type: "string",
          label: "Размер текста",
          name: "fontSize",
          options: [
            { value: "30", label: "Маленький" },
            { value: "40", label: "Большой" }
          ]
        },


      ]
    },

  ]
}