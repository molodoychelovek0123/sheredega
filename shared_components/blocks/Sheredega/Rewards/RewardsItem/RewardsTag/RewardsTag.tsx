import React from "react";
import { RewardsTagImage } from "./RewardsTagImage";

export type AvailableTypes =
  "Архитектура"
  | "Туризм"
  | "Градостроительство"
  | "Исследования"
  | "Дизайн-код"
  | "Мастер-план";

export const availableTags: { type: AvailableTypes, image: string }[] = [
  {
    type: "Архитектура",
    image: "/assets/reward-tag-design-code.jpg"
  },

  {
    type: "Туризм",
    image: "/assets/reward-tag-design-code.jpg"
  },

  {
    type: "Градостроительство",
    image: "/assets/reward-tag-design-code.jpg"
  },

  {
    type: "Исследования",
    image: "/assets/reward-tag-design-code.jpg"
  },

  {
    type: "Дизайн-код",
    image: "/assets/reward-tag-design-code.jpg"
  },

  {
    type: "Мастер-план",
    image: "/assets/reward-tag-design-code.jpg"
  }

];

export const RewardsTag = ({ type }: { type: typeof availableTags[number]["type"] | null }) => {
  const tag = availableTags.find(tag => tag.type === type);
  const { type: text, image } = tag ?? { type: "", image: "" };
  if (tag) {

    return (
      <div
        className="px-2.5 pt-[5px] pb-[7px] bg-white rounded-sm border border-black border-opacity-20 justify-start reward-tag items-center gap-2.5 flex overflow-hidden relative text-black hover:text-white transition-all duration-500">
        <RewardsTagImage image={image} alt={text} />
        <div className="text-lg font-medium  leading-snug pointer-events-none relative">{text}</div>
      </div>
    );
  }
  return null;
};

