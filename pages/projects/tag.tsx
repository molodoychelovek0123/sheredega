import { Container } from "../../shared_components/components/Container/container";
import { Section } from "../../shared_components/components/Section/section";
import { client } from "../../tina/__generated__/client";
import { Layout } from "../../components/layout";
import { InferGetStaticPropsType } from "next";
import { ProjectItem, ProjectsList } from "@/shared_components/blocks/Sheredega/ProjectsList/ProjectsList";
import { useRouter } from "next/router";

export default function ProjectsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const projects = props.data.projectsConnection.edges;
  const router = useRouter();

  const { query } = router.query;

  console.log(projects);
  const projectsToShow =
    (projects ?? []).map(item => item?.node) // Берем ноды
      .filter(Boolean)
      .filter(item => item?.date && new Date(item.date).getTime() < new Date().getTime()) // Берем только с прошедшей датой
      .filter(item => (item?.hashtags ?? []).includes(query as string) || (item?.hashtags ?? []).includes("#" + (query as string)))
      .sort((a, b) => new Date(b?.date ?? "").getTime() - new Date(a?.date ?? "").getTime()) as  // Сортируем по датe
      (ProjectItem & { _sys: unknown & { filename: string; } })[]; // Приведени в тип

  return (
    <Layout>
      <Section className="flex-1">
        <Container uniquePath={"projects-page"}>
          {query &&
            <div className=" mb-5 text-black text-2xl font-medium leading-tight">Результаты поиска по
              #{query}</div>}

          {projectsToShow.length > 0 ?
            <ProjectsList
              projects={(projectsToShow ?? []).map(item => ({ ...item, filename: item?._sys?.filename ?? "" })) ?? []}
              showFilters={false} />
            :
            <div className="mt-10 text-black text-2xl font-medium leading-tight">Ничего не найдено</div>
          }

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
