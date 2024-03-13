import { useCallback, useEffect, useRef, useState } from "react";
import useResizeObserver from "@react-hook/resize-observer";
import { GridText } from "@/shared_components/blocks/Sheredega/GridText/GridText";
import { TinaMarkdownContent } from "tinacms/dist/rich-text";
import { animationFieldType } from "@/global/constants/animations";
import { tinaField } from "tinacms/dist/react";

type Props = {
  data?: ({
    text?: string | null;
    subtext?: string | null;
  } | null)[] | null
  textBlock?: {
    hideTitleOnMobile?: boolean | null;
    title?: string | null;
    body?: TinaMarkdownContent | TinaMarkdownContent[] | null; // tina-rte
    fontSize?: string | null;
    textStart?: string | null;
    animation?: animationFieldType | null,
  } | null
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

export const ScrollNumbers = ({ data = defailtData, textBlock }: Props) => {
  if ((data?.length ?? 0) === 0) data = defailtData;
  const ref = useRef<HTMLDivElement>(null);
  const [componentSize, setComponentSize] = useState<number>(1920);
  const [leftIndent, setLeftIndent] = useState<string>("35%");
  const [active, setActive] = useState<number>(0);
  const sectionHeight = "500vh";
  const [lastItemWidth, setLastItemWidth] = useState<string>("0px");
  const [endAnimation, setEndAnimation] = useState<boolean>(false);

  useResizeObserver(ref, (entry) => {
    setComponentSize(entry.contentRect?.width ?? 1920);
  });


  const scrollTrigger = useCallback(
    (event) => {
      if (ref.current && data && typeof window !== "undefined") {
        const flexContainerEl = ref.current.querySelector("div.pin-wrap");
        if (flexContainerEl) {
          const boundingClientRect = flexContainerEl.getBoundingClientRect();
          const leftPosition = boundingClientRect.x;

          const positions = [...flexContainerEl.querySelectorAll("div")].map(item => item.getBoundingClientRect().x);
          const leftIndentValue = Number(leftIndent.replaceAll("px", "").replaceAll("#", ""));

          setLastItemWidth(`${([...flexContainerEl.querySelectorAll("div")]?.[data.length - 1]?.getBoundingClientRect()?.width ?? "0")}px`);

          const index = positions.findIndex(item => item + 20 > leftIndentValue);

          const compareTransformMatrices = (str1: string, str2: string) => {
            // Получаем числа смещения по оси Y из строк
            const getYOffset = (str: string) => {
              const regex = /matrix\(.*,\s*([\d.-]+),\s*.*\)/;
              const match = str.match(regex);
              return match ? parseFloat(match[1]) : null;
            };

            // Получаем значения смещения по оси Y из каждой строки
            const yOffset1 = getYOffset(str1);
            const yOffset2 = getYOffset(str2);

            // Сравниваем значения смещения по оси Y и возвращаем результат
            if (yOffset1 !== null && yOffset2 !== null) {
              if (yOffset1 > yOffset2) {
                return true;
              } else {
                return false;
              }
            } else {
              // Если не удается извлечь значения, выводим сообщение об ошибке
              console.error("Ошибка: Не удалось извлечь значения смещения по оси Y из одной или обеих строк.");
              return null;
            }
          };

          const pinWrapActualEl = ref.current?.querySelector(".pin-wrap-actual");
          const pinWrapFixedEl = ref.current?.querySelector(".pin-wrap-fixed");
          if (pinWrapActualEl && pinWrapFixedEl) {
            const computedStyle = window.getComputedStyle(pinWrapActualEl, null);
            const transform = computedStyle.getPropertyValue("transform")
              || computedStyle.getPropertyValue("-moz-transform")
              || computedStyle.getPropertyValue("-webkit-transform")
              || computedStyle.getPropertyValue("-ms-transform")
              || computedStyle.getPropertyValue("-o-transform");

            const computedStyleFixed = window.getComputedStyle(pinWrapFixedEl, null);
            const transformFixed = computedStyleFixed.getPropertyValue("transform")
              || computedStyleFixed.getPropertyValue("-moz-transform")
              || computedStyleFixed.getPropertyValue("-webkit-transform")
              || computedStyleFixed.getPropertyValue("-ms-transform")
              || computedStyleFixed.getPropertyValue("-o-transform");


            if (transform && transformFixed && transform !== "none" && transformFixed !== "none") {
              setEndAnimation(compareTransformMatrices(transformFixed, transform) ?? false);
            } else {
              setEndAnimation(false);
            }

          }

          // if(index >= data?.length - 1){
          //   setEndAnimationPosition(window.scrollY);
          // }

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

        }
      }
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
      const calcLeftIndent = padding + cols * colSize;
      setLeftIndent(`${calcLeftIndent}px`);

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
  }
  `;

  return (
    <section id="sectionPin" className="mt-[100px]" style={{ height: sectionHeight }}>
      {/*<style dangerouslySetInnerHTML={{ __html: style }} />*/}
      <div className="pin-wrap-sticky" ref={ref}>
        {textBlock && <GridText textBlock={textBlock} />}
        <div className="relative">
          <div className={`pin-wrap pin-wrap-actual gap-12 lg:gap-[115px] pt-20 pb-10 lg:py-20  ${endAnimation ? "opacity-0" : "opacity-100"}`}
               style={{ paddingLeft: leftIndent}}>
            {(data ?? []).map((item, i) =>
              <div key={JSON.stringify(item)}
                   className={`${i === active ? "opacity-100" : "opacity-20"} transition-opacity duration-700 scroll-numbers-item`}
                   data-tina-field={item ? tinaField(item) : undefined}>
                <p
                  className="text-[70px] md:text-[90px] lg:text-[120px] leading-[100%] mb-5 font-medium "> {item?.text} </p>
                <p
                  className="text-black text-lg  lg:text-2xl font-normal leading-tight lg:leading-snug whitespace-nowrap">{item?.subtext} </p>

              </div>
            )}
          </div>
          <div
            ref={el => {
              if (el) {
                el.style.setProperty("transform", `translateX(calc(-100% + calc(${leftIndent} + ${lastItemWidth})))`, "important");
              }
            }}
            className={`absolute pin-wrap pin-wrap-fixed gap-12 lg:gap-[115px] pt-20 pb-10 lg:py-20 ${endAnimation ? "opacity-100" : "opacity-0"}`}
            style={{
              paddingLeft: leftIndent,
              position: "absolute",
              top: 0,
            }}>
            {(data ?? []).map((item, i) =>
              <div key={JSON.stringify(item)}
                   className={`${i === active ? "opacity-100" : "opacity-20"} transition-opacity duration-700 scroll-numbers-item`}
                   data-tina-field={item ? tinaField(item) : undefined}>
                <p
                  className="text-[70px] md:text-[90px] lg:text-[120px] leading-[100%] mb-5 font-medium "> {item?.text} </p>
                <p
                  className="text-black text-lg  lg:text-2xl font-normal leading-tight lg:leading-snug whitespace-nowrap">{item?.subtext} </p>

              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );

};