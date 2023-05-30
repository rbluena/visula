import { v4 as uuidV4 } from "uuid";
import {
  TrashIcon,
  ChevronRightIcon,
  PlusSmallIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

import { ModelData } from "@/types";
import { useGlobalStore } from "@/lib/client/store/global";
import useModelField from "@/lib/client/hooks/useModelFields";

import ModelFieldComponent from "./ModelField";

type Props = {
  modelData: ModelData;
  isSelectedModel: boolean;
  onSelectingModel: Function;
  onDeletingModel: Function;
};

const Model = ({
  modelData,
  isSelectedModel,
  onSelectingModel,
  onDeletingModel,
}: Props) => {
  const { setOpenedModal } = useGlobalStore((state) => state);
  const { createModelField, getModelFields } = useModelField();

  const fields = getModelFields(modelData.fields);

  function addFieldInput() {
    createModelField(modelData.id, {
      id: uuidV4(),
      fieldId: "",
      name: "",
      parentId: modelData.id,
      dataType: "String",
      validations: {},
    });
  }

  return (
    <div
      key={modelData.id}
      className={`${
        isSelectedModel ? "border-blue-400 border-2" : "border border-blue-100"
      } min-h-[80px] rounded-md p-2 space-y-3 bg-white shadow-sm`}
      onMouseDown={() => {
        if (isSelectedModel) return;
        onSelectingModel(modelData.id);
      }}
    >
      <div className="flex justify-between items-center border-b border-b-slate-200">
        <div className="w-full space-y-0">
          <div className="flex items-center space-x-2">
            <div className="block w-full">{modelData.name}</div>
            <ChevronRightIcon
              strokeWidth={2}
              className={`w-5 h-5 font-semibold text-indigo-700 transition-transform transform ${
                isSelectedModel ? "rotate-90" : ""
              }`}
            />
          </div>

          <span className="block text-[12px] text-slate-600">
            {modelData.modelId}
          </span>
        </div>
      </div>

      {/* START: fields */}
      <div
        className={`transition-all overflow-y-hidden space-y-1 pl-2 ${
          !isSelectedModel ? "h-0" : "h-auto py-2"
        }`}
      >
        {fields?.map((field) => (
          <ModelFieldComponent key={field.id} fieldData={field} />
        ))}
        {/* END: fields */}
      </div>

      {/* START: Footer */}
      <div className="flex justify-between">
        <button
          onClick={addFieldInput}
          className="text-xs font-semibold flex items-center justify-center text-indigo-600 rounded-md border border-indigo-500 px-2 py-1"
        >
          <PlusSmallIcon strokeWidth={2} className="w-5 h-5" />
          Add field
        </button>

        <div className="space-x-1">
          <button
            onClick={() => setOpenedModal("model-update")}
            className="border border-slate-300 rounded-full p-1 bg-indigo-50 hover:bg-violet-100 text-indigo-700"
            aria-describedby="aria-model-delete"
            title="Delete this model"
          >
            <span id="aria-model-delete" className="sr-only">
              Update model details
            </span>
            <Cog6ToothIcon strokeWidth={1} className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDeletingModel(modelData.id)}
            className="border border-slate-300 rounded-full p-1 bg-red-50 hover:bg-red-100 text-red-700"
            aria-describedby="aria-model-delete"
            title="Delete this model"
          >
            <span id="aria-model-delete" className="sr-only">
              Delete model {modelData.name}
            </span>
            <TrashIcon strokeWidth={1} className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* END: Footer */}
    </div>
  );
};

export default Model;
