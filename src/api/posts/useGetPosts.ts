import { useQuery } from "react-query";
import { axiosClientWithAuth } from "../axiosClient";
import { apiUrls } from "../apiUrls";
import { dataQueryKeys } from "../dataQueryClient";

const fetchPosts = async () => {
  const data = await axiosClientWithAuth(apiUrls.getPosts());
  return data.data;
};

export const useGetPosts = () => useQuery(dataQueryKeys.POSTS, fetchPosts);
