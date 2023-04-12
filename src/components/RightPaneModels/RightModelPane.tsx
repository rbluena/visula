import type { ModelData } from "@/types";

import { useNodesStore } from "@/lib/client/store/nodes";
import { useOnSelectionChange, useReactFlow } from "reactflow";
import Model from "./Model";

type Props = {
  modelsData: ModelData[];
};

const RightModelPane = ({ modelsData }: Props) => {
  const { setActiveModel, activeModelId } = useNodesStore((state) => state);
  const { setNodes, setCenter, getZoom, deleteElements } = useReactFlow();

  useOnSelectionChange({
    onChange: ({ nodes, edges: _ }) => setActiveModel(nodes[0]?.id),
  });

  function onSelectingModel(modelId: string) {
    setNodes((nodes) => {
      const selectingNode = nodes.find((item) => item.id === modelId);
      const prevSelectedModel = nodes.find((item) => item.selected === true);

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

      if (!prevSelectedModel) {
        return [...nodes.filter((item) => item.id !== modelId), selectingNode];
      }

      prevSelectedModel.selected = false;

      return [
        ...nodes.filter(
          (item) => item.id !== modelId && item.selected === true
        ),
        selectingNode,
        prevSelectedModel,
      ];
    });
  }

  /**
   * Removing model data after node being removed from the canvas
   * @param modelData Model details
   */
  function onDeletingModel(modelData: ModelData) {
    deleteElements({ nodes: [modelData] });
  }

  return (
    <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-60px)] relative">
      {modelsData?.map((modelData) => (
        <Model
          key={modelData.id}
          modelData={modelData}
          onSelectingModel={onSelectingModel}
          onDeletingModel={onDeletingModel}
          activeModelId={activeModelId}
        />
      ))}
    </div>
  );
};

export default RightModelPane;
