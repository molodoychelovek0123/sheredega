import React, { useState } from "react";
import { InferGetStaticPropsType } from "next";
import { BlockRenderer } from "../components/blocks-renderer";
import { tinaField, useTina } from "tinacms/dist/react";
import { Layout } from "../components/layout";
import { client } from "../tina/__generated__/client";
import { Page } from "@/tina/__generated__/types";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map(function(block, i) {
          return (
            <div key={i} data-tina-field={tinaField(block)} className="w-full">
              <BlockRenderer block={block} customKey={i} />
            </div>
          );
        })
        : null}
    </>
  );
};

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina(props);

  return (
    <Layout rawData={data} data={data.global as any}>
      <Blocks {...data.page} />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.contentQuery({
    relativePath: `${params.filename}.md`
  });
  const props = {
    ...tinaProps,
    enableVisualEditing: process.env.VERCEL_ENV === "preview"
  };
  return {
    props: JSON.parse(JSON.stringify(props)) as typeof props
  };
};

export const getStaticPaths = async () => {
  const pagesListData = await client.queries.pageConnection();
  return {
    paths: pagesListData.data.pageConnection?.edges?.map((page) => ({
      params: { filename: page?.node?._sys.filename }
    })),
    fallback: false
  };
};
