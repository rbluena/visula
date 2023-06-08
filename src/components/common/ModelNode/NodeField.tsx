import { Handle, Position } from "reactflow";
import { ModelField } from "@/types";

type Props = {
  field: ModelField;
  showConnectingNodes: boolean;
  checkFieldIsConnected?: Function;
};

const NodeField = ({
  field,
  showConnectingNodes = true,
  checkFieldIsConnected,
}: Props) => {
  const fieldConnection = checkFieldIsConnected?.(field.id);

  return (
    <div key={field.id} className="relative">
      <div className="flex justify-between items-start">
        <span className="block text-sm text-slate-800">{field.name}</span>
        <span className="block text-xs leading-4 text-slate-500">
          {field?.validations?.required ? <span className="">*</span> : ""}
          {field.dataType}
        </span>
        <Handle
          id={field.id}
          hidden={true}
          style={{
            visibility:
              field.dataType == "Relation" && showConnectingNodes
                ? "visible"
                : "hidden",
          }}
          className={`inline-block right-[-14px] top-[8px] ${
            fieldConnection ? "bg-indigo-500" : "bg-slate-500 "
          } border border-green-300 rounded-full w-3 h-3  model-node__wrapper`}
          type="source"
          position={Position.Right}
          isConnectableEnd={false}
        />
      </div>
    </div>
  );
};

export default NodeField;
