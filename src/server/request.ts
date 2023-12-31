import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import { USER_TOKEN } from "@/constants";

export const request = axios.create({
  baseURL: "https://ap-vodiy-parfum-backend.up.railway.app/api/v1",
  timeout: 10000,
  headers: { Authorization: `Bearer ${Cookies.get(USER_TOKEN)}` },
});

request.interceptors.response.use(
  async (response) => {
    return response;
  },
  (err) => {
    toast.error(err.message)
    return Promise.reject(err);
  }
);
