import { memo, Suspense } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import { Await, useLoaderData } from "react-router-dom";
import { MyToaster } from "@/components";
import { Flow, QuestionSubMenu, ResultSubMenu, FlowSkeleton } from "@/features/flow/components";
import FlowProvider from "@/features/flow/contexts/FlowProvider";
import { type LoaderData } from "./flowLoader";
import { MainHeader } from "@/layouts";

import "@xyflow/react/dist/style.css";
import "react-contexify/dist/ReactContexify.css";
import "@/features/flow/assets/flow.scss";

const FlowRoute = () => {
  const { flow } = useLoaderData<LoaderData>();

  return (
    <FlowProvider>
      <Suspense fallback={<FlowSkeleton />}>
        <Await
          resolve={flow}
          errorElement={<div className="bg-black text-white">Failed to load comments.</div>}
        >
          {(flowData) => (
            <ReactFlowProvider>
              <div className="h-full w-full flex flex-col">
                <MainHeader />
                <Flow {...flowData} />
              </div>
              <MyToaster />
              <QuestionSubMenu />
              <ResultSubMenu />
            </ReactFlowProvider>
          )}
        </Await>
      </Suspense>
    </FlowProvider>
  );
};

export default memo(FlowRoute);
