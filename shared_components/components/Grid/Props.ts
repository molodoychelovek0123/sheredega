import { RefObject } from "react";

export type GridProps = {
  mobileColumns?: 1 | 2 | number | string;
  tabletColumns?: GridProps["mobileColumns"] | 3 | 4 | 5 | 6;
  desktopColumns?: GridProps["tabletColumns"] | 7 | 8 | 9 | 10 | 11 | 12;
  children?: React.ReactNode
  className?: string;
  ref?: RefObject<HTMLDivElement>
}