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
  Array: "Array",
  List: "Array", // { "type": "Array", "items": { "type": "Symbol" } }
  Media: "Link", // { "type": "Array", "items": { "type": "Link", "linkType": "Asset" } }
  Relation: "Link", // { "type": "Array", "items": { "type": "Link", "linkType": "Entry" } }
};

export const validationMap = {
  unique: {
    // Used with:
    // - String
    // - Interger
    // - Number
  },
  size: {
    // Used only with:
    // - Text
    // - Symbol
    // - Rich
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
};

export function getAttachingValidations(
  type: keyof typeof dataTypeMap,
  validations: any
) {
  return `
    .validations(${formatValidations(type, validations)})
  `;
}

function formatValidations(type: keyof typeof dataTypeMap, validations: any) {
  return Object.keys(validations)
    .map((key) => {
      if (["required", "localized", "fieldID"].includes(key)) {
        return null;
      }

      if (key === "unique") {
        return { unique: validations[key] };
      }

      if (key === "size") {
        if (type === "Date") {
          return { dateRange: validations[key] };
        }

        if (type === "Decimal" || type === "Int") {
          return { range: validations[key] };
        }

        if (["String", "Text", "RichText", "Array"].includes(type)) {
          return { size: validations[key] };
        }
      }

      return null;
    })
    .filter((item) => item !== null);
}
