// /* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useRef } from "react";
import { addEdge, updateEdge, useReactFlow, Edge, Connection } from "reactflow";
import { useModelRelationStore } from "@/lib/client/store/relations";
import getStyledEdge from "../common/getStyledEdge";
import { ModelRelation } from "@/types";
import getEdgeId from "../common/getEdgeId";

export function useModelsRelation() {
  const { setEdges, deleteElements, getEdge } = useReactFlow();
  const {
    updateRelation,
    removeRelationFromStore,
    disconnectRelationTargetModel,
    relationIds,
    data,
  } = useModelRelationStore((state) => state);
  const edgeUpdateSuccessful = useRef(false);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onNodeConnect = useCallback(
    (conn: Connection) => {
      // Add edge to the casnvas
      setEdges((edges) => {
        const edge = conn as Edge;
        // Avoid connecting a field to its own parent model
        if (edge.target === edge.source) {
          return edges;
        }

        const sourceFieldId = edge.sourceHandle || null;
        const targetModelId = edge.targetHandle as string;

        if (sourceFieldId?.length) {
          const relationData = {
            ...data[sourceFieldId],
          } as ModelRelation;

          const uniqueSet = new Set([
            ...(relationData.connectedTargetModels || []),
            targetModelId,
          ]);

          relationData.connectedTargetModels = Array.from(uniqueSet);

          updateRelation(sourceFieldId, relationData);
          const styledEdge = getStyledEdge(edge);
          styledEdge.label = relationData.hasMany ? "Has many" : "Has one";

          return addEdge(styledEdge, edges);
        }

        return edges;
      });
    },
    [data, setEdges, updateRelation]
  );

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeUpdateSuccessful.current = true;

      const oldSourceFieldId = oldEdge?.sourceHandle || "";
      const oldTargetModelId = oldEdge?.targetHandle || "";
      const targetModelId = newConnection.targetHandle;

      const newEdgeId = getEdgeId(newConnection);

      if (targetModelId?.length && !getEdge(newEdgeId)) {
        const relationData: ModelRelation = {
          ...data[oldSourceFieldId],
        };

        // Maintaining uniquiness with target IDs
        relationData.connectedTargetModels = Array.from(
          new Set([
            ...(relationData.connectedTargetModels || []).filter(
              (id) => id !== oldTargetModelId
            ),
            targetModelId,
          ])
        );

        updateRelation(oldSourceFieldId, relationData);

        setEdges((els) => updateEdge(oldEdge, newConnection, els));
      }
    },
    [setEdges, data, updateRelation, getEdge]
  );

  const onEdgeUpdateEnd = useCallback(
    (_: any, edge: Edge) => {
      if (!edgeUpdateSuccessful.current) {
        deleteElements({ edges: [edge] });
      }
    },
    [deleteElements]
  );

  const deleteRelation = (edge: Edge) => {
    const sourceFieldId = edge.sourceHandle || "";
    removeRelationFromStore(sourceFieldId);
  };

  /**
   * When field is deleted, we delete relation associated to it
   * @param fieldId
   */
  const onDeletingConnectedField = (fieldId: string) => {
    removeRelationFromStore(fieldId);
    // Delete edge from canvas
    setEdges((eds) => eds.filter((e) => e.sourceHandle !== fieldId));
  };

  const onEdgesDeleted = useCallback(
    (edges: Edge[]) => {
      if (edges.length) {
        edges.forEach((edge: Edge) => {
          const sourceFieldId = edge.sourceHandle || "";
          const targetModelId = edge.targetHandle || "";
          disconnectRelationTargetModel(sourceFieldId, targetModelId);
        });
      }
    },
    [disconnectRelationTargetModel]
  );

  // Check connections
  function checkFieldIsConnected(sourceFieldId: string) {
    const relationData = data[sourceFieldId];

    if (relationData && relationData.connectedTargetModels.length > 0) {
      // Relational field is connected, we return the relationalData
      return relationData;
    }

    return null;
  }

  function checkTargetModelIsConnected(modelId: string) {
    return relationIds
      .map((fieldId) => ({ ...data[fieldId] }))
      .find((relationData) =>
        relationData.connectedTargetModels.includes(modelId)
      );
  }

  return {
    onEdgeUpdateStart,
    onNodeConnect,
    onEdgeUpdate,
    onEdgeUpdateEnd,
    deleteRelation,
    onDeletingConnectedField,
    onEdgesDeleted,
    checkTargetModelIsConnected,
    checkFieldIsConnected,
  };
}
