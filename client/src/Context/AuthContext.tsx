import { FormEvent, ReactNode, SetStateAction, createContext, useEffect, useRef, useState } from "react";
import { GetProfileResponse, LoginOkResponse, NotOkType, User } from "../@Types/Types";
import { BaseURL } from "../Utils/URLs/ApiURL";
import { getToken, isToken } from "../Utils/tokenServices";

type AuthContextType = {
  newUser: { name: string; email: string; password: string };
  errorHandler: NotOkType | string | any;
  previewImg: string | null;
  selectedFile: File | null;
  currentUser: { email: string; password: string };
  userProfile: User | null;
  isLoading: boolean;
  setCurrentUser: (prev: any) => any;
  setNewUser: (prev: any) => any;
  setPreviewImg: (previewImg: string | null) => void;
  UserRegisterFun: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  getUserProfile: () => Promise<void>;
  userLogin: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  setUserProfile: (value: SetStateAction<User | null>) => void;
};

const AuthContextInitialValue: AuthContextType = {
  newUser: { name: "", email: "", password: "" },
  errorHandler: "" as NotOkType | string | any,
  previewImg: "",
  selectedFile: null,
  currentUser: { email: "", password: "" },
  userProfile: { email: "", name: "", id: "", avatar: "" },
  isLoading: true,
  setCurrentUser: () => {
    throw new Error("The setCurrentUser Error");
  },
  setNewUser: () => {
    throw new Error("The setNewUser Error");
  },
  setPreviewImg: () => {
    throw new Error("The setPreviewImg Error");
  },
  UserRegisterFun: () => {
    throw new Error("The UserRegisterFun Error");
  },
  getUserProfile: () => {
    throw new Error("The getUserProfile Error");
  },
  userLogin: () => {
    throw new Error("The UserRegisterFun Error");
  },
  setUserProfile: () => {
    throw new Error("The setUserProfile Error");
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
  const [isLoading, setIsLoading] = useState(true);
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

  //TODO ------------------User Login------------------
  //! Login State
  const [currentUser, setCurrentUser] = useState({ email: "", password: "" });

  //! Login Function
  const userLogin = async (e: FormEvent<HTMLFormElement>) => {
    setErrorHandler("");
    e.preventDefault();

    if (!currentUser.email.trim()) {
      setErrorHandler("Email is missing");
      return;
    }
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      const body = new URLSearchParams();
      body.append("email", currentUser.email);
      body.append("password", currentUser.password);
      const requestOption = {
        method: "POST",
        headers: headers,
        body: body,
      };

      const res = await fetch(`${BaseURL}/auth/login`, requestOption);
      const result = (await res.json()) as LoginOkResponse;
      if (res.status !== 200) {
        return setErrorHandler(result.error);
      }
      if (!res.ok) {
        setErrorHandler("Login failed");
      }
      if (res.ok) {
        if (result.token) {
          localStorage.setItem("token", result.token);
          getUserProfile();
        }
        setCurrentUser({ email: "", password: "" });
        setErrorHandler("Login Successful");
      }
    } catch (error) {
      setErrorHandler(error);
    }
  };

  //!--------------------------------------------------------

  //TODO ------------------USer Profile------------------
  //! User Profile State
  //TODO - in This UserProfile my exist user data stored, Now I can Pass at anywhere I want
  const [userProfile, setUserProfile] = useState<User | null>(null);
  //TODO - -------------------------------------------------------

  const getUserProfile = async () => {
    const token = getToken();
    if (!token) {
      alert("You need Token");
    }
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      try {
        const response = await fetch("http://localhost:5000/auth/profile", requestOptions);
        if (!response.ok && response.status === 401) {
          console.log("Token Invalid or Login again");
          return;
        }
        if (response.ok) {
          const result = (await response.json()) as GetProfileResponse;
          setUserProfile(result.user);
          setIsLoading(false);
          // console.log("User Profile Result ====>", result);
        }
      } catch (error) {
        console.log("User Profile -----<", error);
        setIsLoading(false);
      }
    }
  };
  // useEffect(() => {
  //   const isUserLogged = isToken();

  //   if (isUserLogged) {
  //     setUserProfile
  //   }

  // }, [userProfile])

  //!--------------------------------------------------------

  return <AuthContext.Provider value={{ newUser, errorHandler, previewImg, setNewUser, setPreviewImg, selectedFile, UserRegisterFun, getUserProfile, currentUser, setCurrentUser, userLogin, userProfile, setUserProfile, isLoading }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
