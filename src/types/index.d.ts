import { Edge, Node } from "reactflow";

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
  validations: Validations;
};

export type ModelData = Node & {
  kind: "model";
  id: string;
  unique?: string;
  modelId?: string;
  name: string;
  selected: Boolean;
  description?: string;
  comment?: string;
  fields: ModelField[];
};

export type ModelNode = Node & ModelData;

export type DataType =
  | "Int"
  | "Decimal"
  | "String"
  | "Text"
  | "RichText"
  | "Boolean"
  | "Coordinates"
  | "Media"
  | "Date"
  | "Array"
  | "JSON"
  | "List"
  | "Relation";

export type ValidationItem = {
  id: "required" | "unique" | "minLength" | "maxLength" | "localized";
  name: string;
  description?: string;
  default: string | boolean;
  type: "text" | "boolean" | "options";
};

export type ModelRelation = {
  sourceModelId: string;
  sourceFieldId: string;
  targetModelId: string | null;
  hasMany: boolean;
  label?: string;
};

export type Validations = {
  [ValidationItem[id]]?: string | boolean | number;
};

export type ModelRelationNode = Node & ModelRelation;
