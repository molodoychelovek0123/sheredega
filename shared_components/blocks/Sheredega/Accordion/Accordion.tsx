import { Container } from "@/shared_components/components/Container/container";
import { AccordionProps } from "@/shared_components/blocks/Sheredega/Accordion/props";
import { Collapse } from "@/shared_components/blocks/Sheredega/Accordion/Collapse/Collapse";
import { useEffect, useRef, useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { useAnimations } from "@/global/useAnimations";

const generateOpens = (number: number) => {
  return new Array(number).fill(false);
};

export const Accordion = ({ indent, uniquePath, customCss, collapses }: AccordionProps) => {
  const [showedOnce, setShowedOnce] = useState(false);
  const [opens, setOpens] = useState<boolean[]>(generateOpens((collapses ?? []).length));

  const ref = useRef<HTMLDivElement>(null);
  const { isVisible } = useAnimations(
    ref,
    "accordion-custom",
    "",
    false,
    false
  );
  useEffect(() => {
    if (opens.length != collapses.length) {
      setOpens(generateOpens(collapses.length));
    }
  }, [opens, collapses]);

  useEffect(() => {
    console.log(isVisible);
    if (isVisible && !showedOnce) {
      setOpens(prevState => [true, ...prevState.slice(1)]);
      setShowedOnce(true);
    }
  }, [isVisible, showedOnce]);


  return (
    <Container indent={indent} uniquePath={uniquePath} customCss={customCss}>
      <div ref={ref}>
        {collapses.map((item, index) => {
          const open = opens[index];
          const toggle = () => {
            const newOpens = [...opens];
            newOpens[index] = !newOpens[index];
            setOpens(newOpens);
          };
          const { text, title } = item;
          if (text && title) {
            return (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              <div key={item?._tina_metadata?.name ?? index} data-tina-field={tinaField(item)}>
                <Collapse isOpen={open} toggleOpen={toggle} text={text} title={title} />
              </div>
            );
          }
          return null;
        })}
      </div>
    </Container>
  );
};