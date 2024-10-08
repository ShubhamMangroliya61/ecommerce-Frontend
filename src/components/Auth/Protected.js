import React, { useMemo } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Protected({ children }) {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
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

  const isTokenValid = (token) => {
    const decodedToken = decodeToken(token);
    const expiryTime = decodedToken?.exp;
    return expiryTime ? 1000 * expiryTime > Date.now() : false;
  };

  const isValid = useMemo(() => isTokenValid(cookies.token), [cookies.token]);

  if (!isValid) {
    return <Navigate to="login"/>
  }

  return children;
}

export default Protected;
