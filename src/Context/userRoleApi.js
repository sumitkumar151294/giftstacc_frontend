import API from '../Common/EndPoint/serviceConstrants';
import axiosInstance from '../Common/Axios/axiosInstance';
export const callUserRoleGetApi = async () => {
  const { data = {} } = await axiosInstance.get(API.user_role);
  return data;
};
export const callUserRolePostApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.user_role, payload);
  return data;
};
export const callUserRoleUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstance.put(API.user_role, payload);
  return data;
};
