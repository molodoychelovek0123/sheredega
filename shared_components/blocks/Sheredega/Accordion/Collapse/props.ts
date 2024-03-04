import { TinaMarkdownContent } from "tinacms/dist/rich-text";

export type CollapseProps = {
  title?: string, text?: TinaMarkdownContent | TinaMarkdownContent[], isOpen?: boolean, toggleOpen?: () => void;
}
