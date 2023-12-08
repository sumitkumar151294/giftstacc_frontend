import API from '../Common/EndPoint/serviceConstrants';
import axiosInstance from '../Common/Axios/axiosInstance';
export const callUserRoleGetApi = async () => {
  const { data = {} } = await axiosInstance.get(API.userRoleApi);
  return data;
};
export const callUserRolePostApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.userRoleApi, payload);
  return data;
};
