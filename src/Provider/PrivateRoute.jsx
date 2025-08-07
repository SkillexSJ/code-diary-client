import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./AuthContext";
import { LoaderOne } from "../Components/Ui/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center h-screen p-10">
        <LoaderOne></LoaderOne>
      </div>
    );
  }

  if (!user || !user?.email) {
    return <Navigate state={location.pathname} to="/auth/login" />;
  }

  return children;
};

export default PrivateRoute;
