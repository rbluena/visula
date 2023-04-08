import { Node } from "reactflow";
import { ModelData, ModelField, NodesState } from "../store/nodes";
import createNodeComponent from "./createNodeComponent";

export function getNodesFromData(data: NodesState["data"]) {
  const nodes = Object.keys(data).map((itemKey) =>
    getNodeFromData(data[itemKey])
  );
  return nodes;
}

export function getNodeFromData(data: ModelData | ModelField): Node {
  const Component = createNodeComponent(data.kind, {
    name: data.name,
    fields: data.fields,
    comment: data.comment,
  });

  return {
    id: data.id,
    position: data.position,
    className: "model-node__wrapper",
    dragHandle: ".model-node__drag-handle",
    data: {
      label: Component,
    },
  };
}
