import React, { ForwardRefRenderFunction, forwardRef } from "react";
import { GridProps } from "./Props";
import cn from "@/global/utils/classnames";


const Grid: ForwardRefRenderFunction<HTMLDivElement, GridProps> =
  ({
     mobileColumns = 2,
     tabletColumns = 6,
     desktopColumns = 6,
     children,
     id,
     className
   }, ref) => {
    const mobileColumnsStyle = cn(
      Number(mobileColumns) === 1 && "grid-cols-1",
      Number(mobileColumns) === 2 && "grid-cols-2"
    );

    const tabletColumnsStyle = cn(
      Number(tabletColumns) === 1 && "md:grid-cols-1",
      Number(tabletColumns) === 2 && "md:grid-cols-2",
      Number(tabletColumns) === 3 && "md:grid-cols-3",
      Number(tabletColumns) === 4 && "md:grid-cols-4",
      Number(tabletColumns) === 5 && "md:grid-cols-5",
      Number(tabletColumns) === 6 && "md:grid-cols-6"
    );

    const desktopColumnsStyle = cn(
      Number(desktopColumns) === 1 && "lg:grid-cols-1",
      Number(desktopColumns) === 2 && "lg:grid-cols-2",
      Number(desktopColumns) === 3 && "lg:grid-cols-3",
      Number(desktopColumns) === 4 && "lg:grid-cols-4",
      Number(desktopColumns) === 5 && "lg:grid-cols-5",
      Number(desktopColumns) === 6 && "lg:grid-cols-6",
      Number(desktopColumns) === 7 && "lg:grid-cols-7",
      Number(desktopColumns) === 8 && "lg:grid-cols-8",
      Number(desktopColumns) === 9 && "lg:grid-cols-9",
      Number(desktopColumns) === 10 && "lg:grid-cols-10",
      Number(desktopColumns) === 11 && "lg:grid-cols-11",
      Number(desktopColumns) === 12 && "lg:grid-cols-12"
    );


    return (
      <div className={`grid  ${mobileColumnsStyle} ${tabletColumnsStyle} ${desktopColumnsStyle} ${className}`}
           ref={ref}
           id={id}>
        {children}
      </div>
    );
  };


export default forwardRef(Grid);