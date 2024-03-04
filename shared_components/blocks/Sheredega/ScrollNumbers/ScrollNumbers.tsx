import { useCallback, useEffect, useRef, useState } from "react";
import useResizeObserver from "@react-hook/resize-observer";
import { GridText } from "@/shared_components/blocks/Sheredega/GridText/GridText";
import { TinaMarkdownContent } from "tinacms/dist/rich-text";
import { animationFieldType } from "@/global/constants/animations";

type Props = {
  data?: {
    text?: string;
    subtext?: string;
  }[]
  textBlock?: {
    hideTitleOnMobile?: boolean;
    title?: string;
    body?: TinaMarkdownContent | TinaMarkdownContent[]; // tina-rte
    fontSize?: string;
    textStart?: string;
    animation?: animationFieldType,
  }
}

const defailtData = [
  {
    text: "1",
    subtext: "Число"
  },
  {
    text: "2",
    subtext: "Проектов"
  },
  {
    text: "160+",
    subtext: "проектов"
  },
  {
    text: "100+",
    subtext: "проектов"
  },
  {
    text: "5",
    subtext: "команда"
  }
];

export const SmoothScroll = ({ data = defailtData, textBlock }: Props) => {
  if (data.length === 0) data = defailtData;
  const ref = useRef<HTMLDivElement>(null);
  const [componentSize, setComponentSize] = useState<number>(1920);
  const [leftIndent, setLeftIndent] = useState<string>("35%");
  const [active, setActive] = useState<number>(0);
  const [sectionHeight, setSectionHeight] = useState<string>("500vh");
  const [lastItemWidth, setLastItemWidth] = useState<string>("0px");

  useResizeObserver(ref, (entry) => {
    setComponentSize(entry.contentRect?.width ?? 1920);
  });


  const scrollTrigger = useCallback(
    () => {
      const flexContainerEl = ref.current.querySelector("div.pin-wrap");
      const boundingClientRect = flexContainerEl.getBoundingClientRect();
      const leftPosition = boundingClientRect.x;

      const positions = [...flexContainerEl.querySelectorAll("div")].map(item => item.getBoundingClientRect().x);
      const leftIndentValue = Number(leftIndent.replaceAll("px", "").replaceAll("#", ""));

      setLastItemWidth(`${([...flexContainerEl.querySelectorAll("div")]?.[data.length - 1]?.getBoundingClientRect()?.width ?? "0")}px`);

      const index = positions.findIndex(item => item + 20 > leftIndentValue);

      if (index > data.length - 1) {
        setActive(data.length - 1);
        return;
      }

      if (index <= 0) {
        if (leftPosition < -1000) {
          setActive(data.length - 1);
        } else {
          setActive(0);
        }
        return;
      }
      setActive(index);
    },
    [leftIndent]
  );


  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      let padding = 64;
      let cols = 2;
      let summarycols = 6;
      if (componentSize < 900) {
        padding = 16;
        cols = 0;
        summarycols = 1;
      }
      if (componentSize < 1200 && componentSize >= 900) {
        padding = 24;
        cols = 1;
        summarycols = 6;
      }
      if (componentSize >= 1200) {
        padding = 64;
        cols = 2;
        summarycols = 6;
      }

      const colSize = (componentSize - (padding * 2)) / summarycols;
      const leftIndent = padding + cols * colSize;
      setLeftIndent(`${leftIndent}px`);

      document.addEventListener("scroll", scrollTrigger);
      return () => document.removeEventListener("scroll", scrollTrigger);
    }
  }, [componentSize, scrollTrigger]);


  const style = `
  @keyframes move-extended{
  0%{
    transform: translateX(0);
  }
 100% {
    transform: translateX(calc(-100% + calc(${leftIndent} + ${lastItemWidth})));
  }
  `;
  return (
    <section id="sectionPin" className="" style={{ height: sectionHeight }}>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <div className="pin-wrap-sticky" ref={ref}>
        {textBlock && <GridText textBlock={textBlock} />}
        <div className="pin-wrap gap-12 lg:gap-[115px] pt-20 pb-10 lg:py-20"
             style={{ paddingLeft: leftIndent, animationName: "move-extended" }}>
          {data.map((item, i) =>
            <div className={`${i === active ? "opacity-100" : "opacity-20"} transition-opacity duration-700`}>
              <p
                className="text-[70px] md:text-[90px] lg:text-[120px] leading-[100%] mb-5 font-medium "> {item.text} </p>
              <p
                className="text-black text-lg  lg:text-2xl font-normal leading-tight lg:leading-snug">{item.subtext} </p>

            </div>
          )}
        </div>
      </div>
    </section>
  );

};