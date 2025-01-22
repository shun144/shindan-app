import DebouncedInput from "@/components/input/DebouncedInput";
import { Dispatch, memo, SetStateAction } from "react";
import { IoSearchOutline } from "react-icons/io5";

type Props = {
  globalFilter: string;
  setGlobalFilter: Dispatch<SetStateAction<string>>;
};

const TotalTableSearch = ({ globalFilter, setGlobalFilter }: Props) => {
  const handleChange = (value: string) => {
    setGlobalFilter(value);
  };

  return (
    <div className="flex justify-start items-center h-24">
      <div className="h-12 bg-slate-600 px-2 rounded-l">
        <IoSearchOutline className="h-full block text-white" />
      </div>

      <div className="h-full flex justify-center items-center">
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={handleChange}
          className="w-96 h-12 bg-transparent outline-none border rounded-r border-slate-300 focus:ring-0 focus:border-blue-500 placeholder:text-slate-400"
          placeholder="検索"
        />
      </div>
    </div>
  );
};

export default memo(TotalTableSearch);
