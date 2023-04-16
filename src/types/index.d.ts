import { Node } from "reactflow";

export type ModelID = {
  id: string;
  unique?: string;
  name: string;
};

export type ModelField = {
  kind: "field";
  id: string;
  fieldID: string;
  name: string;
  description?: string;
  comment?: string;
  dataType: DataType;
  validations: Partial<ValidationItem>[];
};

export type ModelData = Node & {
  kind: "model";
  id: string;
  unique?: string;
  name: string;
  selected: Boolean;
  description?: string;
  comment?: string;
  fields: ModelField[];
};

export type DataType =
  | "Int"
  | "Decimal"
  | "String"
  | "Text"
  | "RichText"
  | "Media"
  | "Date"
  | "Array"
  | "List"
  | "Relation";

export type ValidationItem = {
  id: "required" | "unique" | "minLength" | "maxLength" | "localized";
  name: string;
  description: string;
  default: string | boolean;
  type: "text" | "boolean" | "options";
};
