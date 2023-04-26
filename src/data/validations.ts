import { DataType, ValidationItem } from "@/types";

export const required = {
  id: "required",
  name: "Required",
  default: false,
  description: "Make this field required.",
  type: "boolean",
};

export const unique = {
  id: "unique",
  name: "Unique",
  default: false,
  description: "Avoid duplicate contents for this field.",
  type: "boolean",
};

export const localized = {
  id: "localized",
  name: "Locale",
  description: "Allow content of this field to be localized.",
  default: false,
  type: "boolean",
};

export const min = {
  id: "min",
  name: "Min",
  description: "",
  default: "",
  type: "number",
};

export const max = {
  id: "max",
  name: "Max",
  description: "",
  default: "",
  type: "number",
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

export function getInputFieldValidationsData(fieldDataType: DataType) {
  if (!fieldDataType?.length) {
    throw new Error("Field data type should be provided!");
  }

  const validationKeys = validations[fieldDataType];

  const fieldValidationsDefaultValues = validationKeys.reduce(
    (acc: Record<string, Object>, key) => {
      // @ts-ignore
      acc[key] = validationType[key].default;
      return acc;
    },
    {}
  );

  const fieldInputValidations = validationKeys.map((key: string) => {
    // @ts-ignore
    return validationType[key] as ValidationItem;
  });

  return {
    fieldValidationsDefaultValues,
    validationKeys,
    fieldInputValidations,
  };
}
