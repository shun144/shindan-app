import ErrorPage from "@/layouts/main/ErrorPage";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/main/MainLayout";
import Board from "@/features/board/Board";
import { FlowLayout, ErrorFlowLaytout } from "@/features/flow/layouts";
import { FlowRoute, flowLoader } from "@/features/flow/routes";
import { TotalRoute, totalLoader } from "@/features/total/routes";
import { RespondentRoute, respondentLoader } from "@/features/respondent/routes";
import { ProfileRoute } from "@/features/profile/routes";
import NotFound from "@/features/respondent/layouts/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Board />,
      },
      {
        path: "total",
        element: <TotalRoute />,
        loader: totalLoader,
      },
      {
        path: "profile",
        element: <ProfileRoute />,
      },
    ],
  },
  {
    path: "flow",
    element: <FlowLayout />,
    errorElement: <ErrorFlowLaytout />,
    children: [
      {
        path: ":flowId",
        element: <FlowRoute />,
        loader: flowLoader,
      },
    ],
  },
  {
    path: ":shopName",
    children: [
      {
        path: ":flowUrl",
        element: <RespondentRoute />,
        loader: respondentLoader,
        errorElement: <NotFound />,
      },
    ],
  },
]);
