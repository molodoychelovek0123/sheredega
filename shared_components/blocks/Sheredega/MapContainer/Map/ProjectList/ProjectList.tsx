import React, { memo, useEffect, useMemo, useState } from "react";
import { RegionsNames } from "@/global/constants/regions";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import AnimateHeight from "react-animate-height";
import { useDebounce } from "@react-hook/debounce";
import { MyImageProps } from "@/shared_components/utils/imageDefaultSchema";
import md5 from "md5";

export type ProjectItem = {
  lng?: number;
  lat?: number;
  tooltip?: string;
  title?: string;
  city?: string;
  year?: string;
  link?: string;
  image?: MyImageProps;
  region?: RegionsNames[];
}
const ProjectList = ({ projects, isOpen, setOpen, toggleOpen, mapGoTo }: {
  projects: ProjectItem[];
  isOpen: boolean,
  setOpen?: (v: boolean) => void;
  toggleOpen?: () => void;
  mapGoTo?: (center: number[]) => void
}) => {
  const [currentHover, setCurrentHover] = useDebounce<number | null>(null);

  useEffect(() => {
    if (currentHover) {
      const center = [projects[currentHover]?.lng || 0, projects[currentHover]?.lat || 0];
      mapGoTo && mapGoTo(center);
    }
  }, [currentHover]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentHover(null);
    }
  }, [isOpen]);


  const showProjects = useMemo(() => projects, [projects]);
  return (
    <div
      className={`w-full max-h-full flex-col justify-start items-start  inline-flex bg-white border border-black border-opacity-10 p-6 lg:p-[26px] pb-0 lg:pb-0 pointer-events-auto`}>
      <div className="w-full justify-between items-center inline-flex cursor-pointer pb-6 lg:pb-[26px]"
           onClick={toggleOpen}>
        <div className="text-black text-xl md:text-2xl lg:text-[28px] h-[32px] font-medium leading-9">География
          проектов
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
          {(showProjects ?? []).length === 0 &&
            <div className="text-black text-xl font-medium  leading-normal">Нам нечего вам показать, попытайтесь
              повзаимодействовать с картой, чтобы получить какие-то результаты</div>}
          <div className="w-full flex flex-col">
            {(showProjects ?? []).map((item, index) => (

              <a className="p-3.5 w-full w-full+3.5 -mx-3.5 block relative project-list-item"
                 key={`${index}-${item?.title}-${item?.tooltip}-${item.lng}-${item.lat}`} href={item?.link}
                 onMouseOver={() => setCurrentHover(index)}
              >
                <div className="w-full flex-col justify-start items-start gap-2.5 inline-flex">
                  <div className="justify-start items-center gap-5 inline-flex">
                    <img className="w-20 h-20 object-cover shrink-0"
                         src={item?.image?.src ?? "https://via.placeholder.com/450x450"}
                         alt={item?.image?.alt ?? "Проект"} />
                    <div className="flex-col justify-start items-start gap-2.5 inline-flex">
                      <div className="text-black text-xl font-medium  leading-normal">{item?.title}</div>
                      <div className="justify-start items-start gap-1.5 inline-flex">
                        <div className="opacity-30 text-black text-base font-semibold  leading-tight">{item?.year}</div>
                        <div className="opacity-30 text-black text-base font-medium  leading-tight">{item?.city}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="justify-start items-center gap-2.5 inline-flex absolute right-[15px] bottom-[15px] opacity-0 view">
                  <div className="text-black text-lg font-medium leading-snug">смотреть проект</div>
                  <img src="/assets/gray-arrow-bottom-right.svg" alt="Смотреть проект" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </AnimateHeight>


    </div>
  );
};
export default memo(ProjectList);