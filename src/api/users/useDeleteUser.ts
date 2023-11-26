import { useMutation, useQueryClient } from "react-query";
import { axiosClientWithAuth } from "../axiosClient";
import { apiUrls } from "../apiUrls";
import { dataQueryKeys } from "../dataQueryClient";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await axiosClientWithAuth.delete(apiUrls.getUser(id));
      return res;
    },
    onSuccess: () => queryClient.invalidateQueries(dataQueryKeys.USERS),
  });
};
