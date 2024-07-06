import { ReactNode, createContext, useEffect, useState } from "react";
import { BooksDataType } from "../@Types/Types";

type FetchApiContextType = {
  data: BooksDataType[] | null;
  ApiFetchDataFun: () => void;
  loading: boolean;
  errorHandle: string;
};

const initFetchApiContext = {
  data: [] as BooksDataType[] | null,
  ApiFetchDataFun: () => {
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

  const ApiURL = "http://localhost:5000/api/books";
  const ApiFetchDataFun = async () => {
    try {
      const url = await fetch(ApiURL);
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

  return <FetchApiContext.Provider value={{ data, ApiFetchDataFun, loading, errorHandle }}> {children}</FetchApiContext.Provider>;
};

export default FetchApiContextProvider;
