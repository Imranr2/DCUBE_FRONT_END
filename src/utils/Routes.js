import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoutes = () => {
  if (!isTokenExpired(document.cookie)) {
    return <Navigate to="/home" />;
  }
  return <Outlet />;
};

export const PrivateRoutes = () => {
  if (isTokenExpired(document.cookie)) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

const isTokenExpired = (cookieString) => {
  let cookies = cookieString.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let [key, value] = cookies[i].split("=");
    if (key === "token") {
      if (value === "undefined") {
        Cookies.remove("token");
        return true;
      }
      return false;
    }
  }
  return true;
};
