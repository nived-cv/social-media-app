import { useQuery } from "react-query";
import { apiUrls } from "../apiUrls";
import { axiosClientWithAuth } from "../axiosClient";
import { dataQueryKeys } from "../dataQueryClient";

const fetchUsers = async () => {
  const data = await axiosClientWithAuth(apiUrls.getUsers());
  return data.data;
};

export const useGetUsers = () => useQuery(dataQueryKeys.USERS, fetchUsers);
