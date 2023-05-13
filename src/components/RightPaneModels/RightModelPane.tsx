import { Node, useOnSelectionChange, useReactFlow } from "reactflow";
import isEmpty from "lodash/isEmpty";
import { useModelStore } from "@/lib/client/store/models";
import useModels from "@/lib/client/hooks/useModels";
import Model from "./Model";

type Props = {
  showMultipleModels: boolean;
};

const RightModelPane = ({ showMultipleModels }: Props) => {
  const { setNodes, setCenter, getZoom, deleteElements } = useReactFlow();
  const setActiveModel = useModelStore((state) => state.setActiveModel);
  const { getModelsData, selectedActiveModel } = useModels();

  const modelsData = getModelsData();

  // Node being selected from the canvas
  // the we have to open model content on the right pane
  // TODO: This probably should be moved somewhere else.
  useOnSelectionChange({
    onChange: ({ nodes }) => setActiveModel(nodes[0]?.id),
  });

  /**
   *
   * @param modelId
   */
  function onSelectingModel(modelId: string) {
    let currSelectingNode;

    setNodes((nodes) => {
      return nodes.map((item) => {
        if (modelId === item.id && !item.selected) {
          item.selected = true;
          currSelectingNode = item as Node;
        } else {
          item.selected = false;
        }

        return item;
      });
    });

    if (currSelectingNode) {
      setCenter(
        Number(currSelectingNode!.position.x + 200),
        currSelectingNode!.position.y,
        {
          duration: 500,
          zoom: getZoom(),
        }
      );
    }
  }

  /**
   * Removing model node from canvas, hence the model will deleted automatically,
   * ref: NodeEditor component
   * @param modelData Model details
   */
  function onDeletingModel(id: string) {
    deleteElements({ nodes: [{ id }] });
  }

  return (
    <div className="p-4 space-y-4 overflow-y-auto overflow-x-hidden h-[calc(100vh-60px)] relative">
      {showMultipleModels
        ? modelsData?.map((modelData) => (
            <Model
              key={modelData.id}
              modelData={modelData}
              onSelectingModel={onSelectingModel}
              onDeletingModel={onDeletingModel}
              isSelectedModel={selectedActiveModel?.id === modelData.id}
            />
          ))
        : null}

      {!showMultipleModels && !isEmpty(selectedActiveModel) ? (
        <Model
          modelData={selectedActiveModel}
          onSelectingModel={onSelectingModel}
          onDeletingModel={onDeletingModel}
          isSelectedModel
        />
      ) : null}
    </div>
  );
};

export default RightModelPane;
