import { useState } from "react";
import cn from "@/global/utils/classnames";

type Props = {
  options?: string[];
  value?: string[];
  onChange?: (value: string[]) => void
}

const PlusSvg = ({ active }: { active?: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    {!active && <line x1="6.7605" y1="3.27835e-08" x2="6.7605" y2="14" stroke="#B1B1B1" strokeWidth="1.5" />}
    <line y1="7.01526" x2="14" y2="7.01526" stroke={active ? "#000000" : "#B1B1B1"} strokeWidth="1.5" />
  </svg>
);

const OptionItem = ({ option, active, addOption, removeOption }: {
  option: string,
  active: boolean,
  addOption: (option: string) => void,
  removeOption: (option: string) => void
}) => (
  <div
    key={option}
    className="h-10 px-2.5 py-1  bg-white  border border-black border-opacity-20 justify-start items-center gap-2 inline-flex cursor-pointer rounded select-none"
    onClick={active ? () => removeOption(option) : () => addOption(option)}
  >
    <PlusSvg active={active} />
    <div
      className={cn("text-base lg:text-lg  leading-tight lg:leading-snug", active ? "text-black  font-medium" : "text-[#b0b0b0] font-normal")}>
      {option}
    </div>
  </div>
);

export const Filters = ({ options, value, onChange }: Props) => {
  const [localSave, setLocalSave] = useState<typeof options>([...(value ?? [])]);

  const removeAll = () => {
    setLocalSave(value ?? []);
    if (onChange) {
      onChange([]);
    }
  };
  const addAll = () => {
    if (onChange) {
      onChange(localSave ?? []);
    }
  };

  const addOption = (option: string) => {
    if (onChange) {
      onChange([...(value ?? []), option]);
    }
  };

  const removeOption = (option: string) => {
    if (onChange) {
      onChange((value ?? []).filter((item) => item !== option));
    }
  };
  return (
    <div className="relative flex gap-4 lg:gap-y-5 flex-wrap">
      <OptionItem option={"Все"} active={!(value ?? []).length}
                  addOption={removeAll}
                  removeOption={addAll} />
      {options?.map((option) => (
        <OptionItem
          key={JSON.stringify(option ?? null)}
          option={option} active={(value ?? []).includes(option)}
                    addOption={addOption}
                    removeOption={removeOption}
        />
      ))}
    </div>
  );
};