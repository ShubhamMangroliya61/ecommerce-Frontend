import React from 'react'
import { Navigate } from 'react-router-dom';
import { useSelectorAuthState } from '../../Redux/slice/authSlice';

function ProtectedAdmin({children}) {
  const { loggedInUser } = useSelectorAuthState();
  if(!loggedInUser){
    return <Navigate to="/login" ></Navigate>
  }
  if(!loggedInUser && loggedInUser.role!=='admin'){
    return <Navigate to="/" ></Navigate>
  }
  return children;
}

export default ProtectedAdmin