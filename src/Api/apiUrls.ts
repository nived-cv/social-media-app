export const apiUrls = {
  getComment: (id: number) => `/posts/${id}/comments/`,
  addComment: (id: number) => `/posts/${id}/comments`,
  getPost: (id: number) => `/posts/${id}`,
  getPosts: () => `/posts`,
  getUser: (id: number | undefined) => `/users/${id}`,
  getUsers: () => `/users`,
};
