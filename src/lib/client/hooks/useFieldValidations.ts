import { useMemo } from "react";
import { validations, validationType } from "@/data/validations";
import { DataTypes } from "@/types";

type ValidationItem = {
  id:
    | "required"
    | "localize"
    | "unique"
    | "minLength"
    | "maxLength"
    | "localized";
  name: string;
  description: string;
  default: any;
  type: "text" | "boolean" | "options";
};

export default function useFieldValidations(dataType: DataTypes) {
  const fieldValidations = useMemo(() => {
    if (dataType.length < 2) {
      return [];
    }

    return validations[dataType];
  }, [dataType]);

  return {
    validations: fieldValidations.map((item) => {
      // @ts-ignore
      return validationType[item] as ValidationItem;
    }),
  };
}
