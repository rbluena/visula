import { useNodesStore } from "../store/nodes";

export default function useRelationalModel(activeModelId: string) {
  const { modelIds, data } = useNodesStore((state) => state);

  // Model can have more than one connection to fields
  // A field could be one to one or one to many relation
  // Should check if is already connect to avoid multiple connections

  const targetModels = modelIds
    .filter((id) => id !== activeModelId)
    .map((id) => ({
      id,
      unique: data[id].unique as string,
      name: data[id].name,
    }));

  return {
    targetModels,
  };
}
