import { Edge, Node } from "reactflow";
import { ModelData } from "@/types";
import createNodeComponent from "./createNodeComponent";
import { ModelsState } from "@/lib/client/store/models";
import { ModelRelationState } from "../store/relations";
import getStyledEdge from "./getStyledEdge";

export function getNodesFromData(data: ModelsState["data"]) {
  const nodes = Object.keys(data).map((itemKey) =>
    getNodeFromData(data[itemKey])
  );
  return nodes;
}

export function getNodeFromData(data: ModelData): Node {
  const Component = createNodeComponent({
    id: data.id,
    modelId: data.modelId,
    name: data.name,
    comment: data.comment,
  });

  return {
    id: data.id,
    position: data.position,
    // selected: data.selected,
    className: "model-node__wrapper",
    data: {
      label: Component,
    },
  };
}

export function getEdgesFromRelations(data: ModelRelationState["data"]) {
  let edges: any[] = [];

  Object.keys(data).forEach((key) => {
    const modelRelation = data[key];

    if (modelRelation?.connectedTargetModels?.length > 0) {
      edges = [
        ...edges,
        ...modelRelation.connectedTargetModels?.map((item) => {
          const edge = {
            source: modelRelation.sourceModelId,
            sourceHandle: modelRelation.sourceFieldId,
            target: item,
            targetHandle: item,
          } as Edge;

          const styledEdge = getStyledEdge(edge);

          styledEdge.label = modelRelation.hasMany ? "Has many" : "Has one";

          return styledEdge;
        }),
      ];
    }
  });

  return edges;
}
