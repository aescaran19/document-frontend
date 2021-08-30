import { axiosInstance } from "./base";
import { getAuthSession } from "@/helpers/auth.helper";

export function getDocumentListAPI() {
  const headers = {
    Authorization: `Bearer ${getAuthSession().accessToken}`,
  };
  return axiosInstance.get("/document", {
    headers,
  });
}

export function getDocumentAPI(id) {
  const headers = {
    Authorization: `Bearer ${getAuthSession().accessToken}`,
  };
  return axiosInstance.get(`/document/${id}`, {
    headers,
  });
}

export function addDocumentAPI(data) {
  const headers = {
    Authorization: `Bearer ${getAuthSession().accessToken}`,
  };
  return axiosInstance.post("/document", data, {
    headers,
  });
}

export function updateDocumentAPI(id, data) {
  const headers = {
    Authorization: `Bearer ${getAuthSession().accessToken}`,
  };
  return axiosInstance.put(`/document/${id}`, data, {
    headers,
  });
}

export function deleteDocumentAPI(id) {
  const headers = {
    Authorization: `Bearer ${getAuthSession().accessToken}`,
  };
  return axiosInstance.delete(`/document/${id}`, {
    headers,
  });
}
export function deleteDocumentsAPI(data) {
  const headers = {
    Authorization: `Bearer ${getAuthSession().accessToken}`,
  };
  return axiosInstance.delete("/document", {
    data: data,
    headers: headers,
  });
}
