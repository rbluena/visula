import { Edge, Node, XYPosition } from "reactflow";

export type UserProject = {
  id: string;
  name?: string;
  description?: string;
  updatedAt?: Date;
  projectSetting: Record<string, any>;
};

export type SchemaData = {
  id: string;
  name: string;
  description?: string;
  tag?: string;
  data: string;
  projectId?: string;
  createdAt: string;
  updatedAt?: string;
};

export type ModelData = {
  id: string;
  modelId: string;
  name: string;
  description?: string;
  comment?: string;
  fields: string[];
  position: XYPosition;
};

export type ModelField = {
  id: string;
  fieldId: string;
  parentId: string; // Model uuid
  name: string;
  comment?: string;
  dataType: DataType;
  isUnique?: boolean;
  isRequired?: boolean;
  hasManyAssets?: boolean;
  relationHasMany?: boolean;
  validations: Validations;
};

export type ModelRelation = {
  sourceModelId: string;
  sourceFieldId: string;
  connectedTargetModels: string[];
  hasMany: boolean;
  label?: string;
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
  | "Object"
  | "List"
  | "Media"
  | "Relation";

export type ValidationItem = {
  id: "required" | "unique" | "max" | "min" | "localized";
  name: string;
  description?: string;
  default: string | boolean;
  type: "text" | "number" | "boolean" | "options" | "date";
};

export type Validations = any;
export type ModelRelationNode = Node & ModelRelation;

export type CMSAccessTokenDetails = {
  accessToken: string;
  spaceId: string;
  environmentId: string;
};
