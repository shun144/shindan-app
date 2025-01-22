import { memo } from "react";
import type { TotalTableData } from "@/db/functions/total";
import { flexRender, Table } from "@tanstack/react-table";

type Props = {
  table: Table<TotalTableData>;
};

const TotalTableHead = ({ table }: Props) => {
  return (
    <thead className="text-sm text-gray-700 uppercase bg-gray-200 ">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <th
                key={header.id}
                colSpan={header.colSpan}
                style={{
                  maxWidth: header.getSize(),
                }}
              >
                {header.isPlaceholder ? null : (
                  <div
                    className={`px-3 py-3 ${
                      header.column.getCanSort() ? "cursor-pointer select-none" : ""
                    }`}
                    onClick={header.column.getToggleSortingHandler()}
                    title={
                      header.column.getCanSort()
                        ? header.column.getNextSortingOrder() === "asc"
                          ? "昇順ソート"
                          : header.column.getNextSortingOrder() === "desc"
                          ? "降順ソート"
                          : "元の並びに戻す"
                        : undefined
                    }
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: "↑",
                      desc: "↓",
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};

export default memo(TotalTableHead);
