import { Node, useReactFlow } from "reactflow";
import { cloneDeep } from "lodash";
import { ModelData } from "@/types";
import { useModelStore } from "@/lib/client/store/models";
import { getNodeFromData } from "@/lib/client/common/dataAndNodes";

export default function useModels() {
  const { setNodes, setCenter, getZoom } = useReactFlow();
  const { addModel, updateModel, data, modelIds, activeModelId } =
    useModelStore((state) => state);

  const selectedActiveModel = data[activeModelId || ""] || {};

  /**
   *
   * @param modelId
   */
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
        Number(currSelectingNode!.position.x + 250),
        Number(currSelectingNode!.position.y + 250),
        {
          duration: 500,
          zoom: getZoom(),
        }
      );
    }
  }

  function createModel(modelData: ModelData) {
    addModel(modelData);

    setNodes((nodes) => [
      ...nodes.filter((item) => item.id !== "newnodeinput"),
      getNodeFromData(modelData),
    ]);
  }

  function getModelsData() {
    return modelIds.map((key) => data[key]);
  }

  function updateModelData(data: ModelData) {
    updateModel(data);
    setNodes((nodes) => {
      return nodes.map((item) => {
        if (item.id === data.id) {
          const cloned = cloneDeep(item);

          cloned.data.label.props.name = data.name;
          cloned.data.label.props.modelId = data.modelId;

          return cloned;
        }

        return item;
      });
    });
  }

  return {
    getModelsData,
    updateModelData,
    onSelectingModel,
    createModel,
    selectedActiveModel,
  };
}
