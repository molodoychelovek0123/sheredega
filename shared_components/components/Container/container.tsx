import React from "react";
import md5 from "md5";
import { IndentFieldType } from "@/global/schemas/indent";
import { CustomCssTypeField } from "@/global/schemas/customCss";

type Props = {
  indent?: IndentFieldType;
  children: React.ReactNode;
  className?: string;
  uniquePath?: string
  customCss?: CustomCssTypeField,
  hide?: boolean,
  [key: string]: any
}
export const Container = ({
                            indent,
                            children,
                            className = "",
                            uniquePath,
                            customCss,
                            hide,
                            ...props
                          }: Props) => {
  const { desktopBottom, desktopTop, tabletBottom, tabletTop, mobileBottom, mobileTop } = indent ?? {};


  // Уникальный id
  const combination = `${desktopTop}-${desktopBottom}-${tabletTop}-${tabletBottom}-${mobileTop}-${mobileBottom}`;
  const propsCombination = props ? JSON.stringify({ ...props }) : "{}";

  const id = `container__${md5(`${combination} + ${propsCombination} + ${uniquePath}`)}`;
  // Уникальный id

  const styles = mobileTop || mobileBottom || tabletTop || tabletBottom || desktopTop || desktopBottom || customCss ? `
  .${id} {
    margin-top: ${mobileTop}px;
    margin-bottom: ${mobileBottom}px;
  }
  @media (min-width: 600px){
    .${id} {
      margin-top: ${tabletTop}px;
      margin-bottom: ${tabletBottom}px;
    }
  }
  @media (min-width: 1200px){
   .${id} {
      margin-top: ${desktopTop}px;
      margin-bottom: ${desktopBottom}px;
    }
  }
  
  ${(customCss?.data ?? "").replaceAll("selector", `.${id}`)}
  ` : "";

  return (
    <>
      {styles && <style dangerouslySetInnerHTML={{ __html: styles }} />}
      <div
        className={` w-full mx-auto ${!hide && "px-4 md:px-6 lg:px-10 xl:px-16 max-w-[1920px]"} ${className} ${id}`}
        {...props}
      >
        {children}
      </div>
    </>
  );
};
