import { FormEvent, ReactNode, createContext, useRef, useState } from "react";
import { NotOkType } from "../@Types/Types";
import { BaseURL } from "../Utils/URLs/ApiURL";

type AuthContextType = {
  newUser: { name: string; email: string; password: string };
  errorHandler: NotOkType | string | any;
  previewImg: string | null;
  setNewUser:(prev: any) => any;
  setPreviewImg: (previewImg: string | null) => void;
  selectedFile: File | null
  UserRegisterFun: (e: FormEvent<HTMLFormElement>) => Promise<void>

};
const AuthContextInitialValue: AuthContextType = {
  newUser: { name: "", email: "", password: "" },
  errorHandler: "" as NotOkType | string | any,
  previewImg: "",
  selectedFile: null,
  setNewUser: () => {
    throw new Error("The setNewUser Error");
  },
  setPreviewImg: () => {
    throw new Error("The setPreviewImg Error");
  },
  UserRegisterFun: () => {
    throw new Error("The UserRegisterFun Error");
  },
};

//TODO - -------------------------------------------------------------------------
export const AuthContext = createContext<AuthContextType>(AuthContextInitialValue);
//TODO - -------------------------------------------------------------------------

type AuthContextProviderProps = {
  children: ReactNode;
};
//TODO - ---------------------------------------------------------------
const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
//TODO - ---------------------------------------------------------------

  // NOTE: //! User Registration State
  const [errorHandler, setErrorHandler] = useState<NotOkType | string | any>("");
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const selectedFile = useRef<File | null>(null);

  //! Registration Function
  const UserRegisterFun = async (e: FormEvent<HTMLFormElement>) => {
    setErrorHandler("");
    e.preventDefault();
    if (!newUser.name.trim()) {
      setErrorHandler("Username is missing");
      return;
    }
    if (!newUser.email.trim()) {
      setErrorHandler("Email is missing");
      return;
    }
    if (!newUser.password.trim()) {
      setErrorHandler("Password is missing");
      return;
    }
    const formdata = new FormData();
    formdata.append("name", newUser.name);
    formdata.append("email", newUser.email);
    formdata.append("password", newUser.password);

    if (selectedFile.current) {
      formdata.append("avatar", selectedFile.current);
    }
    try {
      const response = await fetch(`${BaseURL}/auth/user`, { method: "POST", body: formdata });
      if (response.ok) {
        const data = await response.json();
        setNewUser({ name: "", email: "", password: "" });
        selectedFile.current = null;
        setPreviewImg(null);
      } else {
        const data = (await response.json()) as NotOkType;
        setErrorHandler(data);
        console.log(" Error", data);
      }
    } catch (error: any) {
      setErrorHandler(error.message || "An unknown error occurred");
      console.log("err==============>", error);
    }
  };
//!---------------------------------------------------------------------









  return (
    <AuthContext.Provider value={{newUser, errorHandler, previewImg, setNewUser, setPreviewImg, selectedFile, UserRegisterFun}}>
      {children}
    </AuthContext.Provider>
  );
  
};

export default AuthContextProvider;
