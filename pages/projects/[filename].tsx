import { client } from "../../tina/__generated__/client";
import { tinaField, useTina } from "tinacms/dist/react";
import { Layout } from "../../components/layout";
import { InferGetStaticPropsType } from "next";
import { Section } from "@/shared_components/components/Section/section";
import { ProjectHeading } from "@/shared_components/blocks/Sheredega/ProjectHeading/ProjectHeading";
import { Projects } from "@/tina/__generated__/types";
import { BlockRenderer } from "@/components/blocks-renderer";
import React, { CSSProperties } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

export const LinkToAllProjects = () => (
  <a className="flex justify-center items-center gap-3 mb-24 mt-14" href="/projects">
             <span className="text-black text-xl  lg:text-3xl font-medium leading-7 relative -top-[4px]">
            ко всем проектам
          </span>
    <img src="/assets/arrow-bottom-right.svg"
         alt="кнопка - все проекты"
         className="w-[11px] h-[11px] lg:w-[17px] lg:h-[17px]" />
  </a>
);

export const Blocks = (props: Omit<Projects, "id" | "_sys" | "_values">) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map(function(block, i) {
          if (block) {
            return (
              <div key={i} data-tina-field={tinaField(block)} className="w-full">
                <BlockRenderer block={block} customKey={i} entity={props} />
              </div>
            );
          }
          return null;
        })
        : null}
    </>
  );
};

export default function ProjectPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data
  });
  if (data && data.projects && (data.projects?.blocks?.length ?? 0) > 0) {
    console.log(data.projects);
    return (
      <Layout rawData={data} data={data.global}>

        <Section className="flex-1">
          <Blocks {...data.projects} />
          <LinkToAllProjects />
        </Section>

      </Layout>
    );
  }
  return (
    <Layout>
      <Section className="flex-1">
        <ProjectHeading {...data.projects} uniquePath={"projects-page.0.main.maintenance"} />
        <Player
          autoplay
          loop
          src="/lottie/tCW9rNEl1I.json"
          style={{ height: "800px", width: "800px" }}
        >
        </Player>
        <div className="w-full text-center text-black text-7xl font-medium leading-[1em] -mt-10 mb-52"
             style={{ textWrap: "balance" } as CSSProperties}>Мы работаем над наполнением этой
          страницы
        </div>

        <LinkToAllProjects />
      </Section>
    </Layout>
  );
}

export const getStaticProps = async ({ params }: { params: { filename: string; [key: string]: string } }) => {
  const tinaProps = await client.queries.projectsQuery({
    relativePath: `${params.filename}.mdx`
  });
  return {
    props: {
      ...tinaProps
    }
  };
};

/**
 * To build the blog post pages we just iterate through the list of
 * posts and provide their "filename" as part of the URL path
 *
 * So a blog post at "content/posts/hello.md" would
 * be viewable at http://localhost:3000/posts/hello
 */
export const getStaticPaths = async () => {
  const projectsListData = await client.queries.projectsConnection();
  return {
    paths: (projectsListData.data.projectsConnection?.edges??[]).map((project) => ({
      params: { filename: project?.node?._sys.filename }
    })),
    fallback: "blocking"
  };
};

export type PostType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["projects"];
