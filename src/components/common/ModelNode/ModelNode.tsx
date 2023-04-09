import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Position, Handle } from "reactflow";
import {
  InformationCircleIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";

type Props = {
  fields?: any;
  comment?: string;
  name: string;
};

const ModelNode = ({ name }: Props) => {
  const [showFieldInput, setShowFieldInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function onFieldInputKeydown(evt: KeyboardEvent<HTMLInputElement>) {
    // evt.preventDefault();
    const fieldInputValue = inputRef.current?.value;
    const isBackspaceKey = evt.key.toLowerCase() === "backspace";
    const isEscapeKey = evt.key.toLowerCase() === "escape";
    const isEnterKey = evt.key.toLowerCase() === "enter";

    if (
      isEscapeKey ||
      (isBackspaceKey && Number(fieldInputValue?.length) < 1)
    ) {
      evt.preventDefault();
      setShowFieldInput(false);
      return;
    }

    if (isEnterKey) {
      evt.preventDefault();
      // console.log(fieldInputValue);
      setShowFieldInput(false);
    }
  }

  useEffect(() => {
    if (showFieldInput) {
      inputRef.current?.focus();
    }
  }, [showFieldInput]);

  return (
    <div className="bg-white rounded-md w-[230px] shadow-md divide-y divide-indigo-200 border-2 active:border-indigo-500 border-gray-200 model-node__wrapper">
      {/* <NodeToolbar position={Position.Top}></NodeToolbar> */}

      {/* START: Node header */}
      <div className="px-2 py-3 text-lg font-medium leading-3 flex items-center justify-between">
        <div className="flex items-center space-x-2 pl-2">
          {/* <TableCellsIcon strokeWidth={1} className="text-lg w-6 h-6" /> */}
          <span className="block">{name}</span>
        </div>
        <button
          className="text-indigo-500 active:text-indigo-300"
          onClick={() => console.log("Something")}
        >
          <InformationCircleIcon strokeWidth={2} className="text-lg w-6 h-6" />
        </button>
      </div>
      {/* END: Node header */}

      {/* START: Node fields */}
      <div className="px-2 space-y-2 py-2">
        {[{ id: "a" }, { id: "b" }, { id: "c", type: "relation" }].map(
          (field: any) => (
            <div key={field.id} className="relative">
              <div className="flex justify-between items-center">
                <span className="block text-sm">Name</span>
                <span className="block text-xs font-semibold text-slate-500">
                  Type
                </span>
              </div>

              {field.type === "relation" ? (
                <Handle
                  id={field.id}
                  className="block bg-slate-500 border border-green-300 rounded-full w-3 h-3 model-node__wrapper"
                  type="source"
                  position={Position.Right}
                />
              ) : null}
            </div>
          )
        )}
        {/* END: Node fields */}

        {/* START: Input for adding a new field */}
        <div>
          {showFieldInput ? (
            <input
              ref={inputRef}
              type="text"
              className="w-full rounded-xl pl-2 shadow-md border-2  border-slate-400"
              onKeyDown={onFieldInputKeydown}
            />
          ) : (
            <button
              className="absolute bottom-[-12px] left-[-8px] rounded-full bg-blue-600 text-white"
              onClick={() => setShowFieldInput(true)}
            >
              <PlusSmallIcon strokeWidth={2} className="text-lg w-6 h-6" />
            </button>
          )}
        </div>
        {/* END: Input for adding a new field */}
      </div>

      {/* start: Node footer */}
      {/* <div className="relative py-2 px-2"></div> */}

      <Handle
        type="target"
        className="block bg-slate-500 rounded-full w-3 h-3 model-node__wrapper"
        position={Position.Top}
        id="a"
      />
    </div>
  );
};

export default ModelNode;
