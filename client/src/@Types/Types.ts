//! USer Reiteration Types
export type NotOkType = {
  error: string;
  message: string;
};

export type User = {
  email: string;
  name: string;
  id: string;
  avatar: string;
  surname: string;
  dob: any;
  address: string
};

export type LoginOkResponse = {
  token: string;
  _id: string;
  name: string;
  email: string;
  error: NotOkType;
};

//! Books Data Type
export type CommentType = {
  id: string;
  createdAt: any;
  comment: string;
  bookRef: string;
  userRef: string;
  users: User[];
};
export declare type BooksDataType = {
  totalResult: number;
  allBooks: Array<{
    _id: string;
    title: string;
    image: string;
    authors: string[];
    detail: {
      publishAt: any;
      longDescription: string;
      categories: string[];
    };
    comment: CommentType[];
  }>;
};

//! Comments Data Type
export declare type CommentsType = {
  _id: string;
  comments: Array<string>;
  userRef: string;
  bookRef: string;
};

//! User Profile Types

export type GetProfileResponse = {
  msg: string;
  user: User;
};
