import { Edge, MarkerType } from "reactflow";

export default function getStyledEdge(edge: Edge): Edge {
  return {
    ...edge,
    // type: "smoothstep",
    interactionWidth: 25,
    style: {
      strokeWidth: 2.5,
      stroke: "#08a3fa",
    },
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 8,
    labelBgStyle: {
      fill: "#08a3fa",
      fillOpacity: 0.7,
    },
    labelStyle: {
      color: "#ffffff",
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      height: 10,
      width: 10,
      color: "#08a3fa",
    },
  };
}
