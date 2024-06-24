import { ReactNode, createContext, useEffect, useState } from "react";
import { BooksDataType } from "../@Types/Types";

type FetchApiContextType = {
  data: BooksDataType[] | null;
  ApiFetchDataFun: () => void;
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

  const ApiURL = "http://localhost:5000/api/books";
  const ApiFetchDataFun = async () => {
    try {
      const url = await fetch(ApiURL);
      const result = (await url.json()) as BooksDataType[];
      setData(result);
    } catch (error) {}
  };

  useEffect(() => {
    ApiFetchDataFun();
  }, []);

  return <FetchApiContext.Provider value={{ data, ApiFetchDataFun }}> {children}</FetchApiContext.Provider>;
};

export default FetchApiContextProvider;
