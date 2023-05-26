import { useCallback } from "react";
import ReactFlow, {
  Background,
  useEdgesState,
  useNodesState,
  Node,
  MiniMap,
} from "reactflow";

import { getNodesFromData } from "@/lib/client/common/dataAndNodes";
import { useModelStore } from "@/lib/client/store/models";
import { ContextMenu } from "@/components";

import { useModelsRelation } from "@/lib/client/hooks/useModelsRelation";

function isNodeMoved(
  prevPosition: { x: number; y: number },
  currPosition: { x: number; y: number }
) {
  const isHorizontallyMoved =
    Math.abs(Math.trunc(prevPosition.x) - Math.trunc(currPosition.x)) > 25;
  const isVerticallyMoved =
    Math.abs(Math.trunc(prevPosition.y) - Math.trunc(currPosition.y)) > 25;

  return isHorizontallyMoved || isVerticallyMoved;
}

type Props = {
  showEditor?: boolean;
};

const NodeEditor = ({ showEditor = false }: Props) => {
  const { deleteModel, updateModel, data } = useModelStore((state) => state);
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

  /**
   * Updating position of the model
   * @param _
   * @param draggedNode
   */
  const onSelectionDragStop = useCallback(
    (_: any, draggedNode: Node) => {
      const model = data[draggedNode.id];

      if (model && isNodeMoved(model.position, draggedNode.position)) {
        updateModel({
          ...model,
          position: draggedNode.position,
        });
      }
    },
    [data, updateModel]
  );

  return (
    <div
      className={`${
        showEditor ? "" : "hidden"
      } w-full h-screen overflow-hidden`}
    >
      <ContextMenu>
        <ReactFlow
          onNodesChange={onNodesChange}
          onNodeDragStop={onSelectionDragStop}
          onNodesDelete={onNodesDeleted}
          onEdgesDelete={onEdgesDeleted}
          onEdgesChange={onEdgesChange}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onConnect={onNodeConnect}
          nodes={nodes}
          edges={edges}
          attributionPosition="bottom-right"
        >
          <Background />
          <MiniMap position="bottom-left" />
        </ReactFlow>
      </ContextMenu>
    </div>
  );
};

export default NodeEditor;
