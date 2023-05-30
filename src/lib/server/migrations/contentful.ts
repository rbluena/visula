import capitalize from "lodash/capitalize";
import { js_beautify } from "js-beautify";
import { ModelData, ModelField, ModelRelation } from "@/types";
import { dataTypeMap, getAttachingValidations } from "../mappings/contentful";
import { getFieldRelation } from "@/lib/shared/prepareSchema";

export function createMigrationCode(
  models: Record<string, ModelData>,
  fields: Record<string, ModelField>,
  relations: Record<string, ModelRelation>
) {
  const modelsKeys = Object.keys(models) || [];

  const contentTypeCodes = modelsKeys.map((key: string) => {
    const model = models[key] as ModelData;
    const modelContentType = `${capitalize(model.modelId)}ContentType`;

    let script = `

      // Creating new content type ${model.name}
      const ${modelContentType} = migration
          .createContentType("${model.modelId}")
          .name("${model.name}")
          .description("${model?.description || ""}");
    `;

    const fieldScript = model.fields
      ?.map((fieldKey) => {
        const field = fields?.[fieldKey];

        if (field.dataType === "Relation") {
          field.relation = getFieldRelation(field.id, models, relations);
        }

        // const fieldType = `${field.fieldId}FieldType`;

        let fieldScript = `
        // Creating field for "${model.name}"
        ${modelContentType}
          .createField("${field.fieldId}", {
            required: ${field.validations?.required || false},
            localized: ${field.validations?.localized || false}
          })
          .name("${field.name}")
      `;

        if (!["List", "Media", "Relation"].includes(field.dataType)) {
          fieldScript += `.type("${dataTypeMap[field.dataType]}")`;
        }

        if (field.dataType === "List") {
          fieldScript += `.type("Array").linkType("Symbol")`;
        }

        // Creating assets and references
        if (field.dataType === "Media") {
          if (field.hasManyAssets) {
            fieldScript += `.type("Array").items({ type: "Link", linkType: "Asset"})`;
          } else {
            fieldScript += `.type("Link").linkType("Asset")`;
          }
        }

        //Referencess
        if (field.dataType === "Relation") {
          if (field.relationHasMany) {
            fieldScript += `.type("Array").items({ type: "Link", linkType: "Entry", validations: [{ linkContentType: ${field?.relation?.connectedModels
              ?.map((item) => `"${item.modelId}"`)
              .toString()} }]})`;
          } else {
            fieldScript += `.type("Link").linkType("Entry")`;
          }
        }

        // Field validations
        if (!field.relationHasMany && field?.relation?.connectedModels) {
          fieldScript += `.validations([{linkContentType: [${field.relation.connectedModels
            .map((item) => `"${item.modelId}"`)
            .toString()}]}, ${getAttachingValidations(
            field.dataType,
            field.validations
          ).slice(1, -1)}])
          `;
        } else {
          fieldScript += `.validations([${getAttachingValidations(
            field.dataType,
            field.validations
          ).slice(1, -1)}])
          `;
        }

        return fieldScript;
      })
      .join("");

    return `
    ${script}
    ${fieldScript}`;
  });

  return js_beautify(
    `module.exports = function(migration){${contentTypeCodes.join(" ")}}`,
    {
      indent_size: 2,
      max_preserve_newlines: 2,
      end_with_newline: true,
      wrap_line_length: 0,
      break_chained_methods: true,
    }
  );
}
