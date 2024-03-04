import { AnimatePresence, motion } from "framer-motion";
import { CardGridProps } from "@/shared_components/blocks/Sheredega/CardsGrid/props";
import { Container } from "@/shared_components/components/Container/container";
import { CardItem } from "@/shared_components/blocks/Sheredega/CardsGrid/CardItem/CardItem";

export const CardsGrid = ({ container, cards = [], indent, uniquePath, customCss }: CardGridProps) => {
  return (
    <Container indent={indent} uniquePath={uniquePath} customCss={customCss} hide={!container}>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-y-10 gap-x-4 lg:gap-y-14 lg:gap-x-8">
        <AnimatePresence>
          {cards.map(item => <CardItem {...item} image={item?.image?.src} />)}
        </AnimatePresence>
      </motion.div>
    </Container>
  );
};