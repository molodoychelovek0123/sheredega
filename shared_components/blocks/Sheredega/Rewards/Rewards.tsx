import React, { useMemo } from "react";
import { GridText } from "@/shared_components/blocks/Sheredega/GridText/GridText";
import { RewardsProps } from "./Props";
import {
  RewardsItemsContainer
} from "./RewardsItemsContainer/RewardsItemsContainer";

export const Rewards = ({
                          grid,
                          indent,
                          uniquePath,
                          customCss,
                          componentStart,
                          blockTitle: title,
                          fontSize,
                          animation,
                          items
                        }: RewardsProps) => {
  const RewardsItemMemo = useMemo(() => <RewardsItemsContainer items={items} />, [items]);

  // Впадлу создавать переиспользуемый компонент с гридом, поэтому подставляю такие значения, которые покроют мои потребности
  // Называю все это костьйл
  const kostyilTextBlock = {
    textStart: componentStart ?? "3",
    fontSize: fontSize ?? "30",
    title,
    animation
  };
  return (
    <GridText customComponent={RewardsItemMemo} textBlock={kostyilTextBlock} grid={grid} indent={indent}
              uniquePath={`${uniquePath ?? ""}-rewards`} customCss={customCss} />
  );
};