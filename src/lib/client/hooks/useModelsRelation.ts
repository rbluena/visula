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
  const { updateRelation, removeRelation, data } = useModelRelationStore();
  const edgeUpdateSuccessful = useRef(false);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onNodeConnect = useCallback((edge: any) => {
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
    });
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeUpdateSuccessful.current = true;
      const sourceFieldId = oldEdge!.sourceHandle || "";
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
      removeRelation(edge.source);
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  return {
    onEdgeUpdateStart,
    onNodeConnect,
    onEdgeUpdate,
    onEdgeUpdateEnd,
  };
}
