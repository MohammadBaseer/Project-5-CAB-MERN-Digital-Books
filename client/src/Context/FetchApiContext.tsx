import { ReactNode, createContext, useEffect, useRef, useState } from "react";
import { BooksDataType } from "../@Types/Types";
import { isToken } from "../Utils/tokenServices";
import { Toast } from "primereact/toast";
import { BaseURL } from "../Utils/URLs/ApiURL";

type FetchApiContextType = {
  data: BooksDataType[] | null;
  ApiFetchDataFun: () => void;
  loading: boolean;
  errorHandle: string;
  likeFunction: (bookID: string) => Promise<void>;
};

const initFetchApiContext = {
  data: [] as BooksDataType[] | null,
  ApiFetchDataFun: () => {
    throw new Error("The ApiFetchDataFun Error");
  },
  likeFunction: () => {
    throw new Error("The ApiFetchDataFun Error");
  },
  loading: true,
  errorHandle: "",
};

export const FetchApiContext = createContext<FetchApiContextType>(initFetchApiContext);
type FetchApiContextProvider = {
  children: ReactNode;
};
const FetchApiContextProvider = ({ children }: FetchApiContextProvider) => {
  const [data, setData] = useState<BooksDataType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorHandle, setErrorHandle] = useState("");

  //! Fetch the Books Data
  const ApiFetchDataFun = async () => {
    try {
      const url = await fetch(`${BaseURL}/api/books`);
      const result = (await url.json()) as BooksDataType[];
      console.log("FetchApiContext Test ====>", result);
      setData(result);
      setLoading(false);
    } catch (error: any) {
      console.error("Failed to fetch data ===>", error);
      setLoading(false);
      setErrorHandle(error.message);
    }
  };
  useEffect(() => {
    ApiFetchDataFun();
  }, []);

  const toast = useRef<Toast>(null);

  //! Like & unLike Function
  const likeFunction = async (bookID: string) => {
    const token = localStorage.getItem("token");
    const isUserLogged = isToken();

    if (!isUserLogged) {
      toast.current?.show({ severity: "error", summary: "Error", detail: "Please Login!", life: 3000 });
      return;
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const urlencoded = new URLSearchParams();
    urlencoded.append("bookId", bookID);
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(`${BaseURL}/api/likes`, requestOptions);
      if (response.ok) {
        const result = await response.json();
        ApiFetchDataFun();

        let msg: "error" | "success" | "info" | "warn" | undefined = "info";

        if (result.error === "Like") {
          msg = "success";
        } else if (result.error === "unLike") {
          msg = "error";
        }
        toast.current?.show({ severity: msg, summary: "Success", detail: result.error, life: 3000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FetchApiContext.Provider value={{ data, ApiFetchDataFun, loading, errorHandle, likeFunction }}>
      {children}
      <Toast ref={toast} />;
    </FetchApiContext.Provider>
  );
};

export default FetchApiContextProvider;
