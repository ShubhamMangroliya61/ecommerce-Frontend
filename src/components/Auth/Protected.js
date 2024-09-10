import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function Protected({ children }) {
  const [cookies] = useCookies(["token"]);

  const decodeToken = () => {
    const token = cookies.token;
    let finalDecodedToken = null;
    try {
      finalDecodedToken = token ? jwtDecode(token) : null;
    } catch (error) {
      finalDecodedToken = null;
    }
    return finalDecodedToken;
  };

  const isTokenValid = () => {
    const decodedToken = decodeToken();
    const expiryTime = decodedToken?.exp;
    return expiryTime ? 1000 * expiryTime > Date.now() : false;
  };

  if (!isTokenValid()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default Protected;
