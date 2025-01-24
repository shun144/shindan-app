import { memo, Suspense } from "react";
import { TotalTable } from "@/features/total/components";
import { Await, useLoaderData } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { type TotalLoaderData } from "./totalLoader";

const TotalRoute = () => {
  const { total } = useLoaderData<TotalLoaderData>();

  return (
    <div className="py-6 w-full max-w-screen-lg">
      <Suspense fallback={<div className="text-red-50">Loading Comments...</div>}>
        <Await resolve={total} errorElement={<ErrorPage />}>
          {(totalTableData) => <TotalTable totalTableData={totalTableData} />}
        </Await>
      </Suspense>
    </div>
  );
};

export default memo(TotalRoute);
