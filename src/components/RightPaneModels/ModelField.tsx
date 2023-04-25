import { useState } from "react";
import { Trigger as PopoverTrigger } from "@radix-ui/react-popover";
import { v4 as uuidV4 } from "uuid";
import camelCase from "lodash/camelCase";
import isEmpty from "lodash/isEmpty";
import {
  TrashIcon,
  XMarkIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import { DataType, ModelField } from "@/types";
import dataTypes from "@/data/dataTypes";
// import useRelationalModel from "@/lib/client/hooks/useRelationalModels";
import ValidationsPopover from "./ValidationsPopover";
import useFieldValidations from "@/lib/client/hooks/useFieldValidations";
import { useModelRelationStore } from "@/lib/client/store/relations";

type Props = {
  modelId: string;
  data?: ModelField;
  setShowFieldInput?: Function;
  createModelField?: Function;
  updateModelField?: Function;
  deleteModelField?: Function;
};

const ModelField = ({
  modelId,
  data,
  createModelField,
  updateModelField,
  deleteModelField,
  setShowFieldInput,
}: Props) => {
  // TODO: Moving to reducer instead of using too many state
  const isNewFieldInput = isEmpty(data); // Are we creating new field?
  const [fieldName, setFieldName] = useState<string>(() => data?.name || "");
  const [dataType, setDataType] = useState<DataType>(
    () => data?.dataType || "String"
  );
  const [fieldID, setFieldID] = useState(data?.fieldID || "");
  const [updatedValidations, setUpdatedValidations] = useState<Object>(
    data?.validations.length ? data?.validations : {}
  );
  const [relationType, setRelationType] = useState<
    "hasOne" | "hasMany" | string
  >(data?.relationHasMany ? "hasMany" : "hasOne");

  const [mediaAcceptedSize, setMediaAcceptedSize] = useState<
    "hasOne" | "hasMany" | string
  >(data?.hasManyAssets ? "hasMany" : "hasOne");

  const { validations, fieldValidationDefaultValues } = useFieldValidations(
    dataType,
    data?.validations,
    isNewFieldInput
  );

  const addRelation = useModelRelationStore((state) => state.addRelation);

  function createOrUpdateField() {
    const hasManyAssets =
      dataType === "Media" && mediaAcceptedSize === "hasMany";
    const relationHasMany =
      dataType === "Relation" && relationType === "hasMany";

    if (!isNewFieldInput) {
      // Update existing model
      updateModelField?.(modelId, {
        ...data,
        dataType,
        name: fieldName,
        fieldID,
        unique: "",
        hasManyAssets,
        relationHasMany,
        validations: updatedValidations,
      });

      // if (dataType === "Relation") {
      //   addRelation({
      //     sourceModelId: modelId,
      //     sourceFieldId: data.id,
      //     targetModelId: null,
      //     hasMany: relationType === "hasMany",
      //   });
      // } else {
      //   // Delete the relation if exists
      // }

      return;
    }

    const id = uuidV4();

    // Creating a new fresh field
    createModelField?.(modelId, {
      id,
      kind: "field",
      name: fieldName as string,
      fieldID,
      unique: "",
      dataType: dataType,
      hasManyAssets,
      relationHasMany,
      validations: updatedValidations,
    });

    if (dataType === "Relation") {
      addRelation({
        sourceModelId: modelId,
        sourceFieldId: id,
        targetModelId: null,
        hasMany: relationType === "hasMany",
      });
    }

    setFieldName("");
    setFieldID("");
    setMediaAcceptedSize("hasOne");
    setDataType("String");
    setUpdatedValidations([]);
  }

  return (
    <div className="">
      <div className="flex items-end justify-between w-full">
        <div className="flex items-end space-x-1 space-y-2">
          <div className="">
            {/* <span className="block text-[10px] text-slate-600 pl-1">
              {fieldID}
            </span> */}
            <input
              type="text"
              placeholder="Field name"
              className="bg-slate-50 text-xs p-1 border border-slate-200 rounded-md"
              value={fieldName}
              onChange={(evt) => {
                setFieldName(evt.target.value);
                if (isNewFieldInput) {
                  setFieldID(camelCase(evt.target.value));
                }
              }}
              required
            />
          </div>

          <select
            className="bg-slate-50 text-xs p-1 border border-slate-200 rounded-md"
            value={dataType}
            onChange={(evt) => {
              setDataType(evt.target.value as DataType);
            }}
          >
            {dataTypes.map((item) => {
              const disableRelationOnUpdate =
                item.value === "Relation" && !isNewFieldInput;
              return (
                <option
                  key={item.value}
                  value={item.value}
                  disabled={disableRelationOnUpdate}
                >
                  {item.label}
                </option>
              );
            })}
          </select>

          {dataType === "Relation" ? (
            <select
              value={relationType}
              className="bg-slate-50 text-xs p-1 border border-slate-200 rounded-md"
              onChange={(evt) => setRelationType(evt.target.value)}
            >
              <option value="hasOne">Only one</option>
              <option value="hasMany">Has many</option>
            </select>
          ) : null}

          {/* START: Media */}
          {dataType === "Media" ? (
            <select
              value={mediaAcceptedSize}
              className="bg-slate-50 text-xs p-1 border border-slate-200 rounded-md"
              onChange={(evt) => setMediaAcceptedSize(evt.target.value)}
            >
              <option value="hasOne">One asset</option>
              <option value="hasMany">Many assets</option>
            </select>
          ) : null}
          {/* END: Media */}

          {/* START: validation popover trigger */}
          <ValidationsPopover
            fieldID={fieldID}
            validations={validations}
            validationDefaultValues={
              data?.validations ?? fieldValidationDefaultValues
            }
            setUpdatedValidations={setUpdatedValidations}
            setFieldID={setFieldID}
          >
            <PopoverTrigger asChild>
              <button className="border border-slate-300 rounded-full p-1 bg-slate-50 hover:bg-slate-200 shadow-sm text-slate-700">
                <Cog8ToothIcon strokeWidth={1.3} className="w-4 h-4" />
              </button>
            </PopoverTrigger>
          </ValidationsPopover>
          {/* START: validation popover trigger */}

          <button
            onClick={createOrUpdateField}
            className="bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-md disabled:bg-blue-300"
            disabled={fieldName.length < 1 || fieldID.length < 1}
          >
            {isNewFieldInput ? "Add" : "Save"}
          </button>
        </div>

        <div className="space-x-[4px]">
          {isNewFieldInput ? (
            <button
              onClick={() => setShowFieldInput?.(false)}
              className="border border-slate-300 rounded-full p-1 bg-red-50 hover:bg-red-100 text-red-700 ml-auto"
              aria-describedby="aria-close-new-field"
            >
              <span id="aria-close-new-field" className="sr-only">
                Close field input
              </span>
              <XMarkIcon strokeWidth={1.3} className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => deleteModelField?.(modelId, data.id)}
              className="border border-slate-300 rounded-full p-1 bg-red-50 hover:bg-red-100 text-red-700 shadow-sm"
            >
              <TrashIcon strokeWidth={1.2} className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModelField;
