import { LoaderFunction } from "react-router-dom";
import { fetchFlow } from "@/db/functions/flow";
import { checkDummyAuthStatus } from "@/utils/userUtils";
import { type FlowType } from "@/types";

export type LoaderData = {
  flow: Promise<FlowType>;
};

/**
 * フローデータ取得用のLoader
 */
export const flowLoader: LoaderFunction = async ({ params: { flowId } }) => {
  if (!flowId) {
    throw new Response("存在しないflowIdです", { status: 500, statusText: "500error" });
  }

  const { userId } = checkDummyAuthStatus();
  if (!userId) {
    throw new Response("未認証", { status: 401, statusText: "Unauthorized" });
  }

  return {
    flow: fetchFlow(userId, flowId),
  };
};
