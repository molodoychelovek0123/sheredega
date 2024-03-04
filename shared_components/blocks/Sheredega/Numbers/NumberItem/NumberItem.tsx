import { NumberItemProps } from "@/shared_components/blocks/Sheredega/Numbers/props";

export const NumberItem = (item: NumberItemProps) => {
  const { numberValue, numberUnit, text, className } = item;
  return (
    <div className={`text-black ${className ?? ""}`}>
      <div className=" flex flex-col gap-y-4  border-t-black border-t pt-7 md:pt-8 lg:pt-9">
        <div className="font-bold whitespace-nowrap">
          <span className="text-7xl md:text-8xl lg:text-8.5xl"> {numberValue}</span>
          <span className="text-4xl lg:text-5.5xl ml-3 lg:ml-4 ">{numberUnit}</span>
        </div>
        <div className="text-lg md:text-xl lg:text-2xl leading-[1.05em] md:leading-[1.05em] lg:leading-[1.05em]">
          {text}
        </div>
      </div>
    </div>
  );
};