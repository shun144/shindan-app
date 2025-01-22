import { Row } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import type { TotalTableData } from "@/db/functions/total";
import { tv } from "tailwind-variants";

type Props = {
  row: Row<TotalTableData>;
  expandedRows: Record<number, boolean>;
  setExpandedRows: Dispatch<SetStateAction<Record<number, boolean>>>;
};

const buttonTv = tv({
  base: "select-none transtion-all duration-200",
  variants: {
    expanded: {
      true: "text-red-400 hover:text-red-700",
      false: "text-indigo-400 hover:text-indigo-700",
    },
  },
  defaultVariants: { expanded: false },
});

const ViewGraphButton = ({ row, expandedRows, setExpandedRows }: Props) => {
  const handleClick = () => {
    setExpandedRows((prev) => ({
      ...prev,
      [row.index]: !prev[row.index],
    }));
  };

  return (
    <button onClick={handleClick} className={buttonTv({ expanded: expandedRows[row.index] })}>
      {expandedRows[row.index] ? "閉じる" : "表示"}
    </button>
  );
};

export default ViewGraphButton;
