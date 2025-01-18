export type Post = {
  _id?: string;
  title: string;
  content: string;
  senderId: string;
};

export type Comment = {
  _id?: string;
  postId: string;
  content: string;
  owner: string;
};

export type User = {
  _id?: string;
  username: string;
  password: string;
  email: string;
  token?: string;
};
