import { ModelData, ModelField, ModelRelation } from "@/types";
import { isEmpty } from "lodash";

let cache: {
  models?: Record<string, ModelData> | undefined;
  fields?: Record<string, ModelField> | undefined;
  relations?: Record<string, ModelRelation> | undefined;
} = {};

export default function prepeareModelToDeploy(
  id: string,
  clearCache: boolean = false
) {
  try {
    if (isEmpty(cache)) {
      const schema = {
        models: JSON.parse(
          sessionStorage.getItem("visula-schema-models") || "{}"
        )?.state?.data,
        fields: JSON.parse(
          sessionStorage.getItem("visula-schema-fields") || "{}"
        )?.state?.data,
        relations: JSON.parse(
          sessionStorage.getItem("visula-schema-relations") || "{}"
        )?.state?.data,
      };

      cache = {
        ...schema,
      };
    }

    const model = cache?.models?.[id];

    let preparedModel: any = null;

    // Clear cache after last item being created

    if (model) {
      preparedModel = getDeployableModel(model);
    }

    if (clearCache) {
      cache = {};
    }

    return preparedModel;
  } catch (error) {
    console.log(error);
  }
}

function getDeployableModel(model: ModelData) {
  return {
    ...model,
    fields: model.fields?.map((fieldKey) => {
      const field = cache.fields?.[fieldKey] as ModelField & {
        relation: any;
      };

      if (field) {
        field.relation = cache.relations?.[fieldKey];

        if (field?.relation) {
          //
          field.relation.connectedTargetModels =
            field.relation?.connectedTargetModels?.map((id: string) => {
              const connectedModel = cache?.models?.[id];
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
