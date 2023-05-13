import { useReactFlow } from "reactflow";
import { cloneDeep } from "lodash";
import { ModelData } from "@/types";
import { useNodesStore } from "@/lib/client/store/nodes";
import { useModelStore } from "@/lib/client/store/models";
import { getNodeFromData } from "@/lib/client/common/dataAndNodes";

export default function useModels() {
  const { setNodes } = useReactFlow();
  const { updateModel } = useNodesStore((state) => state);
  const { addModel, data, modelIds, activeModelId } = useModelStore(
    (state) => state
  );

  const selectedActiveModel = data[activeModelId || ""] || {};

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
    createModel,
    selectedActiveModel,
  };
}
