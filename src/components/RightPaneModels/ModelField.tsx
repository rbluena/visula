import { useState } from "react";
import {
  TrashIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { DataTypes, ModelField } from "@/types";
import dataTypes from "@/data/dataTypes";
import { camelCase } from "lodash";

type Props = {
  modelId: string;
  data: ModelField;
  updateModelField: Function;
  deleteModelField: Function;
};

const ModelField = ({
  modelId,
  data,
  updateModelField,
  deleteModelField,
}: Props) => {
  const [fieldName, setFieldName] = useState<string>(() => data?.name || "");
  const [dataType, setDataType] = useState<DataTypes>(
    () => data?.dataType || ""
  );

  return (
    <div className="">
      <div key={data.id} className="flex items-end justify-between w-full">
        <div className="flex items-end space-x-1 space-y-3">
          <div className="">
            <span className="block text-[10px] text-slate-500 pl-1">
              {camelCase(fieldName)}
            </span>
            <input
              type="text"
              className="bg-slate-50 text-xs p-1 border border-slate-200 rounded-md"
              value={fieldName}
              onChange={(evt) => setFieldName(evt.target.value)}
            />
          </div>

          <select
            className="bg-slate-50 text-xs p-1 border border-slate-200 rounded-md"
            value={dataType}
            defaultValue={data.dataType}
            onChange={(evt) => setDataType(evt.target.value as DataTypes)}
          >
            {dataTypes.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <button
            onClick={() =>
              updateModelField(modelId, {
                ...data,
                dataType,
                name: fieldName,
              })
            }
            className="bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-md"
          >
            Save
          </button>

          <button
            onClick={() =>
              updateModelField(modelId, {
                ...data,
                dataType,
                fieldName,
              })
            }
            className="border border-slate-300 rounded-full p-1 bg-slate-50 hover:bg-slate-200 shadow-sm text-slate-700"
          >
            <AdjustmentsHorizontalIcon strokeWidth={1.3} className="w-4 h-4" />
          </button>
        </div>

        <div className="space-x-[4px]">
          <button
            onClick={() => deleteModelField(modelId, data.id)}
            className="border border-slate-300 rounded-full p-1 bg-red-50 hover:bg-red-100 text-red-700 shadow-sm"
          >
            <TrashIcon strokeWidth={1.2} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelField;
