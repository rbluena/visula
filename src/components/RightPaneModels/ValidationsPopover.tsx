import { FormEvent, ReactNode } from "react";
import * as Popover from "@radix-ui/react-popover";
import { XCircleIcon } from "@heroicons/react/24/outline";
import useFieldValidations from "@/lib/client/hooks/useFieldValidations";
import { DataTypes } from "@/types";
import { Switch } from "@/components/form";
import { Controller, useForm } from "react-hook-form";

type Props = {
  dataType: DataTypes;
  children: ReactNode;
  modelId: string;
  fieldId: string;
};
const ValidationsPopover = ({ children, dataType }: Props) => {
  const { validations } = useFieldValidations(dataType);
  const { register, handleSubmit, control } = useForm();

  function onSubmit(data: any) {
    // const formData = new FormData(evt.target);

    console.log(data);

    // console.log(evt.target);
  }

  return (
    <Popover.Root>
      {children}

      {/* START: popover content container */}
      <Popover.Portal>
        <Popover.Content
          className="rounded p-5 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2.5"
          >
            <p className="text-slate-700 text-[15px] leading-[19px] font-medium">
              Field ID
            </p>
            <input
              {...register("fieldId")}
              className="w-full p-2 inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet-800 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet-800 outline-none"
              // defaultValue={validation.default}
              pattern="^\S*$"
              placeholder="Change field ID"
            />
            <p className="text-slate-700 text-[15px] leading-[19px] font-medium mb-2.5">
              Validations
            </p>
            {validations.map((validation) => {
              return (
                <fieldset
                  key={validation.id}
                  className="flex gap-5 items-center"
                >
                  <label
                    className="text-[13px] text-violet-700 w-[75px]"
                    htmlFor={validation.id}
                  >
                    {validation.name}
                  </label>
                  {validation.type === "boolean" ? (
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => {
                        console.log(value);

                        return (
                          <Switch
                            onChange={onChange}
                            defaultCheck={false}
                            checked={value}
                          />
                        );
                      }}
                      name={validation.id}
                    />
                  ) : null}
                  {validation.type === "text" ? (
                    <input
                      {...register(validation.id)}
                      name={validation.id}
                      className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet-800 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet-800 outline-none"
                      defaultValue={validation.default}
                    />
                  ) : null}

                  {/* <input
                    className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                    id="width"
                    defaultValue="100%"
                  /> */}
                </fieldset>
              );
            })}

            <button
              type="submit"
              className="px-4 py-2 rounded mt-4 bg-slate-600 hover:bg-opacity-70 text-white text-sm leading-4"
            >
              Done
            </button>
          </form>
          {/* START: Main content */}
          {/* <div className="flex flex-col gap-2.5">
            <p className="text-slate-700 text-[15px] leading-[19px] font-medium mb-2.5">
              Validations
            </p>
            <fieldset className="flex gap-5 items-center">
              <label
                className="text-[13px] text-violet-700 w-[75px]"
                htmlFor="width"
              >
                Width
              </label>
              <input
                className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                id="width"
                defaultValue="100%"
              />
            </fieldset>
            <fieldset className="flex gap-5 items-center">
              <label
                className="text-[13px] text-violet11 w-[75px]"
                htmlFor="maxWidth"
              >
                Max. width
              </label>
              <input
                className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                id="maxWidth"
                defaultValue="300px"
              />
            </fieldset>
            <fieldset className="flex gap-5 items-center">
              <label
                className="text-[13px] text-violet11 w-[75px]"
                htmlFor="height"
              >
                Height
              </label>
              <input
                className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                id="height"
                defaultValue="25px"
              />
            </fieldset>
            <fieldset className="flex gap-5 items-center">
              <label
                className="text-[13px] text-violet11 w-[75px]"
                htmlFor="maxHeight"
              >
                Max. height
              </label>
              <input
                className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                id="maxHeight"
                defaultValue="none"
              />
            </fieldset>
          </div> */}

          {/* START: Main content */}
          <Popover.Close
            className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default"
            aria-label="Close"
          >
            <XCircleIcon />
          </Popover.Close>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
      {/* START: popover content container */}
    </Popover.Root>
  );
};

export default ValidationsPopover;
