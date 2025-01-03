import { memo, Suspense } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import { Await, useLoaderData, LoaderFunction } from "react-router-dom";
import Flow from "./Flow";
import { MyToaster } from "@/parts/toast/MyToaster";
import QuestionSubMenu from "@/components/flow/subMenu/QuestionSubMenu";
import ResultSubMenu from "@/components/flow/subMenu/ResultSubMenu";
import { type FlowType } from "@/types";
import { fetchFlow } from '@/db/utils';
import { checkDummyAuthStatus } from '@/utils'

type LoaderData = {
  flow: Promise<FlowType>;
};

/**
 * フローデータ取得loader
 * @param param0 
 * @returns 
 */
export const flowLoader: LoaderFunction = async ({ params: { flowId } }) => {
  if (!flowId) throw new Response("存在しないflowIdです", { status: 500, statusText: "500error" })

  const userId = checkDummyAuthStatus();
  if (userId === null) {
    throw new Response("未認証", { status: 401, statusText: "Unauthorized" });
  }

  return {
    flow: fetchFlow(userId, flowId),
  };
};

const FlowLayout = () => {
  const { flow } = useLoaderData<LoaderData>();

  return (
    <Suspense fallback={<div className="text-red-400">Loading Comments...</div>}>
      <Await resolve={flow} errorElement={<div className="bg-black text-white">Failed to load comments.</div>}>
        {(flowData) => (
          <ReactFlowProvider>
            <div className="h-full w-full flex flex-col">
              <Flow {...flowData} />
            </div>
            <MyToaster />
            <QuestionSubMenu />
            <ResultSubMenu />
          </ReactFlowProvider>
        )}
      </Await>
    </Suspense>
  );
};

export default memo(FlowLayout);