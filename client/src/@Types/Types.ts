///REVIEW -  Restructured ---

export type BooksDataType = {
  _id: string;
  title: string;
  image: string;
  authors: string[];
  userRef: string;
  likes: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  detail: Detail;
  comment: CommentsType[];
  id: string;
};

export type Detail = {
  _id: string;
  longDescription: string;
  categories: string[];
  publishAt: string;
  bookref: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type CommentsType = {
  _id: string;
  comment: string;
  bookRef: string;
  userRef: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  users: User[];
  id: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: string;
  surname: string;
  dob: string;
  address: string;
};

//! ---------------------------

//! USer Reiteration Types
export type NotOkType = {
  error: string;
  message: string;
};

export type LoginOkResponse = {
  token: string;
  _id: string;
  name: string;
  email: string;
  error: NotOkType;
};
export type GetProfileResponse = {
  msg: string;
  user: User;
};
