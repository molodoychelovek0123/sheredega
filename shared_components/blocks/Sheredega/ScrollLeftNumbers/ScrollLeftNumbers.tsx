import { useCallback, useEffect, useRef, useState } from "react";
import { GridText } from "@/shared_components/blocks/Sheredega/GridText/GridText";
import { TinaMarkdownContent } from "tinacms/dist/rich-text";
import { animationFieldType } from "@/global/constants/animations";
import { tinaField } from "tinacms/dist/react";
import { useMotionValue, useSpring, motion } from "framer-motion";
import useResizeObserver from "@react-hook/resize-observer";

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

export const ScrollLeftNumbers = ({ data = defailtData, textBlock }: Props) => {

  const SPRING_CONFIG = { damping: 500, stiffness: 400 };
  const x = useMotionValue(0);
  const springX = useSpring(x, { mass: 0.15 });
  const endAnimation = false;

  const ref = useRef<HTMLDivElement>(null);
  const [componentSize, setComponentSize] = useState<number>(1920);
  const [leftIndent, setLeftIndent] = useState<string>("35%");
  const [active, setActive] = useState<number>(0);
  const sectionHeight = "500vh";
  const [lastItemWidth, setLastItemWidth] = useState<string>("0px");
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


  const scrollTrigger = useCallback(
    () => {
      if (ref.current && data && typeof window !== "undefined") {
        const flexContainerEl = ref.current.querySelector("div.motion-div");
        if (flexContainerEl) {
          const boundingClientRect = flexContainerEl.getBoundingClientRect();
          const leftPosition = boundingClientRect.x;

          const positions = [...flexContainerEl.querySelectorAll("div")].map(item => item.getBoundingClientRect().x);
          const leftIndentValue = Number(leftIndent.replaceAll("px", "").replaceAll("#", ""));

          setLastItemWidth(`${([...flexContainerEl.querySelectorAll("div")]?.[data.length - 1]?.getBoundingClientRect()?.width ?? "0")}px`);

          const index = positions.findIndex(item => item + 20 > leftIndentValue);


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

    }
  }, [componentSize]);


  useEffect(() => {
    if((componentSize ?? 0) > 900) {
      // const maxScroll = (-1 * (ref.current?.clientWidth ?? 0)) + Number(leftIndent.replaceAll("px", "")) + Number(lastItemWidth.replaceAll("px", ""));
      // console.log( Number(leftIndent.replaceAll("px", "")),Number(lastItemWidth.replaceAll("px", "")),  (-1 * (ref.current?.clientWidth ?? 0))  , -1 * scrollLeft);
      // console.log(( Number(leftIndent.replaceAll("px", "")) + Number(lastItemWidth.replaceAll("px", "")) / 2)*2 )
      if (componentSize > 1200) {
        const calc = (Number(leftIndent.replaceAll("px", "")) + Number(lastItemWidth.replaceAll("px", "")) / 2) * 2;
        const scrollTo = scrollLeft < calc ? scrollLeft : calc;
        const scrollTo2 = scrollTo > 0 ? scrollTo : 0;
        x.set(-scrollTo2);
      } else {
        const calc = componentSize;
        const scrollTo = scrollLeft < calc ? scrollLeft : calc;

        const scrollTo2 = scrollTo > 0 ? scrollTo : 0;
        x.set(-scrollTo2);
      }

      scrollTrigger();
    }
  }, [scrollLeft]);

  return (
    <section className="mt-[100px]">
      {/*<style dangerouslySetInnerHTML={{ __html: style }} />*/}
      <div>
        {textBlock && <GridText textBlock={textBlock} />}
        <div className="relative w-full overflow-hidden" ref={ref}>
          <motion.div
            className={`flex flex-nowrap motion-div max-w-full overflow-x-auto sm:overflow-x-visible hide-scrollbar gap-12 lg:gap-[115px] pt-20 pb-10 lg:py-20  `}

            style={{
              x: springX,
              paddingLeft: leftIndent
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
      </div>
    </section>
  );

};