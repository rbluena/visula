import { js_beautify } from "js-beautify";
import { ModelData, ModelRelation } from "@/types";
import { dataTypeMap, getAttachingValidations } from "../mappings/contentful";

export function createMigrationCode(
  models: Record<string, ModelData>,
  relations: Record<string, ModelRelation>
) {
  const modelsKeys = Object.keys(models);

  const contentTypeCodes = modelsKeys.map((key: string) => {
    const model = models[key] as ModelData;
    const modelContentType = `${model.unique}Type`;

    let script = `
      // Creating ${model.name}
      const ${modelContentType}  = migration
            .createContentType("${model.unique}")
            .name("${model.name}")
            .description(${model?.description || '""'});
    `;

    const fieldSourceCode = model.fields
      .map((field) => {
        let fieldType = `
        // Creating field for "${model.name}"
        ${modelContentType}
        .createField("${field.fieldID}", {
          type: "${dataTypeMap[field.dataType]}",
          required: ${field.validations?.required || false},
          localized: ${field.validations?.localized || false},
        })
        `;

        // Creating links for assets and references.
        if (field.dataType === "Media") {
          const items = field.hasManyAssets
            ? `
            .items({
              type: "Link",
              linkType: "Asset",
            })
          `
            : `
              .linkType("Asset")
          `;

          fieldType = `
          ${fieldType}
          ${items}
        `;
        }

        if (field.dataType === "Relation") {
          const targetId = relations[field.id].targetModelId;
          const targetModelUniqueIdentity =
            models[targetId || ""]?.unique || "";

          const items = field.relationHasMany
            ? `
            .items({
              type: "Link",
              linkType: "Entry",
            })
          `
            : `
              .linkType("Entry")
          `;

          fieldType = `
            ${fieldType}
            ${items}
            .validations([
              { linkContentType: ["${targetModelUniqueIdentity}"]},
              ${getAttachingValidations(
                field.dataType,
                field.validations
                // Removing beginning and ending square brackets
              ).slice(1, -1)}
            ])
          `;

          return fieldType;
        }

        fieldType = `
            ${fieldType}.validations([
              ${getAttachingValidations(
                field.dataType,
                field.validations
              ).slice(1, -1)}
          ])
        `;

        return fieldType;
      })
      .join("");

    return `
      ${script}
      ${fieldSourceCode}
    `;
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
