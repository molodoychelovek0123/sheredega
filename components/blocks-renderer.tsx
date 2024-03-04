import { v4 } from "uuid";

import type {
  Page,
  PageBlocks,
  PageBlocksContent,
  PostBlocks,
  ProjectsBlocks,
  ProjectsBlocksProjectHeading
} from "../tina/__generated__/types";
import { Content } from "./blocks/Page/content";
import { Features } from "./blocks/Page/features";
import { Hero } from "./blocks/Page/hero";
import { Testimonial } from "./blocks/Page/testimonial";
import { tinaField } from "tinacms/dist/react";
import { Hero as SheredegaHero } from "../shared_components/blocks/Sheredega/Hero/Hero";
import { GridText } from "../shared_components/blocks/Sheredega/GridText/GridText";
import { Numbers } from "../shared_components/blocks/Sheredega/Numbers/Numbers";
import { GridImage } from "@/shared_components/blocks/Sheredega/GridImage/GridImage";
import { Accordion } from "@/shared_components/blocks/Sheredega/Accordion/Accordion";
import { ScrollDrivenSlider } from "@/shared_components/blocks/Sheredega/ScrollDrivenSlider/ScrollDrivenSlider";
import { ProjectHeading } from "@/shared_components/blocks/Sheredega/ProjectHeading/ProjectHeading";
import { Projects } from "../tina/__generated__/types";
import { Zaglushka } from "@/shared_components/blocks/Sheredega/zaglushka/Zaglushka";
import { FourImageShowcase } from "@/shared_components/blocks/Sheredega/FourImageShowcase/FourImageShowcase";
import { Divider } from "@/shared_components/blocks/Sheredega/Divider/Divider";
import { CardsGrid } from "@/shared_components/blocks/Sheredega/CardsGrid/CardsGrid";


type ExtractBlockType<T extends string> = T extends `${infer K}Blocks${infer U}` ? U : never;

type ParamType = PageBlocks["__typename"] | ProjectsBlocks["__typename"] | PostBlocks["__typename"];
type ReturnType = ExtractBlockType<ParamType> | null;
const erasePrefix = (typename?: PageBlocks["__typename"] | ProjectsBlocks["__typename"] | PostBlocks["__typename"]): ReturnType => {
  if (!typename) return null;
  return typename.replace("PageBlocks", "").replace("ProjectsBlocks", "").replace("PostBlocks", "") as ReturnType;
};

export const BlockRenderer = <T = unknown>({ block, entity, customKey: key }: {
  block: PageBlocks | ProjectsBlocks | PostBlocks,
  customKey?: number,
  entity?: Omit<T, "id" | "_sys" | "_values">;
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const uniqueName = block?._tina_metadata?.name ?? v4();
  const uniquePath = block?.__typename + "/" + uniqueName + "/" + (key.toString() ?? "");
  switch (erasePrefix(block?.__typename) ?? "") {
    case "Content":
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return <Content data={block} />;
    case "Hero":
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return <Hero data={block} />;
    case "Features":
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return <Features data={block} />;
    case "Testimonial":
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return <Testimonial data={block} />;
    case "SheredegaHero":
      return <SheredegaHero block={block} {...block} />;
    case "GridText":
      return <GridText block={block} {...block} uniquePath={uniquePath} />;
    case "Numbers":
      return <Numbers {...block} uniquePath={uniquePath} />;
    case "GridImage":
      return <GridImage {...block} uniquePath={uniquePath} />;
    case "Accordion":
      return <Accordion {...block} uniquePath={uniquePath} />;
    case "ScrollDrivenSlider":
      console.log(block);
      return <ScrollDrivenSlider {...block} uniquePath={uniquePath} />;
    case "ProjectHeading":
      return <ProjectHeading {...entity} titleSize={(block as ProjectsBlocksProjectHeading).size}
                             uniquePath={uniquePath} />;
    case "Zaglushka":
    case "FullWidthImage":
      return <Zaglushka {...block} uniquePath={uniquePath} />;
    case "FourImageShowcase":
      return <FourImageShowcase {...block} uniquePath={uniquePath} />;
    case "Divider":
      return <Divider />
    case "CardsGrid":
      return <CardsGrid {...block} uniquePath={uniquePath} />
    case "":
    default:
      return null;
  }
};
