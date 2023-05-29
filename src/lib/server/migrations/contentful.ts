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
    const modelContentType = `${model.modelId}Type`;

    let script = `

      // Creating ${model.name}
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

        let modelFieldType = `
        // Creating field for "${model.name}"
        ${modelContentType}
          .createField("${field.fieldId}", {
            required: ${field.validations?.required || false},
            localized: ${field.validations?.localized || false}
          })
      `;

        if (!["List", "Media", "Relation"].includes(field.dataType)) {
          modelFieldType = `
          ${modelContentType}
          .type("${dataTypeMap[field.dataType]}")
        `;
        }

        if (field.dataType === "List") {
          modelFieldType = `${modelFieldType}.type("Array").linkType("Symbol")`;
        }

        // Creating assets and references
        if (field.dataType === "Media") {
          if (field.hasManyAssets) {
            modelFieldType = `${modelFieldType}.type("Array").items({ type: "Link", linkType: "Asset"})`;
          } else {
            modelFieldType = `${modelFieldType}.type("Link").linkType("Asset")`;
          }
        }

        //Referencess
        if (field.dataType === "Relation") {
          if (field.relationHasMany) {
            modelFieldType = `${modelFieldType}.type("Array").items({ type: "Link", linkType: "Entry" })`;
          } else {
            modelFieldType = `${modelFieldType}.type("Link").linkType("Entry")`;
          }
        }

        // Field validations
        if (field?.relation?.connectedModels) {
          modelFieldType = `${modelFieldType}.validations([{linkContentType: [${field.relation.connectedModels
            .map((item) => `"${item.modelId}"`)
            .toString()}]}, ${getAttachingValidations(
            field.dataType,
            field.validations
          ).slice(1, -1)}])`;
        } else {
          modelFieldType = `${modelFieldType}.validations([${getAttachingValidations(
            field.dataType,
            field.validations
          ).slice(1, -1)}])`;
        }

        return modelFieldType;
      })
      .join("");

    return `${script}
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
