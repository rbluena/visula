import { useCallback } from "react";
import { addEdge, useReactFlow, Edge, MarkerType } from "reactflow";
import { useModelRelationStore } from "@/lib/client/store/relations";

export function useModelsRelation() {
  const { updateRelation, data } = useModelRelationStore();
  const { setEdges } = useReactFlow();

  const onNodeConnect = useCallback((edge: Edge) => {
    // Add edge to the canvas
    setEdges((edges) => {
      // Avoid connectiong field to itself
      if (edge.target === edge.source) {
        return edges;
      }

      const sourceFieldId = edge!.sourceHandle || "";
      const targetModelId = edge.targetHandle as string;
      const relationData = { ...data[sourceFieldId], targetModelId };

      updateRelation(sourceFieldId, relationData);

      edge.labelBgStyle = {
        fill: "#FFCC00",
        color: "#fff",
        fillOpacity: 0.7,
        strokeWidth: 30,
      };
      edge.type = "step";
      edge.interactionWidth = 25;
      edge.label = relationData.hasMany ? "Only one" : "Has many";
      edge.labelBgPadding = [8, 4];
      edge.labelBgBorderRadius = 4;
      edge.markerEnd = {
        type: MarkerType.ArrowClosed,
      };

      return addEdge(edge, edges);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    onNodeConnect,
  };
}
