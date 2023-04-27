import { Node } from "reactflow";
import { NodesState } from "@/lib/client/store/nodes";
import { ModelData } from "@/types";
import createNodeComponent from "./createNodeComponent";

export function getNodesFromData(data: NodesState["data"]) {
  const nodes = Object.keys(data).map((itemKey) =>
    getNodeFromData(data[itemKey])
  );
  return nodes;
}

export function getNodeFromData(data: ModelData): Node {
  const Component = createNodeComponent(data.kind, {
    modelId: data.id,
    name: data.name,
    comment: data.comment,
    unique: data.unique,
  });

  return {
    id: data.id,
    position: data.position,
    selected: data.selected,
    className: "model-node__wrapper",
    // dragHandle: ".model-node__drag-handle",
    data: {
      label: Component,
    },
  };
}
