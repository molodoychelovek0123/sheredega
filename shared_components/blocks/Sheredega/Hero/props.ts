import { TitleProps } from "../../../components/Title/Props";
import { MyImageProps } from "@/shared_components/utils/imageDefaultSchema";

type Block = {
  __typename?: Block;
  [key: string]: unknown;
}

export type HeroProps = {
  block?: any | null;
  images?: (MyImageProps)[] | null;
  title?: Omit<TitleProps, "children"> & {
    heading?: string | null
  } | null;
  tint?: boolean | null;

}