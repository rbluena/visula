import { DataType } from "@/types";

const dataTypes: {
  label: DataType;
  value: DataType;
}[] = [
  { label: "String", value: "String" },
  { label: "Text", value: "Text" },
  { label: "RichText", value: "RichText" },
  { label: "Int", value: "Int" },
  { label: "Decimal", value: "Decimal" },
  { label: "Boolean", value: "Boolean" },
  { label: "Location", value: "Location" },
  { label: "Object", value: "Object" },
  { label: "Date", value: "Date" },
  { label: "List", value: "List" },
  { label: "Media", value: "Media" },
  { label: "Relation", value: "Relation" },
];

export default dataTypes;
