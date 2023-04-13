import { Node } from "reactflow";

export type ModelID = {
  id: string;
  unique?: string;
  name: string;
};

export type ModelField = {
  kind: "field";
  id: string;
  unique?: string;
  name: string;
  description?: string;
  comment?: string;
  dataType: DataTypes;
  validations: Object[];
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

export type DataTypes =
  | "Int"
  | "Decimal"
  | "String"
  | "Text"
  | "RichText"
  | "Media"
  | "Relation";
