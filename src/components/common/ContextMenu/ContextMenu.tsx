import * as ContextMenu from "@radix-ui/react-context-menu";
import camelCase from "lodash/camelCase";
import {
  ReactNode,
  useRef,
  useEffect,
  KeyboardEvent,
  MouseEvent,
  forwardRef,
  useState,
} from "react";
import { useReactFlow } from "reactflow";
import { v4 as uuidV4 } from "uuid";
import { ModelData } from "@/types";
import { useNodesStore } from "@/lib/client/store/nodes";
import { getNodeFromData } from "@/lib/client/common/dataAndNodes";

type Props = {
  children: ReactNode;
};

const ContextMenuComponent = ({ children }: Props) => {
  const addNewNode = useNodesStore((state) => state.addNode);
  const flowInstance = useReactFlow();
  const inputRef = useRef<HTMLDivElement>(null);
  const clientPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const modelIdRef = useRef();

  function onContextMenu(evt: MouseEvent<HTMLElement>) {
    clientPosRef.current.x = evt.clientX;
    clientPosRef.current.y = evt.clientY;
    modelIdRef.current = evt.target
      ?.closest("[data-id]")
      ?.getAttribute("data-id");

    flowInstance.setNodes((nodes) =>
      nodes.filter((nodeItem) => nodeItem.id !== "newnodeinput")
    );

    if (evt.target?.classList.contains("react-flow__pane")) {
      setMenuItems([
        {
          key: 12322,
          label: "Model",
          action: null,
          shortcut: "⌘+N",
          type: "label",
        },
        {
          key: 23000,
          label: "Add",
          action: createNewModel,
          shortcut: "⌘+N",
          type: "item",
        },
      ]);
    } else {
      setMenuItems([
        {
          key: 12222,
          label: "Model",
          action: null,
          shortcut: "⌘+N",
          type: "label",
        },
        { key: 535555, label: "Delete", action: deleteCurrentModel },
      ]);
    }

    // console.log(evt.target);
  }

  function deleteCurrentModel() {
    const model = flowInstance.getNode(modelIdRef.current || "");

    if (model) {
      flowInstance.deleteElements({ nodes: [model] });
    }
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
        <CanvasMenu menuItems={menuItems} />
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

type MenuProps = {
  menuItems: { label: string; action: string }[];
};

const CanvasMenu = forwardRef<any, MenuProps>(({ menuItems }, ref) => {
  return (
    <ContextMenu.Content
      className="min-w-[220px] bg-white rounded-md overflow-hidden p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
      // align="end"
      alignOffset={5}
      ref={ref}
    >
      {menuItems.map((item: any) => {
        if (item.type === "label") {
          return (
            <ContextMenu.Label
              key={item.key}
              className="pl-[25px] text-xs leading-[25px] text-slate-400"
            >
              {item.label}
            </ContextMenu.Label>
          );
        }

        return (
          <ContextMenu.Item
            key={item.key}
            onSelect={item.action}
            className="group text-[13px] leading-none text-violet-800 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-violet-400 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet-600 data-[highlighted]:text-white"
          >
            {item.label}

            <span className="block ml-auto pl-5 text-violet-800 group-data-[highlighted]:text-white">
              {item?.shortcut ? item.shortcut : null}
            </span>

            {/* <div className="ml-auto pl-5 text-violet-800 group-data-[highlighted]:text-white group-data-[disabled]:text-slate-400">

        </div> */}
          </ContextMenu.Item>
        );
      })}

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
});

CanvasMenu.displayName = "CanvasMenuComponent";

export default ContextMenuComponent;
