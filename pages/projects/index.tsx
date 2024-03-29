import { Container } from "../../shared_components/components/Container/container";
import { Section } from "../../shared_components/components/Section/section";
import { client } from "../../tina/__generated__/client";
import { Layout } from "../../components/layout";
import { InferGetStaticPropsType } from "next";
import { ProjectItem, ProjectsList } from "@/shared_components/blocks/Sheredega/ProjectsList/ProjectsList";

export default function ProjectsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const projects = props.data.projectsConnection.edges;

  const projectsToShow =
    (projects ?? []).map(item => item?.node) // Берем ноды
      .filter(Boolean)
      .filter(item => item?.date && new Date(item.date).getTime() < new Date().getTime()) // Берем только с прошедшей датой
      .sort((a, b) => new Date(b?.date ?? "").getTime() - new Date(a?.date ?? "").getTime()) as  // Сортируем по датe
    (ProjectItem & { _sys: unknown & { filename: string; } })[]
  return (
    <Layout>
      <Section className="flex-1">
        <Container uniquePath={"projects-page"}>
          <ProjectsList projects={projectsToShow.map(item => ({ ...item, filename: item._sys.filename }))} />
        </Container>
      </Section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.pageQuery();
  return {
    props: {
      ...tinaProps
    }
  };
};

export type PostsType = InferGetStaticPropsType<
  typeof getStaticProps
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
>["data"]["projectsConnection"]["edges"][number];
