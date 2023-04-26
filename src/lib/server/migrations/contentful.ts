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
      const ${modelContentType}  = migration
            .createContentType("${model.unique}")
            .name("${model.name}")
            .description(${model?.description || '""'});
    `;

    // TODO: Media should support one or many assets (:checked)
    // TODO: Instead of max and min length, we should use { size: {min, max} }. (:checked)
    // TODO: Remove fieldID from validation from client side. (:checked)
    // TODO: Add JSON object as data type on the client. (:checked)
    // TODO: Adding relationship to fields.
    // TODO: Editing modelId and modelName on the client side.
    // TODO: Fixing relation when deleting field
    // TODO: Currently we don't support default values and complex validations like regex.
    // TODO: Review validationssss

    model.fields.forEach((field) => {
      const fieldType = `${modelContentType}
                            .createField("${field.fieldID}", {
                              type: "${dataTypeMap[field.dataType]}",
                              required: ${field.validations?.required || false},
                              localized: ${
                                field.validations?.localized || false
                              },
                            })`;

      const generatedValidations = `
                              ${fieldType}${getAttachingValidations(
        field.dataType,
        field.validations
      )}`;

      script += `
        ${generatedValidations}
      `;
    });

    return script;
  });

  return contentTypeCodes;
}
