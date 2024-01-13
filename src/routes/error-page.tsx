import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className='container flex h-dvh flex-col items-center justify-center gap-4'>
        <h1>Oops!</h1>
        <div className='flex gap-2'>
          <p> {error.status} </p>
          <p>{error.statusText}</p>
          {error.data?.message && (
            <p>
              <i>{error.data.message}</i>
            </p>
          )}
        </div>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div id='error-page'>
        <h1>Oops! Unexpected Error</h1>
        <p>Something went wrong.</p>
        <p>
          <i>{error.message}</i>
        </p>
      </div>
    );
  } else {
    return <></>;
  }
}
