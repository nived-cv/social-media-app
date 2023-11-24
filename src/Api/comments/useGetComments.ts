import { useQuery } from "react-query";
import { apiUrls } from "../apiUrls";
import { axiosClientWithAuth } from "../axiosClient";
import { dataQueryKeys } from "../dataQueryClient";

const fetchComments = async (id: number) => {
  const data = await axiosClientWithAuth.get(apiUrls.getComment(id));
  return data.data;
};

export const useGetComments = (id: number) =>
  useQuery([dataQueryKeys.COMMENTS, id], () => fetchComments(id));
