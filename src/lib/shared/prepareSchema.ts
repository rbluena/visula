import { ModelData, ModelField, ModelRelation } from "@/types";

/**
 *
 * @param id Field ID
 */
export function getFieldRelation(
  id: string,
  models: Record<string, ModelData>,
  relations: Record<string, ModelRelation>
) {
  const relation = relations?.[id];

  return {
    hasMany: relation?.hasMany || false,
    connectedModels:
      relation?.connectedTargetModels?.map((key) => ({
        id: key,
        modelId: models[key].modelId,
        name: models[key].name,
      })) || [],
  };
}

export function prepareSchemaModel(model: ModelData, schema: any) {
  return {
    ...model,
    fields: model.fields?.map((fieldKey) => {
      const field = schema.fields?.[fieldKey] as ModelField & {
        relation: any;
      };

      if (field) {
        field.relation = schema.relations?.[fieldKey];

        if (field?.relation) {
          //
          field.relation.connectedTargetModels =
            field.relation?.connectedTargetModels?.map((id: string) => {
              const connectedModel = schema?.models?.[id];
              return {
                id,
                modelId: connectedModel?.modelId,
                name: connectedModel?.name,
              };
            });
        }
      }

      return field;
    }),
  };
}
