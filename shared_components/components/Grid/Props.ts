import { RefObject } from "react";

export type GridProps = {
  mobileColumns?: 1 | 2 | number | string | null;
  tabletColumns?: GridProps["mobileColumns"] | 3 | 4 | 5 | 6  | null;
  desktopColumns?: GridProps["tabletColumns"] | 7 | 8 | 9 | 10 | 11 | 12  | null;
  children?: React.ReactNode
  className?: string;
  id?: string;
  ref?: RefObject<HTMLDivElement> | null;
}