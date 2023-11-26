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
