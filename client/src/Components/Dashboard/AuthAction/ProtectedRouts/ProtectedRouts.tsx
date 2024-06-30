import { ReactNode, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthContext";
import { isToken } from "../../../../Utils/tokenServices";

type ProtectedRoutType = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRoutType) => {
  const { userProfile, setUserProfile, getUserProfile } = useContext(AuthContext);

  return <>{userProfile !== null ? children : <Navigate to={"/"} />}</>;
};

export default ProtectedRoute;
