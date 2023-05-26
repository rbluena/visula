import { Position, Handle } from "reactflow";
import type { ModelField } from "@/types";
import { useModelsRelation } from "@/lib/client/hooks/useModelsRelation";
import { useModelStore } from "@/lib/client/store/models";
import useModelFields from "@/lib/client/hooks/useModelFields";
import NodeField from "./NodeField";

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
    <div className="bg-white rounded-md w-[230px] shadow-lg shadow-indigo-500/40 border active:border-2  active:border-indigo-100 border-gray-50 model-node__wrapper">
      {/* START: Node header */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="space-y-1">
          <span className="block leading-4 text-[16px]">{name}</span>
          <span className="block text-[10px] text-slate-500">{modelId}</span>
        </div>
      </div>
      {/* END: Node header */}

      {/* START: Node fields */}
      <div className="px-4 space-y-2 py-2 relative">
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
