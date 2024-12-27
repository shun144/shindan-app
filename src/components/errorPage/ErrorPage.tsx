import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page">
      <p>
        {isRouteErrorResponse(error) && (
          <p>
            <i>{error.statusText || error.data}</i>
          </p>
        )}
      </p>
    </div>
  );
}
