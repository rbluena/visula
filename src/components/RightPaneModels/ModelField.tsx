import { useState } from "react";
import { Trigger as PopoverTrigger } from "@radix-ui/react-popover";
import { TrashIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";
import { DataType, ModelField } from "@/types";
import dataTypes from "@/data/dataTypes";
// import useRelationalModel from "@/lib/client/hooks/useRelationalModels";
import ValidationsPopover from "./ValidationsPopover";
import useFieldValidations from "@/lib/client/hooks/useFieldValidations";
import { useModelRelationStore } from "@/lib/client/store/relations";
import { useFieldsStore } from "@/lib/client/store/fields";
import useModelField from "@/lib/client/hooks/useModelFields";
import { camelCase } from "lodash";
import { useModelsRelation } from "@/lib/client/hooks/useModelsRelation";
import usePreviousValue from "@/lib/client/hooks/usePreviousValue";

type Props = {
  fieldUUID: string;
  // setShowFieldInput?: Function;
  // createModelField?: Function;
  // updateModelField?: Function;
  // deleteModelField?: Function;
};

const ModelFieldComponent = ({ fieldUUID }: Props) => {
  const data = useFieldsStore((state) => state.data[fieldUUID]);
  const { updateModelField, deleteModelField } = useModelField();
  const { onDeletingConnectedField } = useModelsRelation();

  // TODO: Moving to reducer instead of using too many state
  const [fieldName, setFieldName] = useState<string>(() => data?.name || "");
  const [fieldId, setFieldId] = useState(
    data.fieldId.length ? data.fieldId : ""
  );
  const [dataType, setDataType] = useState<DataType>(
    () => data?.dataType || "String"
  );
  // const [prevDataType] = useState(data.dataType);
  const [updatedValidations, setUpdatedValidations] = useState<Object>(
    data?.validations.length ? data?.validations : {}
  );
  const [relationType, setRelationType] = useState<
    "hasOne" | "hasMany" | string
  >(data?.relationHasMany ? "hasMany" : "hasOne");

  const [mediaAcceptedSize, setMediaAcceptedSize] = useState<
    "hasOne" | "hasMany" | string
  >(data?.hasManyAssets ? "hasMany" : "hasOne");

  const { validations, fieldValidationsDefaultValues } =
    useFieldValidations(dataType);

  const [validationDefaultValues, setValidationDefaultValues] = useState(
    data?.validations ?? fieldValidationsDefaultValues
  );

  const prevDataType = usePreviousValue(data.dataType);

  const addRelation = useModelRelationStore((state) => state.addRelation);

  function updateField() {
    updateModelField({
      ...data,
      name: fieldName,
      fieldId,
      dataType,
      hasManyAssets: dataType === "Media" && mediaAcceptedSize === "hasMany",
      relationHasMany: dataType === "Relation" && relationType === "hasMany",
    });

    if (dataType === "Relation") {
      addRelation({
        sourceModelId: data.parentId,
        sourceFieldId: data.id,
        connectedTargetModels: [],
        hasMany: relationType === "hasMany",
      });
    }

    if (prevDataType === "Relation") {
      onDeletingConnectedField(data.id);
    }
  }

  return (
    <div className="">
      <div className="flex items-end justify-between w-full">
        <div className="flex items-end space-x-1 space-y-2">
          <div className="">
            <span className="block text-[10px] text-slate-600 pl-1">
              {fieldId}
            </span>
            <input
              type="text"
              placeholder="Field name"
              className="bg-slate-50 text-xs p-1 border border-slate-200 rounded-md"
              value={fieldName}
              onChange={(evt) => {
                setFieldName(evt.target.value);
                if (data.fieldId.length === 0) {
                  // Field ID should not be changed unless.
                  setFieldId(camelCase(evt.target.value));
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
              return (
                <option key={item.value} value={item.value}>
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
              <option value="hasOne">One content</option>
              <option value="hasMany">Many content</option>
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
          {/* <ValidationsPopover
            updateValidation
            fieldId={fieldId}
            validations={validations}
            validationDefaultValues={validationDefaultValues}
            setUpdatedValidations={setUpdatedValidations}
            // setFieldId={setFieldId}
          >
            <PopoverTrigger asChild>
              <button className="border border-slate-300 rounded-full p-1 bg-slate-50 hover:bg-slate-200 shadow-sm text-slate-700">
                <Cog8ToothIcon strokeWidth={1.3} className="w-4 h-4" />
              </button>
            </PopoverTrigger>
          </ValidationsPopover> */}
          {/* START: validation popover trigger */}

          <button
            onClick={updateField}
            className="bg-blue-700 text-white text-xs font-semibold px-2 py-1 m-2 rounded-md disabled:bg-blue-300"
            disabled={fieldName.length < 1 || fieldId.length < 1}
          >
            Save
          </button>
        </div>

        <div className="space-x-[4px] ml-1">
          <button
            onClick={() => deleteModelField(data.parentId, data.id)}
            className="border border-slate-300 rounded-full p-1 bg-red-50 hover:bg-red-100 text-red-700 shadow-sm"
          >
            <TrashIcon strokeWidth={1.2} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelFieldComponent;
