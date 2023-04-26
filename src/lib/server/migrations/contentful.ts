import { ModelData, ModelRelation } from "@/types";
import { dataTypeMap, getAttachingValidations } from "../mappings/contentful";
// import { Migration } from 'contentful-migration'

export function createMigrationCode(
  models: Record<string, ModelData>,
  relations: Record<string, ModelRelation>
) {
  const modelsKeys = Object.keys(models);
  // const relationsKeys = Object.keys(relations);

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

    // TODO: Media should support one or many assets (:checked)
    // TODO: Instead of max and min length, we should use { size: {min, max} }. (:checked)
    // TODO: Remove fieldID from validation from client side. (:checked)
    // TODO: Add JSON object as data type on the client. (:checked)
    // TODO: Show generated code on the client side
    // TODO: Adding relationship to fields.
    // TODO: Editing modelId and modelName on the client side.
    // TODO: Fixing relation when deleting field
    // TODO: Currently we don't support default values and complex validations like regex.
    // TODO: Review validationssss
    // TODO: Make edges draggable around

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
              type: "Array",
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
              type: "Array",
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
              ${getAttachingValidations(field.dataType, field.validations)}
            ])
          `;

          return fieldType;
        }

        fieldType = `
            ${fieldType}.validations([
              ${getAttachingValidations(field.dataType, field.validations)}
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

  return `module.exports = function(migration){${contentTypeCodes.join(" ")}}`;
}
