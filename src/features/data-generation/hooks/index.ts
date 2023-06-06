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
      // console.log(genData);

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
        // console.log(item);

        return {
          rowId: index,
          cells: fields.map((field) => ({
            type: "text",
            text: item[field.fieldId] ? item[field.fieldId] : "",
            nonEditable: true,
          })),
        } as Row;
      });

      console.log(rows);

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
