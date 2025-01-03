import { memo, useEffect } from "react";
import { type RespondentData } from '@/db/utils'

import { useAppSelector, useAppDispatch } from "@/store/store";
import { actions } from '@/store/slice/respondentSlice'
import Question from "@/components/respondent/Question";
import Result from "@/components/respondent/Result";
import NotFinished from "@/components/respondent/parts/NotFinished";

type Props = {
  respondentData: RespondentData
}

const Respondent = ({ respondentData }: Props) => {

  const { initFirstQuestionId, questions, results } = respondentData;

  const dispatch = useAppDispatch();
  const currItem = useAppSelector(state => state.respondent.currItem)

  useEffect(() => {
    dispatch(actions.setItems([...questions, ...results]));
    dispatch(actions.setCurrItem(initFirstQuestionId));
  }, [])

  return (
    <>
      {currItem.category === 'question' && <  Question />}
      {currItem.category === 'result' && <Result />}
      {currItem.category === 'none' && <NotFinished />}
    </>
  )
}

export default memo(Respondent);

// import { memo, Suspense } from "react";
// import { Await, useLoaderData, LoaderFunction } from "react-router-dom";
// import { fetchFlowByUrl } from "@/db/utils";
// import { checkDummyAuthStatus } from "@/utils";
// import { queryClient } from "@/queryClient";
// import { QueryFunctionContext } from "@tanstack/react-query";
// import { type RespondentData } from '@/db/utils'
// import Question from "@/components/respondent/Question";
// import { useAppSelector, useAppDispatch } from "@/store/store";
// // import second from '@/store/slice/respondentSlice'
// import { QuestionType } from '@/components/respondent/types'

// const fetchFunc = async ({ queryKey }: QueryFunctionContext<[string, string, string]>): Promise<RespondentData> => {
//   const [, userId, flowUrl] = queryKey;
//   const res = await fetchFlowByUrl(userId, flowUrl);
//   return res;
// };

// // LoaderFunctionでデータをプリフェッチ
// export const respondentLoader: LoaderFunction = async ({ params: { flowUrl } }) => {
//   const userId = checkDummyAuthStatus();

//   await queryClient.prefetchQuery({
//     queryKey: ['flows', userId!, flowUrl!],
//     queryFn: fetchFunc,
//   });

//   return {
//     flow: queryClient.getQueryData(['flows', userId!, flowUrl!])
//   };
// };

// type LoaderData = {
//   flow: Promise<RespondentData>;
// };

// const Respondent = () => {
//   const { flow } = useLoaderData<LoaderData>();
//   return (
//     <div className="w-screen min-h-screen h-screen flex flex-col md:overflow-x-hidden">
//       <div className=" bg-slate-100 grow basis-1/2 overflow-hidden ">
//         <Suspense fallback={(<div>aaa</div>)}>
//           <Await
//             resolve={flow} errorElement={<div className="bg-black text-white">Failed to load comments.</div>}>
//             {(flowData) => (
//               (flowData.questions as QuestionType[]).map(x => <div key={x.id}>{x.topic}</div>)
//               // <div>{flowData.title}</div>
//               // currItem.category === "question" && <Question />
//             )}
//           </Await>
//         </Suspense>
//       </div>
//     </div>
//   );
// };

// export default memo(Respondent);



// import { memo, Suspense } from "react";
// import NotFinished from "./parts/NotFinished";
// import Question from "./Question";
// import Result from "./Result";
// import { Header, Footer } from "@/components/respondent/parts/Index";
// import { useAppDispatch, useAppSelector } from "@/store/store";
// import { actions as respondentActions } from "@/store/slice/respondentSlice";
// import { Await, useLoaderData, LoaderFunction } from "react-router-dom";
// import { type FlowType } from "@/types";
// import { fetchFlowByUrl } from "@/db/utils";
// import { checkDummyAuthStatus } from "@/utils";
// import { queryClient } from "@/queryClient";
// import { dehydrate, QueryFunctionContext } from "@tanstack/react-query";
// import { DocumentData } from "firebase/firestore";
// import { type FlowData } from '@/db/utils'

// const fetchFunc = async ({ queryKey }: QueryFunctionContext<[string, string, string]>): Promise<FlowData> => {
//   const [, userId, flowUrl] = queryKey;
//   const res = await fetchFlowByUrl(userId, flowUrl);
//   return res;
// };
// // LoaderFunctionでデータをプリフェッチ
// export const respondentLoader: LoaderFunction = async ({ params: { flowUrl } }) => {
//   const userId = checkDummyAuthStatus();
//   await queryClient.prefetchQuery({
//     queryKey: ['flows', userId!, flowUrl!],
//     queryFn: fetchFunc,
//   });
// };

// type LoaderData = {
//   flow: Promise<FlowData>;
// };

// const Respondent = () => {
//   // const currItem = useAppSelector((state) => state.respondent.currItem);

//   const { flow } = useLoaderData<LoaderData>();

//   return (
//     <div className="w-screen min-h-screen h-screen flex flex-col md:overflow-x-hidden">
//       <div className=" bg-slate-100 grow basis-1/2 overflow-hidden ">
//         <Suspense fallback={(<div>aaa</div>)}>
//           <Await resolve={flow} errorElement={<div className="bg-black text-white">Failed to load comments.</div>}>
//             {(flowData) => (
//               <div>{flowData.x}</div>
//             )}

//           </Await>

//           {/* {currItem.category === "question" && <Question />} */}
//           {/* {currItem.category === "result" && <Result />}
//           {currItem.category === "none" && <NotFinished />} */}
//         </Suspense>
//       </div>

//       {/* <Footer ownerName={props.ownerName} /> */}
//     </div>
//   );
// };

// export default memo(Respondent);
