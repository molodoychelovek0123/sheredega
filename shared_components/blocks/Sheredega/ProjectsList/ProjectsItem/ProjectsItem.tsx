import { CardItem } from "@/shared_components/blocks/Sheredega/CardsGrid/CardItem/CardItem";

type Props = {
  title: string | null;
  heroImg?: string | null;
  filename?: string | null;
  hide?: boolean | null;
}

export const ProjectsItem = ({ title, heroImg = "https://via.placeholder.com/307x307", filename, hide }: Props) => {
  return (
    <CardItem text={title ?? undefined} image={heroImg ?? "https://via.placeholder.com/307x307"}
              url={`/projects/${filename ?? ""}`} hide={hide ?? undefined} />
  );
};