import { useRef, useEffect, useCallback } from "react";
import { getNodesFromData } from "@/lib/client/common/dataAndNodes";
import { useNodesStore } from "@/lib/client/store/nodes";
import { ContextMenu } from "@/components";

import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
  updateEdge,
  Edge,
  Node,
  Connection,
} from "reactflow";

type Props = {
  showEditor: boolean;
};

const NodeEditor = ({ showEditor }: Props) => {
  const {
    deleteConnection,
    deleteModel,
    data,
    // connections,
    createConnection,
  } = useNodesStore((state) => state);
  const initialNodesData = getNodesFromData(data);
  const initialEdgesData: any[] = [];
  const [nodes, _, onNodesChange] = useNodesState(initialNodesData);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdgesData);

  const edgeUpdateSuccessful = useRef(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeUpdateSuccessful.current = true;
      setEdges((els) => updateEdge(oldEdge, newConnection, els));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onEdgeUpdateEnd = useCallback((_: any, edge: Edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      deleteConnection(edge.source);
    }

    edgeUpdateSuccessful.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * When node is deleted from the canvas
   * @param deletedNode
   */
  function onNodesDeleted(deletingNode: Node[]) {
    return deleteModel(deletingNode[0]?.id);
  }

  /**
   *
   */
  const onConnect = useCallback(
    (newEdge: any) =>
      setEdges((edgs) => {
        if (newEdge.target !== newEdge.source) {
          createConnection(newEdge);
          return addEdge(newEdge, edgs);
        }

        return edges;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRef.current]);

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
          onConnect={onConnect}
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
