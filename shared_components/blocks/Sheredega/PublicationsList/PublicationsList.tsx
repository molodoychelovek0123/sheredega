import React, { useMemo } from "react";

import { Container } from "@/shared_components/components/Container/container";
import { GridText } from "@/shared_components/blocks/Sheredega/GridText/GridText";
import { PublicationsListProps } from "./props";
import {
  PublicationsListItemContainer
} from "./PublicationsListItemContainer/PublicationsListItemContainer";

export const PublicationsList = ({
                                   grid,
                                   indent,
                                   uniquePath,
                                   customCss,
                                   componentStart,
                                   blockTitle: title,
                                   fontSize,
                                   animation,
                                   items
                                 }: PublicationsListProps) => {
  const RewardsItemMemo = useMemo(() => <PublicationsListItemContainer items={items} />, [items]);

  // Впадлу создавать переиспользуемый компонент с гридом, поэтому подставляю такие значения, которые покроют мои потребности
  // Называю все это костьйл
  const kostyilTextBlock = {
    textStart: componentStart ?? "3",
    fontSize: fontSize ?? "30",
    title,
    animation
  };
  return (
    <>
      <GridText customComponent={RewardsItemMemo} textBlock={kostyilTextBlock} grid={grid} indent={indent}
                uniquePath={`${uniquePath ?? ""}-content`} customCss={customCss} />
    </>
  );
};