import { fetchTotalTableData, TotalTableData } from "@/db/functions/total";
import { LoaderFunction } from "react-router-dom";
import { checkDummyAuthStatus } from "@/utils/userUtils";

export type TotalLoaderData = {
  total: Promise<TotalTableData[]>;
};

export const totalLoader: LoaderFunction = async () => {
  const { userId } = checkDummyAuthStatus();
  if (userId === null) {
    throw new Response("未認証", { status: 401, statusText: "Unauthorized" });
  }
  return {
    total: fetchTotalTableData(userId),
  };
};
