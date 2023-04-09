import {
  MouseEvent,
  useRef,
  useEffect,
  KeyboardEvent,
  useCallback,
} from "react";
import { v4 as uuidV4 } from "uuid";
import {
  getNodeFromData,
  getNodesFromData,
} from "@/lib/client/common/dataAndNodes";
import { ModelData, useNodesStore } from "@/lib/client/store/nodes";

import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  updateEdge,
  Edge,
  Connection,
} from "reactflow";

type Props = {
  showEditor: boolean;
};

const NodeEditor = ({ showEditor }: Props) => {
  const {
    addNode: addNewNode,
    deleteConnection,
    data,
    // connections,
    createConnection,
  } = useNodesStore((state) => state);
  const initialNodesData = getNodesFromData(data);
  const initialEdgesData: any[] = [];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodesData);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdgesData);
  const flowInstance = useReactFlow();

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
      console.log(edge);
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      deleteConnection(edge.source);
    }

    edgeUpdateSuccessful.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  /**
   *
   * @param evt
   */
  function onContextMenu(evt: MouseEvent<HTMLDivElement>) {
    evt.preventDefault();

    if (
      evt.target instanceof HTMLElement &&
      evt.target.className.split(" ").includes("react-flow__pane")
    ) {
      const canvasViewport = flowInstance.getViewport();

      const position = {
        x: evt.clientX - canvasViewport.x,
        y: evt.clientY - canvasViewport.y,
      };

      /**
       *
       * @param evt
       * @returns
       */
      const onInputKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
        evt.preventDefault();
        const modelName = inputRef.current?.innerText as string;
        const isBackspaceKey = event.key.toLowerCase() === "backspace";
        const isEscapeKey = event.key.toLowerCase() === "escape";
        const isEnterKey = event.key.toLowerCase() === "enter";

        if (isEscapeKey || (isBackspaceKey && modelName?.length === 1)) {
          setNodes([...nodes]);
          return;
        }

        if (isEnterKey) {
          event.preventDefault();
          if (Number(modelName?.length) <= 1) {
            return;
          }

          const nodeData: ModelData = {
            kind: "model",
            id: uuidV4(),
            position,
            name: modelName,
            fields: [],
          };

          addNewNode(nodeData);
          setNodes([...nodes, getNodeFromData(nodeData)]);

          return;
        }
      };

      /**
       * Adding an input component to the node
       */
      setNodes(() => [
        {
          id: "uuiid",
          position: { x: position.x, y: position.y },
          isConnectable: false,
          data: {
            label: (
              <div
                contentEditable
                className="px-2 rounded-xl shadow-md border-none outline-none focus:outline-2 focus:border-none active:border-none  focus:outline-offset-1 focus:outline-blue-400 w-fit bg-white"
                ref={inputRef}
                onKeyDown={onInputKeyDown}
              />
            ),
          },
        },
        ...nodes,
      ]);
    }
  }

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
      <ReactFlow
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onConnect={onConnect}
        onContextMenu={onContextMenu}
        nodes={nodes}
        edges={edges}
        // fitView
        attributionPosition="bottom-left"
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default NodeEditor;
