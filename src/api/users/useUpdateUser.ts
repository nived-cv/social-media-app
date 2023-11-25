import { useMutation, useQueryClient } from "react-query";
import { PatchUser } from "../../types";
import { axiosClientWithAuth } from "../axiosClient";
import { apiUrls } from "../apiUrls";
import { dataQueryKeys } from "../dataQueryClient";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newData: PatchUser) => {
      const res = await axiosClientWithAuth.patch(
        apiUrls.getUser(newData.id),
        newData
      );
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(dataQueryKeys.USERS);
    },
    onError: (error) => alert(error),
  });
};
