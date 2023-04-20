/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useRef } from "react";
import {
  addEdge,
  updateEdge,
  useReactFlow,
  Edge,
  MarkerType,
  Connection,
} from "reactflow";
import { useModelRelationStore } from "@/lib/client/store/relations";

export function useModelsRelation() {
  const { setEdges } = useReactFlow();
  const { updateRelation, removeRelationFromStore, relationIds, data } =
    useModelRelationStore((state) => state);
  const edgeUpdateSuccessful = useRef(false);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onNodeConnect = useCallback(
    (edge: Edge) => {
      // Add edge to the canvas
      setEdges((edges) => {
        // Avoid connectiong field to its parent model
        if (edge.target === edge.source) {
          return edges;
        }

        const sourceFieldId = edge.sourceHandle || null;
        const targetModelId = edge.targetHandle as string;

        if (sourceFieldId?.length) {
          const relationData = { ...data[sourceFieldId], targetModelId };

          updateRelation(sourceFieldId, relationData);

          edge.labelBgStyle = {
            fill: "#FFCC00",
            color: "#fff",
            fillOpacity: 0.7,
            strokeWidth: 30,
          };
          edge.type = "smoothstep";
          edge.interactionWidth = 25;
          edge.label = relationData.hasMany ? "Has many" : "Has one";
          edge.labelBgPadding = [8, 4];
          edge.labelBgBorderRadius = 8;

          if (relationData.hasMany) {
            edge.markerEnd = {
              type: MarkerType.ArrowClosed,
            };
          }

          return addEdge(edge, edges);
        }

        return edges;
      });
    },
    [data]
  );

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeUpdateSuccessful.current = true;
      const sourceFieldId = oldEdge.sourceHandle || "";
      const targetModelId = newConnection.target;

      const relationData = { ...data[sourceFieldId], targetModelId };
      updateRelation(sourceFieldId, relationData);

      setEdges((els) => updateEdge(oldEdge, newConnection, els));
    },
    [setEdges]
  );

  const onEdgeUpdateEnd = useCallback((_: any, edge: Edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      removeRelationFromStore(edge.source);
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const deleteRelation = (edge: Edge) => {
    const sourceFieldId = edge.sourceHandle || "";
    removeRelationFromStore(sourceFieldId);
  };

  /**
   * When field is deleted, we delete relation
   * @param fieldId
   */
  const onDeleteRelation = (fieldId: string) => {
    // If field has relation, then delete the field relation from the store
    const relationData = data[fieldId];

    removeRelationFromStore(fieldId);
    // Delete edge from canvas
    setEdges((eds) =>
      eds.filter((e) => e.sourceHandle !== relationData.sourceFieldId)
    );
  };

  // Check connections
  function checkFieldIsConnected(sourceFieldId: string) {
    const relationData = data[sourceFieldId];

    if (relationData && relationData.targetModelId?.length) {
      // Relational field is connected, we return the relationalData
      return relationData;
    }

    return null;
  }

  function checkTargetModelIsConnected(modelId: string) {
    return relationIds
      .map((fieldId) => ({ ...data[fieldId] }))
      .find((relationData) => relationData.targetModelId === modelId);
  }

  return {
    onEdgeUpdateStart,
    onNodeConnect,
    onEdgeUpdate,
    onEdgeUpdateEnd,
    deleteRelation,
    onDeleteRelation,
    checkTargetModelIsConnected,
    checkFieldIsConnected,
  };
}
