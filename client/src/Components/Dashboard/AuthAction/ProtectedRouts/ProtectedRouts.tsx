import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { isToken } from "../../../../Utils/tokenServices";
import { AuthContext } from "../../../../Context/AuthContext";

type ProtectedRoutType = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRoutType) => {
  const { userProfile, isLoading } = useContext(AuthContext);
  const isUserLogged = isToken();

  return <>{isLoading ? <h1>....IS LOADING....</h1> : isUserLogged && userProfile?.email ? children : <Navigate to={"/"} />}</>;
};

export default ProtectedRoute;
