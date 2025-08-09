import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function PublicRoute() {
  const { loggedIn } = useContext(UserContext);
  if (loggedIn) {
    return <Navigate to="/profile" replace />;
  }
  return <Outlet />;
}