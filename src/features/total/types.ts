import {
  DisplayColumnDef,
  AccessorKeyColumnDef,
  GroupColumnDef,
  RowData,
} from "@tanstack/react-table";

export type ColumnsType<TData extends RowData> = (
  | DisplayColumnDef<TData>
  | AccessorKeyColumnDef<TData>
  | GroupColumnDef<TData>
)[];
