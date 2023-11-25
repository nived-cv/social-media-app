import axios from "axios";

export const axiosClientWithAuth = axios.create({
  baseURL: "https://gorest.co.in/public/v2",
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
  },
});
