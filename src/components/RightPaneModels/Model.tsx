import { useEffect, useState, useRef } from "react";
// import { v4 as uuidV4 } from "uuid";
import {
  TrashIcon,
  ChevronRightIcon,
  PlusSmallIcon,
  // XMarkIcon,
} from "@heroicons/react/24/outline";
import useModelField from "@/lib/client/hooks/useModelFields";
import { ModelData } from "@/types";
// import dataTypes from "@/data/dataTypes";

import ModelFieldComponent from "./ModelField";
// import { camelCase } from "lodash";

type Props = {
  modelData: ModelData;
  activeModelId: string | null;
  onSelectingModel: Function;
  onDeletingModel: Function;
};

const Model = ({
  modelData,
  activeModelId,
  onSelectingModel,
  onDeletingModel,
}: Props) => {
  const [showFieldInput, setShowFieldInput] = useState(false);
  // const [fieldDataType, setFieldDataType] = useState<DataTypes>("String");
  const { updateModelField, deleteModelField, createModelField } =
    useModelField();
  const inputRef = useRef<HTMLInputElement>(null);

  const isThisModelActive = activeModelId === modelData.id;

  useEffect(() => {
    inputRef.current?.focus();
  }, [showFieldInput]);

  return (
    <div
      key={modelData.id}
      className={`${
        isThisModelActive
          ? "border-blue-400 border-2"
          : "border border-blue-100"
      } min-h-[80px] rounded-md p-2 space-y-3`}
    >
      <div className="flex justify-between items-center">
        <div className="w-full space-y-0">
          <div className="flex items-center space-x-2">
            <div
              contentEditable
              className="block w-full"
              lang="ghmkd"
              spellCheck={false}
            >
              {modelData.name}
            </div>
            <button
              className="border border-slate-300 rounded-full p-1"
              onClick={() => onSelectingModel(modelData.id)}
              aria-describedby="aria-chevron-toggle"
            >
              <ChevronRightIcon
                strokeWidth={2}
                className={`w-5 h-5 font-semibold text-violet-700 transition-transform transform ${
                  isThisModelActive ? "rotate-90" : ""
                }`}
              />
            </button>
          </div>

          <span className="block text-[12px] text-slate-600">
            {modelData.unique}
          </span>
        </div>
      </div>

      {/* START: fields */}
      <div
        className={`transition-all overflow-y-hidden space-y-1 pl-2  ${
          !isThisModelActive ? "h-0" : "h-auto py-2"
        }`}
      >
        {modelData?.fields.map((field) => (
          <ModelFieldComponent
            key={field.id}
            data={field}
            modelId={modelData.id}
            updateModelField={updateModelField}
            deleteModelField={deleteModelField}
          />
        ))}
        {/* END: fields */}
        {/* START: Input for creating a new field */}
        {showFieldInput ? (
          <ModelFieldComponent
            modelId={modelData.id}
            setShowFieldInput={setShowFieldInput}
            createModelField={createModelField}
          />
        ) : null}
        {/* END: Input for creating a new field */}
      </div>

      {/* START: Footer */}
      <div className="flex justify-between">
        <button
          onClick={() => setShowFieldInput(true)}
          className="text-xs flex items-center justify-center text-violet-600 rounded-md border border-violet-500 px-2 py-1"
        >
          <PlusSmallIcon strokeWidth={1} className="w-5 h-5" />
          New field
        </button>
        <button
          onClick={() => onDeletingModel(modelData)}
          className="border border-slate-300 rounded-full p-1 bg-red-50 hover:bg-red-100 text-red-700"
          aria-describedby="aria-model-delete"
        >
          <span id="aria-model-delete" className="sr-only">
            Delete model {modelData.name}
          </span>
          <TrashIcon strokeWidth={1} className="w-5 h-5" />
        </button>
      </div>
      {/* END: Footer */}
    </div>
  );
};

export default Model;
