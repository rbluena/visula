import React from "react";
import Selector, { Props as SelectProps } from "react-select";

const formatGroupLabel = (data: any) => (
  <div className="flex justify-between items-center bg-slate-100">
    <span className="text-[12px] text-slate-600 font-semibold">
      {data.label}
    </span>
    <span className="rounded-full text-white bg-slate-500 w-4 h-4 text-center font-semibold">
      {data.options.length}
    </span>
  </div>
);

type Props = SelectProps & {
  label?: string;
};

const Select = React.forwardRef<any, Props>(
  ({ id, label, ...rest }, forwardRef) => {
    return (
      <div className="my-2 flex flex-col">
        {label ? (
          <label htmlFor={id} className="text-sm mb-1.5 text-slate-600">
            {label}
          </label>
        ) : null}
        <Selector
          ref={forwardRef}
          classNames={{
            container: () =>
              `min-w-[150px] border rounded-sm bg-slate-50 border-indigo-300`,
            valueContainer: () => "text-xs text-black",
            indicatorsContainer: () => "p-[0px]",
            placeholder: () => "text-sm p-0",
            option: () => `p-0`,
            menuList: () => "text-xs p-0",
            menu: () => "p-0",
          }}
          styles={{
            container: (base) => ({
              ...base,
              // backgroundColor: "green",
              padding: 0,
            }),
            indicatorsContainer: (base) => ({ ...base, padding: 0, margin: 0 }),
            indicatorSeparator: (base) => ({ ...base, padding: 0, margin: 0 }),
            valueContainer: (base) => ({ ...base, padding: 0, margin: 0 }),
            control: () => ({
              // ...base,
              display: "flex",
              minHeight: "auto",
              padding: 0,
              margin: 0,
            }),
            menu: (base, another) => {
              console.log(base, another);
              return { ...base };
            },
          }}
          isClearable
          isSearchable
          formatGroupLabel={formatGroupLabel}
          {...rest}
        />
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
