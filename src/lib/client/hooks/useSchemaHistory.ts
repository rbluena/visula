import { useReactFlow } from "reactflow";
import { useFieldsStore } from "@/lib/client/store/fields";
import { useModelRelationStore } from "@/lib/client/store/relations";
import { useModelStore } from "@/lib/client/store/models";
import {
  getNodesFromData,
  getEdgesFromRelations,
} from "../common/dataAndNodes";

export default function useSchemaHistory() {
  const { setNodes, setEdges } = useReactFlow();
  const setSchemaFieldsState = useFieldsStore(
    (state) => state.setSchemaFieldsState
  );
  const setSchemaRelationsState = useModelRelationStore(
    (state) => state.setSchemaRelationsState
  );
  const setSchemaModelsState = useModelStore(
    (state) => state.setSchemaModelsState
  );

  /**
   *
   * @param data
   */
  function renderSchemaModels(data: any) {
    setSchemaFieldsState(data?.fields);
    setSchemaRelationsState(data.relations);
    setSchemaModelsState(data?.models);

    // Add models as nodes in the canvas
    const nodes = getNodesFromData(data?.models?.data || {});
    const edges = getEdgesFromRelations(data?.relations?.data || {});

    setNodes(() => [...nodes]);
    setEdges(() => [...edges]);
  }

  return { renderSchemaModels };
}
