import { Connection, Edge } from "reactflow";

export default function getEdgeId(data: Connection | Edge) {
  return `reactflow__edge-${data.source}${data.sourceHandle}-${data.target}${data.targetHandle}`;
}
