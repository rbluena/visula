import { useMemo } from "react";
import {
  getFieldValidationDefaultValues,
  validations,
  validationType,
} from "@/data/validations";
import { DataType, ValidationItem } from "@/types";

export default function useFieldValidations(
  dataType: DataType,
  currValidations: Object | undefined,
  isNewFieldInput: boolean
) {
  const dataTypeValidationKeys = useMemo(
    () => validations[dataType],
    [dataType]
  );

  return {
    validationKeys: dataTypeValidationKeys,
    fieldValidationDefaultValues: getFieldValidationDefaultValues(
      dataTypeValidationKeys
    ),
    validations: dataTypeValidationKeys.map((key) => {
      // @ts-ignore
      const valid = validationType[key] as ValidationItem;

      if (!isNewFieldInput) {
        // @ts-ignore
        valid.default = currValidations?.[key] ?? valid.default;
      }

      return valid;
    }),
  };
}
