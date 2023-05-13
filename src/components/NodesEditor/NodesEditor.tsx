import { getNodesFromData } from "@/lib/client/common/dataAndNodes";
import { useModelStore } from "@/lib/client/store/models";
import { ContextMenu } from "@/components";

import ReactFlow, {
  Background,
  Controls,
  useEdgesState,
  useNodesState,
  Node,
} from "reactflow";
import { useModelsRelation } from "@/lib/client/hooks/useModelsRelation";

type Props = {
  showEditor?: boolean;
};

const NodeEditor = ({ showEditor = false }: Props) => {
  const { deleteModel, data } = useModelStore((state) => state);
  const {
    onNodeConnect,
    onEdgeUpdate,
    onEdgeUpdateEnd,
    onEdgeUpdateStart,
    onEdgesDeleted,
    // deleteRelation,
  } = useModelsRelation();
  const initialNodesData = getNodesFromData(data);
  const initialEdgesData: any[] = [];
  const [nodes, _, onNodesChange] = useNodesState(initialNodesData);
  const [edges, __, onEdgesChange] = useEdgesState(initialEdgesData);

  /**
   * When node is deleted from the canvas
   * @param deletedNode
   */
  function onNodesDeleted(deletingNode: Node[]) {
    deleteModel(deletingNode[0]?.id);
  }

  // function onEdgesDeleted(edges: Edge[]) {
  //   if (edges.length) {
  //     console.log("On edges deleted!", edges);
  //     // edges.forEach((edge) => deleteRelation(edge));
  //   }
  // }

  return (
    <div
      className={`${
        showEditor ? "" : "hidden"
      } w-full h-screen overflow-hidden`}
    >
      <ContextMenu>
        <ReactFlow
          onNodesChange={onNodesChange}
          onNodesDelete={onNodesDeleted}
          onEdgesDelete={onEdgesDeleted}
          onEdgesChange={onEdgesChange}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onConnect={onNodeConnect}
          nodes={nodes}
          edges={edges}
          // fitView
          attributionPosition="bottom-right"
        >
          <Controls />
          <Background />
        </ReactFlow>
      </ContextMenu>
    </div>
  );
};

export default NodeEditor;
