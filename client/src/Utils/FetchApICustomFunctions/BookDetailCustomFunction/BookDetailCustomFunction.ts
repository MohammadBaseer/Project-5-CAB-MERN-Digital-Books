import { BooksDataType } from "../../../@Types/Types";

const ApiFetchDataFun = async (id: string) => {
  const ApiURL = `http://localhost:5000/api/books/${id}`;
  try {
    const url = await fetch(ApiURL);
    const result = (await url.json()) as BooksDataType;
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { ApiFetchDataFun };
