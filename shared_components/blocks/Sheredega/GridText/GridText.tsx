import Grid from "../../../components/Grid/Grid";
import { GridTextProps } from "./Props";
import React, { useRef } from "react";
import { tinaField } from "tinacms/dist/react";
import cn from "@/global/utils/classnames";
import { Container } from "@/shared_components/components/Container/container";
import { useAnimations } from "@/global/useAnimations";
import { RichTextComponent } from "@/global/schemas/richTextFieldSchema";


export const GridText = ({ block, grid, textBlock, indent, uniquePath, customCss, customComponent }: GridTextProps) => {

  const {
    textStart = "3",
    fontSize: fontSizeFromProps,
    body,
    title,
    hideTitleOnMobile = false,
    animation
  } = textBlock ?? {};

  const fontSize = typeof fontSizeFromProps === "string" ? fontSizeFromProps : "40";

  const classes = cn(
    Number(textStart) === 1 && "col-start-1",
    Number(textStart) === 2 && "col-start-1 md:col-start-2",
    Number(textStart) === 3 && "col-start-1 md:col-start-2 lg:col-start-3",
    Number(grid?.mobileColumns ?? 0) === 1 && "col-end-2",
    Number(grid?.mobileColumns ?? 2) === 2 && "col-end-3",
    Number(grid?.tabletColumns ?? 0) === 1 && "md:col-end-2",
    Number(grid?.tabletColumns ?? 0) === 2 && "md:col-end-3",
    Number(grid?.tabletColumns ?? 0) === 3 && "md:col-end-4",
    Number(grid?.tabletColumns ?? 0) === 4 && "md:col-end-5",
    Number(grid?.tabletColumns ?? 0) === 5 && "md:col-end-6",
    Number(grid?.tabletColumns ?? 6) === 6 && "md:col-end-7",
    Number(grid?.desktopColumns ?? 0) === 1 && "lg:col-end-2",
    Number(grid?.desktopColumns ?? 0) === 2 && "lg:col-end-3",
    Number(grid?.desktopColumns ?? 0) === 3 && "lg:col-end-4",
    Number(grid?.desktopColumns ?? 0) === 4 && "lg:col-end-5",
    Number(grid?.desktopColumns ?? 0) === 5 && "lg:col-end-6",
    Number(grid?.desktopColumns ?? 6) === 6 && "lg:col-end-7",
    Number(grid?.desktopColumns ?? 0) === 7 && "lg:col-end-8",
    Number(grid?.desktopColumns ?? 0) === 8 && "lg:col-end-9",
    Number(grid?.desktopColumns ?? 0) === 9 && "lg:col-end-10",
    Number(grid?.desktopColumns ?? 0) === 10 && "lg:col-end-11",
    Number(grid?.desktopColumns ?? 0) === 11 && "lg:col-end-12",
    Number(grid?.desktopColumns ?? 0) === 12 && "lg:col-end-13",
    Number(fontSize) === 22 && "text-[18px] md:text-xl lg:text-[22px] ",
    Number(fontSize) === 30 && "text-[18px] md:text-2xl lg:text-3xl ",
    Number(fontSize) === 40 && "text-[22px] md:text-3xl lg:text-4.5xl "
  );
  const titleClasses = cn(
    Number(textStart) === 1 && "col-end-1",
    Number(textStart) === 2 && "col-end-1 md:col-end-2",
    Number(textStart) === 3 && "col-end-1 md:col-end-2 lg:col-end-3",
    hideTitleOnMobile && "hidden md:block",
    Number(fontSize) === 22 && "text-[26px]  sm:text-3xl md:text-[32px] ",
    Number(fontSize) === 30 && "text-[26px]  sm:text-3xl md:text-[32px]  ",
    Number(fontSize) === 40 && " text-2xl md:text-3xl lg:text-4.5xl"
  );

  const textBlockRef = useRef<HTMLDivElement>(null);
  const { animationClass: textBlockAnimationClass } = useAnimations(
    textBlockRef,
    animation?.type,
    animation?.speed,
    animation?.isScroll,
    animation?.showOnce
  );

  /*

   */
  return (
    <Container indent={indent} uniquePath={uniquePath} customCss={customCss}>
      <Grid {...grid} ref={textBlockRef} className="gap-x-5 gap-y-10">
        {title &&
          (<h2
            className={`${titleClasses} ${textBlockAnimationClass}  leading-[1.1em]  font-medium col-start-1 md:block`}

          >
            <span className="text-inner" data-tina-field={block ? tinaField(block, "textBlock.title") : undefined}>
              {title}
            </span>
          </h2>)
        }
        {textBlock && body ?
          <div className={`${classes} ${textBlockAnimationClass}  rte-text leading-[1.3em]`}
               data-tina-field={tinaField(block, "textBlock")}>
            <RichTextComponent body={body} />
          </div>
          : null
        }
        {customComponent && <div className={`${classes} ${textBlockAnimationClass} `}>
          {customComponent}
        </div>}
        {/*{animatedText &&*/}
        {/*  <p className={`${startIndexClassName[animatedText.textStart]}`}*/}
        {/*     data-tina-field={tinaField(block, "animatedBlock")}>*/}
        {/*    {animatedText.body}*/}
        {/*  </p>*/}
        {/*}*/}
      </Grid>
    </Container>
  );
};

