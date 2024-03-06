import API from '../Common/EndPoint/serviceConstrants';
import axiosInstance from '../Common/Axios/axiosInstance';
export const callAddSpecialListPostApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.userMasterPostApi, payload);
  return data;
};
export const callAddSpecialListGetApi = async () => {
  const { data = {} } = await axiosInstance.get(API.userMasterApi);
  return data;
};
export const callAddSpecialListUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstance.put(API.userMasterUpdateApi, payload);
  return data;
};