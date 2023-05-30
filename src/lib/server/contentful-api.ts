import { CMSAccessTokenDetails, ModelData, ModelField } from "@/types";
import {
  ContentFields,
  KeyValueMap,
  createClient,
} from "contentful-management";
import { dataTypeMap, getAttachingValidations } from "./mappings/contentful";

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
