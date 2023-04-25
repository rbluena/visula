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

    // TODO: instead of max and min length, we should use size: {min, max}.
    // TODO: Remove fieldID from validations.
    // TODO: Use range for length and number, size for array.
    // TODO: Max length and minLength should use size.
    // TODO: Adding relationship to fields.

    // TODO: Currently we don't support default values and complex validations like regex.

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

    console.log(script);

    return script;
  });

  return contentTypeCodes;
}
