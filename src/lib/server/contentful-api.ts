import { ModelData, ModelRelation } from "@/types";
import {
  ContentFields,
  KeyValueMap,
  createClient,
} from "contentful-management";
import { dataTypeMap, getAttachingValidations } from "./mappings/contentful";

// export const spaceId = "bxxkqpw2bm2i";
// export const environmentId = "dev";
// export const accessToken = "CFPAT-6mxbx5vJv4bjpVPgeihcZ6dY74ab1tZKFcN5JHzX3EY";

export function deploySchemaToContentful(
  models: Record<string, ModelData>,
  relations: Record<string, ModelRelation>
) {
  const modelsKeys = Object.keys(models);

  return modelsKeys.map((modelKey) => {
    const modelData = models[modelKey] as ModelData;
    const modelID = modelData?.modelId || modelData.id;

    // @ts-ignore
    const fields: ContentFields<KeyValueMap>[] = modelData.fields.map(
      (field) => {
        let targetId = "";
        let targetModelUniqueIdentity = "";

        if (field.dataType === "Relation") {
          targetId = relations[field.id].targetModelId || "";
          targetModelUniqueIdentity = models[targetId]?.modelId || "";
        }

        return {
          id: field.fieldID,
          name: field.name,
          // apiName: field.fieldID, TODO: Use this only if we override already existing model
          required: field.validations?.required || false,
          localized: field.validations?.localized || false,
          type: dataTypeMap[field.dataType],

          ...(field.dataType === "List" && {
            type: "Array",
            items: { type: "Symbol" },
          }),

          ...(field.dataType === "Relation" && {
            ...(field.relationHasMany
              ? {
                  type: "Array",
                  items: {
                    type: "Link",
                    validations: [
                      { linkContentType: targetModelUniqueIdentity },
                    ],
                    linkType: "Entry",
                  },
                }
              : { type: "Link", linkType: "Entry" }),
          }),

          ...(field.dataType === "Media" && {
            ...(field.hasManyAssets
              ? { type: "Array", items: { type: "Link", linkType: "Asset" } }
              : { type: "Link", linkType: "Asset" }),
          }),

          validations: [
            ...JSON.parse(
              getAttachingValidations(field.dataType, field.validations)
            ),
          ],
        };
      }
    );

    return {
      apiClientParams: {
        contentTypeId: modelID,
        environmentId,
        spaceId,
      },
      model: {
        name: modelData.name,
        description: modelData?.description || "",
        fields,
      },
    };
  });
}

export function getContentfulClient() {
  const plainClient = createClient(
    {
      accessToken,
    },
    {
      type: "plain",
      defaults: {
        spaceId,
        environmentId,
      },
    }
  );

  return {
    entryClient: plainClient.entry,
    contentType: plainClient.contentType,
  };
}
