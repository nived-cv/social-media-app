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
