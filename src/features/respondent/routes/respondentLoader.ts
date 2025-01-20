import { LoaderFunction } from "react-router-dom";
import { fetchFlowByUrl } from "@/db/functions/flow";
import { queryClient } from "@/app/queryClient";
import { type RespondentData } from "@/db/functions/flow";

export type RespondentLoaderData = {
  respondent: Promise<RespondentData>;
};

export const respondentLoader: LoaderFunction = async ({ params: { shopName, flowUrl } }) => {
  const queryKey = ["flows", shopName!, flowUrl!];

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => await fetchFlowByUrl(shopName!, flowUrl!),
  });

  const respondentData = queryClient.getQueryData(queryKey);
  if (!respondentData) {
    throw new Error("指定されたURLのアンケートは存在しません");
  }

  return {
    respondent: respondentData,
  };
};
