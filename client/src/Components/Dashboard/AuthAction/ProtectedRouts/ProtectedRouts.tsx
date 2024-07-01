import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isToken } from "../../../../Utils/tokenServices";

type ProtectedRoutType = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRoutType) => {
  const isUserLogged = isToken();

  return <>{isUserLogged !== false ? children : <Navigate to={"/"} />}</>;
};

export default ProtectedRoute;
