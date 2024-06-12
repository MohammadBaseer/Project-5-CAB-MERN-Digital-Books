import { ReactNode, createContext, useEffect, useState } from "react";
import { ApiResponse, BooksDataType } from "../@Types/Types";

type FetchApiContextType = {
  data: BooksDataType[] | null;
  ApiFetchDataFun: (ApiURL: string) => void;
};

const initFetchApiContext = {
  data: [] as BooksDataType[] | null,
  ApiFetchDataFun: () => {
    throw new Error("The ApiFetchDataFun Error");
  },
};

export const FetchApiContext = createContext<FetchApiContextType>(initFetchApiContext);
type FetchApiContextProvider = {
  children: ReactNode;
};
const FetchApiContextProvider = ({ children }: FetchApiContextProvider) => {
  const [data, setData] = useState<BooksDataType[] | null>(null);

  const ApiURL = "http://localhost:5000/api/books/all";
  const ApiFetchDataFun = async (ApiURL: string) => {
    try {
      const url = await fetch(ApiURL);
      const result = (await url.json()) as ApiResponse;

      setData(result.allBooks);
    } catch (error) {}
  };

  useEffect(() => {
    ApiFetchDataFun(ApiURL);
  }, []);

  return <FetchApiContext.Provider value={{ data, ApiFetchDataFun }}> {children}</FetchApiContext.Provider>;
};

export default FetchApiContextProvider;
