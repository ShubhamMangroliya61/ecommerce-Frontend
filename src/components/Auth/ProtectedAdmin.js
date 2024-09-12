import React from 'react'
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';

function ProtectedAdmin({children}) {
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

  const isAdmin = () => {
    const decodedToken = decodeToken();
    const role = decodedToken?.role;
    return role ? role === "admin": false;
  };

  if (!isTokenValid() && !isAdmin()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedAdmin