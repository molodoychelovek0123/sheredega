import { Container } from "@/shared_components/components/Container/container";
import { BaseSectionProps } from "@/shared_components/blocks/Sheredega/constants";

export const Divider = ({uniquePath}: BaseSectionProps) => {
  return <Container uniquePath={uniquePath}>
    <div className="w-full h-px opacity-20 bg-black" />
  </Container>;
};