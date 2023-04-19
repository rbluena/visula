import { getNodesFromData } from "@/lib/client/common/dataAndNodes";
import { useNodesStore } from "@/lib/client/store/nodes";
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
  showEditor: boolean;
};

const NodeEditor = ({ showEditor }: Props) => {
  const { deleteModel, data } = useNodesStore((state) => state);
  const { onNodeConnect, onEdgeUpdate, onEdgeUpdateEnd, onEdgeUpdateStart } =
    useModelsRelation();
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
