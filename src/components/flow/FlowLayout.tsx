import { memo, Suspense } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import { Await, useLoaderData, LoaderFunction } from "react-router-dom";
import Flow from "./Flow";
import { MyToaster } from "@/parts/toast/MyToaster";
import QuestionSubMenu from "@/components/flow/subMenu/QuestionSubMenu";
import ResultSubMenu from "@/components/flow/subMenu/ResultSubMenu";
import { type FlowType } from "@/types";
import { fetchFlowData } from "@/db/utils/fetchData";

export const flowLoader: LoaderFunction = async ({ params: { flowId } }) => {
  if (!flowId) throw new Error("No id provided");
  return {
    flow: fetchFlowData(flowId),
  };
};

type LoaderData = {
  flow: Promise<FlowType>;
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
              {/* <Flow
              title={flowData.title}
              url={flowData.url}
              initFirstQuestionId={flowData.initFirstQuestionId}
              initialNodes={[...JSON.parse(flowData.questions), ...JSON.parse(flowData.results)]}
              initialEdges={JSON.parse(flowData.edges)}
              initialViewport={{
                x: flowData.x,
                y: flowData.y,
                zoom: flowData.zoom,
              }}
            /> */}
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

// import { ReactFlowProvider } from "@xyflow/react";
// import { memo, useEffect } from "react";
// import Flow from "./Flow";
// import { useParams } from "react-router-dom";
// import { MyToaster } from "@/parts/toast/MyToaster";
// import QuestionSubMenu from "@/components/flow/subMenu/QuestionSubMenu";
// import ResultSubMenu from "@/components/flow/subMenu/ResultSubMenu";
// // import { initialQuestions, initialResults, initialEdges, initialX, initialY, initialZoom } from "@/utils/db";
// import useGetDoc from "@/db/useGetDoc";

// type Props = {
//   // questions: string;
//   // results: string;
//   // edges: string;
//   // title: string;
//   // url: string;
//   // initFirstQuestionId: string;
//   // x: number;
//   // y: number;
//   // zoom: number;
// };

// const FlowLayout = () => {
//   const { id } = useParams();

//   const { initialQuestions, initialResults, initialEdges, initialX, initialY, initialZoom } = useGetDoc(id!);

//   return (
//     <>
//       <ReactFlowProvider>
//         <div className="h-full w-full flex flex-col">
//           {/* <Flow
//             initialNodes={[...JSON.parse(initialQuestions), ...JSON.parse(initialResults)]}
//             initialEdges={JSON.parse(initialEdges)}
//             defaultViewport={{
//               x: initialX,
//               y: initialY,
//               zoom: initialZoom,
//             }}
//           /> */}
//         </div>

//         <MyToaster />
//         <QuestionSubMenu />
//         <ResultSubMenu />
//       </ReactFlowProvider>
//     </>
//   );
// };

// export default memo(FlowLayout);
