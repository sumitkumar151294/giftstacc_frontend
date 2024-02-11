import API from '../Common/EndPoint/serviceConstrants';
import axiosInstance from '../Common/Axios/axiosInstance';
export const callUserRoleModuleAccessGetApi = async () => {
  const { data = {} } = await axiosInstance.get(API.userRoleModuleAccess);
  return data;
};
export const callUserRoleModuleAccessPostApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.userRolePostModuleAccess, payload);
  return data;
};
export const callUserRoleModuleAccessUpdateApi = async (payload) => {
  const { data = {} } = await axiosInstance.put(API.userRoleModuleAccess, payload);
  return data;
};
