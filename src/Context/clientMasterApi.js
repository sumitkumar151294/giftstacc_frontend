import API from "../Common/EndPoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";

export const getClientMasterApi = async () => {
  const { data = {} } = await axiosInstance.get(API.getClient);
  return data;
};

export const postClientMasterApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.postClient, payload);
  return data;
};
export const updateClientMasterApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.updateClient, payload);
  return data;
};
