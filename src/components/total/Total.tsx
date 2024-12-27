import { memo } from "react";
import TotallingTable, { TableProps } from "./Table";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Totalling = ({ flows }: TableProps) => {
  return (
    <div className="py-6">
      <QueryClientProvider client={queryClient}>
        <TotallingTable flows={flows} />
      </QueryClientProvider>
    </div>
  );
};

export default memo(Totalling);
