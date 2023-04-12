import { useEffect, useState, useRef } from "react";
import { v4 as uuidV4 } from "uuid";
import {
  TrashIcon,
  ChevronRightIcon,
  PlusSmallIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import useModelField from "@/lib/client/hooks/useModelFields";
import { ModelData, DataTypes } from "@/types";
import dataTypes from "@/data/dataTypes";

import ModelFieldComponent from "./ModelField";
import { camelCase } from "lodash";

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
  const [fieldDataType, setFieldDataType] = useState<DataTypes>("String");
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
      className="min-h-[80px] border border-violet-100 rounded-md p-2 space-y-3 overflow-y-scroll"
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
        {modelData?.fields?.map((field) => (
          <ModelFieldComponent
            key={field.id}
            data={field}
            modelId={modelData.id}
            updateModelField={updateModelField}
            deleteModelField={deleteModelField}
          />
        ))}
        {/* END: fields */}

        {/* START: Adding new field */}
        {showFieldInput ? (
          <div className="flex justify-start items-center space-x-1 pt-2 w-full">
            <input
              ref={inputRef}
              type="text"
              placeholder="New field"
              className="bg-slate-50 text-xs p-1 border border-slate-200 rounded-md"
            />

            <select
              className="bg-slate-50 text-xs p-1 border border-slate-200 rounded-md"
              value={fieldDataType}
              onChange={(evt) =>
                setFieldDataType(evt.target.value as DataTypes)
              }
            >
              {dataTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                const fieldName = inputRef.current?.value;

                createModelField(modelData.id, {
                  id: uuidV4(),
                  kind: "field",
                  name: fieldName as string,
                  unique: camelCase(fieldName),
                  dataType: fieldDataType,
                  validations: [],
                });

                // Reset input
                setFieldDataType("String");
                inputRef.current!.value = "";
              }}
              className="bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-md"
            >
              Save
            </button>
            <button
              onClick={() => setShowFieldInput(false)}
              className="border border-slate-300 rounded-full p-1 bg-red-50 hover:bg-red-100 text-red-700 ml-auto"
              aria-describedby="aria-close-new-field"
            >
              <span id="aria-close-new-field" className="sr-only"></span>
              <XMarkIcon strokeWidth={1.3} className="w-4 h-4" />
            </button>
          </div>
        ) : null}
        {/* END: Adding new field */}
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
