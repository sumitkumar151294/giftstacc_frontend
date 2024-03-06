import API from '../Common/EndPoint/serviceConstrants';
import axiosInstance from '../Common/Axios/axiosInstance';
export const callUserMasterApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.user_master, payload);
  return data;
};
export const callUserMasterGetApi = async () => {
  const { data = {} } = await axiosInstance.get(API.user_master);
  return data;
};
export const callUserMasterUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstance.put(API.user_master, payload);
  return data;
};