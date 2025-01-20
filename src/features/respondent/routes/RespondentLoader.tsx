import { LoaderFunction } from "react-router-dom";
import { fetchFlowByUrl } from "@/db/functions/flow";
import { queryClient } from "@/app/queryClient";
import { type RespondentData } from "@/db/functions/flow";

export type RespondentLoaderData = {
  respondent: Promise<RespondentData>;
};

export const respondentLoader: LoaderFunction = async ({ params: { shopName, flowUrl } }) => {
  const queryKey = ["flows", shopName!, flowUrl!];
  try {
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
  } catch (error) {
    throw error;
  }
};

// import { LoaderFunction } from "react-router-dom";
// import { fetchFlowByUrl } from "@/db/functions/flow";
// import { queryClient } from "@/app/queryClient";
// import { QueryFunctionContext } from "@tanstack/react-query";
// import { type RespondentData } from "@/db/functions/flow";

// export type RespondentLoaderData = {
//   respondent?: Promise<RespondentData>;
//   error?: string;
// };

// export const respondentLoader: LoaderFunction = async ({ params: { shopName, flowUrl } }) => {
//   const queryKey = ["flows", shopName!, flowUrl!];
//   try {
//     await queryClient.prefetchQuery({
//       queryKey,
//       queryFn: async () => await fetchFlowByUrl(shopName!, flowUrl!),
//     });

//     const respondentData = queryClient.getQueryData(queryKey);
//     if (!respondentData) {
//       throw new Error("値がありません");
//     }

//     return {
//       respondent: respondentData,
//     };
//   } catch (error) {
//     return {
//       error: error instanceof Error ? error.message : "予期しないエラーが発生しました",
//     };
//   }
// };

// import { LoaderFunction } from "react-router-dom";
// import { fetchFlowByUrl } from "@/db/functions/flow";
// import { checkDummyAuthStatus } from "@/utils/userUtils";
// import { queryClient } from "@/app/queryClient";
// import { QueryFunctionContext } from "@tanstack/react-query";
// import { type RespondentData } from "@/db/functions/flow";

// export type RespondentLoaderData = {
//   respondent: Promise<RespondentData>;
// };

// const fetchFunc = async ({
//   queryKey,
// }: QueryFunctionContext<[string, string, string]>): Promise<RespondentData> => {
//   const [, userId, flowUrl] = queryKey;
//   const res = await fetchFlowByUrl(userId, flowUrl);
//   return res;
// };

// export const respondentLoader: LoaderFunction = async ({ params: { flowUrl } }) => {
//   const { userId } = checkDummyAuthStatus();

//   await queryClient.prefetchQuery({
//     queryKey: ["flows", userId!, flowUrl!],
//     queryFn: fetchFunc,
//   });

//   return {
//     respondent: queryClient.getQueryData(["flows", userId!, flowUrl!]),
//   };
// };
