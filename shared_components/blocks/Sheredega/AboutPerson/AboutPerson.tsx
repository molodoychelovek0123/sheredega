import Image from "next/image";
import { Container } from "@/shared_components/components/Container/container";
import cn from "@/global/utils/classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AboutPersonProps } from "@/shared_components/blocks/Sheredega/AboutPerson/props";
import { RichTextComponent } from "@/global/schemas/richTextFieldSchema";
import { TinaMarkdownContent } from "tinacms/dist/rich-text";

const defaultBody = {
  "type": "root",
  "children": [
    {
      "type": "p",
      "children": [
        {
          "text": "«"
        },
        {
          "text": "Наша миссия — развитие",
          "bold": true
        },
        {
          "text": " и преображение городских территорий."
        },
        {
          "type": "break",
          "children": [
            {
              "text": ""
            }
          ],
          "id": "kvnpc"
        },
        {
          "text": ""
        },
        {
          "type": "break",
          "children": [
            {
              "text": ""
            }
          ],
          "id": "v244t"
        },
        {
          "text": "\nПоиск центральной площадки для общегородских мероприятий»"
        }
      ],
      "id": 1709905191674
    }
  ]
} as any as TinaMarkdownContent;
const defaultPersonName = "Юрий Шередега";
const defaultPersonPosition = "Руководитель бюро";

const defaultBlockObject = {
  personName: defaultPersonName,
  personPosition: defaultPersonPosition,
  body: defaultBody
};

export const AboutPerson = ({
                              firstBlock,
                              secondBlock,
                              uniquePath,
                              customCss
                            }: AboutPersonProps) => {

  const { shiftLeft = 40, indentLeft = 38, shiftRight = 40, indentRight = 38 } = { ...firstBlock, ...secondBlock };
  console.log(firstBlock);
  const {
    personName: personNameFirst,
    personPosition: personPositionFirst,
    body: bodyFirst
  } = firstBlock ?? defaultBlockObject;
  const {
    personName: personNameSecond,
    personPosition: personPositionSecond,
    body: bodySecond
  } = secondBlock ?? defaultBlockObject;

  const [activeBlock, setActiveBlock] = useState<1 | 2>(1);

  const firstBlockRef = useRef<HTMLDivElement>(null);
  const secondBlockRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(720);
  const [screenHeight, setScreenHeight] = useState(1080);


  const [startPosition, setStartPosition] = useState(0);
  const [endPosition, setEndPosition] = useState(0);
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (firstBlockRef.current && secondBlockRef.current && containerRef.current) {
        if (typeof window !== "undefined" && typeof document !== "undefined") {
          setScreenHeight(window.innerHeight);
          const containerPageYOffset = window.scrollY + containerRef.current.getBoundingClientRect().top;
          const containerHeight = containerRef.current.offsetHeight;
          setStartPosition(containerPageYOffset);
          setEndPosition(containerPageYOffset + containerHeight);
        }
        const height1 = firstBlockRef.current.offsetHeight;
        const height2 = secondBlockRef.current.offsetHeight;
        if (height1 > height2) {
          setHeight(height1);
        } else {
          setHeight(height2);
        }
      }
    });
    if (firstBlockRef.current) {
      resizeObserver.observe(firstBlockRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [firstBlockRef, secondBlockRef]);


  const scrollTrigger = useCallback(
    (event) => {
      if (event.target.documentElement.scrollTop + screenHeight <= endPosition) {
        setActiveBlock(1);
      } else {
        setActiveBlock(2);
      }
    }, [startPosition, endPosition]);

  useEffect(() => {
    document.addEventListener("scroll", scrollTrigger);
    return () => document.removeEventListener("scroll", scrollTrigger);
  }, [scrollTrigger]);


  const myCustomCss = ` 
  ${customCss ? customCss : ""}
  
  
  @media (max-width: 600px) {
    selector .image-right{
      transform: translateX(${shiftRight}%)
    }
    selector .image-left{ 
      transform: translateX(-${shiftLeft}%)
    }
  }
  

  @media (max-width: 600px) and (min-width: 400px) {
      selector .text-section-right{
          margin-right: ${indentRight}%
    } 
    selector .text-section-left{
          margin-left: auto;
          margin-right: ${indentLeft}%
    }
  }
  `;
  return (
    <div className="h-[700px] flex justify-end items-end"
         style={{
           height: height * 1.2
         }} ref={containerRef}>
      <div className={"sticky bottom-0"} style={{ minHeight: height }}>
        <Container uniquePath={uniquePath} customCss={{ data: myCustomCss }} hide={true}
                   className="relative">
          <div
            ref={firstBlockRef} className="bg-[#f6f7fa] pt-15 sm:pt-0" onClick={() => setActiveBlock(2)}>

            <div
              className="flex flex-col-reverse sm:grid sm:grid-cols-2 bg-[#f6f7fa] px-4 lg:px-16 lg:pr-16 gap-x-16 overflow-hidden relative">
              <Image className="sm:pl-16 sm:pt-5 image image-right" src="/uploads/yuriy-sheredega-scale.png"
                     alt="yuriy-sheredega"
                     width={700}
                     height={925}
              />
              <div className="flex h-full justify-center items-center text-section text-section-right">
                <div
                  className={cn("flex-col justify-start items-start  inline-flex  top-0",
                    " 2xs:-mb-16 xs:mb-0",
                    "relative xs:absolute sm:relative",
                    "gap-7 xs:gap-4 md:gap-12",
                    "pl-0 xs:pl-4  sm:pl-0")}>
                  <div className=" ">
                    {bodyFirst && <span
                      className={cn("text-black  text-base  font-normal block ",
                        "md:text-2xl lg:text-4xl xl:text-4.5xl ",
                        "leading-[120%] lg:leading-[110%]",
                        "text-wrap-balance",
                        " rte-text ")}>
                <RichTextComponent body={bodyFirst} />
              </span>}
                  </div>
                  <div className="flex-col justify-start items-start gap-1.5 flex">
                    <div className="text-black  text-lg md:text-xl lg:text-2xl font-medium  leading-snug lg:leading-loose
             ">
                      {personNameFirst ?? defaultPersonName}
                    </div>
                    <div
                      className="opacity-40 text-black text-base md:text-lg font-normal  leading-tight lg:leading-snug">
                      {personPositionFirst ?? defaultPersonPosition}
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <div
            ref={secondBlockRef}
            className={cn(
              " bg-[#f6f7fa] pt-15 sm:pt-0",
              " z-20 absolute top-0 left-0 w-full h-full transition-all duration-300 opacity-100",
              activeBlock === 1 && "opacity-0 pointer-events-none"
            )} onClick={() => setActiveBlock(1)}>

            <div
              className="flex flex-col sm:grid sm:grid-cols-2 bg-[#f6f7fa] px-4 lg:px-16 lg:pr-16 gap-x-16 overflow-hidden relative">

              <div className="flex h-full justify-center items-center text-section text-section-left z-10">
                <div
                  className={cn("flex-col justify-start items-start  inline-flex  top-0",
                    " 2xs:-mb-16 xs:mb-0",
                    "relative xs:absolute sm:relative",
                    "gap-7 xs:gap-4 md:gap-12",
                    "pr-0 xs:pr-4  sm:pr-0",
                    "text-right items-end" // Стили для обратной карточки
                  )}>
                  <div className=" ">
                    {bodySecond &&
                      <span
                        className={cn("text-black  text-base  font-normal block ",
                          "md:text-2xl lg:text-4xl xl:text-4.5xl ",
                          "leading-[120%] lg:leading-[110%]",
                          "text-wrap-balance",
                          " rte-text ")}>

                <RichTextComponent body={bodySecond} />

                      </span>
                    }
                  </div>
                  <div className="flex-col justify-start items-start gap-1.5 flex">
                    <div className="text-black  text-lg md:text-xl lg:text-2xl font-medium  leading-snug lg:leading-loose
             ">

                      {personNameSecond ?? defaultPersonName}
                    </div>
                    <div
                      className="opacity-40 text-black text-base md:text-lg font-normal  leading-tight lg:leading-snug">

                      {personPositionSecond ?? defaultPersonPosition}
                    </div>
                  </div>
                </div>
              </div>

              <Image className="sm:pr-16 sm:pt-5 image image-left" src="/uploads/yuriy-sheredega-scale.png"
                     alt="yuriy-sheredega"
                     width={700}
                     height={925}
              />

            </div>

          </div>
        </Container></div>
    </div>
  );
};


/*
 <div className="flex-col justify-start items-start gap-8 inline-flex">
        <div className="w-96">
          <span
            className="text-black text-4xl font-medium leading-10">«Наша миссия — развитие</span>

          <span className="text-black text-4xl font-normal leading-10">и преображение городских территорий.<br /><br />Поиск центральной для общегородских мероприятий»</span>
        </div>
        <div className="text-black text-2xl font-medium leading-loose">Юрий Шередега</div>
        <div className="opacity-40 text-black text-lg font-normal leading-snug">Руководитель
          бюро
        </div>
      </div>
 */
