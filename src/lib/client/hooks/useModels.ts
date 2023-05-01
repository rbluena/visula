import { ModelData } from "@/types";
import { useNodesStore } from "@/lib/client/store/nodes";
import { useReactFlow } from "reactflow";
import { cloneDeep } from "lodash";

export default function useModels() {
  const { updateModel } = useNodesStore((state) => state);
  const { setNodes } = useReactFlow();

  function updateModelData(data: ModelData) {
    updateModel(data);
    setNodes((nodes) => {
      return nodes.map((item) => {
        if (item.id === data.id) {
          const cloned = cloneDeep(item);

          cloned.data.label.props.name = data.name;
          cloned.data.label.props.unique = data.unique;

          return cloned;
        }

        return item;
      });
    });
  }

  return {
    updateModelData,
  };
}
