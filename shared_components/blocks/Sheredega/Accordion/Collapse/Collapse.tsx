import React from "react";
import AnimateHeight from "react-animate-height";
import { CollapseProps } from "@/shared_components/blocks/Sheredega/Accordion/Collapse/props";
import { RichTextComponent } from "@/global/schemas/richTextFieldSchema";

export const Collapse = ({ title, body, isOpen, toggleOpen }: CollapseProps) => {
  if (!title || !body) {
    return null;
  }
  return (
    <div
      className={`w-full max-h-full flex-col justify-start items-start  inline-flex bg-white border border-black border-l-0 border-r-0 border-opacity-10 p-6 lg:p-[26px] pb-0 lg:pb-0 pointer-events-auto`}>
      <div className="w-full justify-between items-center inline-flex cursor-pointer pb-6 lg:pb-[26px]"
           onClick={toggleOpen}>
        <div
          className="text-black text-2xl md:text-4xl lg:text-4.5xl leading-7 md:leading-9 lg:leading-10  font-medium  ">
          {title}
        </div>
        <div className="w-8 h-8 relative">
          <div className="w-5 h-px  a-centered  border border-[#b2b2b2]"></div>
          <div
            className={`w-5 h-px plus-I border border-[#b2b2b2] ${isOpen && "plus-I--active"}`}></div>
        </div>
      </div>
      <AnimateHeight
        duration={500}
        height={isOpen ? "auto" : 0}
        className={`w-full transition-all duration-500 overflow-y-scroll overflow-x-hidden`}
      >
        <div className="w-full pt-2.5 pb-3">
          <div
            className="font-normal  text-black text-lg md:text-2xl lg:text-[28px] leading-normal lg:leading-9 lg:max-w-[1096px] xl:max-w-[1440px]  rte-text">
            <RichTextComponent body={body} />
          </div>
        </div>
      </AnimateHeight>
    </div>
  );
};