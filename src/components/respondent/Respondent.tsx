import { memo } from "react";
import NotFinished from "./parts/NotFinished";
import Question from "./Question";
import Result from "./Result";
import { Header, Footer } from "@/components/respondent/parts/Index";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { actions as respondentActions } from "@/store/slice/respondentSlice";
import { Await, useLoaderData, LoaderFunction } from "react-router-dom";
import { type FlowType } from "@/types";
import { fetchFlowData } from "@/db/utils/fetchData";

export const respondentLoader: LoaderFunction = async ({ params }) => {
  console.log(params);
  if (!params.flowId) throw new Error("No id provided");
  return {
    flow: fetchFlowData(params.flowId),
  };
};

type LoaderData = {
  flow: Promise<FlowType>;
};

const Respondent = () => {
  const currItem = useAppSelector((state) => state.respondent.currItem);

  const { flow } = useLoaderData<LoaderData>();

  return (
    <div className="w-screen min-h-screen h-screen flex flex-col md:overflow-x-hidden">
      <div className=" bg-slate-100 grow basis-1/2 overflow-hidden ">
        <>
          {currItem.category === "question" && <Question />}
          {/* {currItem.category === "result" && <Result />}
          {currItem.category === "none" && <NotFinished />} */}
        </>
      </div>

      {/* <Footer ownerName={props.ownerName} /> */}
    </div>
  );
};

export default memo(Respondent);
