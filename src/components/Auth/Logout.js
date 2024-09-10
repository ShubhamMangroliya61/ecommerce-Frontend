import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  signOutAsync,
  useSelectorAuthState,
} from "../../Redux/slice/authSlice";

function Logout() {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelectorAuthState();

  useEffect(() => {
    dispatch(signOutAsync());
  }, [loggedInUser]);

  return (
    <>{!loggedInUser && <Navigate to="/login" replace={true}></Navigate>}</>
  );
}

export default Logout;
