import { ReactNode, useEffect, useState, useRef } from "react";
import camelCase from "lodash/camelCase";
import omitBy from "lodash/omitBy";
import isNil from "lodash/isNil";
import * as Popover from "@radix-ui/react-popover";
import { Controller, useForm } from "react-hook-form";
import { DataType, ValidationItem } from "@/types";
import { Switch } from "@/components/form";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

type FormProps = any;

type Props = {
  dataType?: DataType;
  fieldId: string;
  validationInputsData: ValidationItem[];
  validationValues: any;
  children: ReactNode;
  updateFieldData: Function;
};

const ValidationsPopover = ({
  children,
  fieldId,
  updateFieldData,
  validationInputsData,
  validationValues,
}: Props) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { isValid },
  } = useForm<FormProps>({
    defaultValues: {
      fieldId,
      ...validationValues,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  /**
   *
   * @param data
   */
  function onSubmit(data: any) {
    if (isValid) {
      updateFieldData({
        fieldId: camelCase(data.fieldId),
        validations: {
          ...omitBy({ ...omitBy(data, (value) => value?.length === 0) }, isNil),
        },
      });

      setOpen(false);
    }
  }

  /**
   * Submitting the form when popover is closed
   * @param value
   * @returns
   */
  function onOpenChange(value: boolean) {
    if (value === true) {
      setOpen(value);
      return;
    }

    buttonRef.current?.click();
  }

  useEffect(() => {
    setValue("fieldId", fieldId);
  }, [fieldId, setValue]);

  return (
    <Popover.Root modal open={open} onOpenChange={onOpenChange}>
      {children}

      {/* START: popover content container */}
      <Popover.Portal>
        <Popover.Content
          className="rounded p-5 mr-4 w-[250px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={2}
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-1.5"
          >
            <label
              htmlFor="fieldId"
              className="text-slate-700 text-[14px] leading-[19px] font-medium"
            >
              Field ID
            </label>
            <input
              {...register("fieldId")}
              id="fieldId"
              className="w-full p-1 inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet-800 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet-800 outline-none"
              placeholder="Change field ID"
              defaultValue={fieldId}
              required
              pattern="^\S*$"
            />
            <p className="text-slate-700 text-[14px] font-medium">
              Validations
            </p>

            {/* START: Creating validations */}
            <div className="w-full flex flex-col gap-2 pr-2 py-2">
              {validationInputsData.map((validationInput) => {
                return (
                  <fieldset
                    key={validationInput.id}
                    className="flex gap-2 items-center"
                  >
                    <label
                      className="text-xs text-violet-700 w-[75px] inline-flex gap-1"
                      htmlFor={validationInput.id}
                      title={validationInput.description}
                    >
                      {validationInput.name}
                      <span className="inline-block">
                        <InformationCircleIcon className="h-5 w-5 inline-block" />
                      </span>
                    </label>

                    {validationInput.type === "boolean" ? (
                      <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => {
                          return <Switch onChange={onChange} checked={value} />;
                        }}
                        name={validationInput.id}
                      />
                    ) : null}

                    {validationInput.type === "text" ||
                    validationInput.type === "number" ||
                    validationInput.type === "date" ? (
                      <>
                        <input
                          {...register(validationInput.id)}
                          id={validationInput.id}
                          type={validationInput.type}
                          name={validationInput.id}
                          min={0}
                          className="w-full items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet-800 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet-800 outline-none"
                        />
                      </>
                    ) : null}
                  </fieldset>
                );
              })}
            </div>
            {/* END: Creating validations */}

            <button
              ref={buttonRef}
              type="submit"
              disabled={!isValid}
              className="px-4 py-2 hidden rounded  bg-slate-800 hover:bg-opacity-70 disabled:bg-slate-400 disabled:opacity-30 text-white text-sm leading-4"
            >
              Done
            </button>
          </form>

          {/* START: Main content */}
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
      {/* START: popover content container */}
    </Popover.Root>
  );
};

export default ValidationsPopover;
