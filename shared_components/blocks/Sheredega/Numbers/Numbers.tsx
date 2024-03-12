import { NumberProps } from "@/shared_components/blocks/Sheredega/Numbers/props";
import { Container } from "@/shared_components/components/Container/container";
import { useAnimations } from "@/global/useAnimations";
import Grid from "@/shared_components/components/Grid/Grid";
import { CSSProperties, useRef } from "react";
import cn from "@/global/utils/classnames";
import { NumberItem } from "./NumberItem/NumberItem";
import { tinaField } from "tinacms/dist/react";
import { defaultGrid } from "@/shared_components/components/Grid/constants";


export const Numbers = ({ numbers, indent, uniquePath, customCss, animation, grid = defaultGrid }: NumberProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { animationClass } = useAnimations(
    ref,
    animation?.type,
    animation?.speed,
    animation?.isScroll,
    animation?.showOnce
  );
  
  const {mobileColumns, tabletColumns, desktopColumns } = grid ?? defaultGrid;

  const tabletHalf = Math.ceil(Number(tabletColumns ?? 0) / 2);
  const desktopHalf = Math.ceil(Number(desktopColumns ?? 0) / 2);
  const contentGridStartClass = cn(
    "col-start-1",
    (tabletHalf <= 1) && "md:col-start-1",
    (tabletHalf === 2) && "md:col-start-2",
    (tabletHalf === 3) && "md:col-start-3",
    (tabletHalf >= 4) && "md:col-start-4",
    (desktopHalf <= 1) && "lg:col-start-1",
    (desktopHalf === 2) && "lg:col-start-2",
    (desktopHalf === 3) && "lg:col-start-3",
    (desktopHalf === 4) && "lg:col-start-4",
    (desktopHalf === 5) && "lg:col-start-5",
    (desktopHalf === 6) && "lg:col-start-6",
    (desktopHalf >= 7) && "lg:col-start-7",
    Number(tabletColumns) === 6 && "md:col-start-2",
    Number(mobileColumns) === 1 && "col-end-2",
    Number(mobileColumns) === 2 && "col-end-3",
    Number(tabletColumns) === 1 && "md:col-end-2",
    Number(tabletColumns) === 2 && "md:col-end-3",
    Number(tabletColumns) === 3 && "md:col-end-4",
    Number(tabletColumns) === 4 && "md:col-end-5",
    Number(tabletColumns) === 5 && "md:col-end-6",
    Number(tabletColumns) === 6 && "md:col-end-7",
    Number(desktopColumns) === 1 && "lg:col-end-2",
    Number(desktopColumns) === 2 && "lg:col-end-3",
    Number(desktopColumns) === 3 && "lg:col-end-4",
    Number(desktopColumns) === 4 && "lg:col-end-5",
    Number(desktopColumns) === 5 && "lg:col-end-6",
    Number(desktopColumns) === 6 && "lg:col-end-7",
    Number(desktopColumns) === 7 && "lg:col-end-8",
    Number(desktopColumns) === 8 && "lg:col-end-9",
    Number(desktopColumns) === 9 && "lg:col-end-10",
    Number(desktopColumns) === 10 && "lg:col-end-11",
    Number(desktopColumns) === 11 && "lg:col-end-12",
    Number(desktopColumns) === 12 && "lg:col-end-13"
  );


  return (
    <Container indent={indent} uniquePath={uniquePath} customCss={customCss}>
      <Grid ref={ref} {...grid} className="gap-x-5 gap-y-10">
        <div className={`${contentGridStartClass} flex flex-wrap`}>
          <Grid mobileColumns={2} tabletColumns={Number(tabletColumns) ? 3 : 2} desktopColumns={3}
                className={"gap-6 lg:gap-x-12 gap-y-10"}>
            {(numbers ?? []).map((item, index) => (
              <div
                key={`${item?.numberValue ?? ""}-${item?.text ?? ""}-${item?.numberUnit ?? ""}-${index}`}
                className={`animate__delay-1s ${animationClass}`}
                   style={{ "--animate-delay": `${index * 0.2}s` } as CSSProperties}
                   data-tina-field={item ? tinaField(item) : undefined}
              >
                <NumberItem key={index} {...item} />
              </div>
            ))}
          </Grid>

        </div>

      </Grid>
    </Container>
  );
};