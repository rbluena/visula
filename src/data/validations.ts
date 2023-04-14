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

export const minLength = {
  id: "minLength",
  name: "Minimum length",
  description: "Minimum length of characters",
  default: 0,
  type: "text",
};

export const maxLength = {
  id: "maxLength",
  name: "Maximum length",
  description: "Maximum length of characters",
  default: 16000,
  type: "text",
};

export const lengthSize = {
  minLength,
  maxLength,
  type: "range",
};

export const validationType = {
  required,
  unique,
  localized,
  maxLength,
  minLength,
  lengthSize,
};

export const validations = {
  String: ["required", "unique", "minLength", "maxLength", "localized"],
  Text: ["required", "unique", "minLength", "maxLength", "localized"],
  RichText: ["required", "unique", "minLength", "maxLength", "localized"],
  Int: ["required", "unique", "localized"],
  Decimal: ["required", "unique", "localized"],
  List: ["required", "localized"],
  Media: ["required"], // Allowed media types
  Relation: ["required"],
  Date: ["required"],
  Array: ["required"],
};
