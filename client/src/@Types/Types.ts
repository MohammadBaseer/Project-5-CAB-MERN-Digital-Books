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
