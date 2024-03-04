import { TitleProps } from "../../../components/Title/Props";

type Block =  {
    __typename?: Block;
    [key: string]: unknown;
  }

export type HeroProps = {
  block?: any;
  images?: {
   src?: string;
   alt?: string
  }[]
  title?: Omit<TitleProps, 'children'> & {
    heading?: string
  }

}