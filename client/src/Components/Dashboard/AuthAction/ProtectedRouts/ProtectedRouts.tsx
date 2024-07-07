import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { isToken } from "../../../../Utils/tokenServices";
import { AuthContext } from "../../../../Context/AuthContext";
import Spinner from "../../../../Utils/Spinner/Spinner";

type ProtectedRoutType = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRoutType) => {
  const { userProfile, isLoading } = useContext(AuthContext);
  const isUserLogged = isToken();

  return <>{isLoading ? <Spinner /> : isUserLogged && userProfile?.email ? children : <Navigate to={"/"} />}</>;
};

export default ProtectedRoute;
