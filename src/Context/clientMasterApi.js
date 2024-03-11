import API from "../Common/EndPoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";

export const getClientMasterApi = async () => {
  const { data = {} } = await axiosInstance.get(API.client_master);
  return data;
};

export const postClientMasterApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.client_master, payload);
  return data;
};
export const updateClientMasterApi = async (payload) => {
  const { data = {} } = await axiosInstance.put(API.client_master, payload);
  return data;
};
