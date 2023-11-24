export type PostData = {
  id: number;
  user_id: number;
  title: String;
  body: String;
};

export type NewPostType = {
  id: number;
  user_id: number;
  user: String;
  title: String;
  body: String;
};

export type PatchPost = {
  id?: number;
  user_id?: number;
  title?: String;
  body?: String;
};

export type UserData = {
  id: number;
  name: String;
  email: String;
  gender: "female" | "male";
  status: string;
};

export type PatchUser = {
  id?: number;
  name?: String;
  email?: String;
  gender?: "female" | "male";
  status?: string;
};

export type CommentsData = {
  id: number;
  post_id: number;
  name: String;
  email: String;
  body: String;
};
