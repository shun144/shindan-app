import { memo } from "react";
import type { TotalTableData } from "@/db/functions/total";
import { Table } from "@tanstack/react-table";

type Props = {
  table: Table<TotalTableData>;
};

const Pagination = ({ table }: Props) => {
  return (
    <div className="flex items-center justify-center mt-4 gap-8">
      <div className="w-12 flex justify-center gap-2">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30 select-none cursor-pointer"
        >
          {"<"}
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30 select-none cursor-pointer"
        >
          {">"}
        </button>
      </div>

      <div className="flex items-center">
        <div className="text-gray-500">{`${
          table.getState().pagination.pageIndex + 1
        } / ${table.getPageCount()}`}</div>
      </div>

      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => table.setPageSize(Number(e.currentTarget.value))}
        className="py-2 pr-8 bg-transparent cursor-pointer select-none border-1 border-slate-200 text-slate-600 focus:ring-0 focus:border-blue-500 text-sm"
      >
        {[10, 20, 30, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {`${pageSize} 行表示`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(Pagination);
