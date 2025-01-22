import { useState, memo, useMemo } from "react";
import type { TotalTableData } from "@/db/functions/total";
import useTotaltable from "@/features/total/hooks/useTotaltable";
import { getTotalTableColumns } from "./columns";
import Pagination from "./Pagination";
import TotalTableHead from "./TotalTableHead";
import TotalTableBody from "./TotalTableBody";
import TotalTableSearch from "./TotalTableSearch";

type Props = {
  totalTableData: TotalTableData[];
};

const TotalTable = ({ totalTableData }: Props) => {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

  const totalTableColumns = useMemo(
    () => getTotalTableColumns({ expandedRows, setExpandedRows }),
    [expandedRows]
  );

  const { table, globalFilter, setGlobalFilter } = useTotaltable({
    totalTableData,
    totalTableColumns,
  });

  return (
    <div className="max-w-full w-11/12 mx-auto sm:px-6 lg:py-8">
      <div className="bg-white overflow-hidden shadow-sm">
        <div className="pb-3 px-6">
          {/* 検索フォーム */}
          <TotalTableSearch globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />

          {/* テーブル */}
          <table className="w-full text-sm text-left rtl:text-right text-gray-700">
            {/* テーブルヘッダー*/}
            <TotalTableHead table={table} />

            {/* テーブル本体 */}
            <TotalTableBody
              table={table}
              expandedRows={expandedRows}
              colLength={totalTableColumns.length}
            />
          </table>

          {/* ページネーション */}
          <Pagination table={table} />
        </div>
      </div>
    </div>
  );
};
export default memo(TotalTable);

// import { useState, memo, Fragment, useMemo, useCallback } from "react";
// import DebouncedInput from "@/components/input/DebouncedInput";
// import { IoSearchOutline } from "react-icons/io5";
// import ExpandableRow from "../ExpandableRow";
// import { AnimatePresence } from "framer-motion";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   flexRender,
//   createColumnHelper,
//   getSortedRowModel,
//   SortingState,
// } from "@tanstack/react-table";
// import { TotalTableData } from "@/db/functions/total";

// type Props = {
//   totalTableData: TotalTableData[];
// };

// const columnHelper = createColumnHelper<TotalTableData>();

// const TotalTable = ({ totalTableData }: Props) => {
//   const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [globalFilter, setGlobalFilter] = useState("");
//   const toggleRow = (rowIndex: number) => {
//     setExpandedRows((prev) => ({
//       ...prev,
//       [rowIndex]: !prev[rowIndex],
//     }));
//   };

//   const columns = useMemo(
//     () => [
//       columnHelper.accessor("id", {
//         header: "ID",
//         size: 20,
//       }),
//       columnHelper.accessor("title", {
//         header: "診断タイトル",
//       }),
//       columnHelper.accessor("totalCount", {
//         header: "合計",
//         size: 25,
//         cell: ({ getValue }) => <div className="text-start">{getValue()}</div>,
//       }),

//       // columnHelper.accessor((row) => row.answerHistories.reduce((sum, history) => sum + history.count, 0), {
//       //   header: "合計",
//       //   size: 25,
//       //   cell: ({ getValue }) => <div className="text-start">{getValue()}</div>,
//       // }),
//       columnHelper.display({
//         id: "viewGraph",
//         header: "内訳",
//         size: 25,
//         cell: ({ row }) => (
//           <button
//             onClick={() => {
//               toggleRow(row.index);
//             }}
//             className={`select-none transtion-all duration-200
//               ${
//                 expandedRows[row.index]
//                   ? "text-red-400 hover:text-red-700"
//                   : "text-indigo-400 hover:text-indigo-700"
//               }`}
//           >
//             {expandedRows[row.index] ? "閉じる" : "表示"}
//           </button>
//         ),
//       }),
//     ],
//     [expandedRows]
//   );

//   const table = useReactTable({
//     data: totalTableData,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     onSortingChange: setSorting,
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     state: {
//       sorting,
//       globalFilter,
//     },
//     defaultColumn: {
//       size: 200,
//     },
//   });

//   const handleChange = useCallback(
//     (value: string) => {
//       setGlobalFilter(value);
//     },
//     [setGlobalFilter]
//   );

//   return (
//     <div className="max-w-full w-11/12 mx-auto sm:px-6 lg:py-8">
//       <div className="bg-white overflow-hidden shadow-sm">
//         <div className="pb-3 px-6">
//           {/* 検索 */}
//           <div className="flex justify-start items-center h-24">
//             <div className="h-12 bg-slate-600 px-2 rounded-l">
//               <IoSearchOutline className="h-full block text-white" />
//             </div>

//             <div className="h-full flex justify-center items-center">
//               <DebouncedInput
//                 value={globalFilter ?? ""}
//                 onChange={handleChange}
//                 className="w-96 h-12 bg-transparent outline-none border rounded-r border-slate-300 focus:ring-0 focus:border-blue-500 placeholder:text-slate-400"
//                 placeholder="検索"
//               />
//             </div>
//           </div>

//           {/* テーブル */}
//           <table className="w-full text-sm text-left rtl:text-right text-gray-700">
//             <thead className="text-sm text-gray-700 uppercase bg-gray-200 ">
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <tr key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => {
//                     return (
//                       <th
//                         key={header.id}
//                         colSpan={header.colSpan}
//                         style={{
//                           maxWidth: header.getSize(),
//                         }}
//                       >
//                         {header.isPlaceholder ? null : (
//                           <div
//                             className={`px-3 py-3 ${
//                               header.column.getCanSort() ? "cursor-pointer select-none" : ""
//                             }`}
//                             onClick={header.column.getToggleSortingHandler()}
//                             title={
//                               header.column.getCanSort()
//                                 ? header.column.getNextSortingOrder() === "asc"
//                                   ? "昇順ソート"
//                                   : header.column.getNextSortingOrder() === "desc"
//                                   ? "降順ソート"
//                                   : "元の並びに戻す"
//                                 : undefined
//                             }
//                           >
//                             {flexRender(header.column.columnDef.header, header.getContext())}
//                             {{
//                               asc: "↑",
//                               desc: "↓",
//                             }[header.column.getIsSorted() as string] ?? null}
//                           </div>
//                         )}
//                       </th>
//                     );
//                   })}
//                 </tr>
//               ))}
//             </thead>
//             <tbody>
//               {table.getRowModel().rows?.length ? (
//                 table.getRowModel().rows.map((row) => (
//                   <Fragment key={row.id}>
//                     <tr
//                       key={row.id}
//                       data-state={row.getIsSelected() && "selected"}
//                       className="bg-white border-b "
//                     >
//                       {row.getVisibleCells().map((cell) => (
//                         <td
//                           key={cell.id}
//                           className="px-2 py-2"
//                           style={{
//                             maxWidth: `${cell.column.getSize()}px`,
//                             overflow: "hidden",
//                             overflowWrap: "break-word",
//                           }}
//                         >
//                           {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                         </td>
//                       ))}
//                     </tr>

//                     {/* グラフ表示 */}
//                     <AnimatePresence>
//                       {expandedRows[row.index] && (
//                         <ExpandableRow
//                           key={`graph_${row.id}`}
//                           flowId={row.original.id}
//                           colLength={columns.length}
//                           answerNum={row.original.answerNum}
//                         />
//                       )}
//                     </AnimatePresence>
//                   </Fragment>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={columns.length} className="h-24 text-center">
//                     対象レコード0件
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           {/* ページネーション */}
//           <div className="flex items-center justify-center mt-4 gap-8">
//             <div className="w-12 flex justify-center gap-2">
//               <button
//                 onClick={() => table.previousPage()}
//                 disabled={!table.getCanPreviousPage()}
//                 className="p-1 border border-gray-300 px-2 disabled:opacity-30 select-none cursor-pointer"
//               >
//                 {"<"}
//               </button>
//               <button
//                 onClick={() => table.nextPage()}
//                 disabled={!table.getCanNextPage()}
//                 className="p-1 border border-gray-300 px-2 disabled:opacity-30 select-none cursor-pointer"
//               >
//                 {">"}
//               </button>
//             </div>

//             <div className="flex items-center">
//               <div className="text-gray-500">{`${
//                 table.getState().pagination.pageIndex + 1
//               } / ${table.getPageCount()}`}</div>
//             </div>

//             <select
//               value={table.getState().pagination.pageSize}
//               onChange={(e) => table.setPageSize(Number(e.currentTarget.value))}
//               className="py-2 pr-8 bg-transparent cursor-pointer select-none border-1 border-slate-200 text-slate-600 focus:ring-0 focus:border-blue-500 text-sm"
//             >
//               {[10, 20, 30, 50].map((pageSize) => (
//                 <option key={pageSize} value={pageSize}>
//                   {`${pageSize} 行表示`}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default memo(TotalTable);
