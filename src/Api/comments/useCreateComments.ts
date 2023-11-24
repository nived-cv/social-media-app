import { useMutation, useQueryClient } from "react-query";
import { axiosClientWithAuth } from "../axiosClient";
import { apiUrls } from "../apiUrls";
import { dataQueryKeys } from "../dataQueryClient";
import { CommentsData } from "../../CommonTypes/TypesList1";

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newData: CommentsData) => {
      const res = await axiosClientWithAuth.post(
        apiUrls.addComment(newData.post_id),
        newData
      );
      return res;
    },
    onSuccess: () => queryClient.invalidateQueries([dataQueryKeys.COMMENTS]),
  });
};
