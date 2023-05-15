import { ModelField } from "@/types";
import { useModelsRelation } from "./useModelsRelation";
import { useModelStore } from "../store/models";
import { useFieldsStore } from "../store/fields";

export default function useModelField() {
  const { data, addField, updateField, deleteField } = useFieldsStore(
    (state) => state
  );
  const { onFieldCreated, onFieldDeleted } = useModelStore((state) => state);
  const { onDeletingConnectedField } = useModelsRelation();

  /**
   *
   * @param modelId String
   * @param fieldData Object
   * @returns
   */
  function updateModelField(fieldData: ModelField) {
    if (fieldData.name.length <= 1) {
      return;
    }

    updateField(fieldData);
  }

  function createModelField(parentId: string, fieldData: ModelField) {
    addField(fieldData);
    onFieldCreated(parentId, fieldData.id);
  }

  function deleteModelField(modelId: string, fieldId: string) {
    deleteField(fieldId);
    onFieldDeleted(modelId, fieldId);
    onDeletingConnectedField(fieldId);
  }

  function getModelFields(fieldIds: string[]) {
    return fieldIds.map((id) => ({
      ...data[id],
    }));
  }

  return {
    updateModelField,
    createModelField,
    deleteModelField,
    getModelFields,
    // updateFieldValidation,
  };
}
