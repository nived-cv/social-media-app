import { useMutation, useQueryClient } from "react-query";
import { axiosClientWithAuth } from "../axiosClient";
import { apiUrls } from "../apiUrls";
import { dataQueryKeys } from "../dataQueryClient";

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      try {
        const res = await axiosClientWithAuth.delete(apiUrls.getPost());
        return res;
      } catch (err) {
        alert(err);
      }
    },
    onSuccess: () => queryClient.invalidateQueries(dataQueryKeys.POSTS),
  });
};
