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
      <div className="flex justify-between items-center">
        <span className="block text-sm">{field.name}</span>
        <span className="block text-xs leading-4 text-slate-500">
          {field.dataType}
        </span>
      </div>

      <Handle
        id={field.id}
        style={{
          display: field.dataType !== "Relation" ? "none" : "block",
        }}
        className={`inline-block absolute right-[-14px] ${
          fieldConnection ? "bg-blue-500" : "bg-slate-500"
        } border border-green-300 rounded-full w-3 h-3  model-node__wrapper`}
        type="source"
        position={Position.Right}
        isConnectableEnd={false}
      />
    </div>
  );
};

export default NodeField;
