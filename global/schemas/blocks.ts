import { ObjectField } from "@tinacms/schema-tools";
import { heroBlockSchema } from "../../components/blocks/Page/hero";
import { contentBlockSchema } from "../../components/blocks/Page/content";
import { testimonialBlockSchema } from "../../components/blocks/Page/testimonial";
import { featureBlockSchema } from "../../components/blocks/Page/features";
import { sheredegaHeroBlockSchema } from "../../components/blocks/Page/SheredegaHero";
import { gridTextBlockSchema } from "../../shared_components/blocks/Sheredega/GridText/schema";
import { numbersBlockSchema } from "../../shared_components/blocks/Sheredega/Numbers/schema";
import { gridImageSchema } from "../../shared_components/blocks/Sheredega/GridImage/schema";
import { accordionSchema } from "../../shared_components/blocks/Sheredega/Accordion/schema";
import { scrollDrivenSliderSchema } from "../../shared_components/blocks/Sheredega/ScrollDrivenSlider/schema";
import { fullWidthImageSchema, zaglushkaSchema } from "../../shared_components/blocks/Sheredega/zaglushka/schema";
import { fourImageShowcaseSchema } from "../../shared_components/blocks/Sheredega/FourImageShowcase/schema";
import { dividerSchema } from "../../shared_components/blocks/Sheredega/Divider/schema";
import { cardsGridBlockSchema } from "../../shared_components/blocks/Sheredega/CardsGrid/schema";
import { scrollNumbersBlockSchema } from "../../shared_components/blocks/Sheredega/ScrollNumbers/schema";

export const getBlocksSchema = (additionalTemplates: ObjectField["templates"] = []): ObjectField => ({
  type: "object",
  list: true,
  name: "blocks",
  label: "Блочные компоненты",
  ui: {
    visualSelector: true
  },
  templates: additionalTemplates.concat([
    scrollNumbersBlockSchema,
    sheredegaHeroBlockSchema,
    gridTextBlockSchema,
    dividerSchema,
    cardsGridBlockSchema,
    numbersBlockSchema,
    gridImageSchema,
    accordionSchema,
    scrollDrivenSliderSchema,
    fourImageShowcaseSchema,
    zaglushkaSchema,
    fullWidthImageSchema,
    heroBlockSchema,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    featureBlockSchema,
    contentBlockSchema,
    testimonialBlockSchema
  ])
});