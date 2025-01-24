import { createColumnHelper } from "@tanstack/react-table";
import ViewGraphButton from "./ViewGraphButton";
import { Dispatch, SetStateAction } from "react";
import type { TotalTableData } from "@/db/functions/total";

type Args = {
  expandedRows: Record<number, boolean>;
  setExpandedRows: Dispatch<SetStateAction<Record<number, boolean>>>;
};

const columnHelper = createColumnHelper<TotalTableData>();

// const test = columnHelper.accessor("id", {
//   header: "ID",
//   size: 20,
// });

// const test2 = columnHelper.accessor("totalCount", {
//   header: "合計",
//   size: 25,
//   cell: ({ getValue }) => <div className="text-start">{getValue()}</div>,
// });

export const getTotalTableColumns = ({ expandedRows, setExpandedRows }: Args) => {
  const totalTableColumns = [
    columnHelper.accessor("id", {
      header: "ID",
      size: 20,
    }),
    columnHelper.accessor("title", {
      header: "診断タイトル",
    }),
    columnHelper.accessor("totalCount", {
      header: "合計",
      size: 25,
      cell: ({ getValue }) => <div className="text-start">{getValue()}</div>,
    }),
    columnHelper.display({
      id: "viewGraph",
      header: "内訳",
      size: 25,
      cell: ({ row }) => (
        <ViewGraphButton row={row} expandedRows={expandedRows} setExpandedRows={setExpandedRows} />
      ),
    }),
  ];

  return totalTableColumns;
};
