import React from "react";
import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const TextInput = React.forwardRef<any, Props>(
  ({ id, label, ...rest }, forwardRef) => {
    return (
      <div className="my-2 space-x-2 flex items-center">
        {label ? (
          <label htmlFor={id} className="w-fit whitespace-nowrap min-w-[70px]">
            {label}
          </label>
        ) : null}
        <input
          id={id}
          type="text"
          ref={forwardRef}
          className="w-full p-1 rounded-md border-0 text-sm leading-5 ring-1 ring-inset ring-gray-300 focus:ring-1"
          {...rest}
        />
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

// const TextInput = ({ label, name, ...rest }: Props) => {
//   return (
//     <div>
//       <label
//         htmlFor={name}
//         className="block text-sm font-medium leading-6 text-slate-900"
//       >
//         {label}
//       </label>
//       <input
//         id={name}
//         type="text"
//         {...rest}
//         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//       />
//     </div>
//   );
// };

export default TextInput;
