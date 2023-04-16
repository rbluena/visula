import { ReactNode, useEffect, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Controller, useForm } from "react-hook-form";
// import { XCircleIcon } from "@heroicons/react/24/outline";
import { DataType, ValidationItem } from "@/types";
import { Switch } from "@/components/form";
import { camelCase } from "lodash";

type FormProps = any;

type Props = {
  dataType?: DataType;
  fieldID: string;
  validations: ValidationItem[];
  validationDefaultValues: any;
  children: ReactNode;
  setUpdatedValidations?: Function;
  setFieldID: Function;
};

const ValidationsPopover = ({
  children,
  fieldID,
  validations,
  validationDefaultValues,
  setUpdatedValidations,
  setFieldID,
}: Props) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { isDirty, isValid },
  } = useForm<FormProps>({
    defaultValues: {
      fieldID,
      ...(validationDefaultValues && { ...validationDefaultValues }),
    },
  });

  function onSubmit(data: any) {
    if (isDirty && isValid) {
      setFieldID(camelCase(data.fieldID));
      delete data.fieldId;
      setUpdatedValidations?.(data);
    }

    setOpen(false);
  }

  useEffect(() => {
    setValue("fieldID", fieldID);
  }, [fieldID, setValue]);

  return (
    <Popover.Root modal open={open} onOpenChange={setOpen}>
      {children}

      {/* START: popover content container */}
      <Popover.Portal>
        <Popover.Content
          className="rounded p-5 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-1.5"
          >
            <p className="text-slate-700 text-[14px] leading-[19px] font-medium">
              Field ID
            </p>
            <input
              {...register("fieldID")}
              className="w-full p-1 inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet-800 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet-800 outline-none"
              placeholder="Change field ID"
              defaultValue={fieldID}
              onError={(error) => console.log(error)}
              required
              pattern="^\S*$"
            />
            <p className="text-slate-700 text-[14px] leading-[19px] font-medium mb-1">
              Validations
            </p>

            {/* START: Creating validations */}
            <div className="max-h-[120px] overflow-y-auto flex flex-col gap-1.5 pr-2 py-2">
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
                          return <Switch onChange={onChange} checked={value} />;
                        }}
                        name={validation.id}
                      />
                    ) : null}

                    {validation.type === "text" ? (
                      <input
                        {...register(validation.id)}
                        name={validation.id}
                        className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet-800 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet-800 outline-none"
                      />
                    ) : null}
                  </fieldset>
                );
              })}
            </div>
            {/* END: Creating validations */}

            <button
              type="submit"
              className="px-4 py-2 rounded  bg-slate-600 hover:bg-opacity-70 text-white text-sm leading-4"
            >
              Done
            </button>
          </form>

          {/* START: Main content */}
          {/* <Popover.Close
            className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default"
            aria-label="Close"
          >
            <XCircleIcon />
          </Popover.Close> */}
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
      {/* START: popover content container */}
    </Popover.Root>
  );
};

export default ValidationsPopover;
