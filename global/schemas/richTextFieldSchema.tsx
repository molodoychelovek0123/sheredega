import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import React from "react";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { RichTextField } from "@tinacms/schema-tools/dist/types";

export const link = ({ href, children }: any) => {
  return <Link href={href ?? "#"}>{children}</Link>;
};

export const indentComponent = ({ indent }: any) => {
  return <p style={{ marginBottom: `${indent}px`, fontSize: "0px", lineHeight: "0px" }}>&nbsp;</p>;
};

export const animated = ({ animatedWords }: any) => {
  return <Typewriter
    loop
    cursor
    cursorStyle="|"
    typeSpeed={70}
    deleteSpeed={50}
    delaySpeed={1000}
    words={animatedWords}
  />;
};

export const RichTextComponent =
  ({ body }: { body: TinaMarkdownContent | TinaMarkdownContent[] }) =>
    <TinaMarkdown content={body} components={{ url: link, indent: indentComponent, animated }}  />;

export const richTextField = {
  type: "rich-text",
  label: "Текстовый блок",
  name: "body",
  templates: [
    {
      name: "url",
      label: "Ссылка",
      fields: [
        {
          name: "children",
          label: "Контент",
          type: "string"
        },
        {
          name: "href",
          label: "Ссылка",
          type: "string"
        }
      ]
    },
    {
      name: "indent",
      label: "Отступ",
      fields: [
        {
          name: "indent",
          label: "Отступ",
          type: "string"
        }
      ]
    },
    {
      name: "animated",
      label: "Анимированный текст",
      fields: [
        {
          type: "string",
          name: "animatedWords",
          label: "Слова для анимации",
          description: "Впишите слова, которые будут использоваться в анимации текстового блока",
          list: true,
          ui: {
            component: "tags"
          }
        }
      ]
    }
  ]
} as RichTextField;