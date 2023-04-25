import { DataType } from "@/types";

export const required = {
  id: "required",
  name: "Required",
  default: false,
  type: "boolean",
};

export const unique = {
  id: "unique",
  name: "Unique",
  default: false,
  type: "boolean",
};

export const localized = {
  id: "localized",
  name: "Localize",
  description: "Allow to localize this field",
  default: false,
  type: "boolean",
};

export const min = {
  id: "min",
  name: "Min",
  description: "",
  default: 0,
  type: "text",
};

export const max = {
  id: "max",
  name: "Max",
  description: "",
  default: 16000,
  type: "text",
};

export const lengthSize = {
  min,
  max,
  type: "range",
};

export const validationType = {
  required,
  unique,
  localized,
  min,
  max,
};

export const validations: Record<DataType, string[]> = {
  Int: ["required", "unique", "min", "max", "localized"],
  Decimal: ["required", "unique", "min", "max", "localized"],
  String: ["required", "unique", "min", "max", "localized"],
  Text: ["required", "max", "min", "localized"],
  RichText: ["required", "unique", "min", "max", "localized"],
  Boolean: ["required", "localized"],
  Location: ["required", "localized"],
  Object: ["required", "localized"],
  // Array: ["required", "min", "max", "localized"],
  List: ["required", "min", "max", "localized"],
  Media: ["required", "min", "max", "localized"], // Allowed media types
  Relation: ["required", "localized"],
  Date: ["required", "min", "max", "localized"],
};

export function getFieldValidationDefaultValues(validationKeys: string[]) {
  return validationKeys.reduce((acc: Record<string, Object>, key) => {
    // @ts-ignore
    acc[key] = validationType[key].default;

    return acc;
  }, {});
}
