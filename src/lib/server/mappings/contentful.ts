export const spaceId = "bxxkqpw2bm2i";
export const environmentId = "dev";
export const accessToken = "CFPAT-6mxbx5vJv4bjpVPgeihcZ6dY74ab1tZKFcN5JHzX3EY";

export const dataTypeMap = {
  String: "Symbol", // { "type": "Symbol" }
  Text: "Text",
  Int: "Integer",
  Decimal: "Number",
  RichText: "RichText",
  Boolean: "Boolean",
  Location: "Location",
  Date: "Date",
  Object: "Object",
  // Array: "Array",
  List: "Array", // { "type": "Array", "items": { "type": "Symbol" } }
  Media: "Link", // { "type": "Array", "items": { "type": "Link", "linkType": "Asset" } }
  Relation: "Link", // { "type": "Array", "items": { "type": "Link", "linkType": "Entry" } }
};

export const validationMap = {
  unique: {
    // Used with:
    // - Symbol
    // - Interger
    // - Number
  },
  size: {
    // Used only with:
    // - Text
    // - Symbol
    // - Array
    // - RichText
    min: 0,
    max: 20,
  },
  range: {
    // Used only with Number and Interger
    min: 0,
    max: 20,
  },
  dateRange: {
    // Used with Date
    min: "",
    max: "",
  },
  assetFileSize: {
    min: "",
    max: "",
  },
};

export function getAttachingValidations(
  type: keyof typeof dataTypeMap,
  validations: any
) {
  return `
    .validations(${JSON.stringify(formatValidations(type, validations))})
  `;
}

function formatValidations(type: keyof typeof dataTypeMap, validations: any) {
  return (
    Object.keys(validations)
      .map((key) => {
        if (
          ["required", "localized"].includes(key) ||
          !validations[key].toString().length
        ) {
          return null;
        }

        if (key === "unique") {
          return { unique: validations[key] };
        }

        if (key === "min") {
          if (type === "Date") {
            return {
              dateRange: { min: validations["min"], max: validations["max"] },
            };
          }

          if (type === "Decimal" || type === "Int") {
            return {
              range: { min: validations["min"], max: validations["max"] },
            };
          }

          if (type === "Media") {
            return {
              assetFileSize: {
                min: validations["min"],
                max: validations["max"],
              },
            };
          }

          if (["String", "Text", "RichText", "Array"].includes(type)) {
            return {
              size: { min: validations["min"], max: validations["max"] },
            };
          }
        }

        return null;
      })
      .filter((item) => item !== null) || "[]"
  );
}
