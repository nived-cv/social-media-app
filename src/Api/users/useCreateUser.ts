import { useMutation, useQueryClient } from "react-query";
import { UserData } from "../../CommonTypes/TypesList1";
import { axiosClientWithAuth } from "../axiosClient";
import { apiUrls } from "../apiUrls";
import { dataQueryKeys } from "../dataQueryClient";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newData: UserData) => {
      try {
        const res = await axiosClientWithAuth.post(apiUrls.getUsers(), newData);
        return res;
      } catch (err) {
        alert(err);
      }
    },
    onSuccess: () => queryClient.invalidateQueries([dataQueryKeys.USERS]),
  });
};
