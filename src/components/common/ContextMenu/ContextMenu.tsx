import * as ContextMenu from "@radix-ui/react-context-menu";
import camelCase from "lodash/camelCase";
import { ReactNode, useRef, useEffect, KeyboardEvent, MouseEvent } from "react";
import { useReactFlow } from "reactflow";
import { v4 as uuidV4 } from "uuid";
import { ModelData, useNodesStore } from "@/lib/client/store/nodes";
import { getNodeFromData } from "@/lib/client/common/dataAndNodes";

type Props = {
  children: ReactNode;
};

const ContextMenuComponent = ({ children }: Props) => {
  const addNewNode = useNodesStore((state) => state.addNode);
  const flowInstance = useReactFlow();
  const inputRef = useRef<HTMLDivElement>(null);
  const clientPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  function onContextMenu(evt: MouseEvent<HTMLSpanElement>) {
    clientPosRef.current.x = evt.clientX;
    clientPosRef.current.y = evt.clientY;
  }

  function createNewModel(evt: Event) {
    const canvasViewPort = flowInstance.getViewport();
    const { setNodes, addNodes } = flowInstance;

    const position = {
      x: clientPosRef.current.x - canvasViewPort.x,
      y: clientPosRef.current.y - canvasViewPort.y,
    };

    const onInputKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
      evt.preventDefault();
      const modelName = inputRef.current?.innerText as string;
      const isBackspaceKey = event.key.toLowerCase() === "backspace";
      const isEscapeKey = event.key.toLowerCase() === "escape";
      const isEnterKey = event.key.toLowerCase() === "enter";

      if (isEscapeKey || (isBackspaceKey && modelName?.length === 1)) {
        setNodes((nodes) => nodes.filter((item) => item.id !== "newnodeinput"));
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
          selected: false,
          name: modelName,
          unique: camelCase(modelName),
          data: {},
          fields: [],
        };

        addNewNode(nodeData);
        setNodes((nodes) => [
          ...nodes.filter((item) => item.id !== "newnodeinput"),
          getNodeFromData(nodeData),
        ]);

        return;
      }
    };

    addNodes({
      id: "newnodeinput",
      position,
      data: {
        label: (
          <div
            contentEditable
            className="px-2 py-1 rounded-xl shadow-md text-[14px] min-w-[60px] border-none outline outline-blue-300  focus:border-none active:border-none  focus:outline-offset-2 focus:outline-yellow-400 w-fit bg-white"
            ref={inputRef}
            onKeyDown={onInputKeyDown}
          />
        ),
      },
    });
  }

  useEffect(() => {
    inputRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRef.current]);

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger onContextMenu={onContextMenu}>
        {children}
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <CanvasMenu createNewModel={createNewModel} />
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

type MenuProps = {
  createNewModel: (evt: Event) => void;
};

const CanvasMenu = ({ createNewModel }: MenuProps) => {
  return (
    <ContextMenu.Content
      className="min-w-[220px] bg-white rounded-md overflow-hidden p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
      // align="end"
      alignOffset={5}
    >
      <ContextMenu.Item
        onSelect={createNewModel}
        className="group text-[13px] leading-none text-violet-800 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet-600 data-[highlighted]:text-white"
      >
        Add model
        {/* <div className="ml-auto pl-5 text-violet-800 group-data-[highlighted]:text-white group-data-[disabled]:text-slate-400">
          ⌘+[
        </div> */}
      </ContextMenu.Item>
      {/* <ContextMenu.Item className="group text-[13px] leading-none text-violet-800 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet-600 data-[highlighted]:text-white">
        Add comment
      </ContextMenu.Item>

      <ContextMenu.Separator className="h-[1px] bg-violet-400 m-[5px]" />

      <ContextMenu.Label className="pl-[25px] text-xs leading-[25px] text-slate-400">
        Design
      </ContextMenu.Label>

      <ContextMenu.Item className="group text-[13px] leading-none text-violet-800 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet-600 data-[highlighted]:text-white">
        Download contentful
      </ContextMenu.Item> */}
    </ContextMenu.Content>
  );
};

export default ContextMenuComponent;
