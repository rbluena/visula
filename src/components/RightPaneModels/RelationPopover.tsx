import React from "react";
import * as Popover from "@radix-ui/react-popover";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { CheckIcon } from "@heroicons/react/24/outline";

type ConnModel = {
  id: string;
  unique: string;
  name: string;
};

type Props = {
  children: React.ReactNode;
  connectingModels: ConnModel[];
};
const RelationPopover = ({ children, connectingModels }: Props) => {
  return (
    <Popover.Root>
      {children}

      <Popover.Portal>
        <Popover.Content
          className="rounded p-5 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <div className="flex flex-col gap-2.5">
            <div>
              <p className="text-slate-700 text-[15px] leading-[19px] font-medium mb-2.5">
                Relation
              </p>
            </div>

            <ToggleGroup.Root type="single" className="space-y-4 divide-y-2">
              {connectingModels.map((model) => (
                <ToggleItem key={model.id} model={model}>
                  {/* <div className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-xs" />
                  </div>
                  <div className="flex flex-col items-start space-x-0">
                    <span className="block text-sm">{model.name}</span>
                    <span className="block text-[12px] text-slate-400">
                      {model.unique}
                    </span>
                  </div> */}
                </ToggleItem>
              ))}
            </ToggleGroup.Root>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default RelationPopover;

type ItemProps = {
  children: React.ReactNode;
  model: { id: string; unique: string; name: string };
};

const ToggleItem = React.forwardRef<any, ItemProps>(
  ({ children, model, ...props }, ref) => {
    return (
      <ToggleGroup.Item
        // className="text-[13px] leading-none text-violet-700 rounded-[3px] flex items-start h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-slate-700 data-[disabled]:pointer-events-none hover:outline-none data-[highlighted]:bg-violet-100 data-[highlighted]:text-white"
        className=""
        {...props}
        ref={ref}
        value={model.id}
        aria-label={model.name}
      >
        {children}
      </ToggleGroup.Item>
    );
  }
);

ToggleItem.displayName = "RationPopoverItem";
