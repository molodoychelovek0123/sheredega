import { Container } from "../../../components/Container/container";
import { Title, titleSize } from "../../../components/Title/Title";
import { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";

type Props = {
  title?: string;
  heroImg?: string;
  description?: string;
  year?: string;
  stage?: string;
  partners?: string[];
  type?: string[];
  hashtags?: string[];
  titleSize?: string;
  descriptionSize?: string;
  uniquePath?: string
}

const ProjectInfoTab = ({ title, text, "data-tina-field": dataTinaField, className }: {
  title?: string;
  text?: string;
  "data-tina-field"?: string
  className?: string
}) =>
  title || text ? (
    <div className={`flex-col justify-start items-start gap-3 inline-flex ${className}`}>
      <div
        className="opacity-30 text-black text-base lg:text-lg font-medium leading-tight lg:leading-snug">
        {title}
      </div>
      <div className="text-black text-lg  lg:text-xl  leading-snug lg:leading-normal" data-tina-field={dataTinaField}>
        {text}
      </div>
    </div>
  ) : null;

export const ProjectHeading = (props: Props) => {
  const {
    title = "Проект",
    heroImg,
    description,
    year,
    stage,
    partners,
    type,
    hashtags,
    titleSize = "80",
    uniquePath
  } = props;

  return (
    <Container uniquePath={uniquePath}>
      <div className="justify-between items-center gap-16 inline-flex py-15 w-full">
        <div className="flex-col justify-start items-start gap-10 lg:gap-12 inline-flex w-full">
          <div className="flex-col justify-start items-start gap-6 flex w-full">
            <Title size={titleSize ?? "80"} lineHeight={"100%"}
                   data-tina-field={tinaField(props, "title")}> {title}</Title>
            {description && <div
              className="text-black  text-lg  md:text-xl lg:text-2xl font-medium leading-snug lg:leading-loose "
              data-tina-field={tinaField(props, "description")}>
              {description}
            </div>}
          </div>
          {heroImg &&
            <div className="w-full relative shrink-0 md:hidden" data-tina-field={tinaField(props, "heroImg")}>
              <div className="w-full pt-[100%] sm:pt-[56.25%] lg:pt-[100%] relative">
                <img className="absolute left-0 top-0 w-full h-full  object-cover" src={heroImg}
                     alt={title} />
              </div>
            </div>}
          <div className="flex-col justify-start items-start gap-10 flex w-full">
            <div
              className="justify-start items-start gap-x-10 lg:gap-x-12 gap-y-8 inline-flex w-full flex-wrap md:flex-nowrap">
              {year || stage || (partners?.length ?? 0) > 0 ?
                (
                  <div className="justify-start items-start gap-x-10 lg:gap-x-12 gap-y-8 flex flex-wrap xs:flex-nowrap">
                    {year && <ProjectInfoTab title="Год" text={year} data-tina-field={tinaField(props, "year")} />}
                    {stage &&
                      <ProjectInfoTab title="Стадия" text={stage} data-tina-field={tinaField(props, "stage")} />}
                    {partners && partners.length > 0 ? <ProjectInfoTab title="Партнеры" text={partners.join(", ")}
                                                                       data-tina-field={tinaField(props, "partners")} /> : null}
                    <ProjectInfoTab title="Тип проекта" text={type.join(", ")}
                                    data-tina-field={tinaField(props, "type")}
                                    className="hidden lg:inline-flex"
                    />
                  </div>
                )
                : null}
              {type && type.length > 0 ? <ProjectInfoTab title="Тип проекта" text={type.join(", ")}
                                                         data-tina-field={tinaField(props, "type")}
                                                         className="lg:hidden" />
                : null}
            </div>
            {hashtags &&
              <div
                className="justify-start items-start gap-x-4 md:gap-x-8 lg:gap-x-12 gap-y-2 md:gap-y-3 inline-flex flex-wrap"
                data-tina-field={tinaField(props, "hashtags")}>
                {hashtags.map(item =>
                  <a href={`/projects/tag?query=${item.replaceAll("#", "")}`}
                     className="text-black  text-lg  lg:text-xl font-normal   leading-snug  lg:leading-normal">#{item.replaceAll("#", "")}</a>
                )}

              </div>
            }
          </div>
        </div>
        {heroImg &&
          <div className="w-[300px] relative lg:shrink-0 hidden md:block" data-tina-field={tinaField(props, "heroImg")}>
            <div className="w-full pt-[100%] relative">
              <img className="absolute left-0 top-0 w-full h-full -mt-6  object-cover" src={heroImg}
                   alt={title} />
            </div>
          </div>}
      </div>
    </Container>
  );
};


export const projectHeadingBlockSchema: Template = {
  name: "projectHeading",
  label: "Шапка проекта",
  ui: {
    previewSrc: "/blocks/project-heading.png",
    defaultItem: {
      titleSize: "80"
    }
  },
  fields: [
    titleSize as any
  ]
};