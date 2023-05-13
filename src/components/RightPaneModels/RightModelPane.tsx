import { Node, useOnSelectionChange, useReactFlow } from "reactflow";
import isEmpty from "lodash/isEmpty";
import type { ModelData } from "@/types";
import { useModelStore } from "@/lib/client/store/models";
import useModels from "@/lib/client/hooks/useModels";
import Model from "./Model";

type Props = {
  showMultipleModels: boolean;
};

const RightModelPane = ({ showMultipleModels }: Props) => {
  const { setNodes, setCenter, getZoom, deleteElements } = useReactFlow();
  const setActiveModel = useModelStore((state) => state.setActiveModel);
  const { getModelsData, selectedActiveModel } = useModels();

  const modelsData = getModelsData();

  // Node being selected from the canvas
  // the we have to open model content on the right pane
  // TODO: This probably should be moved somewhere else.
  useOnSelectionChange({
    onChange: ({ nodes }) => setActiveModel(nodes[0]?.id),
  });

  function onSelectingModel(modelId: string) {
    let currSelectingNode;

    setNodes((nodes) => {
      return nodes.map((item) => {
        if (modelId === item.id && !item.selected) {
          item.selected = true;
          currSelectingNode = item as Node;
        } else {
          item.selected = false;
        }

        return item;
      });
    });

    if (currSelectingNode) {
      setCenter(
        Number(currSelectingNode!.position.x + 200),
        currSelectingNode!.position.y,
        {
          duration: 500,
          zoom: getZoom(),
        }
      );
    }

    /*  setNodes((nodes) => {


      const currSelectedNode = nodes.find((item) => item.id === modelId);
      const nextSelectingNode = nodes.find((item) => item.selected === true);

      if (!currSelectedNode) {
        return nodes;
      }

      currSelectedNode.selected = true;

      setCenter(
        Number(currSelectedNode.position.x + 200),
        currSelectedNode.position.y,
        {
          duration: 500,
          zoom: getZoom(),
        }
      );

      if (!nextSelectingNode) {
        return [
          ...nodes.filter((item) => item.id !== modelId),
          currSelectedNode,
        ];
      }

      nextSelectingNode.selected = false;

      return [
        ...nodes.filter(
          (item) => item.id !== modelId && item.selected === true
        ),
        currSelectedNode,
        nextSelectingNode,
      ];
    }); */
  }

  /**
   * Removing model data after node being removed from the canvas
   * @param modelData Model details
   */
  function onDeletingModel(modelData: ModelData) {
    deleteElements({ nodes: [modelData] });
  }

  return (
    <div className="p-4 space-y-4 overflow-y-auto overflow-x-hidden h-[calc(100vh-60px)] relative">
      {showMultipleModels
        ? modelsData?.map((modelData) => (
            <Model
              key={modelData.id}
              modelData={modelData}
              onSelectingModel={onSelectingModel}
              onDeletingModel={onDeletingModel}
              isSelectedModel={selectedActiveModel?.id === modelData.id}
            />
          ))
        : null}

      {!showMultipleModels && !isEmpty(selectedActiveModel) ? (
        <Model
          modelData={selectedActiveModel}
          onSelectingModel={onSelectingModel}
          onDeletingModel={onDeletingModel}
          isSelectedModel
        />
      ) : null}
    </div>
  );
};

export default RightModelPane;
