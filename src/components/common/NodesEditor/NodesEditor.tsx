import { NodesState, useNodesStore } from "@/lib/client/store/nodes";
import { MouseEvent, useRef, useEffect, KeyboardEvent } from "react";
import ReactFlow, {
  Background,
  Controls,
  Node,
  useNodesState,
  useReactFlow,
} from "reactflow";

type Props = {
  showEditor: boolean;
};

function getNodesFromData(data: NodesState["data"]) {
  console.log(data);
  return Object.keys(data).map((itemKey) => data[itemKey]);
}

const initialNodes: Node[] = [
  {
    id: "someidwentwell",
    position: { x: 100, y: 50 },
    data: {
      label: (
        <div>
          <h2>Papa</h2>
        </div>
      ),
    },
  },
];

const NodeEditor = ({ showEditor }: Props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const flowInstance = useReactFlow();
  const initialNodesData = useNodesStore((state) =>
    getNodesFromData(state.data)
  );

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
        const modelName = inputRef.current?.innerText;
        const isBackspaceKey = event.key.toLowerCase() === "backspace";
        const isEscapeKey = event.key.toLowerCase() === "escape";
        const isEnterKey = event.key.toLowerCase() === "enter";

        if (isEscapeKey || (isBackspaceKey && modelName?.length === 1)) {
          setNodes([]);
          return;
        }

        // if (isEnterKey) {
        //   if (modelName?.length === 2) return;
        // }

        if (isEnterKey) {
          event.preventDefault();
          if (Number(modelName?.length) <= 1) {
            return;
          }

          return;
        }
      };

      /**
       *
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
