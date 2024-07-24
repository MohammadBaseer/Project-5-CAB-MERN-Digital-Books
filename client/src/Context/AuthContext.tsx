import { FormEvent, ReactNode, SetStateAction, createContext, useEffect, useRef, useState } from "react";
import { GetProfileResponse, LoginOkResponse, NotOkType, User } from "../@Types/Types";
import { BaseURL } from "../Utils/URLs/ApiURL";
import { getToken, isToken, removeToken } from "../Utils/tokenServices";
import { Toast } from "primereact/toast";

type AuthContextType = {
  newUser: { name: string; email: string; password: string };
  errorHandler: NotOkType | string | any;
  previewImg: string | null;
  selectedFile: File | null | any;
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
  logout: () => void;
};

const AuthContextInitialValue: AuthContextType = {
  newUser: { name: "", email: "", password: "" },
  errorHandler: "" as NotOkType | string | any,
  previewImg: "",
  selectedFile: null,
  currentUser: { email: "", password: "" },
  userProfile: { email: "", name: "", surname: "", dob: "", address: "", id: "", avatar: "", createdAt: "" },
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
  logout: () => {
    throw new Error("The LogOut Error");
  },
};

export const AuthContext = createContext<AuthContextType>(AuthContextInitialValue);

type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const toast = useRef<Toast>(null);
  // const toNavigate = useNavigate();

  const [errorHandler, setErrorHandler] = useState<NotOkType | string | any>("");
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const selectedFile = useRef<File | null | undefined>(null);
  const [currentUser, setCurrentUser] = useState({ email: "", password: "" });
  const [userProfile, setUserProfile] = useState<User | null>(null);

  const UserRegisterFun = async (e: FormEvent<HTMLFormElement>) => {
    setErrorHandler("");
    e.preventDefault();
    if (!newUser.name.trim()) {
      toast.current?.show({ severity: "error", summary: "Error", detail: "Username is missing", life: 3000 });
      return;
    }
    if (!newUser.email.trim()) {
      toast.current?.show({ severity: "error", summary: "Error", detail: "Email is missing", life: 3000 });
      return;
    }
    if (!newUser.password) {
      toast.current?.show({ severity: "error", summary: "Error", detail: "Password is missing", life: 3000 });
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
        await response.json();
        setNewUser({ name: "", email: "", password: "" });
        selectedFile.current = null;
        setPreviewImg(null);
        toast.current?.show({ severity: "success", summary: "Success", detail: "New User Created", life: 3000 });
      } else {
        const data = (await response.json()) as NotOkType;
        toast.current?.show({ severity: "error", summary: "Error", detail: data.error, life: 3000 });
      }
    } catch (error: any) {
      setErrorHandler(error.message || "An unknown error occurred");
      console.log("err==============>", error);
    }
  };

  const userLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorHandler("");

    if (!currentUser.email.trim()) {
      toast.current?.show({ severity: "error", summary: "Error", detail: "Email is missing", life: 3000 });
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
        toast.current?.show({ severity: "error", summary: "Error", detail: "Login failed", life: 3000 });
      }
      if (res.ok) {
        if (result.token) {
          localStorage.setItem("token", result.token);
          getUserProfile();
        }
        setCurrentUser({ email: "", password: "" });
        // setErrorHandler("Login Successful");
      }
    } catch (error) {
      setErrorHandler(error);
    }
  };

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
        const response = await fetch(`${BaseURL}/auth/profile`, requestOptions);
        if (!response.ok && response.status === 401) {
          // console.log("Token Invalid or Login again");
          toast.current?.show({ severity: "error", summary: "Error", detail: "Token Invalid or Login again", life: 3000 });
          return;
        }
        if (response.ok) {
          const result = (await response.json()) as GetProfileResponse;
          setUserProfile(result.user);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    }
  };
  const isUserLogged = isToken();
  useEffect(() => {
    if (isUserLogged) {
      getUserProfile();
    }
    if (!isUserLogged) {
      setIsLoading(false);
      removeToken();
    }
  }, []);

  //!--------------------------------------------------------
  //! Logout
  const logout = () => {
    removeToken();
    setUserProfile(null);
    setIsLoading(false);
  };
  //! ---------------------------------------------------------
  return (
    <AuthContext.Provider value={{ newUser, errorHandler, previewImg, setNewUser, setPreviewImg, selectedFile, UserRegisterFun, getUserProfile, currentUser, setCurrentUser, userLogin, userProfile, setUserProfile, isLoading, logout }}>
      {children}
      <Toast ref={toast} />;
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
