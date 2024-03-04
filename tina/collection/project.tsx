import React, { useEffect } from "react";

import type { Collection } from "tinacms";
import { regions } from "../../global/constants/regions";
import { getBlocksSchema } from "../../global/schemas/blocks";
import { projectHeadingBlockSchema } from "../../shared_components/blocks/Sheredega/ProjectHeading/ProjectHeading";


const slugify = (text: string) => {
  text = text.toString().toLowerCase().trim();
  const sets = [
    { to: "a", from: "[ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶἀа]" },
    { to: "b", from: "[б]" },
    { to: "c", from: "[ÇĆĈČц]" },
    { to: "d", from: "[ÐĎĐÞд]" },
    { to: "e", from: "[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆеэ]" },
    { to: "f", from: "[ф]" },
    { to: "g", from: "[ĜĞĢǴг]" },
    { to: "h", from: "[ĤḦх]" },
    { to: "i", from: "[ÌÍÎÏĨĪĮİỈỊиы]" },
    { to: "j", from: "[Ĵ]" },
    { to: "ij", from: "[Ĳ]" },
    { to: "k", from: "[Ķк]" },
    { to: "l", from: "[ĹĻĽŁл]" },
    { to: "m", from: "[Ḿм]" },
    { to: "n", from: "[ÑŃŅŇн]" },
    { to: "o", from: "[ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠо]" },
    { to: "oe", from: "[Œ]" },
    { to: "p", from: "[ṕп]" },
    { to: "r", from: "[ŔŖŘр]" },
    { to: "s", from: "[ßŚŜŞŠȘс]" },
    { to: "ch", from: "[ч]" },
    { to: "sh", from: "[шщ]" },
    { to: "zh", from: "[ж]" },
    { to: "t", from: "[ŢŤт]" },
    { to: "u", from: "[ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯу]" },
    { to: "v", from: "[в]" },
    { to: "w", from: "[ẂŴẀẄ]" },
    { to: "x", from: "[ẍ]" },
    { to: "y", from: "[ÝŶŸỲỴỶỸй]" },
    { to: "ya", from: "[я]" },
    { to: "yu", from: "[ю]" },
    { to: "z", from: "[ŹŻŽз]" },
    { to: "", from: "[ъь]" },
    { to: "-", from: "[·/_,:;'.]" }
  ];

  sets.forEach(set => {
    text = text.replace(new RegExp(set.from, "gi"), set.to);
  });

  return text
    .replace(/\s+/g, "-")    // Replace spaces with -
    .replace(/[^-a-z0-9\u0370-\u03ff\u1f00-\u1fff]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-")    // Replace multiple - with single -
    .replace(/^-+/, "")      // Trim - from start of text
    .replace(/-+$/, "");      // Trim - from end of text
};
const showOnRussiaComponentNumber = props => {
  return (
    <div className="relative mb-5 last:mb-0 show-on-russia" style={{ zIndex: 997 }}>
      <label
        htmlFor={props.field.name}
        className="block font-sans text-xs font-semibold text-gray-700 whitespace-normal mb-2 undefined show-on-russia"
      >
        {props.field.label}
      </label>
      <input
        type="number"
        className="shadow-inner focus:shadow-outline focus:border-blue-500 focus:outline-none block text-base placeholder:text-gray-300 px-3 py-2 text-gray-600 w-full bg-white border border-gray-200 transition-all ease-out duration-150 focus:text-gray-900 rounded-md  undefined show-on-russia"
        name={props.field.name}
        defaultValue=""

        {...props.input}
      />
    </div>

  );
};

const showOnRussiaComponentString = props => {
  return (
    <div className="relative mb-5 last:mb-0 show-on-russia" style={{ zIndex: 997 }}>
      <label
        htmlFor={props.field.name}
        className="block font-sans text-xs font-semibold text-gray-700 whitespace-normal mb-2 undefined show-on-russia"
      >
        {props.field.label}
      </label>
      <input
        type="text"
        className="shadow-inner focus:shadow-outline focus:border-blue-500 focus:outline-none block text-base placeholder:text-gray-300 px-3 py-2 text-gray-600 w-full bg-white border border-gray-200 transition-all ease-out duration-150 focus:text-gray-900 rounded-md  undefined show-on-russia"
        name={props.field.name}

        {...props.input}
        defaultValue={props?.form?.getFieldState("title")?.value ?? ""}
      />
    </div>

  );
};

const mapTitle = props => {
  const title = props?.form?.getFieldState("title")?.value ?? "";
  useEffect(() => {
    if (!props?.input?.value) props?.input?.onChange(title);
  }, []);
  return (
    <div className="relative mb-5 last:mb-0 " style={{ zIndex: 997 }}>
      <label
        htmlFor={props.field.name}
        className="block font-sans text-xs font-semibold text-gray-700 whitespace-normal mb-2 undefined"
      >
        {props.field.label}
        <span
          className="block font-sans text-xs italic font-light text-gray-400 pt-0.5 whitespace-normal m-0 undefined">
          Будет показан в 'География проектов'
        </span>
      </label>
      <input
        type="text"
        className="shadow-inner focus:shadow-outline focus:border-blue-500 focus:outline-none block text-base placeholder:text-gray-300 px-3 py-2 text-gray-600 w-full bg-white border border-gray-200 transition-all ease-out duration-150 focus:text-gray-900 rounded-md  undefined "
        name={props.field.name}

        {...props.input}
        defaultValue={props?.form?.getFieldState("title")?.value ?? ""}
      />
    </div>

  );
};

const Project: Collection = {
  label: "Проекты",
  name: "projects",
  path: "content/projects",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/projects/${document._sys.filename}`;
    },
    filename: {
      slugify: (values) => {
        return `${slugify(values?.title ?? "no-topic")}`;
      }
    }
  },
  fields: [
    {
      type: "string",
      label: "Заголовок",
      name: "title",
      isTitle: true,
      required: true
    },
    {
      type: "datetime",
      label: "Дата публикации",
      name: "date",
      ui: {
        dateFormat: "MMMM DD YYYY",
        timeFormat: "HH:mm"
      }
    },
    {
      type: "image",
      name: "heroImg",
      label: "Изображение"
    },
    {
      type: "string",
      name: "description",
      label: "Описание",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "string",
      name: "year",
      label: "Год"
    },
    {
      type: "string",
      name: "stage",
      label: "Стадия"
    },
    {
      type: "string",
      name: "partners",
      label: "Партнеры",
      list: true,
      ui: {
        component: "tags"
      }
    },
    {
      type: "string",
      name: "type",
      label: "Тип проекта",
      list: true,
      ui: {
        component: "tags"
      }
    },

    {
      type: "string",
      name: "hashtags",
      label: "Хештеги",
      list: true,
      ui: {
        component: "tags"
      }
    },
    {
      type: "object",
      name: "mapSettings",
      label: "Настройки карты",
      fields: [
        {
          type: "boolean",
          label: "Международный проект",
          name: "globalProject",
          ui: {
            parse: val => Boolean(val),
            component: props => {
              const value = props.input.value;
              return (
                <div className="relative mb-5 last:mb-0">
                  <style dangerouslySetInnerHTML={{
                    __html: `
                   .show-on-russia{
                  
                     display: ${value ? "none" : "block"};
                    
                     }
                    `
                  }} />
                  <label
                    htmlFor={props.field.name}
                    className="block font-sans text-xs font-semibold text-gray-700 whitespace-normal mb-2 undefined"
                  >
                    {props.field.label}
                  </label>
                  <div className="flex gap-2 items-center">
                    <div className="relative w-12 h-7">
                      <input
                        className="absolute left-0 top-0 w-12 h-8 opacity-0 m-0 cursor-pointer z-20"
                        type="checkbox"
                        name={props.field.name}
                        defaultValue=""
                        {...props.input}
                      />
                      <label
                        className="bg-none p-0 outline-none w-12 h-7"
                        role="switch"
                        style={{ opacity: 1, pointerEvents: "inherit" }}
                      >
                        <div
                          className="relative w-[48px] h-7 rounded-3xl bg-white shadow-inner border border-gray-200 pointer-events-none -ml-0.5">
                              <span
                                className="absolute rounded-3xl left-0.5 top-1/2 w-[22px] h-[22px] shadow border transition-all ease-out duration-150 bg-gray-250 border-gray-300"
                                style={{
                                  transform: "translate3d(0px, -50%, 0px)",
                                  left: value ? "auto" : undefined,
                                  right: value ? "0px" : undefined,
                                  background: value ? "#7171d2" : undefined
                                }}
                              />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

              );
            }
          }
        },
        {
          type: "number",
          name: "lat",
          label: "Широта",
          ui: {
            parse: (val) => Number(val),
            component: showOnRussiaComponentNumber
          }
        },
        {
          type: "number",
          name: "lng",
          label: "Долгота",
          ui: {
            parse: (val) => Number(val),
            component: showOnRussiaComponentNumber
          }
        },
        {
          type: "string",
          name: "tooltip",
          label: "Тултип - надпись (при наведении мышью)",
          ui: {
            parse: (val) => String(val),
            component: showOnRussiaComponentString
          }
        },
        {
          type: "string",
          name: "title",
          label: "Заголовок",
          description: "Будет показан в 'География проектов'",
          ui: {
            parse: (val) => String(val),
            component: mapTitle
          }
        },
        {
          type: "string",
          name: "region",
          label: "Регион",
          options: Object.keys(regions).map(key => ({
            label: regions[key] ?? "Не найдено название",
            value: key ?? "Russia"
          })),
          description: "Если не нашли подходящий, выберите 'другой'"
        },
        {
          type: "string",
          name: "city",
          label: "Город",
          description: "Будет показан в 'География проектов'"
        }
      ]
    },
    {
      type: "boolean",
      name: "_",
      ui: {
        component: () => {
          return <><h4 className="font-bold mt-4" style={{ whiteSpace: "pre-line" }}> Блочные компоненты </h4></>;
        }
      }
    },
    getBlocksSchema([projectHeadingBlockSchema])
  ]
};

export default Project;
