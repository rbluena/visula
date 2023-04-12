import { ModelField } from "@/types";
import { useNodesStore } from "@/lib/client/store/nodes";

export default function useModelField() {
  const {
    updateField: updateStoreModelField,
    addField: creatNewField,
    deleteField,
  } = useNodesStore((state) => state);

  /**
   *
   * @param modelId String
   * @param fieldData Object
   * @returns
   */
  function updateModelField(modelId: string, fieldData: ModelField) {
    if (fieldData.name.length <= 1) {
      return;
    }

    updateStoreModelField(modelId, fieldData);
  }

  function createModelField(modelId: string, fieldData: ModelField) {
    creatNewField(modelId, fieldData);
  }

  function deleteModelField(modelId: string, fieldId: string) {
    deleteField(modelId, fieldId);
  }

  return {
    updateModelField,
    createModelField,
    deleteModelField,
  };
}
