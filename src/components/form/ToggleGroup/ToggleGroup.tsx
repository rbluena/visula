import { ReactNode } from "react";
import * as ToggleGroupComponent from "@radix-ui/react-toggle-group";

type ToggleItem = {
  icon?: ReactNode;
  label: string;
  value: string;
  aria?: string;
};

type Props = {
  onChange: () => void;
  items?: ToggleItem[];
  defaultValue?: string;
  value?: string;
};

const ToggleGroup = ({ onChange, defaultValue, value, items = [] }: Props) => {
  return (
    <ToggleGroupComponent.Root
      className="inline-flex bg-slate-300 rounded space-x-px p-1 text-sm"
      type="single"
      aria-label="Choose model editor"
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
    >
      {items.map((toggleItem) => (
        <ToggleGroupComponent.Item
          className="py-1 px-3 rounded flex items-center text-base leading-4 data-[state=on]:bg-white data-[state=on]:text-slate-800 focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
          key={toggleItem.value}
          value={toggleItem.value}
          aria-label={toggleItem.aria}
        >
          {toggleItem?.icon}
          {toggleItem?.label}
        </ToggleGroupComponent.Item>
      ))}
    </ToggleGroupComponent.Root>
  );
};

export default ToggleGroup;
