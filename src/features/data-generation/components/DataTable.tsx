import React, { useState } from "react";
import { ReactGrid, Column, Row, Id } from "@silevis/reactgrid";

type Props = {
  gridData: {
    headerRow: Row;
    columns: Column[];
    rows: Row[];
  };
};

const DataTable = ({ gridData }: Props) => {
  const [columns, setColumns] = useState<Column[]>(() => gridData.columns);

  function handleColumnResize(ci: Id, width: number) {
    setColumns((prevColumns) => {
      const columnIndex = prevColumns.findIndex((el) => el.columnId === ci);
      const resizedColumn = prevColumns[columnIndex];
      const updatedColumn = { ...resizedColumn, width };
      prevColumns[columnIndex] = updatedColumn;
      return [...prevColumns];
    });
  }

  return (
    <ReactGrid
      rows={[gridData.headerRow, ...gridData.rows]}
      columns={columns}
      stickyTopRows={1}
      onColumnResized={handleColumnResize}
      enableRangeSelection
      enableFillHandle
    />
  );
};

export default DataTable;
