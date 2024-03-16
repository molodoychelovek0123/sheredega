import { v4 } from "uuid";

import type {
  PageBlocks,
  PageBlocksAboutPerson, PageBlocksAboutPersonStatic,
  PageBlocksFourImageShowcase,
  PageBlocksGridImage, PageBlocksLogos, PageBlocksPublicationList,
  PageBlocksRewards,
  PageBlocksScrollDrivenSlider,
  PageBlocksScrollNumbersBlock,
  PageBlocksSheredegaHero,
  ProjectsBlocks,
  ProjectsBlocksProjectHeading
} from "../tina/__generated__/types";
import { Content } from "./blocks/Page/content";
import { Features } from "./blocks/Page/features";
import { Hero } from "./blocks/Page/hero";
import { Testimonial } from "./blocks/Page/testimonial";
import { Hero as SheredegaHero } from "../shared_components/blocks/Sheredega/Hero/Hero";
import { GridText } from "../shared_components/blocks/Sheredega/GridText/GridText";
import { Numbers } from "../shared_components/blocks/Sheredega/Numbers/Numbers";
import { GridImage } from "@/shared_components/blocks/Sheredega/GridImage/GridImage";
import { Accordion } from "@/shared_components/blocks/Sheredega/Accordion/Accordion";
import { ScrollDrivenSlider } from "@/shared_components/blocks/Sheredega/ScrollDrivenSlider/ScrollDrivenSlider";
import { ProjectHeading } from "@/shared_components/blocks/Sheredega/ProjectHeading/ProjectHeading";
import { PageBlocksAboutPersonSticky } from "../tina/__generated__/types";
import { Zaglushka } from "@/shared_components/blocks/Sheredega/zaglushka/Zaglushka";
import { FourImageShowcase } from "@/shared_components/blocks/Sheredega/FourImageShowcase/FourImageShowcase";
import { Divider } from "@/shared_components/blocks/Sheredega/Divider/Divider";
import { CardsGrid } from "@/shared_components/blocks/Sheredega/CardsGrid/CardsGrid";
import { ScrollNumbers } from "@/shared_components/blocks/Sheredega/ScrollNumbers/ScrollNumbers";
import { AboutPerson } from "@/shared_components/blocks/Sheredega/AboutPerson/AboutPerson";
import { StickyAboutPerson } from "@/shared_components/blocks/Sheredega/AboutPerson/StickyAboutPerson";
import { Rewards } from "@/shared_components/blocks/Sheredega/Rewards/Rewards";
import { MapContainer } from "@/shared_components/blocks/Sheredega/MapContainer/MapContainer";
import { LogoMarquee } from "@/shared_components/blocks/Sheredega/LogoMarquee/LogoMarquee";
import { Contacts } from "@/shared_components/blocks/Sheredega/Contacts/Contacts";
import { AboutPersonStatic } from "@/shared_components/blocks/Sheredega/AboutPersonStatic/AboutPersonStatic";
import { ScrollLeftNumbers } from "@/shared_components/blocks/Sheredega/ScrollLeftNumbers/ScrollLeftNumbers";
import { PublicationsList } from "@/shared_components/blocks/Sheredega/PublicationsList/PublicationsList";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ExtractBlockType<T extends string> = T extends `${infer K}Blocks${infer U}` ? U : never;

type ParamType = PageBlocks["__typename"] | ProjectsBlocks["__typename"];
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type ReturnType = ExtractBlockType<ParamType> | null;
const erasePrefix = (typename?: PageBlocks["__typename"] | ProjectsBlocks["__typename"] ): ReturnType => {
  if (!typename) return null;
  return typename.replace("PageBlocks", "").replace("ProjectsBlocks", "").replace("PostBlocks", "") as ReturnType;
};



export const BlockRenderer = <T = unknown>({ block, entity, customKey: key }: {
  block: PageBlocks | ProjectsBlocks ,
  customKey?: number,
  entity?: Omit<T, "id" | "_sys" | "_values">;
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const uniqueName = block?._tina_metadata?.name ?? v4();
  const uniquePath = block?.__typename + "/" + uniqueName + "/" + (key?.toString() ?? "");
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
      return <SheredegaHero block={block as PageBlocksSheredegaHero} {...block as PageBlocksSheredegaHero} key={uniquePath} />;
    case "GridText":
      return <GridText block={block} {...block} uniquePath={uniquePath} key={uniquePath} />;
    case "Numbers":
      return <Numbers {...block} uniquePath={uniquePath} key={uniquePath} />;
    case "GridImage":
      return <GridImage {...block as PageBlocksGridImage} uniquePath={uniquePath} key={uniquePath} />;
    case "Accordion":
      return <Accordion {...block} uniquePath={uniquePath} key={uniquePath} />;
    case "ScrollDrivenSlider":
      return <ScrollDrivenSlider {...block as PageBlocksScrollDrivenSlider} uniquePath={uniquePath} key={uniquePath} />;
    case "ProjectHeading":
      return <ProjectHeading {...entity} titleSize={(block as ProjectsBlocksProjectHeading).size}
                             uniquePath={uniquePath}
                             key={uniquePath} />;
    case "Zaglushka":
    case "FullWidthImage":
      return <Zaglushka {...block} uniquePath={uniquePath}  key={uniquePath}/>;
    case "FourImageShowcase":
      return <FourImageShowcase {...block as PageBlocksFourImageShowcase} uniquePath={uniquePath} key={uniquePath} />;
    case "Divider":
      return <Divider />
    case "CardsGrid":
      return <CardsGrid {...block}  uniquePath={uniquePath} key={uniquePath} />
    case "ScrollLLeftNumbersBlock":
      return <ScrollLeftNumbers {...block as PageBlocksScrollNumbersBlock}   key={uniquePath} />
    case "ScrollNumbersBlock":
      // as по причине бага ТС, что нельзя больше 25 members в union
      return <ScrollNumbers {...block as PageBlocksScrollNumbersBlock}   key={uniquePath} />
    case "AboutPerson":
      return <AboutPerson {...block as PageBlocksAboutPerson }  uniquePath={uniquePath} key={uniquePath} />
    case "AboutPersonSticky":
      return <StickyAboutPerson {...block as PageBlocksAboutPersonSticky }  uniquePath={uniquePath} key={uniquePath} />
    case "Rewards":
      return <Rewards {...block as PageBlocksRewards }  uniquePath={uniquePath} key={uniquePath} />
    case "Map":
      return <MapContainer key={uniquePath} />
    case "Contacts":
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return <Contacts block={block} {...block} uniquePath={uniquePath} key={uniquePath} />
    case "Logos":
      // eslint-disable-next-line no-case-declarations
      const logosBlock = block as PageBlocksLogos
      return <LogoMarquee logosFirst={logosBlock.logosFirst ?? null} logosSecond={logosBlock.logosSecond ?? null} baseVelocity={logosBlock.baseVelocity ?? null} key={uniquePath} />
    case "AboutPersonStatic":
      return <AboutPersonStatic key={uniquePath} />
    case "PublicationList":
      return <PublicationsList block={block} {...block as PageBlocksPublicationList} uniquePath={uniquePath} key={uniquePath} />
    case "":
    default:
      return null;
  }
};
