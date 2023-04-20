import { getNodesFromData } from "@/lib/client/common/dataAndNodes";
import { useNodesStore } from "@/lib/client/store/nodes";
import { ContextMenu } from "@/components";

import ReactFlow, {
  Background,
  Controls,
  useEdgesState,
  useNodesState,
  Node,
  Edge,
} from "reactflow";
import { useModelsRelation } from "@/lib/client/hooks/useModelsRelation";

type Props = {
  showEditor: boolean;
};

const NodeEditor = ({ showEditor }: Props) => {
  const { deleteModel, data } = useNodesStore((state) => state);
  const {
    onNodeConnect,
    onEdgeUpdate,
    onEdgeUpdateEnd,
    onEdgeUpdateStart,
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

  function onEdgesDeleted(edges: Edge[]) {
    if (edges.length) {
      // edges.forEach((edge) => deleteRelation(edge));
    }
  }

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
          attributionPosition="bottom-left"
        >
          <Controls />
          <Background />
        </ReactFlow>
      </ContextMenu>
    </div>
  );
};

export default NodeEditor;
