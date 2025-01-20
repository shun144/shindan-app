import { useRouteError } from "react-router-dom";

const RespondentError = () => {
  const error = useRouteError();

  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
      <div className="text-center">
        <div className="text-2xl font-bold text-red-600">
          {error instanceof Error ? error.message : "予期しないエラーが発生しました"}
        </div>
      </div>
    </div>
  );
};

export default RespondentError;
