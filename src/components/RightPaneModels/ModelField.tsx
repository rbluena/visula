import { useState } from "react";
import { Trigger as PopoverTrigger } from "@radix-ui/react-popover";
// import { Trigger as DropdownTrigger } from "@radix-ui/react-dropdown-menu";
import { v4 as uuidV4 } from "uuid";
import camelCase from "lodash/camelCase";
import isEmpty from "lodash/isEmpty";
import {
  TrashIcon,
  XMarkIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import { DataTypes, ModelField } from "@/types";
import dataTypes from "@/data/dataTypes";
// import useRelationalModel from "@/lib/client/hooks/useRelationalModels";
import ValidationsPopover from "./ValidationsPopover";

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
  // const { targetModel } = useRelationalModel(modelId);
  // const [showRelationModels, setShowRelationModels] = useState(false);
  const [fieldName, setFieldName] = useState<string>(() => data?.name || "");
  const [dataType, setDataType] = useState<DataTypes | "">(
    () => data?.dataType || ""
  );
  // const [selectedRelationModel, setSelectedRelationModel] = useState<
  //   string | null
  // >(null);

  const isNewField = isEmpty(data);

  function createOrUpdateField() {
    if (!isNewField) {
      // Update existing model
      updateModelField?.(modelId, {
        ...data,
        dataType,
        name: fieldName,
      });
    }

    // Creating a new fresh field
    createModelField?.(modelId, {
      id: uuidV4(),
      kind: "field",
      name: fieldName as string,
      unique: camelCase(fieldName),
      dataType: dataType,
      validations: [],
    });

    setFieldName("");
    setDataType("String");
  }

  return (
    <div className="">
      <div className="flex items-end justify-between w-full">
        <div className="flex items-end space-x-1 space-y-3">
          <div className="">
            <span className="block text-[10px] text-sla e-500 pl-1">
              {isNewField ? camelCase(fieldName) : ""}
            </span>
            <input
              type="text"
              placeholder="Field name"
              className="bg-slate-50 text-xs p-1 border border-slate-200 rounded-md"
              value={fieldName}
              onChange={(evt) => setFieldName(evt.target.value)}
            />
          </div>

          <select
            className="bg-slate-50 text-xs p-1 border border-slate-200 rounded-md"
            value={dataType}
            defaultValue={data?.dataType || ""}
            onChange={(evt) => {
              setDataType(evt.target.value as DataTypes);
              // setShowRelationModels(true);
            }}
          >
            {dataTypes.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          {/* START: Relation */}
          {/* {dataType === "Relation" ? (
            <RelationDropdown targetModel={targetModel}>
              <DropdownTrigger asChild>
                <button className="text-blue-700 border border-blue-500 hover:bg-blue-50 bg-white text-xs font-semibold p-1 rounded-full">
                  <EllipsisVerticalIcon strokeWidth={2} className="w-4 h-4" />
                </button>
              </DropdownTrigger>
            </RelationDropdown>
          ) : null} */}
          {/* END: Relation */}

          {/* START: validation popover trigger */}
          <ValidationsPopover>
            <PopoverTrigger asChild>
              <button className="border border-slate-300 rounded-full p-1 bg-slate-50 hover:bg-slate-200 shadow-sm text-slate-700">
                <Cog8ToothIcon strokeWidth={1.3} className="w-4 h-4" />
              </button>
            </PopoverTrigger>
          </ValidationsPopover>
          {/* START: validation popover trigger */}

          <button
            onClick={createOrUpdateField}
            className="bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-md"
          >
            Save
          </button>
        </div>

        {isNewField ? (
          <button
            onClick={() => setShowFieldInput?.(false)}
            className="border border-slate-300 rounded-full p-1 bg-red-50 hover:bg-red-100 text-red-700 ml-auto"
            aria-describedby="aria-close-new-field"
          >
            <span id="aria-close-new-field" className="sr-only">
              Close feild input
            </span>
            <XMarkIcon strokeWidth={1.3} className="w-4 h-4" />
          </button>
        ) : (
          <div className="space-x-[4px]">
            <button
              onClick={() => deleteModelField?.(modelId, data.id)}
              className="border border-slate-300 rounded-full p-1 bg-red-50 hover:bg-red-100 text-red-700 shadow-sm"
            >
              <TrashIcon strokeWidth={1.2} className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelField;
