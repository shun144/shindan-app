import { memo, Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Respondent from "../components/Respondent";
import { type RespondentLoaderData } from "./respondentLoader";
import "@/features/respondent/assets/Result.css";

const RespondentRoute = () => {
  const { respondent } = useLoaderData<RespondentLoaderData>();

  return (
    <div className="w-screen min-h-screen h-screen flex flex-col md:overflow-x-hidden">
      <div className=" bg-slate-100 grow basis-1/2 overflow-hidden ">
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={respondent}>
            {(respondentData) => <Respondent respondentData={respondentData} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default memo(RespondentRoute);
