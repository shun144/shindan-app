import { memo, Suspense } from "react";
import { Await, useLoaderData, LoaderFunction } from "react-router-dom";
import { fetchFlowByUrl } from "@/db/utils";
import { checkDummyAuthStatus } from "@/utils";
import { queryClient } from "@/queryClient";
import { QueryFunctionContext } from "@tanstack/react-query";
import { type RespondentData } from '@/db/utils'
import Respondent from './Respondent'

const fetchFunc = async ({ queryKey }: QueryFunctionContext<[string, string, string]>): Promise<RespondentData> => {
  const [, userId, flowUrl] = queryKey;
  const res = await fetchFlowByUrl(userId, flowUrl);
  return res;
};

// LoaderFunctionでデータをプリフェッチ
export const respondentLoader: LoaderFunction = async ({ params: { flowUrl } }) => {
  const userId = checkDummyAuthStatus();

  await queryClient.prefetchQuery({
    queryKey: ['flows', userId!, flowUrl!],
    queryFn: fetchFunc,
  });

  // console.log(queryClient.getQueryData(['flows', userId!, flowUrl!]))

  return {
    respondent: queryClient.getQueryData(['flows', userId!, flowUrl!])
  };
};

type LoaderData = {
  respondent: Promise<RespondentData>;
};

const RespondentLayout = () => {
  const { respondent } = useLoaderData<LoaderData>();

  return (
    <div className="w-screen min-h-screen h-screen flex flex-col md:overflow-x-hidden">
      <div className=" bg-slate-100 grow basis-1/2 overflow-hidden ">
        <Suspense fallback={(<div>aaa</div>)}>
          <Await
            resolve={respondent} errorElement={<div className="bg-black text-white">Failed to load comments.</div>}>
            {(respondentData) => (
              <Respondent respondentData={respondentData} />
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default memo(RespondentLayout);