import { Row, Column } from "@silevis/reactgrid";
import { isEmpty } from "lodash";
import { ModelField } from "@/types";
import { useGeneratorStore } from "../store";

export function useDataGenerator() {
  const { data } = useGeneratorStore((state) => state);

  function getModelGeneratedData(modelId: string) {
    return data[modelId] as {
      schemaId: string;
      modelId: string;
      data: any[];
    };
  }

  /**
   *
   * @param fields
   * @param data
   * @returns
   */
  function getGridData(fields: ModelField[], data: any = []) {
    try {
      const genData = JSON.parse(data);

      if (isEmpty(fields) || isEmpty(genData)) {
        return;
      }

      const columns: Column[] = fields.map((field) => ({
        columnId: field.name,
        reorderable: true,
        resizable: true,
      }));

      const headerRow: Row = {
        rowId: "header",
        cells: fields.map((field) => ({ type: "header", text: field.name })),
      };

      const rows: Row[] = genData.map((item: any, index: number) => {
        return {
          rowId: index,
          cells: fields.map((field) => {
            const val = item[field.fieldId] ? item[field.fieldId] : "";

            return {
              ...(typeof val === "number" || typeof val === "object"
                ? {
                    type: "text",
                    text: JSON.stringify(val),
                  }
                : { type: "text", text: val }),
              nonEditable: true,
            };
          }),
        } as Row;
      });

      return {
        headerRow,
        columns,
        rows,
      };
    } catch (error) {
      return;
    }
  }

  return {
    getModelGeneratedData,
    getGridData,
  };
}
