import React from "react";
import { Container } from "../../../shared_components/components/Container/container";
import { Section } from "../../../shared_components/components/Section/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
import { PageBlocksContent } from "../../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";

export const Content = ({ data }: { data: PageBlocksContent }) => {
  return (
    <Section id={data?.id ?? undefined}>
      <Container
        className={`prose prose-lg rte-text`}
        data-tina-field={tinaField(data, "body")}
        size="large"
        width="medium"
      >
        <TinaMarkdown content={data.body} />
      </Container>
    </Section>
  );
};

export const contentBlockSchema: TinaTemplate = {
  name: "content",
  label: "Content",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede."
    }
  },
  fields: [
    {
      type: "string",
      label: "ID",
      name: "id"
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body"
    }
  ]
};
