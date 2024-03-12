import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import cn from "@/global/utils/classnames";

type Props = {
  text?: string | null;
  subtext?: string | null;
  image: string;
  url?: string | null;
  hide?: boolean | null;
  "data-tina-field"?: any;
}

export const CardItem = ({
                           text,
                           subtext,
                           image,
                           url,
                           hide,
                           "data-tina-field": tinaField
                         }: Props) => {
  const [className, setClassName] = useState("");
  useEffect(() => {
    if (hide) {
      setClassName("opacity-0");
      setTimeout(() => setClassName(cn("opacity-0", "hidden")), 700);
    } else {
      setClassName(cn("opacity-0"));
      setTimeout(() => setClassName("opacity-100"), 700);
    }
  }, [hide]);

  return (
    <motion.a
      layout
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      className={`flex-col justify-start items-start gap-5 inline-flex transition-opacity duration-700 ${className}`}
      href={url ?? undefined}
    data-tina-field={tinaField}>
      <div className="w-full pt-[100%]  relative">
        <img className="absolute top-0 left-0 w-full h-full" src={image} alt={`${text} - ${subtext}`} />
      </div>
      <div className="flex-col justify-start items-start gap-1 inline-flex transition-opacity duration-700 ">
        {text &&
          <div className="text-black  text-base  lg:text-lg   leading-tight lg:leading-snug  font-medium">{text}</div>}

        {subtext &&
          <div
            className="opacity-40 text-black text-base  lg:text-lg leading-tight lg:leading-snug font-normal">{subtext}</div>}
      </div>
    </motion.a>
  );
};