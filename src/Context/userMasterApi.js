import API from '../Common/EndPoint/serviceConstrants';
import axiosInstance from '../Common/Axios/axiosInstance';
export const callUserMasterApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.userMasterPostApi, payload);
  return data;
};
export const callUserMasterGetApi = async () => {
  const { data = {} } = await axiosInstance.get(API.userMasterApi);
  return data;
};
export const callUserMasterUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstance.put(API.userMasterUpdateApi, payload);
  return data;
};