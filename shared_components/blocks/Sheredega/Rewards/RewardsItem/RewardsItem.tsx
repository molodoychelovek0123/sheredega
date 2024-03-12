import { tinaField } from "tinacms/dist/react";
import cn from "@/global/utils/classnames";
import React from "react";
import {
  availableTags,
  RewardsTag
} from "./RewardsTag/RewardsTag";
import { RewardsItemProps } from "./Props";

export const RewardsItem = ({ block, mainText: title, tags, year, theme, button }: RewardsItemProps) => {
  const { src, text: buttonText, url } = button ?? {};
  const buttonHref = src ?? url;
  if (title && year && theme) {
    return (
      <div className={cn(
        "w-full flex-col justify-start items-start gap-2 inline-flex reward-item",
        buttonHref && buttonText ? "cursor-pointer" : ""
      )}>
        <div className="justify-between w-full items-start gap-28 inline-flex">
          <div className="text-black text-lg md:text-[22px] font-medium leading-snug md:leading-relaxed max-w-[44%]"
               data-tina-field={tinaField(block, "mainText")}>
            {title}
          </div>
          <div className={cn("justify-end items-start gap-3.5 hidden md:flex flex-wrap")}>
            {(tags ?? []).map((item) => (
              <React.Fragment key={tinaField(item ?? {})}>
                <RewardsTag type={item as typeof availableTags[number]["type"]} />
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="inline-flex justify-between items-end w-full gap-7">
          <div className="justify-start items-center gap-7 inline-flex">
            <div className="text-black text-opacity-25 text-xl font-normal  leading-relaxed"
                 data-tina-field={tinaField(block, "year")}>
              {year}
            </div>
            <div className="text-black text-opacity-25 text-xl font-normal  leading-relaxed"
                 data-tina-field={tinaField(block, "theme")}>
              {theme}
            </div>
          </div>
          {buttonHref && buttonText ?
            <a
              className=" justify-center items-center gap-3 hidden  md:flex transition-opacity duration-500 opacity-0  reward-item-link py-1"
              href={buttonHref} target="_blank" data-tina-field={tinaField(block, "button")}>
              <span className="text-black text-lg  font-medium leading-snug relative">
                {buttonText}
              </span>
              <img src="/assets/arrow-bottom-right.svg"
                   alt={`кнопка - ${buttonText}`}
                   className="w-[12px] h-[12px]" />
            </a>
            : null
          }

        </div>
      </div>
    );
  }

  return <div data-tina-field={tinaField(block, "title")}> Вы забыли заполнить заголовок, год и тему </div>;
};