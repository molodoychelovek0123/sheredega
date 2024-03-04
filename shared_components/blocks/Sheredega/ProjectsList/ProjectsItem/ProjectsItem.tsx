import { CardItem } from "@/shared_components/blocks/Sheredega/CardsGrid/CardItem/CardItem";

type Props = {
  title: string;
  heroImg?: string;
  filename?: string;
  hide?: boolean;
}

export const ProjectsItem = ({ title, heroImg = "https://via.placeholder.com/307x307", filename, hide }: Props) => {
  return (
    <CardItem text={title} image={heroImg} url={`/projects/${filename}`} hide={hide} />
  );
};