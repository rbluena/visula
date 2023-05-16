// import { useMemo } from "react";
import {
  getInputFieldValidationsData,
  // validations,
  // validationType,
} from "@/data/validations";
import { DataType } from "@/types";

export default function useFieldValidations(dataType: DataType) {
  const {
    fieldValidationsDefaultValues,
    validationKeys,
    fieldInputValidations,
  } = getInputFieldValidationsData(dataType);

  return {
    validationKeys,
    fieldValidationsDefaultValues,
    validationInputsData: fieldInputValidations,
  };
}
