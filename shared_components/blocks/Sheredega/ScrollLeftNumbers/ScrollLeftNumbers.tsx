import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GridText } from "@/shared_components/blocks/Sheredega/GridText/GridText";
import { TinaMarkdownContent } from "tinacms/dist/rich-text";
import { animationFieldType } from "@/global/constants/animations";
import { tinaField } from "tinacms/dist/react";
import { useMotionValue, useSpring, motion } from "framer-motion";
import useResizeObserver from "@react-hook/resize-observer";
import { Container } from "@/shared_components/components/Container/container";

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

const DEFAULT_WIDTH = 150;
const GAP = 115;
export const ScrollLeftNumbers = ({ data = defailtData, textBlock }: Props) => {
  const x = useMotionValue(0);
  const springX = useSpring(x, { mass: 0.15 });

  const ref = useRef<HTMLDivElement>(null);
  const [componentSize, setComponentSize] = useState<number>(1920);
  const [active, setActive] = useState<number>(0);
  const [lastItemWidth, setLastItemWidth] = useState<number>(DEFAULT_WIDTH);
  const [scrollLeft, setScrollLeft] = useState(0);


  useResizeObserver(ref, (entry) => {
    setComponentSize(entry.contentRect?.width ?? 1920);
  });

  const onScroll = (event: WheelEvent) => {
    event.preventDefault();
    setScrollLeft(prev => prev + event.deltaY);
  };
  useEffect(() => {
    if (ref?.current) {
      const slider = ref.current;
      slider?.addEventListener("wheel", onScroll);
    }
    return () => {
      if (ref?.current) {
        const slider = ref.current;
        slider?.removeEventListener("wheel", onScroll);
      }
    };
  }, [ref]);


  const widths: number[] = useMemo(() => {
      if (ref.current && data && typeof window !== "undefined") {
        const flexContainerEl = ref.current.querySelector("div.motion-div");
        if (flexContainerEl) {
          setLastItemWidth(([...flexContainerEl.querySelectorAll("div")]?.[data.length - 1]?.clientWidth ?? 0));
          const widths = [...flexContainerEl.querySelectorAll("div")].map(item => item.clientWidth);
          return widths;
        }
        return [];
      } else {
        return Array.from({ length: data?.length ?? 0 }).fill(DEFAULT_WIDTH) as number[];
      }
    },
    [data, ref]);
  const scrollWidth: number = useMemo(() => {
      let summaryWidth = 0;
      widths.forEach((width) => {
        summaryWidth += width + GAP;
      });

      return summaryWidth - GAP;
    },
    [widths]);



  const getActiveIndex = (widthsArray: number[], gap: number, currentScroll: number) => {
    if (currentScroll === 0) return 0;
    if (currentScroll <= 25) return 0; // Костыль чисто, чтобы по кайфу было
    let totalWidth = 0;
    for (let i = 0; i < widthsArray.length; i++) {
      if (currentScroll > totalWidth && currentScroll <= totalWidth + widthsArray[i] + gap) {
        if (i + 1 < widthsArray.length) {
          return i + 1; // Индексы начинаются с 1, так как уже учтен случай с 0
        } else {
          return widthsArray.length - 1;
        }
      }
      totalWidth += widthsArray[i] + gap;
    }
    return widthsArray.length - 1; // Если значение currentScroll превышает сумму всех элементов и промежутков

  };

  const scrollTrigger = useCallback((currentScroll: number) => {
    const index = getActiveIndex(widths, GAP, currentScroll);
    setActive(index);
  }, [widths]);




  useEffect(() => {
    if ((componentSize ?? 0) > 900) {

      if (scrollLeft < 0) {
        setScrollLeft(0);
        setActive(0);
        x.set(0);
      } else {
        const maxAvailableScroll = scrollWidth - lastItemWidth;
        if (scrollLeft > maxAvailableScroll) {
          setScrollLeft(maxAvailableScroll);
          x.set(-maxAvailableScroll);
        } else {

          x.set(-scrollLeft);
        }
      }

      scrollTrigger(scrollLeft);
    }
  }, [scrollLeft]);

  return (
    <section className="mt-[100px]">
      {/*<style dangerouslySetInnerHTML={{ __html: style }} />*/}
      <div>
        {textBlock && <GridText textBlock={textBlock} />}
        <Container className={"overflow-hidden"}>
          <div className="relative w-full overflow-visible grid grid-cols-1  sm:grid-cols-6 gap-x-5 gap-y-10" ref={ref}>
            <motion.div
              className={`flex flex-nowrap motion-div max-w-full overflow-x-auto md:overflow-x-visible hide-scrollbar gap-12 lg:gap-[${GAP}px] pt-20 pb-10 lg:py-20 sm:col-start-3`}

              style={{
                x: springX
              }}
            >
              {(data ?? []).map((item, i) =>
                <div key={i}
                     className={`${i === active ? "opacity-100" : "opacity-20"} transition-opacity duration-700 scroll-numbers-item`}
                     data-tina-field={item ? tinaField(item) : undefined}>
                  <p
                    className="text-[70px] md:text-[90px] lg:text-[120px] leading-[100%] mb-5 font-medium "> {item?.text} </p>
                  <p
                    className="text-black text-lg  lg:text-2xl font-normal leading-tight lg:leading-snug whitespace-nowrap">{item?.subtext} </p>

                </div>
              )}
            </motion.div>

          </div>
        </Container>
      </div>
    </section>
  );

};