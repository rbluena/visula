import { useEffect, useRef, useState } from "react";
import {
  TrashIcon,
  ChevronRightIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";

import { ModelData, useNodesStore } from "@/lib/client/store/nodes";
import ModelFieldsComponent from "./ModelFields";
import { useOnSelectionChange, useReactFlow } from "reactflow";

type Props = {
  modelsData: ModelData[];
};

const RightModelPane = ({ modelsData }: Props) => {
  const { setActiveModel, activeModelId } = useNodesStore((state) => state);
  const { setNodes, setCenter, getZoom } = useReactFlow();
  const [showFieldInput, setShowFieldInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useOnSelectionChange({
    onChange: ({ nodes, edges: _ }) => setActiveModel(nodes[0]?.id),
  });

  function onSelectingNode(modelId: string) {
    setNodes((nodes) => {
      const selectingNode = nodes.find((item) => item.id === modelId);
      const currSelectedNode = nodes.find((item) => item.selected === true);

      if (!selectingNode) {
        return nodes;
      }

      selectingNode.selected = true;

      setCenter(
        Number(selectingNode.position.x + 200),
        selectingNode.position.y,
        {
          duration: 500,
          zoom: getZoom(),
        }
      );

      if (!currSelectedNode) {
        return [...nodes.filter((item) => item.id !== modelId), selectingNode];
      }

      currSelectedNode.selected = false;

      return [
        ...nodes.filter(
          (item) => item.id !== modelId && item.selected === true
        ),
        selectingNode,
        currSelectedNode,
      ];
    });
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [showFieldInput]);

  return (
    <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-60px)] relative">
      {/* {JSON.stringify(modelsData, null, 2)} */}
      {modelsData?.map((modelData) => {
        const isModelActive = modelData.id === activeModelId;

        return (
          <div
            key={modelData.id}
            className="min-h-[80px] border border-violet-100 rounded-md p-2 space-y-3 overflow-y-scroll"
            role={!isModelActive ? "button" : "presentation"}
            onClick={() => onSelectingNode(modelData.id)}
          >
            <div className="flex justify-between items-center">
              <div className="w-full space-y-0">
                <div className="flex items-center space-x-2">
                  <div
                    contentEditable
                    className="block w-full"
                    lang="ghmkd"
                    spellCheck={false}
                  >
                    {modelData.name}
                  </div>
                  <button className="border border-slate-300 rounded-full p-1">
                    <ChevronRightIcon
                      strokeWidth={2}
                      className={`w-5 h-5 font-semibold text-violet-700 transition-transform transform ${
                        isModelActive ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                </div>

                <span className="block text-[12px] text-slate-600">
                  {modelData.unique}
                </span>
              </div>
            </div>

            {/* START: fields */}
            <div
              className={`transition-all overflow-y-hidden space-y-1 pl-2  ${
                !isModelActive ? "h-0" : "h-auto py-2"
              }`}
            >
              {modelData?.fields?.map((field) => (
                <ModelFieldsComponent key={field.id} data={field} />
              ))}
              {/* END: fields */}
              {showFieldInput ? (
                <div className="flex items-center space-x-1">
                  <input
                    ref={inputRef}
                    type="text"
                    className="bg-slate-50 text-xs p-1 border border-slate-200 rounded-md"
                  />
                  <select
                    className="bg-slate-50 text-xs p-1 border border-slate-200 rounded-md"
                    value=""
                  >
                    <option value="String">String</option>
                    <option value="Int">Int</option>
                    <option value="Relation">Relation</option>
                    <option value="Media">Media</option>
                  </select>
                  <button className="bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-md">
                    Save
                  </button>
                  <button
                    onClick={() => setShowFieldInput(false)}
                    className="border border-slate-300 rounded-full p-1 bg-red-50 hover:bg-red-100 text-red-700"
                  >
                    <TrashIcon strokeWidth={1} className="w-4 h-4" />
                  </button>
                </div>
              ) : null}
            </div>

            {/* START: Footer */}
            <div className="flex justify-between">
              <button
                onClick={() => setShowFieldInput(true)}
                className="text-xs flex items-center justify-center text-violet-600 rounded-md border border-violet-500 px-2 py-1"
              >
                <PlusSmallIcon strokeWidth={1} className="w-5 h-5" />
                New field
              </button>
              <button className="border border-slate-300 rounded-full p-1 bg-red-50 hover:bg-red-100 text-red-700">
                <TrashIcon strokeWidth={1} className="w-5 h-5" />
              </button>
            </div>
            {/* END: Footer */}
          </div>
        );
      })}
    </div>
  );
};

export default RightModelPane;
