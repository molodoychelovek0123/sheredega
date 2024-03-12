import { Hero } from "../../../shared_components/blocks/Sheredega/Hero/Hero";
import { PageBlocksSheredegaHero } from "../../../tina/__generated__/types";


// Зачем -то я раскидывал по разным папкам. Но чисто забей, все лежит в шеред компонентс
export const SheredegaHero = ({ data }: { data: PageBlocksSheredegaHero }) => {
  if (data) {
    return (
      <Hero block={data} title={data.title} images={data.images} />
    );
  }
};

export { HeroBlockSchema as sheredegaHeroBlockSchema } from "../../../shared_components/blocks/Sheredega/Hero/schema";
