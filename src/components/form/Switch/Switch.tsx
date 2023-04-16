import React, { forwardRef } from "react";
import * as Switch from "@radix-ui/react-switch";

type Props = {
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
};

const SwitchComponent = forwardRef<any, Props>(
  ({ onChange, defaultChecked, checked, ...props }, ref) => {
    return (
      <Switch.Root
        ref={ref}
        {...props}
        onCheckedChange={onChange}
        defaultChecked={defaultChecked}
        checked={checked}
        className="w-[38px] h-[20px] bg-slate-300 rounded-full relative  data-[state=checked]:bg-slate-700 outline-none cursor-default"
      >
        <Switch.Thumb className="block w-[18px] h-[18px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
      </Switch.Root>
    );
  }
);

SwitchComponent.displayName = "";

// const SwitchComponent = ({ name, checked, onChange, ...props }: Props) => {
//   return (
//     <Switch.Root
//       name={name}
//       className="w-[42px] h-[25px] bg-slate-300 rounded-full relative  data-[state=checked]:bg-slate-700 outline-none cursor-default"
//       id={name}
//       onCheckedChange={onChange}
//       checked={checked}
//       {...props}
//       // style={{ "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)" }}
//     >
//       <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
//     </Switch.Root>
//   );
// };

export default SwitchComponent;
