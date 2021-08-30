import { axiosInstance } from "./base";

export function login(data) {
  return axiosInstance.post("/account/login", data);
}
