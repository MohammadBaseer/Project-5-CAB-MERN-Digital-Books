//! USer Reiteration Types
export type NotOkType = {
  error: string;
  message: string;
};

export type User = {
  email: string;
  name: string;
  _id: string;
};


export type LoginOkResponse = {
  token: string;
  _id: string;
  name: string;
  email: string;
  error: NotOkType;
};

//! Books Data Type
export declare type BooksDataType = {
  _id: string;
  title: string;
  image: string;
  authors: Array<string>;
  detail: { isbn: string; pageCount: number; date: any | number; longDescription: string | number; status: string | number; categories: Array<string> | number };
};
export declare type ApiResponse = {
  allBooks: BooksDataType[];
};
