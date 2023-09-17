import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import authAxios from "./axios";

const AxiosInterceptor = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isIntercepted, setIsIntercepted] = useState(false);

  useEffect(() => {
    const responseInterceptor = authAxios.interceptors.response.use(
      (response) => {
        const statusMessage = response?.data?.message;
        if (statusMessage) {
          enqueueSnackbar(statusMessage, { variant: "success" });
        }

        return response;
      },
      (error) => {
        const statusMessage = error?.response?.data?.message;
        const statusCode = error?.response?.status;

        if (statusMessage) {
          const preventDuplicate = statusCode === 404;
          enqueueSnackbar(statusMessage, {
            variant: "error",
            preventDuplicate,
          });
        } else if (error?.message === "Network Error") {
          enqueueSnackbar(
            "Unable to connect to the server, please try again later.",
            { variant: "error" }
          );
        } else {
          enqueueSnackbar(
            "The request could not be completed, please try again later.",
            { variant: "error" }
          );
        }

        return Promise.reject(error);
      }
    );

    setIsIntercepted(true);

    return () => {
      authAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [setIsIntercepted]);

  if (!isIntercepted) return null;

  return <>{children}</>;
};

export { AxiosInterceptor };
