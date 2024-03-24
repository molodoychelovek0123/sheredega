import { CardItem } from "@/shared_components/blocks/Sheredega/CardsGrid/CardItem/CardItem";

type Props = {
  title: string | null;
  titleMap?: string | null;
  titleList?: string | null;
  heroImg?: string | null;
  filename?: string | null;
  hide?: boolean | null;
}

export const ProjectsItem = ({
                               title,
                               titleMap,
                               titleList,
                               heroImg = "https://via.placeholder.com/307x307",
                               filename,
                               hide
                             }: Props) => {
  return (
    <CardItem text={titleList ?? titleMap ?? title ?? undefined} image={heroImg ?? "https://via.placeholder.com/307x307"}
              url={`/projects/${filename ?? ""}`} hide={hide ?? undefined} />
  );
};