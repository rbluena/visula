import { Connection, Edge } from "reactflow";

export default function createEdgeId(data: Connection | Edge) {
  return `reactflow__edge-${data.source}${data.sourceHandle}-${data.target}${data.targetHandle}`;
}
