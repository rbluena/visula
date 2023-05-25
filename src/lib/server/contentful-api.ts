import {
  CMSAccessTokenDetails,
  ModelData,
  ModelField,
  ModelRelation,
} from "@/types";
import {
  ContentFields,
  KeyValueMap,
  createClient,
} from "contentful-management";
import { dataTypeMap, getAttachingValidations } from "./mappings/contentful";
import { isEmpty } from "lodash";

/**
 *
 * @param model
 * @returns
 */
export function convertModelToContentful(model: ModelData) {
  const fields = model.fields as any;

  const contentfulFields: ContentFields<KeyValueMap>[] = fields.map(
    (field: ModelField & { relation: any }) => {
      return {
        id: field.fieldId,
        name: field.name,
        required: field.validations?.required || false,
        localized: field.validations?.localized || false,
        type: dataTypeMap[field.dataType],

        ...(!["List", "Media", "Relation"].includes(field.dataType) && {
          type: dataTypeMap[field.dataType],
        }),

        ...(field.dataType === "List" && {
          type: "Array",
          items: { type: "Symbol" },
        }),

        ...(field.dataType === "Media" && {
          ...(field.hasManyAssets
            ? { type: "Array", items: { type: "Link", linkType: "Asset" } }
            : { type: "Link", linkType: "Asset" }),
        }),

        ...(field.dataType === "Relation" && {
          ...(field.relation?.hasMany
            ? {
                type: "Array",
                items: {
                  type: "Link",
                  linkType: "Entry",
                  validations: [
                    {
                      linkContentType:
                        field.relation?.connectedTargetModels?.map(
                          (item: any) => item.modelId
                        ) || [],
                    },
                  ],
                },
              }
            : {
                type: "Link",
                linkType: "Entry",
                validations:
                  field.relation?.connectedTargetModels?.map(
                    (item: any) => item?.modelId
                  ) || [],
              }),
        }),

        validations: [
          ...JSON.parse(
            getAttachingValidations(field.dataType, field.validations)
          ),
        ],
      };
    }
  );

  const modelData: ContentfulModel = {
    name: model.name,
    fields: contentfulFields,
  };

  return modelData;
}

export function deploySchemaToContentful({
  models,
  fields,
  relations,
}: {
  models: Record<string, ModelData> | undefined;
  fields: Record<string, ModelField>;
  relations: Record<string, ModelRelation> | undefined;
}) {
  if (isEmpty(models)) {
    throw Error(
      "This schema does not have any models to deploy. Please verify the schema design."
    );
  }

  const modelsKeys = Object.keys(models);

  return modelsKeys.map((modelKey) => {
    const modelData = models[modelKey] as ModelData;
    const modelID = modelData?.modelId || modelData.id;

    // @ts-ignore
    const contenfulFields: ContentFields<KeyValueMap>[] = modelData.fields.map(
      (fieldId: string) => {
        let targetId = "";
        let targetModelUniqueIdentity = "";

        let relationTargetModelsIds = [];

        const field = fields[fieldId] as ModelField;

        if (!isEmpty(relations) && field.dataType === "Relation") {
          relationTargetModelsIds = relations[field.id].connectedTargetModels;
        }

        if (field.dataType === "Relation") {
          // targetId = relations[field.id].targetModelId || "";
          targetModelUniqueIdentity = models[targetId]?.modelId || "";
        }

        return {
          id: field.fieldId,
          name: field.name,
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
        // environmentId,
        // spaceId,
      },
      model: {
        name: modelData.name,
        description: modelData?.description || "",
        fields: contenfulFields,
      },
    };
  });
}

export function getContentfulClient({
  accessToken,
  spaceId,
  environmentId,
}: CMSAccessTokenDetails) {
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
