import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../../Redux/slice/authSlice'
import { Navigate } from 'react-router-dom';

function ProtectedAdmin({children}) {
  const user= useSelector(selectLoggedInUser);
  if(!user){
    return <Navigate to="/login" ></Navigate>
  }
  if(!user && user.role!=='admin'){
    return <Navigate to="/" ></Navigate>
  }
  return children;
}

export default ProtectedAdmin