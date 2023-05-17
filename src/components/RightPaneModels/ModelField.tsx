import camelCase from "lodash/camelCase";
import has from "lodash/has";
import { Trigger as PopoverTrigger } from "@radix-ui/react-popover";
import { TrashIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";
import dataTypes from "@/data/dataTypes";
import useFieldValidations from "@/lib/client/hooks/useFieldValidations";
import { useModelRelationStore } from "@/lib/client/store/relations";
import { useFieldsStore } from "@/lib/client/store/fields";
import useModelField from "@/lib/client/hooks/useModelFields";
import { useModelsRelation } from "@/lib/client/hooks/useModelsRelation";
import usePreviousValue from "@/lib/client/hooks/usePreviousValue";
import ValidationsPopover from "./ValidationsPopover";
import { DataType, ModelField } from "@/types";

type Props = {
  fieldUUID: string;
};

const ModelFieldComponent = ({ fieldUUID }: Props) => {
  const data = useFieldsStore((state) => state.data[fieldUUID]);
  const addRelation = useModelRelationStore((state) => state.addRelation);
  const { updateModelField, deleteModelField } = useModelField();
  const { validationInputsData } = useFieldValidations(data.dataType);
  const { onDeletingConnectedField } = useModelsRelation();

  const prevDataType = usePreviousValue(data.dataType);

  /**
   *
   * @param key
   * @param value
   */
  function updateFieldData(updates: Partial<ModelField>) {
    const updatingInfo = {
      ...data,
      ...updates,
    };

    updateModelField(updatingInfo);

    if (updates.dataType === "Relation" || has(updates, "relationHasMany")) {
      addRelation({
        sourceModelId: data.parentId,
        sourceFieldId: data.id,
        connectedTargetModels: [],
        hasMany: has(updates, "relationHasMany")
          ? !!updates.relationHasMany
          : !!data.relationHasMany,
      });
    }

    if (prevDataType === "Relation" && updates.dataType !== "Relation") {
      onDeletingConnectedField(data.id);
    }
  }

  return (
    <div className="">
      <div className="flex items-end w-full">
        <div className="flex items-end space-x-1 space-y-2">
          <div className="">
            <span className="block text-[10px] text-slate-600 pl-1">
              {data.fieldId}
            </span>
            <input
              type="text"
              placeholder="Field name"
              className="bg-slate-50 text-xs leading-tight p-1.5 border border-slate-300 rounded-md"
              defaultValue={data.name}
              onBlur={(evt) => {
                if (data.fieldId.length === 0) {
                  updateFieldData({
                    fieldId: camelCase(evt.target.value),
                    name: evt.target.value,
                  });
                  return;
                }

                updateFieldData({
                  name: evt.target.value,
                });
              }}
              required
            />
          </div>

          <select
            className="bg-slate-50 text-xs leading-tight p-1.5 border border-slate-300 rounded-md"
            value={data.dataType}
            onChange={(evt) =>
              updateFieldData({ dataType: evt.target.value as DataType })
            }
          >
            {dataTypes.map((item) => {
              return (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              );
            })}
          </select>

          {data.dataType === "Relation" ? (
            <select
              value={data.relationHasMany ? "hasMany" : "hasOne"}
              className="bg-slate-50 text-xs leading-tight p-1.5 border border-slate-300 rounded-md"
              onChange={(evt) =>
                updateFieldData({
                  dataType: "Relation",
                  relationHasMany: evt.target.value === "hasOne" ? false : true,
                })
              }
            >
              <option value="hasOne">One content</option>
              <option value="hasMany">Many content</option>
            </select>
          ) : null}

          {/* START: Media */}
          {data.dataType === "Media" ? (
            <select
              value={data.hasManyAssets ? "hasMany" : "hasOne"}
              className="bg-slate-50 text-xs leading-tight p-1.5 border border-slate-300 rounded-md"
              onChange={(evt) =>
                updateFieldData({
                  hasManyAssets: evt.target.value === "hasOne" ? false : true,
                })
              }
            >
              <option value="hasOne">One asset</option>
              <option value="hasMany">Many assets</option>
            </select>
          ) : null}
          {/* END: Media */}

          {/* START: validation popover trigger */}
          <ValidationsPopover
            fieldId={data.fieldId}
            validationInputsData={validationInputsData}
            updateFieldData={updateFieldData}
            validationValues={data.validations}
          >
            <PopoverTrigger asChild>
              <button className="border border-slate-300 rounded-full p-1.5 bg-slate-50 hover:bg-slate-200 shadow-sm text-slate-700">
                <Cog8ToothIcon strokeWidth={1.3} className="w-4 h-4" />
              </button>
            </PopoverTrigger>
          </ValidationsPopover>
          {/* START: validation popover trigger */}

          <button
            onClick={() => deleteModelField(data.parentId, data.id)}
            className="border border-slate-300 rounded-full p-1.5 bg-red-50 hover:bg-red-100 text-red-700 shadow-sm"
          >
            <TrashIcon strokeWidth={1.2} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelFieldComponent;
