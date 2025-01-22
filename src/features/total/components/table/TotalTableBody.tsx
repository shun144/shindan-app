import { Fragment, memo } from "react";
import type { TotalTableData } from "@/db/functions/total";
import { flexRender, Table } from "@tanstack/react-table";
import { AnimatePresence } from "framer-motion";
import ExpandableRow from "../ExpandableRow";

type Props = {
  table: Table<TotalTableData>;
  expandedRows: Record<number, boolean>;
  colLength: number;
};

const TotalTableBody = ({ table, expandedRows, colLength }: Props) => {
  return (
    <tbody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <Fragment key={row.id}>
            <tr
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className="bg-white border-b "
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-2 py-2"
                  style={{
                    maxWidth: `${cell.column.getSize()}px`,
                    overflow: "hidden",
                    overflowWrap: "break-word",
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>

            {/* グラフ表示 */}
            <AnimatePresence>
              {expandedRows[row.index] && (
                <ExpandableRow
                  key={`graph_${row.id}`}
                  flowId={row.original.id}
                  colLength={colLength}
                  answerNum={row.original.answerNum}
                />
              )}
            </AnimatePresence>
          </Fragment>
        ))
      ) : (
        <tr>
          <td colSpan={colLength} className="h-24 text-center">
            対象レコード0件
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default memo(TotalTableBody);
