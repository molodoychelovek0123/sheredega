import { TinaMarkdownContent } from "tinacms/dist/rich-text";

export type CollapseProps = {
  title?: string | null,
  body?: TinaMarkdownContent | TinaMarkdownContent[] | null,
  isOpen?: boolean | null,
  toggleOpen?: () => void;
}
