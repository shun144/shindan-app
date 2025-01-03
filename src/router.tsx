import ErrorPage from "@/components/errorPage/ErrorPage";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layout/Layout";
import Board from "@/components/board/Board";
import RespondentLayout, { respondentLoader } from "@/components/respondent/RespondentLayout";
import FlowLayout, { flowLoader } from "@/components/flow/FlowLayout";
import ErrorFlowLaytout from '@/components/flow/ErrorFlowLaytout'


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Board />,
      },
      {
        path: "flow",
        errorElement: <ErrorFlowLaytout />,
        children: [
          {
            path: ":flowId",
            element: <FlowLayout />,
            loader: flowLoader,
          },
        ],
      },
    ],
  },
  {
    path: "/respondent",
    children: [
      {
        path: ":shopName/:flowUrl",
        element: <RespondentLayout />,
        loader: respondentLoader,
      },
    ],
  },
]);
