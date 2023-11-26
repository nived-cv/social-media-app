import { useMutation, useQueryClient } from "react-query";
import { axiosClientWithAuth } from "../axiosClient";
import { apiUrls } from "../apiUrls";
import { PostData } from "../../types";
import { dataQueryKeys } from "../dataQueryClient";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newData: PostData) => {
      try {
        const res = await axiosClientWithAuth.post(apiUrls.getPosts(), newData);
        return res;
      } catch (err) {
        alert(err);
        console.log(err);
      }
    },
    onSuccess: () => queryClient.invalidateQueries([dataQueryKeys.POSTS]),
  });
};
