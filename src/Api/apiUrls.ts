export const apiUrls = {
  getComment: () => "/comment",
  addComment: (id: number) => `/posts/${id}/comments`,
  getPost: () => `/posts`,
  getPosts: () => `/posts`,
  getUser: (id: number | undefined) => `/users/${id}`,
  getUsers: () => `/users`,
};
