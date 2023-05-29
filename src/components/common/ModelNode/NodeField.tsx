import { Handle, Position } from "reactflow";
import { ModelField } from "@/types";

type Props = {
  field: ModelField;
  checkFieldIsConnected?: Function;
};

const NodeField = ({ field, checkFieldIsConnected }: Props) => {
  const fieldConnection = checkFieldIsConnected?.(field.id);

  return (
    <div key={field.id} className="relative">
      <div className="flex justify-between items-start">
        <span className="block text-sm">{field.name}</span>
        <span className="block text-xs leading-4 text-slate-500">
          {field.dataType}
        </span>
        <Handle
          id={field.id}
          hidden={true}
          style={{
            visibility: field.dataType !== "Relation" ? "hidden" : "visible",
          }}
          className={`inline-block right-[-18px] top-[8px] ${
            fieldConnection ? "bg-indigo-500" : "bg-slate-500 "
          } border border-green-300 rounded-full w-3 h-3  model-node__wrapper`}
          type="source"
          position={Position.Right}
          isConnectableEnd={false}
        />
      </div>

      {/* {field?.relation?.connectedModels ? (
        <div className="flex flex-col text-xs text-slate-500 bg-slate-50 px-1 pl-2 rounded">
          {field?.relation?.connectedModels?.map((item) => (
            <span key={item.modelId}>{item.modelId}</span>
          ))}
        </div>
      ) : null} */}
    </div>
  );
};

export default NodeField;
