import { Container } from "@/shared_components/components/Container/container";
import { AccordionProps } from "@/shared_components/blocks/Sheredega/Accordion/props";
import { Collapse } from "@/shared_components/blocks/Sheredega/Accordion/Collapse/Collapse";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { useAnimations } from "@/global/useAnimations";

const generateOpens = (number = 0) => {
  return new Array(number).fill(false);
};

export const Accordion = ({ indent, uniquePath, customCss, collapses }: AccordionProps) => {
  const [showedOnce, setShowedOnce] = useState(false);
  const [opens, setOpens] = useState<boolean[]>(generateOpens((collapses ?? []).length));

  const ref = useRef<HTMLDivElement>(null);
  const { isVisible, animationClass } = useAnimations(
    ref,
    "fadeIn",
    "",
    false,
    true
  );
  useEffect(() => {
    if (opens.length != (collapses?.length)) {
      setOpens(generateOpens((collapses?.length)));
    }
  }, [opens, collapses]);

  useEffect(() => {
    if (isVisible && !showedOnce) {
      setOpens(prevState => [true, ...prevState.slice(1)]);
      setShowedOnce(true);
    }
  }, [isVisible, showedOnce]);


  return (
    <Container indent={indent} uniquePath={uniquePath} customCss={customCss}>
      <div ref={ref}>
        {(collapses ?? []).map((item, index) => {
          const open = opens[index];
          const toggle = () => {
            const newOpens = [...opens];
            newOpens[index] = !newOpens[index];
            setOpens(newOpens);
          };
          if (item) {
            const { body, title } = item;
            if (body && title) {
              return (
                <div className={`text-wrap-balance ${animationClass} animate__delay-1s`}
                     key={JSON.stringify(item) + index} data-tina-field={tinaField(item)}
                     style={{ "--animate-delay": `${index * 0.2}s` } as CSSProperties}>
                  <Collapse isOpen={open} toggleOpen={toggle} body={body} title={title} />
                </div>
              );
            }
          }
          return null;
        })}
      </div>
    </Container>
  );
};