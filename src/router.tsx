import ErrorPage from "@/components/errorPage/ErrorPage";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layout/Layout";
import Board from "@/components/board/Board";
import Respondent, { respondentLoader } from "@/components/respondent/Respondent";
import FlowLayout, { flowLoader } from "@/components/flow/FlowLayout";

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
        element: <Respondent />,
        loader: respondentLoader,
      },
    ],
  },
]);
