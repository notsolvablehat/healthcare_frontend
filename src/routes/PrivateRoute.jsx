import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function PrivateRoute() {
  const { loggedIn } = useContext(UserContext);
  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
