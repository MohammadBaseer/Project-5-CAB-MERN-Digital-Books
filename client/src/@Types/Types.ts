export declare type BooksDataType = {
  id: string;
  title: string;
  isbn: string;
  pageCount: number;
  date: any;
  image: string;
  longDescription: string;
  status: string;
  authors: Array<string>;
  categories: Array<string>;
};
export declare type ApiResponse = {
  allBooks: BooksDataType[];
};

//
