import { Position, Handle } from "reactflow";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import type { ModelField } from "@/types";
import NodeField from "./NodeField";
import { useModelsRelation } from "@/lib/client/hooks/useModelsRelation";
import { useModelStore } from "@/lib/client/store/models";
import useModelFields from "@/lib/client/hooks/useModelFields";

export type Props = {
  id: string;
  name: string;
  modelId: string;
  comment?: string;
};

const ModelNode = ({ id, name, modelId }: Props) => {
  const modelFieldIds: string[] = useModelStore(
    (state) => state.data?.[id]?.fields || []
  );
  const { getModelFields } = useModelFields();
  const { checkFieldIsConnected, checkTargetModelIsConnected } =
    useModelsRelation();

  const fieldsData = getModelFields(modelFieldIds);

  return (
    <div className="bg-white rounded-md w-[230px] shadow-md divide-y divide-indigo-200 border-2 active:border-indigo-100 border-gray-200 model-node__wrapper">
      {/* START: Node header */}
      <div className="px-2 py-3 flex items-center justify-between">
        <div className="pl-2">
          <span className="block leading-4 text-[16px]">{name}</span>
          <span className="block text-[10px] text-slate-500">{modelId}</span>
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
      <div className="px-2 space-y-2 py-2 relative">
        {fieldsData?.map((field: ModelField) => (
          <NodeField
            key={field.id}
            field={field}
            checkFieldIsConnected={checkFieldIsConnected}
          />
        ))}
        {/* END: Node fields */}
      </div>

      {/* start: Node footer */}

      <Handle
        type="target"
        className={`block ${
          checkTargetModelIsConnected(id) ? "bg-blue-600" : "bg-slate-500"
        } rounded-full w-3 h-3 model-node__wrapper`}
        position={Position.Top}
        id={id}
      />
    </div>
  );
};

export default ModelNode;
