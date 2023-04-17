import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Position, Handle } from "reactflow";
import { v4 as uuidV4 } from "uuid";
import camelCase from "lodash/camelCase";
import {
  InformationCircleIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";
import { useNodesStore } from "@/lib/client/store/nodes";
import type { ModelField } from "@/types";

export type Props = {
  modelId: string;
  comment?: string;
  name: string;
  unique?: string;
};

const ModelNode = ({ name, modelId, unique }: Props) => {
  const { fields } = useNodesStore((state) => state.data?.[modelId] || []);
  const addModelField = useNodesStore((state) => state.addField);
  const [showFieldInput, setShowFieldInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function onFieldInputKeydown(evt: KeyboardEvent<HTMLInputElement>) {
    const fieldInputValue = inputRef.current?.value as string;
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

      addModelField(modelId, {
        id: uuidV4(),
        kind: "field",
        name: fieldInputValue,
        fieldID: camelCase(fieldInputValue),
        dataType: "String",
        validations: [],
      });

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
      <div className="px-2 py-3 flex items-center justify-between">
        <div className="pl-2">
          {/* <TableCellsIcon strokeWidth={1} className="text-lg w-6 h-6" /> */}
          <span className="block leading-4 text-[16px]">{name}</span>
          <span className="block text-[10px] text-slate-500">{unique}</span>
        </div>
        <button
          className="text-indigo-500 active:text-indigo-300"
          // onClick={() => console.log("Something")}
        >
          <InformationCircleIcon strokeWidth={2} className="text-lg w-6 h-6" />
        </button>
      </div>
      {/* END: Node header */}

      {/* START: Node fields */}
      <div className="px-2 space-y-2 py-2">
        {fields?.map((field: ModelField) => (
          <div key={field.id} className="relative">
            <div className="flex justify-between items-center">
              <span className="block text-sm">{field.name}</span>
              <span className="block text-xs leading-4 text-slate-500">
                {field.dataType}
              </span>
            </div>

            <Handle
              id={field.id}
              style={{
                display: field.dataType !== "Relation" ? "none" : "block",
              }}
              className="block absolute right-[-14px] bg-slate-500 border border-green-300 rounded-full w-3 h-3  model-node__wrapper"
              type="source"
              position={Position.Right}
            />
          </div>
        ))}
        {/* END: Node fields */}

        {/* START: Input for adding a new field */}
        <div>
          {
            showFieldInput ? (
              <input
                ref={inputRef}
                type="text"
                className="w-full rounded-xl pl-2 shadow-md border-2  border-slate-400"
                onKeyDown={onFieldInputKeydown}
              />
            ) : null
            // <button
            //   className="absolute bottom-[-12px] left-[-8px] rounded-full bg-blue-600 text-white"
            //   onClick={() => setShowFieldInput(true)}
            // >
            //   <PlusSmallIcon strokeWidth={2} className="text-lg w-6 h-6" />
            // </button>
          }
        </div>
        {/* END: Input for adding a new field */}
      </div>

      {/* start: Node footer */}
      {/* <div className="relative py-2 px-2"></div> */}

      <Handle
        type="target"
        className="block bg-slate-500 rounded-full w-3 h-3 model-node__wrapper"
        position={Position.Top}
        id={modelId}
      />
    </div>
  );
};

export default ModelNode;
