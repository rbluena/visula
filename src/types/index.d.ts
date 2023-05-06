import { Edge, Node } from "reactflow";

export type UserProject = {
  id: string;
  name?: string;
  description?: string;
  lastUpdate?: Date;
  settings: Record<string, any>;
};

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
  hasManyAssets?: boolean; // If dataType is media, media can accept one or more than one asset
  relationHasMany?: boolean; // If dataType is media, media can accept one or more than one asset
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
  | "String"
  | "Text"
  | "Int"
  | "Decimal"
  | "RichText"
  | "Boolean"
  | "Location"
  | "Date"
  // | "Array"
  | "Object"
  | "List"
  | "Media"
  | "Relation";

export type ValidationItem = {
  id: "required" | "unique" | "max" | "min" | "localized";
  name: string;
  description?: string;
  default: string | boolean;
  type: "text" | "number" | "boolean" | "options";
};

export type ModelRelation = {
  sourceModelId: string;
  sourceFieldId: string;
  targetModelId: string | null;
  hasMany: boolean;
  label?: string;
};

export type Validations = any;
export type ModelRelationNode = Node & ModelRelation;
