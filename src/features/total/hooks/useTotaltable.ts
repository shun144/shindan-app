import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  // ColumnDef,
  // AccessorKeyColumnDef,
  // DisplayColumnDef,
} from "@tanstack/react-table";
import { TotalTableData } from "@/db/functions/total";
import type { ColumnsType } from "@/features/total/types";

type Props = {
  totalTableColumns: ColumnsType<TotalTableData>;
  // totalTableColumns: ColumnDef<TotalTableData, any>[];
  // totalTableColumns: (DisplayColumnDef<TotalTableData> | AccessorKeyColumnDef<TotalTableData>)[];
  totalTableData: TotalTableData[];
};

const useTotaltable = ({ totalTableColumns, totalTableData }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: totalTableData,
    columns: totalTableColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    defaultColumn: {
      size: 200,
    },
  });

  return { table, globalFilter, setGlobalFilter };
};

export default useTotaltable;
