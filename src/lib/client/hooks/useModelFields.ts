import { ModelField } from "@/types";
import { useNodesStore } from "@/lib/client/store/nodes";
// import { useModelsRelation } from "./useModelsRelation";

export default function useModelField() {
  const {
    updateField: updateStoreModelField,
    addField: creatNewField,
    deleteField,
  } = useNodesStore((state) => state);
  // const { onDeleteRelation } = useModelsRelation();

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
    // onDeleteRelation(fieldId);
  }

  return {
    updateModelField,
    createModelField,
    deleteModelField,
  };
}
