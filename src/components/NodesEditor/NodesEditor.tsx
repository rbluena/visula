import { MouseEvent, useRef, useEffect, KeyboardEvent } from "react";
import {
  getNodeFromData,
  getNodesFromData,
} from "@/lib/client/common/dataAndNodes";
import { ModelData, useNodesStore } from "@/lib/client/store/nodes";
import { v4 as uuidV4 } from "uuid";

import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useReactFlow,
} from "reactflow";

type Props = {
  showEditor: boolean;
};

const NodeEditor = ({ showEditor }: Props) => {
  const { addNode: addNewNode, data } = useNodesStore((state) => state);
  const initialNodesData = getNodesFromData(data);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodesData);
  const flowInstance = useReactFlow();

  const inputRef = useRef<HTMLDivElement>(null);

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
              <div>
                <div
                  contentEditable
                  className="px-2 rounded-xl shadow-md border-none outline-none focus:outline-2 focus:border-none active:border-none  focus:outline-offset-1 focus:outline-blue-400 w-fit bg-white"
                  ref={inputRef}
                  onKeyDown={onInputKeyDown}
                />
              </div>
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
        onContextMenu={onContextMenu}
        nodes={nodes}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default NodeEditor;
